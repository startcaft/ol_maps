import React from 'react';


import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import OSM from 'ol/source/osm';
import proj from 'ol/proj';

let map = undefined;


class Events extends React.Component {
    constructor(){
        super()
        this.state = {
            info : '触发事件提示信息'
        }
    }
    render(){
        return (
            <div>
                <div style={{backgroundColor: '#999',marginBottom:"5px"}}>{this.state.info}</div>
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

         // 单击事件
        map.on('singleclick', function(event){
            this.setState({
                info:'触发了ol.Map的单击事件：singleclick'
            })
        }.bind(this));

        // 双击事件
        map.on('dblclick', function(event){
            this.setState({
                info:'触发了ol.Map的双击事件：dblclick'
            })
        }.bind(this));

        // 点击
        map.on('click', function(event){
            this.setState({
                info:'触发了ol.Map的点击事件：click'
            })
        }.bind(this));

        // // 响应鼠标移动事件，事件太频繁，故注释掉了
        // map.on('pointermove', function(event){
        //     this.setState({
        //         info:'触发了ol.Map的鼠标移动事件：pointermove'
        //     })
        // }.bind(this));

         // 响应拖拽事件
        map.on('pointerdrag', function(event){
            this.setState({
                info:'触发了ol.Map的拖拽事件：pointerdrag'
            })
        }.bind(this));

        // 地图移动事件
        map.on('moveend', function(event){
            this.setState({
                info:'触发了ol.Map的地图移动事件：moveend'
            })
        }.bind(this));

        // 地图中心改变事件
        map.getView().on('change:center',function(event){
            const center = map.getView().getCenter();
            this.setState({
                info : '触发了ol.View的中心改变事件：change: center,当前中心为：' + center
            })
        }.bind(this));

        // 地图分辨率改变
        map.getView().on('change:resolution',function(event){
            const zoom = map.getView().getZoom();
            this.setState({
                info : '触发了ol.View的缩放事件：change:resolution,当前层级为：' + zoom
            })
        }.bind(this));
    }
}

export default Events;