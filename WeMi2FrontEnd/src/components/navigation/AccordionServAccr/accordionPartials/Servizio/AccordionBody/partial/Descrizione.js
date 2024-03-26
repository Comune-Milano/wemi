import React from 'react'

import Input from 'components/ui/Input'


const Descrizione = ({Value, UpdateValue, Modifica})=>{


    return(
        <Input
            material
            readonly = {!Modifica.campi}
            name="Descrizione servizio"
            intlFormatter
            color="blue"
            inputValue={Value}
            intlLabel="Descrizione servizio"
            required={true}
            getValue={UpdateValue}
        />
          
    )
}



export default Descrizione