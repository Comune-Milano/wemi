import React from 'react'
import Input from 'components/ui2/Input'

const TempoMassimo = ({Value, UpdateValue, Modifica})=>{
    
    return(
        <Input
            readOnly = {!Modifica.campi}
            color="blue"
            // required
            type="number"
            min={0}
            inputValue={Value}
            label="Tempo massimo di attivazione dalla conferma del servizio in giorni lavorativi"
            onChange={UpdateValue}
        />
    )
}

export default TempoMassimo