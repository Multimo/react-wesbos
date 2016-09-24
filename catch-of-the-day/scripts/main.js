import React from 'react'
import ReactDOM from 'react-dom'


import { ReactRouter, Navigation, Router, Route, browserHistory } from 'react-router'
import helpers from './helpers.js'


// Components
import NotFound from './components/NotFound'
import StorePicker from './components/StorePicker'
import App from './App'



var routes = (
  <Router history={browserHistory} >
    <Route path="/" component={StorePicker} />
    <Route path="/store/:storeId" component={App} />
    <Route path="*" component={NotFound}/>
  </Router>

)

ReactDOM.render(routes, document.querySelector('#main'));
