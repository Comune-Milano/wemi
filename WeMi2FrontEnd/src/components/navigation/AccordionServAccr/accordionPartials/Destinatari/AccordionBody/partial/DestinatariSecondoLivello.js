import React from 'react'
import MultiSelect from 'components/ui/MultiSelect'

const DestinatariSecondoLivello = ({Value, UpdateValue, Modifica})=>{
    
    return(
        <MultiSelect
            disabled = {!Modifica.campi}
            material
            color="blue"
            name="Target associato di secondo livello"
            items={Modifica.campi ? Value.listaCompleta: []}
            intlFormatter
            intlPlaceholder="Destinatari"
            selectedArrDefault={Value.listaSelezionata}
            getValue={Modifica.campi ? UpdateValue: () => {}}
        />
    )
}


DestinatariSecondoLivello.displayName ='Body destinatari sezione destinatari secondo livello'

export default DestinatariSecondoLivello