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
    const { value, date } = this.state;
    return (
      <div className="column-12">
        <div className="column-12">
          <label className="column-6">DATE</label>
          <DateTimePicker className="" onChange={this.onChange} value={date} />
        </div>
        <div className="column-12">
          <label className="column-6">VALUE</label>
          <input type="text" className='pointerValue' onChange={this.chageValue} value={value} />
        </div>
        <div className="column-12">
          <button type="submit" className="btn btn-primary column-2" onClick={this.submitPointer}>
            Submit
        </button>
        </div>
      </div>
    );
  }
}
