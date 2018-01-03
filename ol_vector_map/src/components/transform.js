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

class Transform extends React.Component {
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
        // 创建地图 当前地图使用 EPSG:3857
        // 而 矢量数据使用的是WGS84 则是 EPSG:4326 坐标系
        map = new Map({
            view : new View({
                center: proj.fromLonLat([-72.980624870461128, 48.161307640513321]),
                zoom: 8
            }),
            target: 'map',
            layers:[
                new TileLayer({
                    source:new OSM()
                })
            ]
        });

        // 加载矢量地图
        function addGeoJSON(source){
            const dataSource = new VectorSource({
                features:(new GeoJSON()).readFeatures(source,{      // 用 readFeatures 方法可以自定义坐标系
                    dataProjection:'EPSG:4326',                     // 设定JSON数据使用的坐标系
                    featureProjection:'EPSG:3857'                   // 设定当前地图使用的feature的坐标系
                })
            });

            const layer = new VectorLayer({
                source:dataSource
            });

            map.addLayer(layer);
        }

        // 异步请求矢量数据
        fetch('https://openlayers.org/en/v3.20.0/examples/data/geojson/line-samples.geojson',{
            method:'get'
        }).then(function(res){
            res.json().then(function(data){
                //console.log(data);
                addGeoJSON(data);
            });
        }).catch(function(err){
            throw new Error(err);
        });
    }
}

export default Transform;