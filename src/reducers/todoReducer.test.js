import deepFreeze from 'deep-freeze';
import expect from 'expect';
import todosReducer from './todoReducer';
import * as actionTypes from '../actions/actionTypes';

describe('Todo reducer test', () => {
  it('Should correctly add todos', () => {
    const stateBefore = {};
    const todo = {
      id: 0,
      text: 'First todo'
    }
    const action = {
      type: 'ADD_TODO',
      todo
    }
    // const stateAfter = [
    //   {
    //     id: 0,
    //     text: 'First todo',
    //     completed: false
    //   }
    // ]
    const stateAfter = {
      todos: [
        {
          id: 0,
          text: 'First todo',
          completed: false
        }
      ],
      visibilityFilter: 'SHOW_ALL'
    }

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(todosReducer(stateBefore, action)).toEqual(stateAfter);
  });

  // NOTE: mind the leading x (currently skipping)
  xit('Should correctly toggle todos', () => {
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