  
export const toggleTodo = todo => {
  // WRONG:
  // todo.completed = !todo.completed;
  // return todo;
  
  // RIGHT:
  return Object.assign({}, todo, {
    completed: !todo.completed
  });

  // // ALSO RIGHT:
  // return {
  //   ...todo,
  //   completed: !todo.completed
  // }

}