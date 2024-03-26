/** @format */

import React from 'react';
import DayPickerInput, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Button from 'components/ui/Button';
import styled from 'styled-components';

const MyP = styled.p`
  text-align:center;
`;

export default class InputRangeDayPicker extends React.Component {
  static defaultProps = {
    numberOfMonths: 2,
  };

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    };
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div className="RangeExample">
        <MyP>
          {!from && !to && 'Per favore, inserisci il primo giorno.'}
          {from && !to && "Per favore, inserisci l'ultimo giorno."}
          {from &&
            to &&
            `Selezionato da ${from.toLocaleDateString()} a
                ${to.toLocaleDateString()}`}
          {from && to && (
            <Button link onClick={this.handleResetClick} value="Reset" />
          )}
        </MyP>
        <DayPickerInput
          className="Selectable"
          numberOfMonths={2}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
        />

        <style>
          {`
  .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .Selectable .DayPicker-Day {
    border-radius: 0 !important;
 
  }
  .Selectable .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .Selectable .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
`}
        </style>
      </div>
    );
  }
}
InputRangeDayPicker.displayName = 'InputRangeDayPicker';
