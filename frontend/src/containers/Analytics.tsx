import React from 'react';
import Chart from '../components/Chart';
import AddPointer from '../components/AddPointer';
import { getAllPoints, addPoints } from '../actions/pointer.action';
import { connect } from 'react-redux';
import { IPointReducer, IAction } from '../reducers/pointer.reducer';
import { Dispatch } from 'redux';

interface IAnalyticsMapStateToProps extends IPointReducer { }

export interface IPointerObj {
  date: string | Date;
  value: number;
}

interface IAnalyticsMapStateToDispatch {
  getPointers: () => void;
  addPointer: (pointerObj: IPointerObj) => void;
}

type AnalyticsProps = IAnalyticsMapStateToProps & IAnalyticsMapStateToDispatch;

class Analytics extends React.Component<AnalyticsProps, {}> {
  componentDidMount() {
    this.props.getPointers();
  }

  addPointer = ({ date, value }: IPointerObj) => {
    this.props.addPointer({ date, value });
  };

  render() {
    const { allPoints, loading } = this.props;
    const width = 1000,
      height = 350;
    if (loading) {
      return <p>Loading Chart...</p>
    }

    return (
      <React.Fragment>
        {(allPoints || []).length > 0 ? <Chart
          chartData={allPoints}
          elementWidth={width}
          elementHeight={height}
        /> : false}
        <AddPointer addPointer={this.addPointer} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: { pointerReducer: IPointReducer }, props: any): IAnalyticsMapStateToProps => {
  return {
    allPoints: state.pointerReducer.allPoints,
    loading: state.pointerReducer.loading,
    error: state.pointerReducer.error,
  };
};

const mapStateToDispatch = (dispatch: Dispatch): IAnalyticsMapStateToDispatch => {
  return {
    getPointers: () => {
      getAllPoints().then((action: IAction) => dispatch(action));
    },
    addPointer: (pointerObj: IPointerObj) => {
      addPoints(pointerObj).then((action: IAction) => dispatch(action));
    },
  };
};

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(Analytics);
