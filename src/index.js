import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Application from './components/Application';
import Perf from 'react-addons-perf';

window.Perf = Perf;

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Application} />
  </Router>,
  document.getElementById('container')
);
