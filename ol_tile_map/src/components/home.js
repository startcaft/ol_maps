import React from 'react';


import Map from 'ol/map';
import View from 'ol/view';
import Tile from 'ol/layer/tile';
import OSM from 'ol/source/osm';
import proj from 'ol/proj';
import BingMaps from 'ol/source/bingmaps';
import Stamen from 'ol/source/stamen';

let map = undefined;
let openStreetMapLayer = undefined;
let bingMapLayer  = undefined;
let stamenLayer = undefined;


class Home extends React.Component {
    render(){
        return (
            <div>
                <div id="map" style={{width:'100%',height:'400px'}}></div>
                <input type="radio" defaultChecked name="mapSource" value="osm" onChange={(event) => this.handlerCheck(event)} />OpenStreetMap地图
                <input type="radio" name="mapSource" value="bing" onChange={(event) => this.handlerCheck(event)} />Bing地图
                <input type="radio" name="mapSource" value="stamen" onChange={(event) => this.handlerCheck(event)} />Stamen地图
            </div>
        )
    }
    componentWillMount(){
        map = null;
    }
    componentDidMount(){
        // Open Street Map 瓦片图层
        openStreetMapLayer = new Tile({
            source:new OSM()
        });

        // Bing 瓦片图层
        bingMapLayer = new Tile({
            source:new BingMaps({
                key:'AkjzA7OhS4MIBjutL21bkAop7dc41HSE0CNTR5c6HJy8JKc7U9U9RveWJrylD3XJ',
                imagerySet:'Road'
            })
        });

        // Stamen 瓦片图层
        stamenLayer = new Tile({
            source: new Stamen({
                layer: 'watercolor'
            })
        })

        map = new Map({
            layers:[
                openStreetMapLayer
            ],
            view:new View({
                center: proj.transform([104.06, 30.67], 'EPSG:4326', 'EPSG:3857'),
                zoom:10
            }),
            target:'map'
        });
    }
    handlerCheck(event){
        const type = event.target.value;
        console.log(type);
        console.log(map);
        this._switchMap(type);
    }
    _switchMap(type){
        map.removeLayer(map.getLayers().item(0));// 删除 map 的指定图层
        switch(type){
            case "osm":
                map.addLayer(openStreetMapLayer);// 为 map 添加图层
                break;
            case "bing":
                map.addLayer(bingMapLayer);
                break;
            case "stamen":
                map.addLayer(stamenLayer);
                break;
            default:
                map.addLayer(openStreetMapLayer);
                break;
        }
    }
}

export default Home;