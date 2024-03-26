import React from 'react'

import InputDayPicker from 'components/ui/InputDayPicker'
import Input from 'components/ui/Input'
import DatePicker from 'components/ui2/DatePicker';
import { Row, Column } from 'components/ui/Grid';

const DataFine = ({Value, UpdateValue, Modifica,ValueInizio})=>{


    function handleDayChange(date){
        UpdateValue(date)
    }

    return(
        <>
        {
            Modifica.campi?
            <Column md={6} padding="0.5em 0 0 0" sizepadding={{ md: '0 0.5em 0 0' }}>
            <DatePicker
                required
                selectedDate={Value}
                disabledDays={(date) => {
                    return ValueInizio ? date < ValueInizio : false;
                  }}
                onChange={(date)=>handleDayChange(date)}
                label="Data fine validità"
            />
            </Column>
            :
            <Input
                material
                label = "Data fine validità"
                color = "blue"
                inputValue = {Value}
                readOnly
            ></Input>
        }
        </>
    )
}



export default DataFine