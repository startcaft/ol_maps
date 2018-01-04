import React from 'react';


import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import OSM from 'ol/source/osm';
import proj from 'ol/proj';
import Overlay from 'ol/overlay';

import './home.css';

let map = undefined;

class Home extends React.Component {
    render(){
        return (
            <div>
                <div id="map" style={{width:'100%',height:'400px'}}></div>
                <div id="anchor">
                    <img src={require('../assets/images/anchor.png')} alt='示例锚点' />
                </div>
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
                projection: 'EPSG:4326',
                center: [104, 30],
                zoom: 10
            }),
            target:'map'
        });

        // 把图标附加到地图上，需要一个 ol.Overlay 对象
        const anchor = new Overlay({
            element:document.getElementById('anchor')
        });
        // 关键点，需要设置附加到地图上的位置
        anchor.setPosition([104,30]);
        // 然后添加到 map 上
        map.addOverlay(anchor);
    }
}

export default Home;