import { combineReducers } from 'redux';
import { todos, visibilityFilter } from './todoReducer';

const rootReducer = combineReducers({
  todos,
  visibilityFilter
});

export default rootReducer;
