import * as fetchHelper from '../../utils/fetchWrapper';
import { pointerData } from '../../reducers/__mock__/pointerData';
import { FETCH_POINTS_SUCCESS, FETCH_POINTS_FAIL, ADD_POINTS_SUCCESS } from '../../utils/constant';
import { getAllPoints, addPoints, responseSuccess } from '../pointer.action';
import { IPoints } from '../../reducers/pointer.reducer';

describe('action test cases', () => {

  it('[integration test] fetch promise success and fail', () => {
    const url = '_url';
    const spy = jest
      .spyOn(fetchHelper, 'fetchWrapper')
      .mockImplementationOnce(_url => {
        return new Promise(resolve => resolve({ data: pointerData }));
      })
      .mockImplementationOnce(_url => {
        return new Promise((resolve, reject) => reject());
      });
    getAllPoints().then(v => {
      expect(v).toEqual({
        type: FETCH_POINTS_SUCCESS,
        payload: { result: pointerData },
      });
    });
    getAllPoints().then(v => {
      expect(v).toEqual({
        type: FETCH_POINTS_FAIL,
      });
    });
    getAllPoints();
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });

  it('add Pointer API test case', () => {
    const url = '_url';
    const spy = jest
      .spyOn(fetchHelper, 'fetchWrapper')
      .mockImplementationOnce(_url => {
        return new Promise(resolve => resolve({ data: pointerData,status:'SUCCESS' }));
      })
      .mockImplementationOnce(_url => {
        return new Promise((resolve, reject) => reject());
      });
    addPoints({ date: '', value: 20 }).then(v => {
      expect(v).toEqual({
        type: ADD_POINTS_SUCCESS,
        payload: { x: '', y: 20 }
      })
    });
    addPoints({ date: '', value: 20 }).then(v => {
      expect(v).toEqual({
        type: FETCH_POINTS_FAIL
      })
    });
  });

  it('unit test : response success Action creator test', () => {
    const allPoints: IPoints[] = [{ x: '', y: 10 }, { x: '', y: 10 }];
    expect(responseSuccess(allPoints)).toEqual({
      type: FETCH_POINTS_SUCCESS,
      payload: { result: allPoints }
    });
  });

});