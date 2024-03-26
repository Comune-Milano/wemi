import React from 'react'
import Input from 'components/ui2/Input'

const Telefono = ({ Value }) => {

    return (
        <Input
            color="blue"
            inputValue={Value}
            label="Telefono"
            readOnly={true}
            colorReadOnly="blue"
        />
    )
}

export default Telefono