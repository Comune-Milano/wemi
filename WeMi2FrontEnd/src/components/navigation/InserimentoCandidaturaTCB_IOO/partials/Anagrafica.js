/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid'
import Text from 'components/ui/Text';
import Input from 'components/ui2/Input'
import styled from 'styled-components';

const Mydiv = styled.div`
width: 18%;
background-color: #eee;
color: #eee;
margin-top:0.5em;
margin-bottom:0.5em;
padding:1em;
`

const Anagrafica = ({
    Risultato,
    setFormField,
    errors,
    dataset,
    handleFieldBlur,
    touched 
}) => {

    return (
        <>
            <Row fluid>
                <Mydiv>
                    <Text size="f6" color="primary" weight="bold" value="Anagrafica cittadino" />
                </Mydiv>
            </Row>
            <Row fluid >
                <Column xs='3' padding='0 1em 0 0' alignself='flex-end'>
                    <Input
                        onChange={(value) => { setFormField('nome', value) }}
                        inputValue={dataset.nome}
                        error={touched.nome ? errors.nome : null}
                        onBlur={() => { handleFieldBlur('nome') }}
                        label="Nome"
                        color="primary"
                        required
                        readOnly
                    />
                </Column>
                <Column xs='3' padding='0 1em 0 0' alignself='flex-end' margin="0 0 0 2em">
                    <Input
                        onChange={(value) => { setFormField('cognome', value) }}
                        inputValue={dataset.cognome}
                        error={touched.cognome ? errors.cognome : null}
                        onBlur={() => { handleFieldBlur('cognome') }}
                        label="Cognome"
                        color="primary"
                        required
                        readOnly
                    />
                </Column>
            </Row>
            <Row fluid margin="1em 0 0 0">
                <Column xs='3' padding='0 1em 0 0' alignself='flex-end' >
                    <Input
                        name={'codicefiscale'}
                        onChange={(value) => { setFormField('codicefiscale', value) }}
                        inputValue={dataset.codicefiscale}
                        error={touched.codicefiscale ? errors.codicefiscale : null}
                        onBlur={() => { handleFieldBlur('codicefiscale') }}
                        label="CF"
                        color="primary"
                        required
                        readOnly
                    />

                </Column>
                <Column xs='3' padding='0 1em 0 0' alignself='flex-end' margin="0 0 0 2em">
                    <Input
                        onChange={(value) => { setFormField('email', value) }}
                        inputValue={dataset.email}
                        error={touched.email ? errors.email : null}
                        onBlur={() => { handleFieldBlur('email') }}
                        label="email"
                        color="primary"
                        readOnly
                    />
                </Column>
            </Row>
        </>
    )
}

export default (Anagrafica);