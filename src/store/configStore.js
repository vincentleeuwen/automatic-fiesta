import { createStore } from 'redux';
import rootReducer from '../reducers';

const store = createStore(rootReducer);
console.log('configuring store...');
console.log(store.getState());

store.dispatch({ type: 'INCREMENT' })

console.log(store.getState());

export default store;
