import deepFreeze from 'deep-freeze';
import expect from 'expect';
import { addTodoReducer } from './todoReducer';

describe('Todo reducer test', () => {
  it('Should correctly add todos', () => {
    const stateBefore = [];
    const todo = {
      id: 0,
      text: 'First todo'
    }
    const action = {
      type: 'ADD_TODO',
      todo
    }
    const stateAfter = [
      {
        id: 0,
        text: 'First todo',
        completed: false
      }
    ]

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(addTodoReducer(stateBefore, action)).toEqual(stateAfter);
  });

  // it('Should toggle a todo in a pure way', () => {
  //   const todoBefore = {
  //     id: 0,
  //     text: 'Learn Redux',
  //     completed: false
  //   }
  //   const todoAfter = {
  //     id: 0,
  //     text: 'Learn Redux',
  //     completed: true
  //   }

  //   deepFreeze(todoBefore);

  //   expect(toggleTodo(todoBefore)).toEqual(todoAfter);

  // });
});