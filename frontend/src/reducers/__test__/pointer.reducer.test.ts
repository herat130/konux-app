import PointerReducer, { initialState } from '../pointer.reducer';
import { FETCH_POINTS_START, FETCH_POINTS_SUCCESS, FETCH_POINTS_FAIL, ADD_POINTS_SUCCESS } from '../../utils/constant';
import pointerReducer from '../pointer.reducer';
import { pointerData } from '../__mock__/pointerData';

describe('reducer test cases', () => {
  it('check for no action', () => {
    expect(PointerReducer(initialState, { type: '', payload: '' })).toEqual(initialState);
  });
  it('should return loading state on fetch start', () => {
    expect(
      PointerReducer(initialState, {
        type: FETCH_POINTS_START,
      }).loading
    ).toBeTruthy();
  });
  it('should return proper state on fetch success', () => {
    expect(
      pointerReducer(initialState, {
        type: FETCH_POINTS_SUCCESS,
        payload: { result: pointerData },
      }).allPoints
    ).toEqual(pointerData);
    expect(
      pointerReducer(initialState, {
        type: FETCH_POINTS_SUCCESS,
        payload: { result: pointerData },
      }).loading
    ).toBeFalsy();
    expect(
      pointerReducer(initialState, {
        type: FETCH_POINTS_SUCCESS,
        payload: { result: pointerData },
      }).error
    ).toBeFalsy();
  });

  it('should return fail state on fetch fail', () => {
    expect(
      pointerReducer(initialState, {
        type: FETCH_POINTS_FAIL,
      }).error
    ).toBeTruthy();
  });

  it('should return add a point when point post success', () => {
    expect(
      pointerReducer(initialState, {
        type: ADD_POINTS_SUCCESS,
        payload: { x: '', y: 40 },
      }).allPoints
    ).toEqual([{ x: '', y: 40 }, ...initialState.allPoints]);
  });
})