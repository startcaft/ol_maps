import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom';
import Home from './components/home';
import UnbindEvent from './components/unbindEvent';
import Events from './components/events';
import Custom from './components/customEvent';

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
                <NavLink exact activeStyle={activeStyle} to="/">一个简单的事件应用</NavLink>&nbsp;|&nbsp;
                <NavLink exact activeStyle={activeStyle} to="/unbind">注销响应事件的几种方式</NavLink>&nbsp;|&nbsp;
                <NavLink exact activeStyle={activeStyle} to="/events">常用事件</NavLink>&nbsp;|&nbsp;
                <NavLink exact activeStyle={activeStyle} to="/custom">自定义Feature的mouseover事件</NavLink>
              </li>
            </ul>
            <div>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/unbind" component={UnbindEvent}/>
                <Route exact path="/events" component={Events}/>
                <Route exact path="/custom" component={Custom}/>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
