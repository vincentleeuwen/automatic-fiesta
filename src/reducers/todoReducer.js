  
export const toggleTodo = todo => {
  // WRONG:
  // todo.completed = !todo.completed;
  // return todo;
  
  // RIGHT:
  const newTodo = Object.assign({}, todo);
  newTodo.completed = !todo.completed;
  return newTodo; 
}