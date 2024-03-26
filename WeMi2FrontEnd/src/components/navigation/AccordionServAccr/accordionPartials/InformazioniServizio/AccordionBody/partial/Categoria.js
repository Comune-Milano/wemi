import React from 'react'
import Input from 'components/ui2/Input'

const Categoria = ({Value, locale="it"})=>{
    let inputValue = ""
    
    if(Value.length>0 && locale){
        inputValue = Value[0].txTitoloCategoria[locale]
    }
     
    return(
        <Input 
            readOnly
            colorReadOnly="blue"
            label="Categoria accreditamento" 
            inputValue = {inputValue} 
        />
    )
}

export default Categoria