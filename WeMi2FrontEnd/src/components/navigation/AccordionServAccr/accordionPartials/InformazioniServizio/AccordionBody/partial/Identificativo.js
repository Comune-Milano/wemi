import React from 'react'
import Input from 'components/ui2/Input'


const Identificativo = ({Value})=>{
    
    return(
        <Input 
            readOnly
            colorReadOnly="blue"
            label="Identificativo" 
            inputValue={Value} 
        />
    )
}


export default Identificativo