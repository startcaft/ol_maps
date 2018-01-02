import React from 'react';

import Map from 'ol/map';
import View from 'ol/view';
import Tile from 'ol/layer/tile';
import OSM from 'ol/source/osm';
import proj from 'ol/proj';


let map = undefined;

class Home extends React.Component {
    render(){
        return (
            <div>
                <div id="map" style={{width:'100%',height:'400px'}}></div>
                <div id="navigate-container">
                    <input type="button" value="左移" onClick={this._moveToLeft}  />
                    <input type="button"  value="右移" onClick={() => this._moveToRight()} />
                    <input type="button"  value="上移" onClick={this._moveToUp} />
                    <input type="button"  value="下移" onClick={this._moveToDown} />
                    <input type="button"  value="移到成都" onClick={this._moveToChengDu} />
                    <input type="button"  value="放大" onClick={this._zoomIn} />
                    <input type="button"  value="缩小" onClick={this._zoomOut} />
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
                new Tile({source:new OSM()})
            ],
            view:new View({
                center: proj.transform([104.06, 30.67], 'EPSG:4326', 'EPSG:3857'),
                zoom:10
            }),
            target:'map'
        });
    }

    /**
     * 一旦map设置了新的中心点，或者修改了中心点坐标，都需要手动调用map.render()方法进行重新渲染；
     */
    _moveToLeft(){
        const view = map.getView();
        let mapCenter = view.getCenter();
        console.log(mapCenter);
        // 让地图中心的x值增加，即可使得地图向左移动
        mapCenter[0] += 50000;
        view.setCenter(mapCenter);
        map.render();
    }
    _moveToRight(){
        const view = map.getView();
        let mapCenter = view.getCenter();
        console.log(mapCenter);
        // 让地图中心的x值减少，即可使得地图向右移动
        mapCenter[0] -= 50000;
        view.setCenter(mapCenter);
        map.render();
    }
    _moveToUp(){
        const view = map.getView();
        let mapCenter = view.getCenter();
        console.log(mapCenter);
        // 让地图中心的y值减少，即可使得地图向上移动
        mapCenter[1] -= 50000;
        view.setCenter(mapCenter);
        map.render();
    }
    _moveToDown(){
        const view = map.getView();
        let mapCenter = view.getCenter();
        console.log(mapCenter);
        // 让地图中心的y值增加，即可使得地图向上移动
        mapCenter[1] += 50000;
        view.setCenter(mapCenter);
        map.render();
    }
    _moveToChengDu(){
        const view = map.getView();
        // 设置地图中心为成都的坐标，即可让地图移动到成都
        view.setCenter(proj.transform([104.06, 30.67], 'EPSG:4326', 'EPSG:3857'));
        map.render();
    }
    _zoomIn(){
        const view = map.getView();
        // 让地图的zoom增加，从而实现地图放大
        view.setZoom(view.getZoom() + 1);
    }
    _zoomOut(){
        const view = map.getView();
        // 让地图的zoom减少，从而实现地图缩小
        view.setZoom(view.getZoom() - 1);
    }
}

export default Home;