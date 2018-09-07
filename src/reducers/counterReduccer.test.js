import expect from 'expect';
import { counter } from './counterReducer';

describe('Counter reducer test', () => {
  it('Should increment', () => {
    expect(counter(0, { type: 'INCREMENT' })).toEqual(1);
  });
  it('Should decrement', () => {
    expect(counter(2, { type: 'DECREMENT' })).toEqual(1);
  });

  it('Should return default state when action unknown', () => {
    expect(counter(0, { type: 'UNKNOWN'})).toEqual(0);
  });

  it('Should initialize state with a counter of zero', () => {
    expect(counter(undefined, {})).toBe(0);
  });
})