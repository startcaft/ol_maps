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
import Icon from 'ol/style/icon';
import CircleStyle from 'ol/style/circle';
import StrokeStyle from 'ol/style/stroke';
import Fill from 'ol/style/fill';
import RegularShape from 'ol/style/regularshape';
import TextStyle from 'ol/style/text';

let map = undefined;

class styleFunction extends React.Component {
    render(){
        return (
            <div>
                <div id="map" style={{width:'100%',height:'400px'}}></div>
            </div>
        )
    }
    componentWillMount(){
        map = null;
    }
    componentDidMount(){
        // 构建一个矢量图层
        const vectorLayer = new VectorLayer({
            source:new VectorSource()
        });

        map = new Map({
            layers:[
                new TileLayer({
                    source:new OSM()
                }),
                vectorLayer
            ],
            view:new View({
                projection: 'EPSG:4326',
                center: [104, 30],
                zoom: 10
            }),
            target:'map'
        });

        const anchor = new Feature({
            geometry:new Point([104,30])
        });
        anchor.setStyle(function(resolution){
            return [
                new Style({
                    image : new Icon({
                        src:require('../assets/images/anchor.png'),
                        anchor:[0.5,1],
                        scale:map.getView().getZoom() / 10
                    })
                })
            ]
        });
        vectorLayer.getSource().addFeature(anchor);

        const point = new Feature({
            geometry:new Point([104,30])
        });
        point.setStyle(function(resolution){
            return [
                new Style({
                    image:new CircleStyle({
                        radius:1,
                        fill:new Fill({
                            color:'red'
                        }),
                        stroke:new StrokeStyle({
                            color:'red',
                            size:1
                        })
                    })
                })
            ]
        });
        vectorLayer.getSource().addFeature(point);

        // 创建layer使用的 style function，根据feature的自定义type，返回不同的样式
        const layerStyleFunction = function(feature,resolution){
            let type = feature.get('type');
            let style = null;
            // 点
            if(type === 'point'){
                style = new Style({
                    image:new CircleStyle({
                        radius: 1,
                        fill: new Fill({
                            color: 'red'
                        })
                    })
                });
            }
            else if(type === 'circle'){
                style = new Style({
                    image: new CircleStyle({
                      radius: 10,
                      stroke: new StrokeStyle({
                        color: 'red',
                        size: 1
                      })
                    })
                });
            }
            else {
                style = new Style({
                    image: new RegularShape({
                      points: 5,
                      radius: 10,
                      fill: new Fill({
                        color: 'blue'
                      })
                    })
                });
            }
            // 返回 style 数组
            return [style];
        }

        // 添加三个 feature，并设置自定义属性 type
        const layer2 = new VectorLayer({
            source:new VectorSource(),
            style:layerStyleFunction
        });
        const react = new Feature({
            geometry:new Point([104.2222,30])
        })
        layer2.getSource().addFeature(react);
        const circle = new Feature({
            geometry:new Point([104.2222,30])
        })
        circle.set('type', 'circle');
        layer2.getSource().addFeature(circle);
        const point2 = new Feature({
            geometry: new Point([104.2222,30])
        });
        point2.set('type', 'point');
        layer2.getSource().addFeature(point2);

        map.addLayer(layer2);
    }
}

export default styleFunction;