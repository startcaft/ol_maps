import React from 'react';


import Map from 'ol/map';
import View from 'ol/view';
import Tile from 'ol/layer/tile';
import proj from 'ol/proj';
import XYZ from 'ol/source/xyz';
import TileGrid from 'ol/tilegrid';
import OSM from 'ol/source/osm';
import TileArcGISRest from 'ol/source/tilearcgisrest';

let map = undefined;

class ArcGis extends React.Component {
    render(){
        return (
            <div id="map" style={{width:'100%',height:'400px'}}></div>
        )
    }
    componentWillMount(){
        map = null;
    }
    componentDidMount(){
        // // 地图投影
        // const projection = proj.get('EPSG:3857');
        // // arcgis瓦片地址
        // const tileUrl = 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity_Mobile/MapServer'
        // // 原点
        // const origin = [-2.0037508342787E7,2.0037508342787E7 ];
        // // 分辨率
        // const resolutions =[
        //     78271.51696400007,
        //     39135.75848199997,
        //     19567.879241000046,
        //     9783.93962049996,
        //     4891.96981024998,
        //     2445.98490512499,
        //     1222.992452562495,
        //     611.4962262812475,
        //     305.74811314068984,
        //     152.87405657027878,
        //     76.43702828520553,
        //     38.21851414253662,
        //     19.10925707126831,
        //     9.554628535634155,
        //     4.7773142678170775,
        //     2.388657133974685,
        //     1.1943285669873425,
        //     0.5971642834275251
        // ];
        // // 地图范围
        // const fullExtent = [
        //     -2.0037507067161843E7,
        //     -3.0240971958386254E7,
        //     2.0037507067161843E7,
        //     3.0240971958386205E7
        // ];
        // const tileGrid = new TileGrid({
        //     tileSize: 512,
        //     origin: origin,
        //     extent: fullExtent,
        //     resolutions: resolutions
        // })
        // // 瓦片数据源
        // const tileArcGisXYZ = new XYZ({
        //     tileGrid:tileGrid,
        //     projection:projection,
        //     url:tileUrl
        // });

        // map = new Map({
        //     target:'map',
        //     layers:[
        //         new Tile({
        //             source: new OSM(),
        //         }),
        //         // 瓦片图层
        //         new Tile({
        //             source: tileArcGisXYZ,
        //         })
        //     ],
        //     view: new View({
        //         center: [114.4250, 23.0890],
        //         resolutions: resolutions,
        //         // 注意：此处指定缩放级别不能通过zoom来指定，指定了也无效，必须通过resolution来指定
        //         // 官方API说明：
        //         // Resolutions to determine the resolution constraint. 
        //         // If set the maxResolution, minResolution, minZoom, maxZoom, and zoomFactor options are ignored.
        //         resolution: 76.43702828520553,
        //         projection: projection,
        //         extent: fullExtent
        //     })
        // });
        map = new Map({
            target: 'map',
            layers: [
               new Tile({
                   source: new OSM(),
               }),
               new Tile({
                   source: new TileArcGISRest({
                       url: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity_Mobile/MapServer'
                   })
               })
            ],
            view: new View({
               center: [104.06, 30.67],
               zoom: 12,
               minZoom:10,
               maxZoom: 20,
               projection: 'EPSG:4326'
            })
        });

    }
}

export default ArcGis;