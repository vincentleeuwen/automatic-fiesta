import React from 'react';
import PropTypes from 'prop-types';

const Counter = ({ counter, onIncrement, onDecrement }) => (
  <div>
    <h1>{counter}</h1>
    <button
      onClick={onIncrement}
    >
      +
    </button>
    <button
      onClick={onDecrement}
    >
      -
    </button>
  </div>
);

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
}

export default Counter;