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
import StrokeStyle from 'ol/style/stroke';
import Select from 'ol/interaction/select';
import Draw from 'ol/interaction/draw';

let map = undefined;

class MyDraw extends React.Component {
    render(){
        return (
            <div>
                <div style={{backgrounColor:'#999'}}><span>当前绘制线的坐标：</span><span id='points'></span></div>
                <div id="map" style={{width:'100%',height:'400px'}}></div>
            </div>
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
                center: proj.transform([104, 30], 'EPSG:4326', 'EPSG:3857'),
                zoom: 10
            }),
            target:'map'
        });

        // 添加一个绘制的线要用到的layer
        const lineLayer = new VectorLayer({
            source : new VectorSource(),
            style : new Style({
                stroke:new StrokeStyle({
                    color:'red',
                    size:1
                })
            })
        });
        map.addLayer(lineLayer);

        // 添加绘图的交互类
        const lineDraw = new Draw({
            type:'LineString',
            source:lineLayer.getSource(),    // 注意设置source，这样绘制好的线，就会添加到这个source里
            style:new Style({               // 绘制时的样式
                stroke: new StrokeStyle({
                    color: '#009933',
                    size: 1
                })
            }),
            maxPoints:4                     // 限制不能超过4个点
        });
        // 监听绘制结束事件,获取坐标
        lineDraw.on('drawend',function(event){
            // event.feature 就是当前绘制完成的线的Feature
            document.getElementById('points').innerHTML = 
                JSON.stringify(event.feature.getGeometry().getCoordinates());
        });
        map.addInteraction(lineDraw);
    }
}

export default MyDraw;