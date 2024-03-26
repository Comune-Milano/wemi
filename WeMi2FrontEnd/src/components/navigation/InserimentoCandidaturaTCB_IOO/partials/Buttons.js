/** @format */

import React, { useState, useEffect } from 'react';
import { Row, Column } from 'components/ui/Grid'
import { PAGE_CANDIDATURA_IMPERSONIFICAZIONE_TCB_ADMIN_URL } from 'types/url';
import Button from 'components/ui2/Button';
import { withRouter, generatePath } from 'react-router-dom';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { inizializzaUtenteLavImpersonificazione as inizializzaUtenteLavImpersonificazioneQ } from './inserimentoCandGraphQl';
import ModaleUtenteLavoratore from './ModaleUtenteLavoratore';

const Buttons = ({
    setInserisci,
    dataset,
    isFormValid,
    history,
    datiLogin
}) => {
    const inizializzaLav = useStatelessGraphQLRequest(inizializzaUtenteLavImpersonificazioneQ);
    const [openModal, setOpenModal]= useState(false);

    const inizializzaLavImp = async () => {

        const jsImpersonificazione = {
            cdOperatore: datiLogin.idCittadino,
            cdUtente: dataset.idUtente,
            cognomeUtente: dataset.cognome,
            nomeUtente: dataset.nome,
            cfUtente: dataset.codicefiscale,
            emailUtente: dataset.email,
            flUtenteCensito: "S"
        }

       const ris= await inizializzaLav({
            idUtente: dataset.idUtente,
            jsImpersonificazione
        });

        if(ris){
            history.push(generatePath(PAGE_CANDIDATURA_IMPERSONIFICAZIONE_TCB_ADMIN_URL, { idLavoratore: dataset.idUtente }));
          }else{
            setOpenModal(true);
          };

    };
    return (
        <>
            <Row fluid justifycontent="center" margin="2em 0 0 0">
                <Column xs='4' >
                    <Button 
                        label="CONFERMA"
                        onClick={() => { inizializzaLavImp() }}
                        disabled={!isFormValid}
                    />
                </Column>
                <Column xs='4'>
                    <Button
                        label="ANNULLA"
                        onClick={() => history.goBack()}
                    />
                </Column>
            </Row>
            <ModaleUtenteLavoratore
                open={openModal}
                setOpenModal={setOpenModal}
            />
        </>
    )
}

export default withRouter(Buttons);