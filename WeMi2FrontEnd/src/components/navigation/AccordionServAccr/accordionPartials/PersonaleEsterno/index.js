import React from 'react'

import {Accordion} from "../common/components";
import Body from "./AccordionBody"


const PersonaleEsterno = ({Form, SetForm, Modifica})=>{
    return(
        <Accordion
            titolo = "Personale esterno impiegato"
            Body = {Body}
            Form = {Form}
            SetForm = {SetForm}
            Modifica = {Modifica}
        >    
        </Accordion>
    )
}

PersonaleEsterno.displayName = "Accordion Personale Esterno"

export default PersonaleEsterno