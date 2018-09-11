import deepFreeze from 'deep-freeze';
import expect from 'expect';
import todosReducer from './todoReducer';

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

    expect(todosReducer(action, stateBefore)).toEqual(stateAfter);
  });

  it('Should correctly toggle todos', () => {
    const stateBefore = [
      {
        id: 0,
        text: 'Learn Redux',
        completed: false
      },
      {
        id: 1,
        text: 'Go Shopping',
        completed: true
      }
    ]
    const action = {
      type: 'TOGGLE_TODO',
      todo: stateBefore[0]
    }
    const stateAfter = [
      {
        id: 0,
        text: 'Learn Redux',
        completed: true
      },
      {
        id: 1,
        text: 'Go Shopping',
        completed: true
      }
    ]
    
    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(todosReducer(action, stateBefore).sort((a, b) =>
      a.id > b.id)).toEqual(stateAfter);

  });
});