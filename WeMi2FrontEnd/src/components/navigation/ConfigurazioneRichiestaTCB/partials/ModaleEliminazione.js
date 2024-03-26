/** @format */

import React from 'react';
import { withRouter, generatePath } from 'react-router-dom';
import Modal from 'components/ui2/Modal';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import Text from 'components/ui/Text';
import { PAGE_TCB_ADMIN_ERI_001, PAGE_REQUESTSINDEX_URL } from 'types/url';
import { RimuoviRichiestaServizioTcb as RimuoviRichiestaServizioTcbQ } from './ConfigurazioneRichiestaGraphQL';
import Button from 'components/ui2/Button';
import withAuthentication from 'hoc/withAuthentication';

const ModaleEliminazione = ({
    openElimina,
    history,
    idRichiestaTcb,
    setOpenElimina,
    idAdmin
}) => {
    const [Rimuovi, RimuoviRichiesta] = useGraphQLRequest(
        undefined,
        RimuoviRichiestaServizioTcbQ,
    )
    const title = 'Confermi di voler eliminare i dati inseriti?';

    const eliminaDomanda = async () => {
        await RimuoviRichiesta({ idRichiesta: idRichiestaTcb });
        if (idAdmin) {
            const generatedPath = generatePath(PAGE_TCB_ADMIN_ERI_001, {
                idOperatore: idAdmin
            });
            history.push(generatedPath);
        } else {
            history.push(PAGE_REQUESTSINDEX_URL);
        };
    };

    const children = (
        <>
            <Text
                intlFormatter
                value='I dati inseriti verranno rimossi e non sarà possibile recuperarli'
                size="f7"
                padding="0 0.2rem 0 0"
                tag="p"
                align="center"
            />
            <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "3rem 0 0 0" }}>
                <Button
                    autowidth
                    label='TORNA ALLA RICHIESTA'
                    onClick={() => setOpenElimina(false)}
                    fontSize='f7'
                    color="primary"
                    margin='0 0.5rem 0 0'
                />
                <Button
                    autowidth
                    label='ELIMINA DATI'
                    onClick={() => eliminaDomanda()}
                    fontSize='f7'
                    color="red"
                    margin='0 0 0 0.5rem'
                />
            </div>
        </>
    )

    return (
        <Modal
            open={openElimina}
            setOpenModal={setOpenElimina}
            title={title}
            children={children}
            color="primary"
            fontSize="f6"
            marginTop="15rem"
        />
    );
}
ModaleEliminazione.displayName = 'ModaleEliminazione';

export default withRouter(withAuthentication((ModaleEliminazione)));