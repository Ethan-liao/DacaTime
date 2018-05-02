import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import moment from 'moment';
import 'react-day-picker/lib/style.css';

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, 0);

function YearMonthForm({ date, localeUtils, onChange }) {
  const months = localeUtils.getMonths();

  const years = [];
  for (
    let i = fromMonth.getFullYear();
    i >= fromMonth.getFullYear() - 30;
    i -= 1
  ) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <form className="DayPicker-Caption" style={{ height: '2rem' }}>
      <select
        name="month"
        onChange={handleChange}
        value={date.getMonth()}
        className="date-select"
      >
        {months.map((month, i) =>
          <option key={i} value={i}>
            {month}
          </option>,
        )}
      </select>
      <select
        name="year"
        onChange={handleChange}
        value={date.getFullYear()}
        className="date-select"
      >
        {years.map((year, i) =>
          <option key={i} value={year}>
            {year}
          </option>,
        )}
      </select>
    </form>
  );
}

export default class EvidenceRangePicker extends Component {
  state = {
    range: {
      from: null,
      to: null,
    },
    month: fromMonth,
  };

  handleDayClick = day => {
    const range = DateUtils.addDayToRange(day, this.state.range);
    this.setState({ range });
  };

  handleResetClick = e => {
    e.preventDefault();
    this.setState({
      from: null,
      to: null,
    });
  };

  handleYearMonthChange = month => {
    this.setState({ month });
  };

  render() {
    const { from, to } = this.state.range;
    return (
      <div className="RangeExample">
        {!from &&
          !to &&
          <p>
            Please select the <strong>first day</strong> covered by the current
            document.
          </p>}
        {from &&
          !to &&
          <p>
            Please select the <strong>last day</strong> covered by the current
            document.
          </p>}
        {from &&
          to &&
          <p>
            The current piece of evidence accounts for the period from{' '}
            {moment(from).format('L')} to {moment(to).format('L')}
            .{' '}
            <a href="." onClick={this.handleResetClick}>
              Reset
            </a>
          </p>}
        <DayPicker
          numberOfMonths={1}
          month={this.state.month}
          selectedDays={[from, { from, to }]}
          onDayClick={this.handleDayClick}
          captionElement={
            <YearMonthForm onChange={this.handleYearMonthChange} />
          }
          fixedWeeks
        />
      </div>
    );
  }
}
