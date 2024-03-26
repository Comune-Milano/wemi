import React from 'react'

import {Accordion} from "../common/components";
import Body from "./AccordionBody"


const InformazioniServizio = ({Form})=>{
    return(
        <Accordion
            titolo = "Informazioni Servizio"
            Body = {Body}
            Form = {Form}
        >    
        </Accordion>
    )
}

InformazioniServizio.displayName = "Accordion Informazioni Servizio"

export default InformazioniServizio