import React from 'react';


import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import OSM from 'ol/source/osm';
import proj from 'ol/proj';
import Feature from 'ol/feature';
import Point from 'ol/geom/point';
import Style from 'ol/style/style';
import Fill from 'ol/style/fill';
import CircleStyle from 'ol/style/circle';
import Select from 'ol/interaction/select';
import condition from 'ol/events/condition';
import RegularShape from 'ol/style/regularshape';

let map = undefined;

class FeatureCondition extends React.Component {
    render(){
        return (
            <div id="map" style={{width:'100%',height:'400px'}}></div>
        )
    }
    componentWillMount(){
        map = null;
    }
    componentDidMount(){
        // 创建一个用于存放圆形的layer
        const vLayer = new VectorLayer({
            source : new VectorSource(),
            // 注意：把feature上的style，直接移到layer上，避免直接在feature上设置style
            style: new Style({
                image: new CircleStyle({
                    radius: 10,
                    fill: new Fill({
                        color: 'red'
                    })
                })
            })
        });
         // 创建一个用于存放star的layer
        const starLayer = new VectorLayer({
            source: new VectorSource(),
            style: new Style({
                image: new RegularShape({
                    points: 5,
                    radius1: 20,
                    radius2: 10,
                    fill: new Fill({
                        color: 'red'
                    })
                })
            })
        });
        // 在地图上添加一个圆形
        const circle = new Feature({
            geometry : new Point(proj.transform([104, 30], 'EPSG:4326', 'EPSG:3857'))
        })
        vLayer.getSource().addFeature(circle);
        // 在地图上添加一个五星
        const star = new Feature({
            geometry: new Point(proj.transform([104.06, 30.05], 'EPSG:4326', 'EPSG:3857'))
        })
        starLayer.getSource().addFeature(star);

        map = new Map({
            layers:[
                new TileLayer({
                    source:new OSM()
                }),
                vLayer,starLayer
            ],
            view:new View({
                center: proj.transform([104, 30], 'EPSG:4326', 'EPSG:3857'),
                zoom: 10
            }),
            target:'map'
        });

        // 添加一个用于选择 Feature 的交互方式
        map.addInteraction(new Select({
            condition:condition.pointerMove,
            style:new Style({
                image : new CircleStyle({
                    radius:10,
                    fill : new Fill({
                        color : 'blue'
                    })
                })
            }),
            // 关键： 设置过了条件，可以用feature来写过滤，也可以用layer来写过滤
            filter:function(feature,layer){
                return layer === vLayer
            }
        }))
    }
}

export default FeatureCondition;