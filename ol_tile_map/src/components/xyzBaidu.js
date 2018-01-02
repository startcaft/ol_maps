import React from 'react';


import Map from 'ol/map';
import View from 'ol/view';
import Tile from 'ol/layer/tile';
import proj from 'ol/proj';
import TileGrid from 'ol/tilegrid/tilegrid';
import TileImage from 'ol/source/tileimage';

let map = undefined;

class XyzBaidu extends React.Component {
    render(){
        return (
            <div id="map" style={{width:'100%',height:'400px'}}></div>
        )
    }
    componentWillMount(){
        map = null;
    }
    componentDidMount(){
        // 自定义分辨率和瓦片坐标系
        let resolutions = [];
        let maxZoom = 18;

        // 计算百度使用的分辨率
        for(var i=0; i<=maxZoom; i++){
            resolutions[i] = Math.pow(2, maxZoom-i);
        }
        const tilegrid  = new TileGrid({
            origin: [0,0],              // 设置原点坐标
            resolutions: resolutions    // 设置分辨率
        });
        // 百度地图数据源
        const baiduSource = new TileImage({
            projection: 'EPSG:3857',
            tileGrid: tilegrid,
            tileUrlFunction:function(tileCoord, pixelRatio, proj){    // 参数 tileCoord 为瓦片坐标
                const z = tileCoord[0];
                let x = tileCoord[1];
                let y = tileCoord[2];

                // 百度瓦片服务url将负数使用M前缀来标识
                if(x<0){
                    x = 'M' + (-x);
                }
                if(y<0){
                    y = 'M' + (-y);
                }

                // 返回经过转换后，对应于百度在线瓦片的url
                return "http://online0.map.bdimg.com/onlinelabel/?qt=tile&x="+x+"&y="+y+"&z="+z+"&styles=pl&udt=20160426&scaler=1&p=0";
            }
        })

        const baiduLayer = new Tile({
            source:baiduSource
        })

        map = new Map({
            layers:[
                baiduLayer
            ],
            view:new View({
                center: proj.transform([104.06, 30.67], 'EPSG:4326', 'EPSG:3857'),
                zoom:10
            }),
            target:'map'
        });
    }
}

export default XyzBaidu;