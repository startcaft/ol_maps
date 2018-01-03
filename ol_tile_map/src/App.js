import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom';
import Home from './components/home';
import XyzTianDu from './components/xyzTianditu';
import XyzBaidu from './components/xyzBaidu';
import XyzGoogle from './components/xyzGoogle';
import OffLine from './components/offLine';
import StaticImage from './components/staticImage';

class App extends Component {
  render() {
    //定义一个我们选中的状态
    let activeStyle={color:'red'};

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <div className="App-intro">
            <ul>
              <li>
                <NavLink exact activeStyle={activeStyle} to="/">最简单的加载在线地图</NavLink>&nbsp;|&nbsp;
                <NavLink exact activeStyle={activeStyle} to="/tianditu">使用ol.source.XYZ加载天地图瓦片地图</NavLink>&nbsp;|&nbsp;
                <NavLink exact activeStyle={activeStyle} to="/baidu">使用ol.source.XYZ加载百度地图(需转换)</NavLink>&nbsp;|&nbsp;
                <NavLink exact activeStyle={activeStyle} to="/google">加载Google地图(需解密)</NavLink>&nbsp;|&nbsp;
                <NavLink exact activeStyle={activeStyle} to="/offline">离线瓦片地图</NavLink>&nbsp;|&nbsp;
                <NavLink exact activeStyle={activeStyle} to="/static">映射静态图片</NavLink>
              </li>
            </ul>
            <div>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/tianditu" component={XyzTianDu}/>
                <Route exact path="/baidu" component={XyzBaidu}/>
                <Route exact path="/google" component={XyzGoogle}/>
                <Route exact path="/offline" component={OffLine}/>
                <Route exact path="/static" component={StaticImage}/>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
