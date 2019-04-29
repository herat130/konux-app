import { combineReducers } from 'redux';
import pointerReducer, { IPointReducer } from './pointer.reducer';
import { Reducer } from 'redux';

export const allReducers = combineReducers({
  pointerReducer: pointerReducer as Reducer<IPointReducer>,
});
