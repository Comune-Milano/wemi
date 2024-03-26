import React from 'react'
import { Row, Column } from 'components/ui/Grid'
import { Calendario, Mail, Telefono, Note } from './partial'

const PrimoContattoBody = ({ Form }) => {

    return (
        <>
            <Row padding="0" fluid>
                <Column xs="6">
                    <Telefono Value={Form.telefono}></Telefono>
                </Column>
                <Column xs="6">
                    <Mail Value={Form.mail}></Mail>
                </Column>
                <Column xs="12">
                    <Calendario Value={Form.calendario}></Calendario>
                </Column>
                <Column lg="12">
                    <Note Value={Form.note_primo_contatto} />
                </Column>
            </Row>
        </>
    )
}

PrimoContattoBody.displayName = "Body primo contatto"


export default PrimoContattoBody