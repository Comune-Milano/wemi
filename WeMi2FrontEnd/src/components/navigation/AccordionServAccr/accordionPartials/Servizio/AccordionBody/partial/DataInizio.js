import React from 'react'

import DatePicker from 'components/ui2/DatePicker';
import { Row, Column } from 'components/ui/Grid';
import InputDayPicker from 'components/ui/InputDayPicker'
import Input from 'components/ui/Input'


const DataInizio = ({Value, UpdateValue, Modifica})=>{
    

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
                onChange={(date)=>handleDayChange(date)}
                label="Data inizio validità"
            />
            </Column>
            :
            <Input
                material
                label = "Data inizio validità"
                inputValue = {Value}
                color = "blue"
                readonly
            ></Input>
        }
        </>
    )
}


export default DataInizio