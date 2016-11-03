import { applyMiddleware, compose, createStore } from 'redux';
import { reducer } from './reducers';
import logger from 'redux-logger';

const finalcreateStore = compose(
  applyMiddleware(logger())
)(createStore);


const defaultState = {
  rootTitles: [],
  toExport : {},
  allSelected: false
}


export default function configureStore(initialState = defaultState) {
  return finalcreateStore(reducer, initialState);
}