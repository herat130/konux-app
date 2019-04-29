import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { IPoints } from '../reducers/pointer.reducer';

interface ILineHighChartProps {
  chartData: IPoints[];
}

export default class LineHighChart extends React.Component<
  ILineHighChartProps,
  {}
> {
  render() {
    const { chartData } = this.props;
    const data = (chartData || [])
      .map(v => {
        return [new Date(v.x).getTime() || 0, v.y || 0];
      })
      .sort((a, b) => {
        return a[0] - b[0];
      });

    const config: any = {
      rangeSelector: {
        inputEnabled: false,
        selected: 1,
      },
      title: {
        text: 'Demo Cgart',
      },
      navigator: {
        enabled: true,
      },
      tooltip: {
        xDateFormat: '%Y-%m-%d',
      },
      series: [
        {
          name: 'value',
          data: data,
          tooltip: {
            valueDecimals: 2,
          },
        },
      ],
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
