import React from 'react';

import Map from 'ol/map';
import View from 'ol/view';
import Tile from 'ol/layer/tile';
import OSM from 'ol/source/osm';
import proj from 'ol/proj';


let map = undefined;

class viewFit extends React.Component {
    render(){
        return (
            <div>
                <div id="map" style={{width:'100%',height:'400px'}}></div>
                <input type="button" value="显示成都" onClick={() => this._fitToChengDu()} />
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
                center: [104.06, 30.67],
                projection:'EPSG:4326',
                zoom:10
            }),
            target:'map'
        });
    }
    _fitToChengDu(){
        const view = map.getView();
        /**
         * 地图承载的容器的大小
         */
        const mapSize = map.getSize();
        console.log("mapSize:" + mapSize);
        view.fit([104, 30.6, 104.12, 30.74],mapSize);
    }
}

export default viewFit;