import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/**
 * Router 是容器，用它来包裹路由规则；
 * Route 是路由规则；
 * BrowserRouter是基于H5的，兼容性不好；
 */
import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom';

import Home from './components/home';
import ViewExtent from './components/viewExtent';
import ViewMinMaxZoom from './components/viewMinMaxZoom';
import ViewFit from './components/viewFit';

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
                <NavLink exact activeStyle={activeStyle} to="/">地图导航</NavLink>&nbsp;|&nbsp;
                <NavLink exact activeStyle={activeStyle} to="/extent">限制地图中心范围</NavLink>&nbsp;|&nbsp;
                <NavLink exact activeStyle={activeStyle} to="/zoom">限制地图缩放级别</NavLink>&nbsp;|&nbsp;
                <NavLink exact activeStyle={activeStyle} to="/fit">自适应区域</NavLink>
              </li>
            </ul>
            <div>
              {/*Switch是匹配*/}
              {/*exact 我们匹配/斜杠时候，就匹配第一个*/}
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/extent" component={ViewExtent} />
                <Route path="/zoom" component={ViewMinMaxZoom} />
                <Route path="/fit" component={ViewFit} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
