import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actionTypes from './actions/actionTypes';
import * as todoActions from './actions/todoActions';
import './App.css';

const Link = ({ active, onClick, children }) => {
  if (active) return <span>{children}</span>;
  return (
    <a
      href="#"
      onClick={onClick}
      // onClick={e => {
      //   e.preventDefault();
      //   dispatch({
      //     type: actionTypes.SET_VISIBILITY_FILTER,
      //     filter
      //   });
      // }}
    >
      {children}
    </a>
  );
}

const mapFilterLinkStateToProps = (state, ownProps) => {
  return {
    visibilityFilter: state.visibilityFilter
  }
}

const mapDispatchFilterLinkToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch({
        type: actionTypes.SET_VISIBILITY_FILTER,
        filter: ownProps.filter
      });
    }
  }
  // return {
  //   setVisibilityFilter: todoActions.setVisibilityFilter
  // }
}

const FilterLink = connect(mapFilterLinkStateToProps, mapDispatchFilterLinkToProps)(class FilterLink extends Component {
  render() {
    const { filter, visibilityFilter, children, onClick } = this.props;
    return (
      <Link
        active={
          filter === visibilityFilter
        }
        onClick={
          () => onClick(filter)
        }
      >{children}</Link>
    )
  }
});

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

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink 
      filter="SHOW_ALL"
    >All</FilterLink>
    {' '}
    <FilterLink
      filter="SHOW_ACTIVE"
    >Active</FilterLink>
    {' '}
    <FilterLink
      filter="SHOW_COMPLETED"
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
    return (
      <div className="App">
        <AddTodo
          text={text}
          onChange={this.onChange}
          addTodo={this.addTodo}
        />
        <TodoList todos={todos} onTodoClick={this.onTodoClick} />
        <Footer />
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
    todos: getVisibleTodos(state.visibilityFilter, state.todos),
    visibilityFilter: state.visibilityFilter
  }
}

export default connect(mapStateToProps)(App);
