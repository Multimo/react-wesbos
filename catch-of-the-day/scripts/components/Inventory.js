import React from 'react';
import AddFishForm from './AddFishForm';
import autobind from 'autobind-decorator'

@autobind
export default class Inventory extends React.Component {

  handleRemove(event, key) {
    event.preventDefault();
    this.props.removeFish(key);
  }

  handleChange(fishKey, event) {
    var detail = event.target.name;
    var value = event.target.value;
    var fishKey = fishKey

    this.props.updateForm(fishKey, value, detail);
  }

  renderInventory(key){
    var fishKey = key;

    // No judge pls
    return (
      <form className="fish-edit" key={key} >
        <input type="text" name={name='name'} value={this.props.fishes[key].name} onChange={(event) => this.handleChange(key, event)} />
        <input type="text" name={name='price'}  value={this.props.fishes[key].price} onChange={(event) => this.handleChange(key, event)} />
        <select ref="status" name={name='status'} onChange={(event) => this.handleChange(key, event)}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" ref="desc" name={name='desc'}  value={this.props.fishes[key].desc}   onChange={(event) => this.handleChange(key, event)} ></textarea>
        <input type="text" ref="image" name={name='image'} value={this.props.fishes[key].image}   onChange={(event) => this.handleChange(key, event)} />
        <button type="submit" onClick={(event) => this.handleRemove(event, key)}>+ Remove Item </button>
      </form>
    )
  }

  render(){
    return (
        <div>
          <h2>Inventory</h2>
          {Object.keys(this.props.fishes).map(this.renderInventory)}
          <AddFishForm addFish={this.props.addFish} />
          <button onClick={this.props.loadSamples}>Load Samples</button>
        </div>
    )
  }

}

Inventory.propTypes = {
    fishes : React.PropTypes.object.isRequired,
    addFish : React.PropTypes.func.isRequired,
    loadSamples : React.PropTypes.func.isRequired,
    updateForm : React.PropTypes.func.isRequired
}
