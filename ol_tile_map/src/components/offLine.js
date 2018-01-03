import React from 'react';


import Map from 'ol/map';
import View from 'ol/view';
import Tile from 'ol/layer/tile';
import proj from 'ol/proj';
import XYZ from 'ol/source/xyz';

let map = undefined;

class OffLine extends React.Component {
    render(){
        return (
            <div id="map" style={{width:'100%',height:'400px'}}></div>
        )
    }
    componentWillMount(){
        map = null;
    }
    componentDidMount(){
        // 地图设置中心，设置到成都，在本地离线地图 offlineMapTiles刚好有一张zoom为6的成都瓦片
        const center = proj.transform([104.06667, 30.66667], 'EPSG:4326', 'EPSG:3857');

        const offLineMapLayer = new Tile({
            source:new XYZ({
                // 设置本地离线瓦片所在路径，本里只有一张瓦片，所以只看的到一张瓦片
                url: '../assets/maps/{z}/{x}/{y}.png',
                tileUrlFunction:function(tileCoord, pixelRatio, proj){
                    let z = tileCoord[0];
                    let x = tileCoord[1];
                    let y = tileCoord[2];
                    if(y < 0){
                        y = Math.abs(y);
                    }

                    const tileUrl = `../assets/maps/${z}/${x}/${y}.png`;
                    console.log(tileUrl);
                    //console.log(require(`../assets/maps/${z}/${x}/${y}.png`));
                    return tileUrl;
                }
            })
        });

        map = new Map({
            layers:[
                offLineMapLayer
            ],
            view:new View({
                center: center,
                zoom:6
            }),
            target:'map'
        });
    }
}

export default OffLine;