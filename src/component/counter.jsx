import React, { Component } from "react";
class Counter extends Component {
  render() {
    return (
      <div className="container-fluid wrapper">
        <span
          className={"countShow badge " + this.setClass()}
          style={{ width: 100 }}
        >
          {this.props.counter.value}
        </span>
        <button
          className="btn btn-success"
          onClick={() => this.props.increment(this.props.counter)}
        >
          Increment
        </button>
        <button
          className="btn btn-danger"
          onClick={() => this.props.decrement(this.props.counter)}
        >
          Decrement
        </button>
        <button
          className="btn btn-danger"
          onClick={() => this.props.onDelete(this.props.counter.id)}
        >
          Delete
        </button>
      </div>
    );
  }
  setClass = () => {
    return this.props.counter.value < 0 ? "badge-danger" : "badge-success";
  };
}

export default Counter;
