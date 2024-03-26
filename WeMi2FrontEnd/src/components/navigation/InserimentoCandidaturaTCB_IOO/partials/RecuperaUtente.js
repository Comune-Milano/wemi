/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid'
import Button from 'components/ui2/Button';
import Input from 'components/ui2/Input'

const RecuperaUtente = ({
    errors,
    dataset,
    setUtente,
    setFormField,
    touched,
    resetFormFields
}) => {

    const controlloCF = dataset.codicefiscaleRicerca && dataset.codicefiscaleRicerca.trim().length > 0;

    React.useEffect(() => {
        //se user e cf sono stati cancellati cancella gli altri campi
        if (!(controlloCF)) {
            resetFormFields({});
        };
    }, [controlloCF])

    return (
        <>
            <Row fluid>
                <Column xs='3' padding='0 1em 0 0' alignself='flex-end' margin="0">
                <Input
                        onChange={(value) => setFormField('codicefiscaleRicerca', value)}
                        inputValue={dataset.codicefiscaleRicerca}
                        label={"CF"}
                        color="primary"
                    />
                    </Column>
                <Column xs='3' padding='0 1em 0 0' alignself='flex-end' margin="0 0 0 2em">
                    <Button
                        label="RECUPERA DATI UTENTE"
                        onClick={() => setUtente()}
                        disabled={!(controlloCF)}
                    />
                 </Column>
            </Row>
        </>
    )
};

export default (RecuperaUtente);