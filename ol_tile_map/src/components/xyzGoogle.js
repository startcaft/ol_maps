import React from 'react';


import Map from 'ol/map';
import View from 'ol/view';
import Tile from 'ol/layer/tile';
import proj from 'ol/proj';
import XYZ from 'ol/source/xyz';

let map = undefined;

class XyzGoogle extends React.Component {
    render(){
        return (
            <div id="map" style={{width:'100%',height:'400px'}}></div>
        )
    }
    componentWillMount(){
        map = null;
    }
    componentDidMount(){
        // google地图层
        const googleMapLayer = new Tile({
            source: new XYZ({
                url:'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0'
            })
        });

        map = new Map({
            layers:[
                googleMapLayer
            ],
            view:new View({
                center: proj.transform([104.06, 30.67], 'EPSG:4326', 'EPSG:3857'),
                zoom:10
            }),
            target:'map'
        });
    }
}

export default XyzGoogle;