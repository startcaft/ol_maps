import React from 'react';

import Map from 'ol/map';
import View from 'ol/view';
import Tile from 'ol/layer/tile';
import OSM from 'ol/source/osm';
import proj from 'ol/proj';


let map = undefined;

class ViewExtent extends React.Component {
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
        map = new Map({
            layers:[
                new Tile({source:new OSM()})
            ],
            view:new View({
                /**
                 * 通过设置 view 的 extent 设置地图中心范围，可以限制地图显示范围，
                 * 但是放大/缩放操作可以突破这个限制。
                 */
                extent: [102, 29, 104, 31],
                center: [104.06, 30.67],
                projection:'EPSG:4326',
                zoom:10
            }),
            target:'map'
        });
    }
}

export default ViewExtent;