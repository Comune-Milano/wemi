import React from 'react'
import Input from 'components/ui2/Input'

const Nome = ({Value})=>{
    
    return(
        <Input 
            readOnly
            label="Nome chiave" 
            inputValue = {Value} 
            colorReadOnly="blue" 
        />
    )
}


export default Nome