/** @format */

import React, { useState, useEffect } from 'react';
import { Row, Column } from 'components/ui/Grid'
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { connect } from 'react-redux';
import Button from 'components/ui2/Button';
import Tooltip from 'components/ui2/Tooltip';
import Input from 'components/ui2/Input';



const RecuperaUtente = ({ loaded, errors, isCfRicercaValorizzato, setrisultato, Risultato, locale, dataset, setUtente, setFormField, touched, handleFieldBlur }) => {


    const errore = "Nessun utente trovato o alcuni dati sono incompleti"

    const onChangeCf = (value) => {
        if (!(value.trim().length > 0)) {
            setrisultato(undefined)
        }
        setFormField('cfRicerca', value)
    }

    return (
        <>
            <Row fluid>
                <Input
                    onChange={onChangeCf}
                    inputValue={dataset.cfRicerca}
                    error={touched.cfRicerca && isCfRicercaValorizzato && Risultato === null ? errore : null}
                    onBlur={() => { handleFieldBlur('cfRicerca') }}
                    label={"CF"}
                    color="primary"
                />

                <Column xs='3' padding='0 1em 0 0' alignself='flex-end' margin="0 2em">
                    <Tooltip
                        position="bottom"
                        color="white"
                        bgcolor="blue"
                        value="Per recuperare i dati del cittadino inserire un codice utente o un codice fiscale"
                        posAdjustment="0%"
                        preventOnHover={isCfRicercaValorizzato}
                    >
                        <Button
                            label="RECUPERA DATI UTENTE"
                            onClick={() => {
                                ((dataset.cfRicerca !== null) && (isCfRicercaValorizzato) || (Risultato !== undefined)
                                    || (Risultato && Risultato.nome == null && Risultato.cognome == null
                                        && Risultato.ptx_codice_fiscale === null && Risultato.ptx_email === null)) &&
                                    setUtente();
                            }}
                            disabled={!isCfRicercaValorizzato || errors.cfRicerca}
                        />
                    </Tooltip>
                </Column>
            </Row>
            <Row fluid>
                <Column xs='3' padding='0 1em 0 0' alignself='flex-end'>
                </Column>
            </Row>
        </>
    )
};
const mapStoreToProps = store => ({
    locale: store.locale,
    loaded: store.graphql.loaded,
});
const mapDispatchToProps = ({
    graphqlRequest
})
export default connect(mapStoreToProps, mapDispatchToProps)(RecuperaUtente);