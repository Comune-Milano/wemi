/** @format */

import React, { useState, useEffect } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import FaIcon from 'components/ui/FaIcon';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import styled from 'styled-components';
import { colors } from 'theme';
import Input from 'components/ui/Input';
import {Row, Column} from 'components/ui/Grid';
import Select from 'components/ui/Select';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { isNullOrUndefined } from 'util';


const ResetIcon = styled(FaIcon)`
      position: absolute;
      right: 11%;   
      top: calc((100% - 0.5em)/4);
      z-index: 1;
      font-size: 1.2em;
      color: ${colors.darkGrey};
      &:hover {
        color: ${colors.red}
      }
      animation-name: fadeIn,
      animation-duration: .5s
`



const StyledDayPickerInput = styled(DayPickerInput)`
background-color: red;
>div {
    width: 100%!important
}
    `;

const StyledOverlay = styled.div`
  width: auto;
  position: relative
  display: flex;
  justify-content: right;
  @keyframse fadeIn {
    0% {opacity: 0};
    100% {opacity: 1}
  }
  animation-name: fadeIn;
  animation-duration: 0.2s;
  outline: none ;
  background: ${({ theme }) => theme.colors.white};
  transition: all .2s ease-in-out;
  * {
  transition: all .2s ease-in-out;

  }
  button {
    &.DayPicker-TodayButton {
      color: ${props => props.color ? colors[props.colors] : colors.primary};
      font-weight:  ${({ theme }) => theme.fonts.weight.bold};
      &:focus {
        outline: none ;}
    }
    }
  }
 
  div {
    &.DayPicker {
      position: absolute;
      border-radius: 0;
      left: 0;
      z-index: 2;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
      background-color: ${({ theme }) => theme.colors.white};
    };
    &.DayPicker-wrapper {
      outline: none ;
      &:focus {
      outline: none ;}
    };

    &.DayPicker-Footer {
      text-align: center;
    };

    &.DayPicker-Day {
      &:hover {
        background-color: ${({ theme }) => theme.colors.grey} !important;
      };
      &--selected {
        background-color: ${props => props.color ? colors[props.colors] : colors.primary};
      };
      &:focus {
        background-color: ${props => props.color ? colors[props.colors] : colors.primary};
        color: ${({ theme }) => theme.colors.white} ;
      }
      &--disabled{
        &:hover{
          background-color: transparent !important;
        }
        &:focus{
          background-color: ${({ theme }) => theme.colors.white} !important;
          color: #DCE0E0 !important
        }
      }
     
     


    }
  }
  span {
    &.DayPicker-NavButton {
      &:focus {
        outline: none ;}
    }
  }
 

`;



const months =['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre' ]

const convertMonthToText = (value) => {
  let monthValue = months.map((el, i) => {return months[value]})[0];
  return monthValue
}

const YearMonthForm = ({ date, arrowDate, setArrowDate, localeUtils, handleMonthChange, handleYearChange, selectedMonth, selectedYear, fromYear, toYear }) => {
  useEffect(() => {
    setArrowDate.bind(this)
    setArrowDate(date)
    if(date !== arrowDate)
     getMonth({id: date, value: convertMonthToText(date)})
  }, [date !== arrowDate])

  const getMonth = value => {
    setArrowDate.bind(this)
    setArrowDate(date)
    handleMonthChange.bind(this);
    handleMonthChange(value)
  }
  const getYear = value => {
    handleYearChange.bind(this);
    handleYearChange(value)
  }

  const years = [];
  for (let i = fromYear.getFullYear(); i <= toYear.getFullYear(); i += 1) {
    years.push(i);
  }
  const monthsArr = months && months.map((month, i) => {
    return {
      value: i,
      textValue: month
    }
  })
  const yearArr = years && years.map((year, i) => {
    return {
      value: year,
      textValue: year
    }
  })


  return (
     <div className="DayPicker-Caption">
       <Row fluid justifycontent="space-between" margin="2em 0 0" >
       <Column xs="12" md="7" padding="0 0 .5em">
       <Select name="month" getValue={getMonth} selectedValue={selectedMonth} items={monthsArr} />
       </Column>
       <Column xs="12" md="4" padding="0 0 .5em">
       <Select name="year" getValue={getYear} selectedValue={selectedYear} items={yearArr} />
       </Column>
       </Row>
      
      {/* <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select> */}
    </div>
  );
}

const CustomDayPickerInput = React.forwardRef(({
  inputValue,
  material,
  required,
  noLabel,
  color,
  label,
  placeholder,
  setReset,
  handleDayChange,
  ...rest
}, ref) => (
  <Input
    readonly="true"
    pointer
    initialValue={inputValue}
    width="100%" 
    material={material}
    required={required}
    noLabel={noLabel}
    color={color}
    intlLabel={label ? label : placeholder}  
    intlPlaceholder={rest.placeholder}
    ref={ref}
    {...rest}
  >
    <ResetIcon
      noShadow
      icon="\f00d"
      onClick={(e) => { setReset(true); handleDayChange.bind(this);
        handleDayChange(-1); e.stopPropagation();}
      }
    />
  </Input>
));




