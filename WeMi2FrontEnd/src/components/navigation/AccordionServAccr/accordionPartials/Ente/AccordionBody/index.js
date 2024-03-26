import React from 'react'

import {Row, Column} from 'components/ui/Grid'
import {Descrizione,Identificativo,Nome} from './partial'

const EnteBody = ({Form})=>{

    return(
        <Row padding="0" fluid display="flex">
            <Column xs="12" sm="6" md="4">
                <Identificativo Value = {Form.idEnte}></Identificativo>
            </Column>
            <Column xs="12" sm="6" md="4">
                <Nome Value = {Form.nome}></Nome>
            </Column>
            <Column xs="12" sm="6" md="4">
                <Descrizione Value = {Form.descrizione}></Descrizione>
            </Column>
        </Row>
    )
}

EnteBody.displayName = "Body informazioni servizio"


export default EnteBody