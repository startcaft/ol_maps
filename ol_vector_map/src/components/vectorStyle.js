import React from 'react';


import Map from 'ol/map';
import View from 'ol/view';
import proj from 'ol/proj';
import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import TileLayer from 'ol/layer/tile';
import OSM from 'ol/source/osm';
import GeoJSON from 'ol/format/geojson';
import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';

let map = undefined;

class VectorStyle extends React.Component {
    render(){
        return (
            <div id="map" style={{width:'100%',height:'400px'}}></div>
        )
    }
    componentWillMount(){
        map = null;
    }
    componentDidMount(){
        // 创建地图
        map = new Map({
            view : new View({
                center: [-72.980624870461128, 48.161307640513321],
                zoom: 8,
                projection: 'EPSG:4326'
            }),
            target: 'map',
            layers:[
                new TileLayer({
                    source:new OSM()
                })
            ]
        });

        // 矢量图层
        const layer = new VectorLayer({
            // 第一种方式 url + format
            source:new VectorSource({
                url:require('../assets/vectorys/line-samples.geojson'),   // 矢量数据原来
                format: new GeoJSON()                                    // 解析矢量数据的格式化类
            }),
            // 直接为 layer 设置样式
            // 设置样式，颜色为红色，线条粗细为1个像素
            style:new Style({
                stroke:new Stroke({
                    color:'red',
                    size:1
                })
            })
        });

        map.addLayer(layer);
    }
}

export default VectorStyle;