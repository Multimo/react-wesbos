import React from 'react'
import ReactDOM from 'react-dom'
import CSSTransitionGroup from 'react-addons-css-transition-group'


import { ReactRouter, Navigation, Router, Route, browserHistory } from 'react-router'
import helpers from './helpers.js'


// Components
import StorePicker from './components/StorePicker'
import Fish from './components/Fish'
import Header from './components/Header'
import Inventory from './components/Inventory'
import Order from './components/Order'


// Firebase
import Rebase from 're-base';
var base = Rebase.createClass('https://wes-react.firebaseio.com/');




var App = React.createClass({

  getInitialState : function() {
    return {
      fishes: {},
      orders: {}
    }
  },

  componentDidMount : function() {
    base.syncState(this.props.params.storeId + '/fishes', {
      context : this,
      state : 'fishes',
    });

    var localStorageRef = localStorage.getItem('order/' + this.props.params.storeId);


    if (localStorageRef) {
      this.setState({
        orders : JSON.parse(localStorageRef)
      });
    }
  },


  componentWillUpdate : function(nextProps, nextState) {
    localStorage.setItem('order/' + this.props.params.storeId, JSON.stringify(nextState.orders));
  },

  addFish : function(fish) {
    var timestamp = (new Date()).getTime();
    this.state.fishes['fish-' + timestamp] = fish;
    this.setState({ fishes : this.state.fishes });
  },

  addToOrder : function(key){
    this.state.orders[key] = this.state.orders[key] + 1 || 1;
    this.setState({ orders : this.state.orders });
  },

  loadSamples : function() {
    this.setState({
      fishes : require('./sample-fishes')
    })
  },

  updateForm : function(fishKey, value, detail) {
    console.log(fishKey)
    var newValue = value;
    console.log(detail);
    var newState = this.state.fishes;
    newState[fishKey][detail] = newValue;

    //Didnt want to use mixins as per video so I copy the old state
    // set the new values and pass it as the new state
    this.setState({ fishes : newState });
  },

  removeFish : function(key) {
    if (confirm('sure?')){
      this.state.fishes[key] = null;
        this.setState({ fishes : this.state.fishes });
    }
  },

  removeFromOrder : function(key){
    delete this.state.orders[key];
    this.setState({ orders : this.state.orders });
  },

  renderFish : function(key) {
    return <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
  },

  render: function(){
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline={'Fresh Fish Market '}/>
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(this.renderFish)}
          </ul>
        </div>
        <Order orders={this.state.orders} fishes={this.state.fishes} removeFromOrder={this.removeFromOrder}/>
        <Inventory fishes={this.state.fishes} addFish={this.addFish} loadSamples={this.loadSamples} updateForm={this.updateForm} removeFish={this.removeFish}/>
      </div>
    )
  },


});

export default App
