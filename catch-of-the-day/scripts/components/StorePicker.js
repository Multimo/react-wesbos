import React from 'react'
import helpers from '../helpers.js'
import { browserHistory } from 'react-router'
import autobind from 'autobind-decorator'

@autobind
export default class StorePicker extends React.Component {

    goToStore(event) {
      event.preventDefault();
      var route = '/store/' + this.refs.storeId.value;

      browserHistory.push(route);
    }

    render() {
      return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter a Store </h2>
        <input type="text" ref="storeId" defaultValue={helpers.getFunName()} required />
        <input type="Submit" value="Submit" readOnly/>
      </form>
    )
  }

}


export default StorePicker;
