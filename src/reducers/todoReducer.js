import initialState from './initialState';  

export const addTodoReducer = (state = initialState.todos, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        Object.assign({}, action.todo, { completed: false })
      ]
    default:
      return state;
  }
}

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