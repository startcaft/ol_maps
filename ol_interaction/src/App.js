import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom';
import Home from './components/home';
import Condition from './components/condition';
import FeatureCondition from './components/featureCondition';
import Cancel from './components/cancel';
import Line from './components/line';
import Draw from './components/draw';

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
                <NavLink exact activeStyle={activeStyle} to="/">Feature选取之选中样式</NavLink>&nbsp;|&nbsp;
                <NavLink exact activeStyle={activeStyle} to="/condition">Feature选取之条件过滤</NavLink>&nbsp;|&nbsp;
                <NavLink exact activeStyle={activeStyle} to="/featureCondition">Feature选取之条件过滤</NavLink>&nbsp;|&nbsp;
                <NavLink exact activeStyle={activeStyle} to="/cancel">Feature选取之取消选中</NavLink>&nbsp;|&nbsp;
                <NavLink exact activeStyle={activeStyle} to="/draw">绘图</NavLink>&nbsp;|&nbsp;
                <NavLink exact activeStyle={activeStyle} to="/drawAdv">绘图进阶</NavLink>&nbsp;|&nbsp;
              </li>
            </ul>
            <div>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/condition" component={Condition}/>
                <Route exact path="/featureCondition" component={FeatureCondition}/>
                <Route exact path="/cancel" component={Cancel}/>
                <Route exact path="/draw" component={Line}/>
                <Route exact path="/drawAdv" component={Draw}/>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
