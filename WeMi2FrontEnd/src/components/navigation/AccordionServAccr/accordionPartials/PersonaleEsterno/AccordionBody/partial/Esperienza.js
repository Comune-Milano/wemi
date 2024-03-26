import React from 'react'
import Input from 'components/ui2/Input'

const Esperienza = ({Value, UpdateValue, Modifica})=>{

    return(
        <Input
            min={1}
            disabled={!Value.required}
            type="number"
            color="blue"
            readOnly = {!Modifica.campi}
            inputValue={Value.value}
            label="Numero anni di esperienza"
            onChange={UpdateValue}
            required={Value.required}
        />
    )
}

export default Esperienza