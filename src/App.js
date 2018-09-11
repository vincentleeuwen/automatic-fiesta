import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actionTypes from './actions/actionTypes';
import './App.css';

const FilterLink = ({ filter, children, dispatch, currentFilter }) => {
  if (currentFilter === filter) return <span>{children}</span>;
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        dispatch({
          type: actionTypes.SET_VISIBILITY_FILTER,
          filter
        });
      }}
    >
      {children}
    </a>
  );
}

const getVisibleTodos = (filter, todos) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    default:
      return todos;
  }
}

const Todo = ({ todo, onClick }) => (
  <li
    onClick={() => onClick(todo)}
    style={{ cursor: 'pointer', textDecoration: todo.completed ? 'line-through' : 'none' }}
  >{todo.text}
  </li>
)

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {
      todos.map(todo => {
      return (
        <Todo
          key={todo.id}
          todo={todo}
          onClick={() => onTodoClick(todo)}
        />
      );
    })

    }
  </ul>
)

const AddTodo = ({ onChange, addTodo, text }) => (
  <div>
    <input name="text" onChange={onChange} value={text} />
    <button onClick={addTodo}>Add todo</button>
  </div>
)

const Footer = ({ visibilityFilter, dispatch }) => (
  <p>
    Show:
    {' '}
    <FilterLink 
      filter="SHOW_ALL"
      dispatch={dispatch}
      currentFilter={visibilityFilter}
    >All</FilterLink>
    {' '}
    <FilterLink
      filter="SHOW_ACTIVE"
      dispatch={dispatch}
      currentFilter={visibilityFilter}
    >Active</FilterLink>
    {' '}
    <FilterLink
      filter="SHOW_COMPLETED"
      dispatch={dispatch}
      currentFilter={visibilityFilter}
    >Completed</FilterLink>
  </p>
)


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
  onTodoClick = (todo) => {
    this.props.dispatch({
      type: actionTypes.TOGGLE_TODO,
      todo
    })
  }

  render() {
    const { todos, dispatch, visibilityFilter } = this.props;
    const { text } = this.state;
    const visibleTodos = getVisibleTodos(visibilityFilter, todos);
    return (
      <div className="App">
        <AddTodo
          text={text}
          onChange={this.onChange}
          addTodo={this.addTodo}
        />
        <TodoList todos={visibleTodos} onTodoClick={this.onTodoClick} />
        <Footer {...this.props} />
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
    todos: state.todos,
    visibilityFilter: state.visibilityFilter
  }
}

export default connect(mapStateToProps)(App);
