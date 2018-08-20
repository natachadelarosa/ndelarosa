import React, { Component } from "react";

class AddForm extends Component {
  state = {
    address: ""
  };

  handleChange = e => {
    const newAddress = e.target.value;
    this.setState({
      address: newAddress
    });
  };

  handleOnClick = e => {
    e.preventDefault();
    this.props.submit(this.state.address);
    this.setState({ address: "" });
  };

  render() {
    const { address } = this.state;
    return (
      <form>
        <div className="form-row align-items-center">
          <div className="col-auto">
            <label className="sr-only" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control mb-2"
              value={address}
              id="address"
              placeholder="0x0"
            />
          </div>

          <div className="col-auto">
            <button
              type="submit"
              className="btn btn-primary mb-2"
              disabled={this.props.isSubmitting}
              onClick={this.handleOnClick}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default AddForm;
