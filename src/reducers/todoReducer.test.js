import deepFreeze from 'deep-freeze';
import expect from 'expect';
import { toggleTodo } from './todoReducer';

describe('Todo reducer test', () => {
  it('Should toggle a todo in a pure way', () => {
    const todoBefore = {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
    const todoAfter = {
      id: 0,
      text: 'Learn Redux',
      completed: true
    }

    deepFreeze(todoBefore);

    expect(toggleTodo(todoBefore)).toEqual(todoAfter);

  });
});