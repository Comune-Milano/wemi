import React from 'react';
import Input from 'components/ui2/Input';

const Mail = ({ Value }) => {

    return (
        <Input
            color="blue"
            inputValue={Value}
            label="Mail"
            readOnly={true}
            colorReadOnly="blue"
        />
    )
}

export default Mail