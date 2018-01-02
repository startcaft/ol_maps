import React from 'react';


import Map from 'ol/map';
import View from 'ol/view';
import Tile from 'ol/layer/tile';
import proj from 'ol/proj';
import XYZ from 'ol/source/xyz';

let map = undefined;

class XyzTianDu extends React.Component {
    render(){
        return (
            <div id="map" style={{width:'100%',height:'400px'}}></div>
        )
    }
    componentWillMount(){
        map = null;
    }
    componentDidMount(){
        // 天地图路网
        const roadlayer = new Tile({
            title:'天地图路网',
            source:new XYZ({
                url : 'http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}'
            })
        })
        // 天地图标注
        const markLayer = new Tile({
            title:'天地图标注',
            source:new XYZ({
                url : 'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}'
            })
        })

        map = new Map({
            layers:[
                roadlayer,
                markLayer
            ],
            view:new View({
                center: proj.transform([104.06, 30.67], 'EPSG:4326', 'EPSG:3857'),
                zoom:10
            }),
            target:'map'
        });
    }
}

export default XyzTianDu;