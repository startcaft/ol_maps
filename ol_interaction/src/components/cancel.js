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

let map = undefined;
let clickSelect = undefined;

class Cancel extends React.Component {
    render(){
        return (
            <div>
                <div id="map" style={{width:'100%',height:'400px'}}></div>
                <input type="button" value="取消选中" onClick={this.handleClick} />
            </div>
            
        )
    }
    handleClick(){
        clickSelect.getFeatures().clear();
        // 下面这样也是可以取消选中的，根据情况选择
        //map.removeInteraction(clickSelect);
    }
    componentWillMount(){
        map = null;
    }
    componentDidMount(){
        // 矢量图层
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
        // 定义一个圆形
        const circle = new Feature({
            geometry : new Point(proj.transform([104, 30], 'EPSG:4326', 'EPSG:3857'))
        })
        vLayer.getSource().addFeature(circle);

        map = new Map({
            layers:[
                new TileLayer({
                    source:new OSM()
                }),
                vLayer
            ],
            view:new View({
                center: proj.transform([104, 30], 'EPSG:4326', 'EPSG:3857'),
                zoom: 10
            }),
            target:'map'
        });

        // 添加一个用于选择 Feature 的交互方式
        clickSelect = new Select({
            style:new Style({
                image : new CircleStyle({
                    radius:10,
                    fill : new Fill({
                        color : 'blue'
                    })
                })
            })
        })
        map.addInteraction(clickSelect);
    }
}

export default Cancel;