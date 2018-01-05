import React from 'react';


import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import OSM from 'ol/source/osm';
import proj from 'ol/proj';

let map = undefined;


class UnbindEvent extends React.Component {
    render(){
        return (
            <div id="map" style={{width:'100%',height:'400px'}}></div>
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
                center: proj.transform([104, 30], 'EPSG:4326', 'EPSG:3857'),
                zoom:10
            }),
            target:'map'
        });

        // // map.un() 的方式
        // // 创建事件监听器，代码最后执行 map.un() 对事件进行解绑
        // const singleClickFunc = function(event){
        //     // 通过getEventCoordinate方法获取地理位置(投影坐标)，再转换为wgs84坐标，并弹出对话框显示
        //     const currentCoordinate = event.coordinate;
        //     alert(proj.transform(currentCoordinate, 'EPSG:3857', 'EPSG:4326'));

        //     map.un('singleclick',singleClickFunc);
        // }
        // map.on('singleclick',singleClickFunc);


        // 这种方式最简单粗暴
        map.once('singleclick',function(event){
            const currentCoordinate = event.coordinate;
            alert(proj.transform(currentCoordinate, 'EPSG:3857', 'EPSG:4326'));
        });
    }
}

export default UnbindEvent;