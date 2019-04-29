import React, { Component } from 'react';
import * as d3 from 'd3';

import '../assets/styles/linechart.scss';
import { IPoints } from '../reducers/pointer.reducer';
// https://github.com/DylanMoz/dylanmoz.github.io/blob/source/src/pages/trello/TrelloGraph.js

interface ChartDefaultProps {
  margin?: any;
}

interface ISelfChartProps {
  chartData: IPoints[],
  elementHeight: number;
  elementWidth: number;
}

interface IChartState {
  data: IPoints[],
}

type IChartProps = ISelfChartProps & ChartDefaultProps;

class Chart extends Component<IChartProps, IChartState> {

  defaultProps: ChartDefaultProps = {
    margin: { top: 30, right: 50, bottom: 50, left: 50 }
  };
  state = {
    data: [],
  };

  private x: any;
  private y: any;
  private xaxis: React.RefObject<SVGAElement>;
  private yaxis: React.RefObject<SVGAElement>;

  constructor(props: IChartProps) {
    super(props);

    const { elementWidth, elementHeight, margin } = this.props;

    this.x = d3
      .scaleTime()
      .range([0, elementWidth - margin.left - margin.right]);
    this.y = d3
      .scaleLinear()
      .range([elementHeight - margin.top - margin.bottom, 0]);
    this.xaxis = React.createRef();
    this.yaxis = React.createRef();
  }

  componentDidMount() {
    const { chartData } = this.props;
    this.setChartDate(chartData);
  }

  componentWillReceiveProps(nextProps: IChartProps) {
    const { chartData } = nextProps;
    this.setChartDate(chartData);
  }

  setChartDate(chartData: IPoints[]) {
    const parseUTCDate = d3.utcParse('%Y-%m-%dT%H:%M:%S.%L%Z');
    const parseUTCDate2 = d3.utcParse('%Y-%m-%dT%H:%M:%S%Z');
    const formatUTCDate = d3.timeFormat('%Y-%m-%d');
    const parseDate = d3.timeParse('%Y-%m-%d');
    const data = (chartData || []).map((d: IPoints) => {
      const date1: any = parseUTCDate(d.x as string);
      const date2: any = parseUTCDate2(d.x as string);
      return {
        y: +d.y,
        x: parseDate(formatUTCDate(date1 || date2)),
      };
    }).sort((a: IPoints, b: IPoints) => {
      return new Date(a.x as string).getSeconds() - new Date(b.x as string).getSeconds()
    });
    this.x.domain(d3.extent(data, (d: any) => d.x));
    this.y.domain([0, d3.max(data, (d: any) => d.y)]);
    this.setState({ data: data });
  }

  xAxis() {
    return d3.axisBottom(this.x).ticks(5);
  }

  yAxis() {
    return d3.axisLeft(this.y).ticks(5);
  }

  drawXAxis() {
    return d3.select((this.xaxis as any)).call(this.xAxis);
  }

  drawYAxis() {
    return d3.select((this.yaxis as any)).call(this.yAxis);
  }

  get line() {
    return d3
      .line()
      .x((d: any) => this.x(d.x))
      .y((d: any) => this.y(d.y));
  }

  path() {
    const { data } = this.state;
    if (data.length <= 0) {
      return <p>No Path</p>
    }
    return <path className="line" d={this.line(data) as string} />;
  }

  render() {
    const { margin, elementWidth, elementHeight } = this.props;
    const { data } = this.state;
    return (
      <svg width={elementWidth} height={elementHeight}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {this.state.data ? this.path() : null}

          <g
            ref={this.xaxis}
            className="x axis"
            transform={`translate(0, ${elementHeight -
              margin.top -
              margin.bottom})`}>
            {data ? this.drawXAxis() : false}
          </g>

          <g ref={this.yaxis} className="y axis">
            {data ? this.drawYAxis() : false}
          </g>
        </g>
      </svg>
    );
  }
}

export default Chart;
