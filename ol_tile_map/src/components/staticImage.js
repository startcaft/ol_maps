import React from 'react';


import Map from 'ol/map';
import View from 'ol/view';
import Image from 'ol/layer/image';
import proj from 'ol/proj';
import ImageStatic from 'ol/source/imagestatic';

let map = undefined;

class StaticImage extends React.Component {
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
        // 计算熊猫基地地图映射到地图上的范围，图片的像素为 2400 * 1042，保持比例的情况下，把分辨率放大一些。
        const extent = [center[0]-2400*100/2,center[1]-1042*1000/2,center[0]+2400*1000/2, center[1]+1042*1000/2];

        // 创建地图
        map = new Map({
            view:new View({
                center: center,
                zoom:6
            }),
            target:'map'
        });

        // 加载熊猫基地静态地图层
        map.addLayer(new Image({
            source:new ImageStatic({
                url:require('../assets/images/timg.jpg'),    // 熊猫基地地图
                imageExtent:extent                  // 映射到地图的范围
            })
        }))
    }
}

export default StaticImage;