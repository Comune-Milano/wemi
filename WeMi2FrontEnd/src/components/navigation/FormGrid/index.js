/** @format */

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';
import DatePicker from 'components/ui/InputDayPicker';


const FormRow = styled(Row)``;

const FormGrid = ({ inputGridArray, getValue }) => {
  
  useEffect(()=> {

  }, [inputGridArray])


  return(
  <FormRow fluid>
    {inputGridArray.map((input,index) => {
      if (input.select)
        return (
          <Column xs={input.xs} sm={input.sm} md={input.md} lg={input.lg} padding={input.padding} key={index}>
            <Select 
              material 
              name={input.id}
              items={input.select}
              reset={input.reset}
              selectedValue={input.initialValue}
              required={input.required} 
              getValue={input.getValue.bind(this)} 
              intlLabel={input.placeholder} 
              intlPlaceholder={input.placeholder} />
          </Column>
        )
      else if (input.date)
        return (
          <Column xs={input.xs} sm={input.sm} md={input.md} lg={input.lg} padding={input.padding} key={index}>
            <DatePicker
              switchYear={input.switchYear}
              label={input.placeholder}
              selectedDay={input.initialValue}
              material
              required
              handleDayChange={input.getValue.bind(this)}
            />
          </Column>
        )
        else if (input.empty)
        return (
          <Column xs={input.xs} sm={input.sm} md={input.md} lg={input.lg} padding={input.padding} key={index} />
        )
      else return (
        <Column xs={input.xs} sm={input.sm} md={input.md} lg={input.lg} padding={input.padding} key={index}>
          <Input 
            material 
            id={input.id}
            disabled={input.disabled}
            initialValue={input.initialValue}
            type={input.number ? 'number' : 'text'} 
            min={input.min ? input.min : null} 
            max={input.max ? input.max : null} 
            required={input.required}
            getValue={getValue.bind(this)} 
            intlLabel={input.placeholder} />
        </Column>
      )
    }
    )}
  </FormRow>
)
};

FormGrid.displayName = 'FormGrid';
export default FormGrid;