const DatePicker = ({ handleDayChange, required, switchYear, placeholder, label, material, noLabel, disableDays, selectedDay, noPlace, color }) => {
  const currentYear = new Date().getFullYear();
  const fromYear = new Date(1920, 0);
  const toYear = switchYear ? new Date(currentYear, 1) : new Date(currentYear + 10, 11);

  let inputValue = '';
  const [selectedDate, setSelectedDate] = useState(fromYear);
  const [selectedMonth, setSelectedMonth] = useState({id: new Date().getMonth(), value: convertMonthToText(new Date().getMonth()) });
  const [selectedYear, setSelectedYear] = useState({id: new Date().getFullYear(), value: `${new Date().getFullYear()}`})
  const [arrowDate, setArrowDate] = useState(selectedMonth.id)

  const [reset,setReset]=useState(false);

  
  const getDate = day => {
    
    setReset.bind(this);
    setReset(false)
    handleDayChange.bind(this);
    handleDayChange(day);
    let year = day.toJSON().split('T')[0].split('-')[0];
    let month = day.toJSON().split('T')[0].split('-')[1].split('-')[0];
    let dayValue = day.toJSON().split('T')[0].split('-')[2];
    inputValue = `${dayValue}/${month}/${year}`;
  };

  const parseDate = (str, format, locale) => {

    // giorno/mese/anno
    const [ giorno, mese, anno ] = str.split('/');
    const wrappedDate = new Date(anno, mese-1, giorno);

    const parsed = dateFnsParse(wrappedDate, format, { locale });
    if (DateUtils.isDate(parsed)) {
      return parsed;
    }
    return undefined;
  }

  const formatDate = (date, format, locale) => {
    return dateFnsFormat(date, format, { locale });
  }


  const handleYearMonthChange = (year, month) => {
    let nuovaData = new Date(year, month)
    setSelectedDate(nuovaData);
  }

  
  const handleYearChange = (value) => {
    setSelectedYear(value)
    handleYearMonthChange(value.id, selectedMonth.id)
  };

  const handleMonthChange = (value) => {
    setSelectedMonth(value)
    handleYearMonthChange(selectedYear.id, value.id)
  };

  const FORMAT = 'DD/MM/YYYY';
  return (
    <>
    <StyledDayPickerInput
      color={color}
      id="dayPicker"
      onDayChange={getDate.bind(this)}
      formatDate={formatDate}
      format={FORMAT}
      parseDate={parseDate}
      placeholder={!reset && selectedDay ? `${dateFnsFormat(selectedDay, FORMAT)}` : placeholder ? placeholder : 'DD/MM/YYYY' }
     // classNames="container overlayWrapper overlay"
//       component={props => (<>
//         <Input readonly="true" pointer initialValue={inputValue} width="100%" 
//         material={material} required={required} noLabel={noLabel} color={color} intlLabel={label ? label : placeholder}  
//         intlPlaceholder={props.placeholder} {...props} >
// <ResetIcon noShadow icon="\f00d"
//           onClick={(e) => { setReset(true); handleDayChange.bind(this);
//             handleDayChange(-1); e.stopPropagation();}}/>
//            </Input>
         
        
//          </>
//       )}
      component={React.forwardRef((props, ref) => (
        <CustomDayPickerInput
          readonly="true"
          pointer
          initialValue={inputValue}
          width="100%" 
          material={material}
          required={required}
          noLabel={noLabel}
          color={color}
          intlLabel={label ? label : placeholder}  
          intlPlaceholder={props.placeholder}
          setReset={setReset}
          handleDayChange={handleDayChange}
          ref={ref}
          {...props}
        />
      ))}
      overlayComponent={StyledOverlay}
      dayPickerProps={
        disableDays ? {
          disabledDays: day => day < (new Date()),
          showWeekNumbers: true,
          todayButton: 'Oggi',
          fixedWeeks: true,
          canChangeMonth: true,
           month: selectedDate,
          fromYear: fromYear,
          toYear: toYear,
          captionElement: ({ date, localeUtils }) => (
            <YearMonthForm
              date={date.getMonth()}
              arrowDate={arrowDate}
              setArrowDate={setArrowDate}
              localeUtils={localeUtils}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              fromYear={fromYear} toYear={toYear}
              handleYearChange={handleYearChange}
              handleMonthChange={handleMonthChange}
            />
            )
        } : 
          {
            showWeekNumbers: true,
            todayButton: 'Oggi',
            fixedWeeks: true,
            canChangeMonth: true,
            month:selectedDate,
            fromYear: fromYear,
            toYear: toYear,
            captionElement: ({ date, localeUtils }) => (
              <YearMonthForm
                date={date.getMonth()}
                arrowDate={arrowDate}
                setArrowDate={setArrowDate}
                localeUtils={localeUtils}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                fromYear={fromYear} toYear={toYear}
                handleYearChange={handleYearChange}
                handleMonthChange={handleMonthChange}
              />
              )
          } 
        }
    />
  </>
  );
};

DatePicker.displayName = 'DatePicker';
export default DatePicker;
