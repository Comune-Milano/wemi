import React from 'react'

import {Accordion} from "../common/components";
import Body from "./AccordionBody"


const Prezzo = ({Form, SetForm, Modifica})=>{
    return(
        <Accordion
            titolo = "Prezzo"
            Body = {Body}
            Form ={Form}
            SetForm = {SetForm}
            Modifica = {Modifica}
        >    
        </Accordion>
    )
}

Prezzo.displayName = "Accordion Prezzo"

export default Prezzo