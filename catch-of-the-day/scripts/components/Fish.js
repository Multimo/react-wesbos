import React from 'react';
import helpers from '../helpers.js';


var Fish = React.createClass({

  sendToOrder : function() {
    this.props.addToOrder(this.props.index)
  },

  render : function() {

    var details = this.props.details;
    var formatedPrice = helpers.formatPrice(details.price);
    var isAvailable = (details.status === "available" ? true : false);
    var buttonText = (isAvailable ? 'Add To Order' : 'SOLD OUT!')
    return (
      <li className="menu-fish">
        <img src={details.image} alt="Fish" />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{formatedPrice}</span>
        </h3>
        <p>{details.desc}</p>
        <button disabled={!isAvailable} onClick={this.sendToOrder} >{buttonText}</button>
     </li>
    )
  },

  propTypes : {
    details : React.PropTypes.object.isRequired,
    addToOrder : React.PropTypes.func.isRequired
  }
});

export default Fish;
