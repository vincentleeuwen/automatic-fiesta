import initialState from './initialState';
import * as actionTypes from '../actions/actionTypes';

const todo = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return Object.assign({}, action.todo, { completed: false });
    case actionTypes.TOGGLE_TODO:
      if (state.id !== action.todo.id) return state;
      // return {
      //   ...state,
      //   completed: !state.completed
      // }
      return Object.assign({}, state, { completed: !state.completed })
    default:
      return state;
  } 
}

export const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case actionTypes.SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

export const todos = (state = initialState.todos, action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return [
        ...state,
        todo(undefined, action)
      ];
    case actionTypes.TOGGLE_TODO:
      return state.map(t => todo(t, action));
    default:
      return state;
  }
}

// export default todoApp;

// export const toggleTodo = todo => {
//   // WRONG:
//   // todo.completed = !todo.completed;
//   // return todo;
  
//   // RIGHT:
//   return Object.assign({}, todo, {
//     completed: !todo.completed
//   });

//   // // ALSO RIGHT:
//   // return {
//   //   ...todo,
//   //   completed: !todo.completed
//   // }

// }