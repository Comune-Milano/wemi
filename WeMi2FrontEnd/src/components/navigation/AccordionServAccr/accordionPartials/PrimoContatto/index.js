import React from 'react'

import {Accordion} from "../common/components";
import Body from "./AccordionBody"


const PrimoContatto = ({Form})=>{
    return(
        <Accordion
            titolo = "Primo Contatto"
            Body = {Body}
            Form = {Form}
        >    
        </Accordion>
    )
}

PrimoContatto.displayName = "Accordion Primo Contatto"

export default PrimoContatto