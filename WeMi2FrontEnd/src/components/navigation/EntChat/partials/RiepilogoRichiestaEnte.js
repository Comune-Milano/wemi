/** @format */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Button from 'components/ui/Button';
import styled from 'styled-components';
import { colors } from 'theme';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import {scambiaInformazioni as disattivaChatQ} from '../ChatRequestGraphQL'; 
import {isNullOrUndefined} from 'util';


const RichiestaRow = styled(Row)`
  &:last-child {
    border-bottom: 0.5px solid ${colors.blue};
  }
  border-top: 0.5px solid ${colors.blue};
  min-width: 850px;
  width: 100%;
`;

const BorderLeftColumn = styled(Column)`
  border-left: 1px solid ${colors.blue};
`;

const Textwords = styled(Text)`
  &:nth-last-child(2) {
    color: yellow;
  }
`;

const RiepilogoRichiestaEnte = ({ richiestaBase, statoChat, setStatoChat, richiestaEnte, lastState, graphqlRequest, locale }) => {
const [update, setUpdate] = useState(false)

    useEffect(() => {
        setUpdate(!update)
}, [statoChat, lastState, richiestaEnte])


  
const formateDate = date => {
    let inputValue = '';
    let year = date.split('T')[0].split('-')[0];
    let month = date.split('T')[0].split('-')[1].split('-')[0];
    let dayValue = date.split('T')[0].split('-')[2];
    let hourValue = date.split('T')[1].split(':')[0];
    let minValue = date.split('T')[1].split(':')[1];
    inputValue = `${dayValue}/${month}/${year} - ${hourValue}:${minValue}`;
    return inputValue
  };

    return(
        <RichiestaRow justifycontent="flex-start" padding="0">
            <Column xs="8" padding=" 1em 0">
                <Row fluid justifycontent="flex-start" flex alignitems="flex-start" margin="0 0 0.1em">
                    <Column xs="3" padding="0">
                        <Text size="f6" padding="0 0.5em 0 0" value="Servizio:" color="blue" />
                    </Column>
                    <Column xs="5" padding="0">
                        <Textwords size="f6" value={richiestaBase && richiestaBase.serviceName && richiestaBase.serviceName[locale]} color="darkGrey" />
                    </Column>
                </Row>


                <Row fluid justifycontent="flex-start" flex alignitems="flex-start" margin="0 0 0.1em">
                    <Column xs="3" padding="0">
                        <Text size="f6" value="Cittadino:" color="blue" />
                    </Column>
                    <Column xs="5" padding="0">
                        <Text size="f6" value={richiestaBase && richiestaBase.user && richiestaBase.user.ptx_username} color="darkGrey" />
                    </Column>
                </Row>

                <Row fluid justifycontent="flex-start" flex alignitems="flex-start" margin="0 0 0.1em">
                    <Column xs="3" padding="0">
                        
                        <Text size="f6" padding="0 0.5em 0 0" value="Apertura chat:" color="blue" />
                        </Column>
                        
                        <Column xs="5" padding="0">
                        
                        <Text size="f6" value={lastState? richiestaEnte  && richiestaEnte.storiaStati && richiestaEnte.storiaStati.length > 0 &&
                        richiestaEnte.storiaStati[richiestaEnte.storiaStati.length -2] &&
                           statoChat === 0 ?
                             formateDate(richiestaEnte.storiaStati[richiestaEnte.storiaStati.length -2].ts_variazione_stato)
                            : formateDate(lastState.ts_variazione_stato) : ''} color="darkGrey" />
                    </Column>
                </Row>

                <Row fluid justifycontent="flex-start" flex alignitems="flex-start" margin="0 0 0.1em">
                    <Column xs="3" padding="0">
                        <Text size="f6" padding="0 0.5em 0 0" value="Chiusura chat:" color="blue" />
                    </Column>
                    {statoChat === 0 ?
                    <Column xs="5" padding="0">
                      <Text size="f6" value={lastState ? formateDate(lastState.ts_variazione_stato) : ''} color="darkGrey" />
                    </Column>:null}

                </Row> 
            </Column>

            <BorderLeftColumn xs="4" padding="1em 0" flex direction="column" justifycontent="space-between">
            <Row fluid justifycontent="flex-start" flex alignitems="flex-start" margin="0 0 0.1em">
                    <Column xs="4" xsShift="1" padding="0">
                        <Text size="f6" padding="0 0.5em 0 0" value="Stato chat:" color="blue" />
                    </Column>
                    <Column xs="5" padding="0">
                    {!isNullOrUndefined(statoChat) ?
                    <Text size="f6" weight="bold" padding="0 0.5em 0 0" 
                    value={(statoChat === 1 || statoChat === 2) ?
                    'Aperta' : 'Chiusa' }
                    color= {
                        (statoChat === 1 || statoChat === 2) ? "green" : "red" }
                    /> : null}
                     
                    </Column>

                </Row>
                <Row fluid justifycontent="center" flex alignitems="bottom" margin="0 0 0.1em">
                    <Column xs="5"  padding="0">
                        {(statoChat === 1 || statoChat === 2) ?
                        <Button value="Chiudi Chat" type="cancel" fontSize="f7" onClick ={async()=> {
                            await graphqlRequest(disattivaChatQ({ idRichiestaEnte: richiestaEnte.id_richiesta_servizio_ente, 
                                statoChat: 0, 
                                idDestinatario: richiestaBase && richiestaBase.user.id_utente, 
                                previousState:lastState.cd_stato_chat })) 
                            setStatoChat.bind(this);
                            setStatoChat(0)
                        }} />  :null} 
                    </Column>
                </Row>
            </BorderLeftColumn>
        </RichiestaRow>
    );
};

RiepilogoRichiestaEnte.displayName = 'RiepilogoRichiestaEnte';
const mapStoreToProps = store => ({
    serviziByUtente: store.graphql.serviziByUtenterichiestaServizioBaseIndex,
    locale: store.locale
});

const mapDispatchToProps = {
    graphqlRequest,
};
export default connect(mapStoreToProps, mapDispatchToProps)(RiepilogoRichiestaEnte);
