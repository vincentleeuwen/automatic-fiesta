import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actionTypes from './actions/actionTypes';
import './App.css';

let nextTodoId = 0;

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      text: ''
    }
  }
  onChange = (event) => {
    const { name, value } = event.target;
    // console.log(event.target.name);
    // console.log(event.target.value);
    const newState = Object.assign({}, this.state);
    newState[name] = value;
    this.setState(newState);
  }

  addTodo = () => {
    const { text } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: actionTypes.ADD_TODO,
      todo: {
        id: nextTodoId++,
        text
      }
    });
    this.setState({ text: '' });
  }

  render() {
    const { todos } = this.props;
    const { text } = this.state;
    return (
      <div className="App">
        <input name="text" onChange={this.onChange} value={text} />
        <button onClick={this.addTodo}>Add todo</button>
        <ul>
          {
            todos.map(todo => {
              return <li key={todo.id}>{todo.text}</li>
            })
          }
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  todos: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    todos: state.todos
  }
}

export default connect(mapStateToProps)(App);
