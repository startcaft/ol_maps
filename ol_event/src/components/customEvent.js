import React from 'react';


import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import OSM from 'ol/source/osm';
import proj from 'ol/proj';
import Vectorlayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import Feature from 'ol/feature';
import Point from 'ol/geom/point';
import Style from 'ol/style/style';
import CircleStyle from 'ol/style/circle';
import FillStyle from 'ol/style/fill';

let map = undefined;


class CustomEvent extends React.Component {
    render(){
        return (
            <div id="map" style={{width:'100%',height:'400px'}}></div>
        )
    }
    componentWillMount(){
        map = null;
    }
    componentDidMount(){
        map = new Map({
            layers:[
                new TileLayer({
                    source:new OSM()
                })
            ],
            view:new View({
                center: [0, 0],    // 定义地图显示中心于经度0度，纬度0度处
                zoom: 2            // 并且定义地图显示层级为2
            }),
            target:'map'
        });

        // 一个圆形Feature
        const circle = new Feature({
            geometry:new Point([0,0])
        })
        circle.setStyle(new Style({
            image:new CircleStyle({
                radius:100,
                fill:new FillStyle({
                    color:'red'
                })
            })
        }));

        // 一个矢量图层
        const vectorLayer = new Vectorlayer({
            source:new VectorSource({
                features:[circle]
            })
        })
        map.addLayer(vectorLayer);

        // 监听鼠标移动事件
        map.on('pointermove', function(event){
            map.forEachFeatureAtPixel(event.pixel, function(feature){
                // 为移动到的feature发送自定义的mousemove消息
                feature.dispatchEvent({type: 'mousemove', event: event});
                // 屏幕像素坐标
                console.log(event.pixel); 
            });
        });

        // 监听自定义派发的 mousein/mouseout 事件
        circle.on('mousemove',function(event){
            this.setStyle(new Style({
                image:new CircleStyle({
                    radius:100,
                    fill:new FillStyle({
                        color:'blue'
                    })
                })
            }))
        });
    }
}

export default CustomEvent;