import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom';
import Home from './components/home';
import FeatueStyle from './components/featueStyle';
import StyleFunction from './components/styleFunction';
import Popup from './components/popup';

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
                <NavLink exact activeStyle={activeStyle} to="/">overlay制作图标</NavLink>&nbsp;|&nbsp;
                <NavLink exact activeStyle={activeStyle} to="/featureStyle">feature+style制作图标</NavLink>&nbsp;|&nbsp;
                <NavLink exact activeStyle={activeStyle} to="/styleFunction">styleFunction更加灵活</NavLink>&nbsp;|&nbsp;
                <NavLink exact activeStyle={activeStyle} to="/popup">overlay弹出窗</NavLink>&nbsp;|&nbsp;
              </li>
            </ul>
            <div>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/featureStyle" component={FeatueStyle}/>
                <Route path="/styleFunction" component={StyleFunction}/>
                <Route path="/popup" component={Popup}/>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
