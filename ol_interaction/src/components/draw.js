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
import Circle from 'ol/style/circle';

let map = undefined;
let draw = undefined;

class MyDraw extends React.Component {
    render(){
        return (
            <div>
                <form>
                    <label>地物类型</label>
                    <select id="drawtype">
                        <option value="None">None</option>
                        <option value="Point">点</option>
                        <option value="LineString">线</option>
                        <option value="Polygon">面</option>
                    </select>
                </form>
                <div id="map" style={{width:'100%',height:'400px'}}></div>
            </div>
        )
    }
    componentWillMount(){
        map = null;
        draw = null;
    }
    componentDidMount(){
        // 底图
        const baseLayer = new TileLayer({
            source:new OSM()
        })
        // 临时图层的数据源
        const source = new VectorSource();          
        // 新建临时图层，并设置临时图层渲染各种要素的样式
        const vector = new VectorLayer({
            source : new VectorSource(),
            style : new Style({
                stroke:new StrokeStyle({
                    color:'#ffcc33',
                    size:2
                }),
                fill:new Fill({
                    color:'rgba(255,255,255,0.2)'
                }),
                image:new Circle({
                    radius:7,
                        fill:new Fill({
                        color:'#ffcc33'
                    })
                })
            })
        });
        // 新建地图
        map = new Map({
            layers:[baseLayer,vector],
            target:'map',
            view:new View({
                center: proj.transform([104, 30], 'EPSG:4326', 'EPSG:3857'),
                zoom: 10
            }),
        })

        const type = document.getElementById('drawtype');
        let typeValue = type.value;
        
        type.onchange = function(e){
            map.removeInteraction(draw);
            addInteraction(e.target.value,source);
        }
    }
}

function addInteraction(typeValue,vectorSource){
    if(typeValue !== 'None'){
        draw = new Draw({
            //设置要素源，绘制结束后将绘制的要素添加到临时图层
            source:vectorSource,
            //绘制的类型
            type:(typeValue)
        });
        map.addInteraction(draw);
    }
}

export default MyDraw;