import React from 'react'

import {Accordion} from "../common/components";
import Body from "./AccordionBody"


const Ente = ({Form})=>{
    return(
        <Accordion
            titolo = "Ente"
            Body = {Body}
            Form = {Form}
        >    
        </Accordion>
    )
}

Ente.displayName = "Accordion Ente"

export default Ente