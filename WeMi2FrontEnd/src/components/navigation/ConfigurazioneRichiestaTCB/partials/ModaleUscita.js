/** @format */

import React from 'react';
import { withRouter } from 'react-router-dom';
import Modal from 'components/ui2/Modal';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import { PUBLIC_URL } from 'types/url';
import withAuthentication from 'hoc/withAuthentication';

const ModaleUscita = ({
    openUscita,
    setOpenUscita,
    userProfile,
    location,
    history
}) => {
    const { datiLogin } = userProfile;
    const title = 'Confermi di voler uscire?';
    const children = (
        <>
            <Text
                intlFormatter
                value='I dati inseriti non andranno persi: li ritroverai la prossima volta che tornerai alla richiesta servizio baby-sitter'
                size="f7"
                padding="0 0.2rem 0 0"
                tag="p"
                align="center"
            />
            <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "3rem 0 0 0" }}>
                <Button
                    autowidth
                    label='TORNA ALLA RICHIESTA'
                    onClick={() => { setOpenUscita(false) }}
                    fontSize='f7'
                    color="primary"
                    margin='0 0.5rem 0 0'
                />
                <Button
                    autowidth
                    label='ESCI DALLA RICHIESTA'
                    onClick={() => {
                        if (location.state && (location.state.isFromBackoffice || location.state.personation)) {
                            history.push(`${PUBLIC_URL}/admin/${datiLogin.idCittadino}/richiesteTcb`);
                        }
                        else {
                            history.push(`${PUBLIC_URL}/menutcb`)
                        }
                    }}
                    fontSize='f7'
                    color="red"
                    margin='0 0 0 0.5rem'
                />
            </div>
        </>
    )

    return (
        <Modal
            open={openUscita}
            setOpenModal={setOpenUscita}
            title={title}
            children={children}
            color="primary"
            fontSize="f6"
            marginTop="15rem"
        />
    );
};

ModaleUscita.displayName = 'ModaleUscita';
export default withRouter(withAuthentication((ModaleUscita)));
