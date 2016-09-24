import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import helpers from '../helpers.js'
import autobind from 'autobind-decorator'

@autobind
export default class Order extends React.Component {

  renderOrders(key) {
    var fish = this.props.fishes[key];
    var count = this.props.orders[key];
    var removeButton = <button onClick={this.props.removeFromOrder.bind(null, key)}>&times;</button>
    if(!fish) {
      return <li key={key}>Sorry, The Fish is no longer available! {removeButton}</li>
    }

    return (
      <li key={key}>
      <span>
      <CSSTransitionGroup
          component='span'
          transitionName='count'
          transitionEnterTimeout={250}
          transitionLeaveTimeout={250}
          transitionAppear={true}
          transitionAppearTimeout={250}
        >
          <span key={count}>{count}</span>
      </CSSTransitionGroup>
        lbs {fish.name}
        </span>
        <span>{helpers.formatPrice(fish.price * count)}</span>
        {removeButton}
      </li>

    )
  }

  render(){

      var orderIds = Object.keys(this.props.orders);
      var total = orderIds.reduce((prevTotal, key)=> {
      var fish = this.props.fishes[key];
      var count = this.props.orders[key];
      var isAvailable = fish && fish.status === "available";

    if(fish && isAvailable) {
        return prevTotal + (count * parseInt(fish.price) || 0)
      }

      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h3 className="order-title">Your Orders</h3>

        <CSSTransitionGroup
              className="order"
              component='ul'
              transitionName='order'
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
              transitionAppear={true}
              transitionAppearTimeout={500}
        >
          {orderIds.map(this.renderOrders)}
          <li className="total">
            <strong>Total:</strong>
              {helpers.formatPrice(total)}
          </li>
        </CSSTransitionGroup>

      </div>
    )
  }
}

Order.propTypes = {
  orders : React.PropTypes.object.isRequired,
  fishes : React.PropTypes.object.isRequired
}
