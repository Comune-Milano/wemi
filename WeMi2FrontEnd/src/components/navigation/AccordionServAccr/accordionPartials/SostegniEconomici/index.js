import React from 'react'

import {Accordion} from "../common/components";
import Body from "./AccordionBody"


const SostegniEconomici = ({Form, SetForm, Modifica})=>{
    return(
        <Accordion
            titolo = "Sostegni economici"
            Body = {Body}
            Form = {Form}
            SetForm = {SetForm}
            Modifica = {Modifica}
        >    
        </Accordion>
    )
}

SostegniEconomici.displayName = "Sostegni economici"

export default SostegniEconomici