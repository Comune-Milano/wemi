import React from 'react'
import Input from 'components/ui2/Input'

const Nomi = ({ Value, UpdateValue, Modifica }) => {

    return (
        <Input
            color="blue"
            readOnly={!Modifica.campi}
            inputValue={Value.value}
            label="Nomi fornitori"
            onChange={UpdateValue}
            required={Value.required}
        />
    )
}

export default Nomi