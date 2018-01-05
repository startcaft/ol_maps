import React from 'react';


import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import OSM from 'ol/source/osm';
import proj from 'ol/proj';
import Overlay from 'ol/overlay';
import coordinate from 'ol/coordinate';

import './popup.css'

let map = undefined;

class Popup extends React.Component {
    render(){
        return (
            <div>
                <div id="map" style={{width:'100%',height:'400px'}}></div>
                {/* 弹出框结构 */}
                <div id="popup" className="ol-popup">
                    <a href="#" id="popup-closer" className="ol-popup-closer"></a>
                    <div id="popup-title" className="popup-title"></div>
                    <div id="popup-content" className="popup-content"></div>
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

        // 获取 popup 节点
        const container  = document.getElementById('popup');
        const content = document.getElementById('popup-content');
        const closer = document.getElementById('popup-closer');
        const title = document.getElementById('popup-title');

        // 创建一个 overlay，绑定html元素 container
        const overlay = new Overlay({
            element:container,
            autoPan:true,
            autoPanAnimation: {
                duration: 250
            }
        });

        // overlay 附加到map 上
        map.addOverlay(overlay);

        // 监听map点击事件
        map.on('singleclick',function(event){
            // 获取当前点击坐标，并设置到HTML元素上去
            const currentCoordinate = event.coordinate;
            const hdms = coordinate.toStringHDMS(proj.transform(currentCoordinate, 'EPSG:3857', 'EPSG:4326'));
            content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
            title.innerHTML = '提示信息';
            container.style.display = 'block';
            
            // 设置overlay的位置，从而显示在鼠标点击处
            overlay.setPosition(currentCoordinate);
            // 设置地图中心点
            map.getView().setCenter(currentCoordinate);
        });

        closer.onclick = function(){
            container.style.display = 'none';
            closer.blur();
            return false;
        }
    }
}

export default Popup;