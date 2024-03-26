import React from 'react'
import Input from 'components/ui2/Input'

const Descrizione = ({ Value }) => {

    return (
        <Input
            label="Descrizione"
            readOnly={true}
            inputValue={Value}
            colorReadOnly="blue"
        />
    )
}


export default Descrizione