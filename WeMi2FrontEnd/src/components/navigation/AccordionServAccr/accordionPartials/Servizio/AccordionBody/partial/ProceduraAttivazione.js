import React from 'react'

import TextArea from 'components/ui2/TextArea';



const ProceduraAttivazione = ({Value, UpdateValue, Modifica})=>{

    return(
        <TextArea
            material
            readOnly={!Modifica.campi}
            disabled = {!Modifica.campi}
            required
            name="Procedura di Attivazione"
            intlFormatter
            color="blue"
            label="Procedura di Attivazione"
            inputValue = {Value}
            onChange = {UpdateValue}
        />
    )
}





export default ProceduraAttivazione;
