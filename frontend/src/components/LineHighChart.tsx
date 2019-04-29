import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { IPoints } from '../reducers/pointer.reducer';

interface ILineHighChartProps {
  chartData: IPoints[]
}

export default class LineHighChart extends React.Component<ILineHighChartProps, {}> {
  componentDidMount() {

  }

  render() {
    const { chartData } = this.props;
    const newData = (chartData || []).map(v => {
      return [new Date(v.x).getTime(), v.y];
    }).sort((a, b) => {
      return a[0] - b[0]
    });
    const data = newData;

    const config: any = {
      rangeSelector: {
        selected: 1
      },
      title: {
        text: 'Demo Cgart'
      },
      series: [{
        name: 'value',
        data: data,
        tooltip: {
          valueDecimals: 2
        }
      }]
    };
    return (
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={config}
      />
    );
  }
}