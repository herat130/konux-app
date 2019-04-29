import { fetchWrapper } from '../utils/fetchWrapper';
import {
  LOCATION_API,
  FETCH_POINTS_FAIL,
  FETCH_POINTS_SUCCESS,
  ADD_POINTS_SUCCESS,
  STATUS_MSG_ENUM,
  FETCH_POINTS_START,
} from '../utils/constant';
import * as toastr from 'toastr';
import { IPointerObj } from '../containers/Analytics';
import { IPoints, IAction } from '../reducers/pointer.reducer';

interface IResult {
  data: IPoints[];
  status: string;
}

export const getAllPoints = (): Promise<any> => {
  return fetchWrapper(`${LOCATION_API}/fetch`)
    .then((result: IResult) => {
      return responseSuccess(result.data);
    })
    .catch((err: any) => {
      return responseFail();
    });
};

export const addPoints = (pointerObj: IPointerObj): Promise<any> => {
  return fetchWrapper(`${LOCATION_API}/add`, 'post', pointerObj)
    .then((result: IResult) => {
      if (chkAndDisplayMsg(result.status, 'add')) {
        return addSuccess(pointerObj);
      } else {
        return responseFail();
      }
    })
    .catch((error: any) => {
      toastr.warning(STATUS_MSG_ENUM.SERVER_ERROR, 'Error');
      return responseFail();
    });
};

const chkAndDisplayMsg = (status: string, operation = 'add') => {
  if (status === 'SUCCESS') {
    toastr.success(`${STATUS_MSG_ENUM[status]} ${operation}`, 'Success');
    return true;
  } else {
    // toastr.error(`${STATUS_MSG_ENUM[status]}`, 'Error');
    return false;
  }
};

const addSuccess = (pointerObj: IPointerObj) => {
  return {
    type: ADD_POINTS_SUCCESS,
    payload: { x: pointerObj.date, y: pointerObj.value },
  };
};

const responseSuccess = (result: IPoints[]) => {
  return {
    type: FETCH_POINTS_SUCCESS,
    payload: { result },
  };
};

const responseFail = () => {
  return {
    type: FETCH_POINTS_FAIL,
  };
};

export const fetchStart = () => {
  return {
    type: FETCH_POINTS_START,
  };
};
