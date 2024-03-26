import React from 'react'
import Input from 'components/ui2/Input' 

const Esperienza = ({Value, UpdateValue, Modifica,Qualifiche}) => {

    return (
        <Input
            min={1}
            disabled={Qualifiche.length <= 0}
            type="number"
            color="blue"
            readOnly = {!Modifica.campi}
            inputValue={Value}
            label="Numero anni di esperienza"
            onChange={UpdateValue}
            required={Qualifiche.length > 0}
        />
    )
}

export default Esperienza