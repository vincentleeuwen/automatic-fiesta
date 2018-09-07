import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './App.css';
import Counter from './components/Counter';

class App extends Component {
  render() {
    const { counter, dispatch } = this.props;
    return (
      <div className="App">
        <Counter
          counter={counter.counter}
          onIncrement={() => dispatch({ type: 'INCREMENT' })}
          onDecrement={() => dispatch({ type: 'DECREMENT' })}
        />
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
