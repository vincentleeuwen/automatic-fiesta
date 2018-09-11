import initialState from './initialState';
import * as actionTypes from '../actions/actionTypes';

const todoReducer = (state, action) => {
  switch(action.type) {
    case actionTypes.ADD_TODO:
      return Object.assign({}, action.todo, { completed: false });
    case actionTypes.TOGGLE_TODO:
      if (state.id !== action.todo.id) return state;
      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state;
  }
}

const todosReducer = (action, state = initialState.todos) => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return [
        ...state,
        todoReducer(undefined, action)
      ];
    case actionTypes.TOGGLE_TODO:
      return state.map(t => todoReducer(t, action));
    default:
      return state;
  }
}

export default todosReducer;

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