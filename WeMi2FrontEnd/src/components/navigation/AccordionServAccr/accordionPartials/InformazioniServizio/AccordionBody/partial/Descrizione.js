import React from 'react'
import Input from 'components/ui2/Input'


const Descrizione = ({Value})=>{
    
    return(
        <Input 
            readOnly 
            colorReadOnly="blue"
            label="Descrizione" 
            inputValue = {Value} 
        />
    )
}



export default Descrizione