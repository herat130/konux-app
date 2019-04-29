import React, { FormEvent } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { IPointerObj } from '../containers/Analytics';
import toastr from 'toastr';

interface IAddPointerProps {
  addPointer: (pointerObj: IPointerObj) => void;
}

interface IAddPointerState {
  date: string | Date;
  value: Number;
}

export default class AddPointer extends React.Component<IAddPointerProps, IAddPointerState> {
  state = {
    date: new Date(),
    value: 0,
  };

  onChange = (date: string | Date) => this.setState({ date });

  chageValue = (event: FormEvent<HTMLInputElement>) => {
    this.setState({
      value: Number(event.currentTarget.value),
    });
  };

  submitPointer = () => {
    const { date, value } = this.state;
    if (isNaN(value || 0)) {
      toastr.warning("Please enter a valid number", "Warning");
      return false;
    }
    this.props.addPointer({ date: new Date(date).toISOString(), value: Number(value || 0) });
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <DateTimePicker onChange={this.onChange} value={this.state.date} />
        <input type="text" onChange={this.chageValue} value={value} />
        <button type="submit" onClick={this.submitPointer}>
          Submit
        </button>
      </div>
    );
  }
}
