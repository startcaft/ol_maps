import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Map from 'ol/map';
import View from 'ol/view';
import proj from 'ol/proj';
import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import TileLayer from 'ol/layer/tile';
import OSM from 'ol/source/osm';
import GeoJSON from 'ol/format/geojson';
import Style from 'ol/style/style';
import StrokeStyle from 'ol/style/stroke';
import Feature from 'ol/feature';
import Point from 'ol/geom/point';
import CircleStyle from 'ol/style/circle';
import Fill from 'ol/style/fill';
import circle from 'ol/style/circle';
import point from 'ol/geom/point';

let map= undefined;
let osmLayer = undefined;
let pointLayer = undefined;
let circleLayer = undefined;

class App extends Component {
  constructor(){
    super()
    this.state = {
      osmChk:true,
      circleChk:true,
      pointChk:true
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <div id="map" style={{width:'100%',height:'500px'}}></div>
          <div>
            显示/隐藏：
            <input type="checkbox" checked={this.state.osmChk} value="osm" onChange={this.handleCheck.bind(this)} />底图
            <input type="checkbox" checked={this.state.circleChk} value="circle" onChange={this.handleCheck.bind(this)} />圆
            <input type="checkbox" checked={this.state.pointChk} value="point" onChange={this.handleCheck.bind(this)} />点
          </div>
          <div>
            图层顺序：
            <input name="seq" type="radio" value="osm" onChange={(event) => this.handleRadio(event)} />底图最上
            <input name="seq" type="radio" value="circle" defaultChecked onChange={(event) => this.handleRadio(event)} />圆最上
            <input name="seq" type="radio" value="point" onChange={(event) => this.handleRadio(event)}/>点最上
        </div>
        </div>
      </div>
    );
  }
  componentDidMount(){
    // 创建3个图层
    osmLayer = new TileLayer({
      source:new OSM()
    });
    pointLayer = new VectorLayer({
      source:new VectorSource()
    });
    circleLayer = new VectorLayer({
      source:new VectorSource()
    });

    map = new Map({
      view:new View({
        center:[0,0],
        zoom:2
      }),
      target:'map',
      // 在地图上添加三个图层，图层顺序自上而下，依次是 osm，point，circle
      layers:[osmLayer,pointLayer,circleLayer]
    });

    // 添加点，ol.Feature 代表一个矢量对象
    // 不同的形状对应不同的类 ol.geom.Point 矢量点，等等
    const point = new Feature({
      geometry:new Point([0,0])
    });
    point.setStyle(new Style({
      image:new CircleStyle({
        radius:1,
        fill:new Fill({
          color:'red'
        }),
        stroke:new StrokeStyle({
          color:'red',
          size:1
        })
      })
    }));
    pointLayer.getSource().addFeature(point);

    // 添加圆
    const circle = new Feature({
      geometry:new Point([0,0])
    });
    circle.setStyle(new Style({
      image:new CircleStyle({
        radius:10,
        stroke:new StrokeStyle({
          color:'blue',
          size:1
        })
      })
    }));
    circleLayer.getSource().addFeature(circle);
  }
  componentWillUnmount(){
    map = null;
  }

  handleCheck(e){
    // 使用 Layer 的 setVisible(true/false) 设置图层是否可见
    let isChecked = e.target.checked;
    const type = e.target.value;
    switch(type){
      case 'osm':
        osmLayer.setVisible(isChecked);
        this.setState({osmChk:isChecked});
        break;
      case 'point':
        pointLayer.setVisible(isChecked);
        this.setState({pointChk:isChecked});
        break;
      case 'circle':
        circleLayer.setVisible(isChecked);
        this.setState({circleChk:isChecked});
        break;
      default:
        break;
    }
  }

  handleRadio(e){
    // 使用 set/getZIndex 来设置和获取图层顺序，顺序最大的覆盖其他图层
    const type = e.target.value;
    switch(type){
      case 'osm':
        if(e.target.checked){
          osmLayer.setZIndex(3);
          circleLayer.setZIndex(circleLayer.getZIndex() - 1);
          pointLayer.setZIndex(pointLayer.getZIndex() -1);
        }
        break;
      case 'point':
        if(e.target.checked){
          pointLayer.setZIndex(3);
          circleLayer.setZIndex(circleLayer.getZIndex() -1);
          osmLayer.setZIndex(osmLayer.getZIndex() - 1);
        }
        break;
      case 'circle':
        if(e.target.checked){
          circleLayer.setZIndex(3);
          osmLayer.setZIndex(osmLayer.getZIndex() - 1);
          pointLayer.setZIndex(pointLayer.getZIndex() -1);
        }
        break;
      default:
        break;
    }
  }
}

export default App;
