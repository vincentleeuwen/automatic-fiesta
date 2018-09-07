import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';

class App extends Component {
  increaseCounter = () => {
    this.props.dispatch({ type: 'INCREMENT' });
  }
  decreaseCounter = () => {
    this.props.dispatch({ type: 'DECREMENT' });
  }

  render() {
    const { counter } = this.props;
    return (
      <div className="App">
        <h1>{counter.counter}</h1>
        <button
          onClick={this.increaseCounter}
        >
          Increase
        </button>
        <button
          onClick={this.decreaseCounter}
        >
          Decrease
        </button>
      </div>
    );
  }
}

App.propTypes = {
  counter: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    counter: state
  }
}

export default connect(mapStateToProps)(App);
