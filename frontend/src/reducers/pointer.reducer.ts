import {
  FETCH_POINTS_START,
  FETCH_POINTS_FAIL,
  FETCH_POINTS_SUCCESS,
  ADD_POINTS_SUCCESS,
} from '../utils/constant';

export interface IPoints {
  x: string | Date | null;
  y: number;
}

export interface IPointReducer {
  loading: boolean;
  error: boolean;
  allPoints: IPoints[];
}

export const initialState: IPointReducer = {
  loading: false,
  error: false,
  allPoints: [],
};

export interface IAction {
  type: string;
  payload?: any;
}

export default function (state: IPointReducer = initialState, action: IAction): IPointReducer {
  switch (action.type) {
    case FETCH_POINTS_START:
      return { ...state, loading: true };
    case FETCH_POINTS_SUCCESS:
      return { ...state, allPoints: [...action.payload.result], loading: false, error: false };
    case ADD_POINTS_SUCCESS:
      const { x, y }: IPoints = { ...action.payload };
      return { ...state, allPoints: [...state.allPoints, { x, y }], loading: false, error: false };
    case FETCH_POINTS_FAIL:
      return { ...state, error: true, loading: false };
    default:
      return state;
  }
}
