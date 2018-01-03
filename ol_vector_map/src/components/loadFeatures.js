import React from 'react';


import Map from 'ol/map';
import View from 'ol/view';
import proj from 'ol/proj';
import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import TileLayer from 'ol/layer/tile';
import OSM from 'ol/source/osm';
import GeoJSON from 'ol/format/geojson';

let map = undefined;

class LoadFeatures extends React.Component {
    render(){
        return (
            <div>
                <div id="map" style={{width:'100%',height:'400px'}}></div>
                <div>矢量地图Feature总数： <span id="count"></span></div>
            </div>
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
        const lineLayer = new VectorLayer({
            source: new VectorSource({
                //url:'https://openlayers.org/en/v3.20.0/examples/data/geojson/line-samples.geojson',
                url : require('../assets/vectorys/line-samples.geojson'),
                format: new GeoJSON()
            })
        });

        // 图层数据源的监听事件
        const listenerKey = lineLayer.getSource().on('change',function(){
            console.log(lineLayer.getSource().getState());
            if (lineLayer.getSource().getState() === 'ready') { // 判断数据源是否加载完成
                document.getElementById('count').innerHTML = lineLayer.getSource().getFeatures().length;
                //lineLayer.getSource().unByKey(listenerKey); // 注销监听器
            }
        });
        

        map.addLayer(lineLayer);
    }
}

export default LoadFeatures;