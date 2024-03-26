import React from 'react'
import Input from 'components/ui2/Input'

const Identificativo = ({Value})=>{
    
    return(
        <Input 
            readOnly
            label="Identificativo" 
            inputValue={Value} 
            colorReadOnly="blue"
        />
    )
}


export default Identificativo