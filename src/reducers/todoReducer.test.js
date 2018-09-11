import deepFreeze from 'deep-freeze';
import expect from 'expect';
import rootReducer from './index';
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

    expect(rootReducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('Should correctly toggle todos', () => {
    const stateBefore = {
      todos: [
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
    }
    const action = {
      type: 'TOGGLE_TODO',
      todo: stateBefore.todos[0]
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
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(rootReducer(stateBefore, action).todos.sort((a, b) =>
      a.id > b.id)).toEqual(stateAfter);
  });

  it('Should update visibility filter', () => {
    const stateBefore = {
      todos: [],
      visibilityFilter: 'SHOW_ALL'
    }
    const action = {
      type: actionTypes.SET_VISIBILITY_FILTER,
      filter: 'SHOW_COMPLETED'
    }
    const stateAfter = {
      todos: [],
      visibilityFilter: 'SHOW_COMPLETED'
    }

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(rootReducer(stateBefore, action)).toEqual(stateAfter);

  });
});