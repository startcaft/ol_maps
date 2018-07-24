import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom';
import Home from './components/home';
import LoadFeatures from './components/loadFeatures';
import Transform from './components/transform';
import VectorStyle from './components/vectorStyle';
import Wfs from './components/wfs';

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
                <NavLink exact activeStyle={activeStyle} to="/">加载矢量数据</NavLink>&nbsp;|&nbsp;
                <NavLink exact activeStyle={activeStyle} to="/onchange">触发source数据获取加载后的feature</NavLink>&nbsp;|&nbsp;
                <NavLink exact activeStyle={activeStyle} to="/transform">坐标转换</NavLink>&nbsp;|&nbsp;
                <NavLink exact activeStyle={activeStyle} to="/style">矢量数据样式</NavLink>&nbsp;|&nbsp;
                <NavLink exact activeStyle={activeStyle} to="/wfs">WFS</NavLink>
              </li>
            </ul>
            <div>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/onchange" component={LoadFeatures}/>
                <Route exact path="/transform" component={Transform}/>
                <Route exact path="/style" component={VectorStyle}/>
                <Route exact path="/wfs" component={Wfs}/>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
