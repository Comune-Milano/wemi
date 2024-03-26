/** @format */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import FaIcon from 'components/ui2/FaIcon';
import moment from 'moment';
import { Notification, NotificationContainer, RichiestaRow, TabellaOverflow, ButtonFocus } from './RiepilogoRichiestaPagination.style';

const RiepilogoRichiestaPagination = ({
  listaRichieste,
  handleRowClick,
  locale,
}) => (
  <Fragment>
    <TabellaOverflow fluid justifycontent="flex-end" margin="1em 0">
      <Column xs="12" padding="0">
        {listaRichieste.map((request, index) => {
          const notificaMessaggi = `${request.messaggi} ${request.messaggi > 1 ? 'messaggi' : 'messaggio'}`;
          const notificaServizi = `${request.serviziAcquistabili} ${request.serviziAcquistabili > 1 ? 'servizi acquistabili' : 'servizio acquistabile'}`;
          const notificaScriviRecensione = ' scrivi una recensione';
          let textRichiesta = '';
          let colorRichiesta = '';
          switch (request.stato) {
            case '0':
              textRichiesta = 'Bozza';
              colorRichiesta = 'black';
              break;
            case '1':
              textRichiesta = 'Aperta - In gestione';
              colorRichiesta = 'primary';
              break;
            case '2':
              textRichiesta = 'Chiusa - Finalizzata';
              colorRichiesta = 'green';
              break;
            case '3':
              textRichiesta = 'Chiusa - Annullata';
              colorRichiesta = 'black';
              break;
            case '4':
              textRichiesta = 'Chiusa - Scaduta';
              colorRichiesta = 'black';
              break;
            case '5':
              textRichiesta = 'Aperta - Inoltrata';
              colorRichiesta = 'black';
              break;
            case '6':
              textRichiesta = 'Aperta - In gestione';
              colorRichiesta = 'primary';
              break;
            case '7':
              textRichiesta = 'Chiusa - Annullata';
              colorRichiesta = 'black';
              break;
            case '8':
              textRichiesta = 'Chiusa - Finalizzata';
              colorRichiesta = 'green';
              break;
            default:
              textRichiesta = "Non definita";
              colorRichiesta = "black"
          }

          return (
            <ButtonFocus
              onClick={() => { handleRowClick(index) }}
              padding="0"
              borderSize="0"
              key={`Richiesta-${index.toString()}`}
            >
              <RichiestaRow
                justifycontent="space-between"
                flex
                alignitems="center"
                padding="5px 0"
              >
                <Row fluid>
                  <Column xs="4" md="2" padding="5px" order={{ xs: 2, md: 1 }}>
                    <Text
                      tag="strong"
                      value="Richiesta del"
                      color="darkGrey"
                      weight="bold"
                      transform="uppercase"
                      letterSpacing="0.05em"
                      marging="0 0 0.5em 0"
                      size="f8"
                    />
                    <br />
                    <Text
                      tag="span"
                      value={request.ts_creazione_inoltro ? moment(request.ts_creazione_inoltro).format('DD/MM/YYYY') : 'non definito'}
                      color="black"
                      weight="bold"
                      transform="uppercase"
                      letterSpacing="0.05em"
                      marging="0 0 0.5em 0"
                      size="f6"
                    />
                  </Column>

                  <Column xs="12" md="5" padding="5px" order={{ xs: 1, md: 2 }}>
                    <Text
                      tag="strong"
                      value="Servizio richiesto"
                      color="darkGrey"
                      weight="bold"
                      transform="uppercase"
                      letterSpacing="0.05em"
                      marging="0 0 0.5em 0"
                      size="f8"
                    />
                    <br />
                    <Text
                      tag="span"
                      value={`${request.serviceName[locale]} ${request.tipologiaAssuzione || ''}`}
                      color="black"
                      weight="bold"
                      transform="uppercase"
                      letterSpacing="0.05em"
                      marging="0 0 0.5em 0"
                      size="f6"
                    />
                  </Column>


                  <Column xs="4" md="2" padding="5px" order={{ xs: 3 }}>
                    <Text
                      tag="strong"
                      value="Stato richiesta"
                      color="darkGrey"
                      weight="bold"
                      transform="uppercase"
                      letterSpacing="0.05em"
                      marging="0 0 0.5em 0"
                      size="f8"
                    />
                    <br />
                    <Text
                      tag="span"
                      value={textRichiesta}
                      color={colorRichiesta}
                      weight="bold"
                      transform="uppercase"
                      letterSpacing="0.05em"
                      marging="0 0 0.5em 0"
                      size="f6"
                    />
                  </Column>

                  <Column xs="4" md="3" padding="5px" order={{ xs: 4 }}>
                    {
                      request.messaggi > 0 ? (
                        <Row>
                          <NotificationContainer>
                            <Notification color="orange" />
                            <Text
                              tag="strong"
                              value={notificaMessaggi}
                              color="darkGrey"
                              weight="bold"
                              transform="uppercase"
                              letterSpacing="0.05em"
                              size="f8"
                            />
                          </NotificationContainer>
                        </Row>
                      )
                        : null
                    }

                    {
                      request.serviziAcquistabili > 0 ? (
                        <Row>
                          <NotificationContainer>
                            <Notification color="green" />
                            <Text
                              tag="strong"
                              value={notificaServizi}
                              color="darkGrey"
                              weight="bold"
                              transform="uppercase"
                              letterSpacing="0.05em"
                              size="f8"
                            />
                          </NotificationContainer>
                        </Row>
                      )
                        : null
                    }

                    {
                      request.recensioni > 0 ? (
                        <Row>
                          <NotificationContainer>
                            <FaIcon
                              fontSize="f7"
                              icon="pencil-alt"
                            />
                            <Text
                              tag="strong"
                              value={notificaScriviRecensione}
                              color="darkGrey"
                              weight="bold"
                              transform="uppercase"
                              letterSpacing="0.05em"
                              size="f8"
                            />
                          </NotificationContainer>
                        </Row>
                      )
                        : null
                    }
                  </Column>
                </Row>
              </RichiestaRow>
            </ButtonFocus>
          );
        })

        }
      </Column>
    </TabellaOverflow>

  </Fragment>
);


RiepilogoRichiestaPagination.displayName = 'RiepilogoRichiestaPagination';
const mapStoreToProps = (store) => ({
  locale: store.locale,
});
export default connect(mapStoreToProps)(RiepilogoRichiestaPagination);