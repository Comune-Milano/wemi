import React from 'react'
import Text from 'components/ui/Text' 
import FaIcon from 'components/ui/FaIcon'
import {Row} from 'components/ui/Grid'

const AggiungiServizio = ({Callback})=>{
    return(
        <Row alignitems="center">
          <FaIcon icon="\f067"
            radius="50%"
            noShadow
            width="2em"
            height="2em"
            bgcolor="blue"
            fontSize="f6"
            padding="0.5em"
            color="white"
            onClick={Callback}
          />
          <Text value="Aggiungi nuovo servizio" size="f7" padding="0 0 0 1.2em"
            onClick={Callback} />
      </Row>
    )
}

export default AggiungiServizio