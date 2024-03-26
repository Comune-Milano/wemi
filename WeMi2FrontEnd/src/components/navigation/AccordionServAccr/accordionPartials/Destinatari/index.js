import React from 'react'

import {Accordion} from "../common/components";
import Body from "./AccordionBody"


const Destinatari = ({Form, SetForm, Modifica})=>{
    return(
        <Accordion
            titolo = "Destinatari"
            Body = {Body}
            SetForm = {SetForm}
            Form = {Form}
            Modifica = {Modifica}
        >    
        </Accordion>
    )
}

Destinatari.displayName = "Accordion Destinatari"

export default Destinatari
