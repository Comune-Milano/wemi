import React from 'react'

import {Accordion} from "../common/components";
import Body from "./AccordionBody"


const PersonaleInterno = ({Form, SetForm, Modifica})=>{
    return(
        <Accordion
            titolo = "Personale interno impiegato"
            Body = {Body}
            Form = {Form}
            SetForm = {SetForm}
            Modifica = {Modifica}
        >    
        </Accordion>
    )
}

PersonaleInterno.displayName = "Accordion Personale Interno"

export default PersonaleInterno