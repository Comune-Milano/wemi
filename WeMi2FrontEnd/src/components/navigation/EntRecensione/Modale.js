/** @format */

import React from 'react';
import { withRouter, generatePath } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'components/ui2/Modal';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import { PAGE_REQUESTSINDEX_URL } from 'types/path';
import { PAGE_ENTERI001FEEDBACKS_URL, PAGE_ENTERI001_URL } from 'types/url';

const Modale = ({
    open,
    setOpenModal,
    history,
    userProfile,
    confirmFromFeedback
}) => {
    const ente = window.location.pathname.split('/')[1] === 'e';
    const title = ente ? 'GRAZIE PER AVER CONFERMATO LA RECENSIONE!' : 'GRAZIE PER LA TUA RECENSIONE!';
    const nameButton = confirmFromFeedback ? 'VAI A GESTIONE FEEDBACK' : 'VAI ALLO STORICO DELLE RICHIESTE';

    const children = (
        ente ?
            <div style={{ textAlign: "center" }}>
                <Text
                    intlFormatter
                    value='Con la conferma la recensione viene pubblicata.'
                    size="f7"
                    padding="0 0.2rem 0 0"
                    tag="p"
                />
                <Button
                    autowidth
                    name={nameButton}
                    label={nameButton}
                    onClick={() => {
                        const idEnte= userProfile.datiLogin.idEnte;
                        if (confirmFromFeedback) {
                            history.push(generatePath(PAGE_ENTERI001FEEDBACKS_URL, { idEnte }));
                        } else {
                            history.push( generatePath(PAGE_ENTERI001_URL, { idEnte }));
                        }
                    }}
                    fontSize='f7'
                    color="primary"
                    margin='2.5rem 0 0 0'
                />
            </div>

            :
            <div style={{ textAlign: "center" }}>
                <Text
                    intlFormatter
                    value='Grazie per aver condiviso con noi la tua esperienza.'
                    size="f7"
                    padding="0 0.2rem 0 0"
                    tag="p"
                />
                <Text
                    intlFormatter
                    value='Useremo la tua opinione per migliorare il servizio.'
                    size="f7"
                    padding="0 0.2rem 0 0"
                    tag="p"
                />
                <Button
                    autowidth
                    name='VAI ALLO STORICO DELLE RICHIESTE'
                    label='VAI ALLO STORICO DELLE RICHIESTE'
                    onClick={() => history.push(`${PAGE_REQUESTSINDEX_URL}`)}
                    fontSize='f7'
                    color="primary"
                    margin='2.5rem 0 0 0'
                />
            </div>
    );

    return (
        <>
            <Modal open={open}
                setOpenModal={setOpenModal}
                title={title}
                children={children}
                color="primary"
                fontSize="f6"
            />
        </>

    );
}

const mapStoreToProps = store => ({
    locale: store.locale
})

export default connect(mapStoreToProps, null)(withRouter(Modale));
