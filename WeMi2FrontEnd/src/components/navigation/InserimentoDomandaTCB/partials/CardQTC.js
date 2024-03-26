/** @format */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { inserisciRichiestaTCB as inserisciRichiestaTCBM } from './InserimentoLavoratore';
import { AddEnte, resetField, TCBStepper, openLoginModal, graphqlRequest } from 'redux-modules/actions/authActions';
import Tooltip from 'components/ui2/Tooltip';
import { PUBLIC_URL } from 'types/url';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';
import { colors } from 'theme';
import { cdAttributo } from 'components/navigation/ConfigurazioneRichiestaTCB/CodiciAttributi';
import minPrice from './utils/utils';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import withAuthentication from 'hoc/withAuthentication';
import {getNomeServizioTCB} from 'utils/functions';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import { withRouter } from 'react-router-dom';

const StyledCardQTC = styled.div`
  width: 100%;
  padding: 1em 0em 3em;
  border-top: 2px solid ${colors.black};
  height: auto;
`

const CardQTC = ({
  setOpenInfo, livelliContrattuali, tcbFilters,
  setOpenSimulatore,
  label, description, modalitaAssunzione,
  locale,
  userProfile,
  Risultato,
  isCfRicercaValorizzato,
  history,
  datiLogin,
  errori,
  dataset,
  openLoginModal,
  preventivoLightTCB,
  AddEnte,
  servizioTCB, loaded }) => {



  const datiUtente = userProfile.datiLogin;

  const [inserimentoRichiestaTcb, inserisciRichiestaTcb] = useGraphQLRequest(
    undefined,
    inserisciRichiestaTCBM
  );

  const showPrice = (modAss) => {
    if (loaded && tcbFilters.orario && tcbFilters.contract) {
      const price = minPrice(modAss, livelliContrattuali, tcbFilters.orario.id, tcbFilters.contract.id);
      return (price) ? moneyFormat(price, true) : '--€ ';
    }
    return 'N/D '
  }

  const redirectTcb = (res) => {
    if(res && res.InserisciRichiestaServizioTcb!==undefined &&
      ((modalitaAssunzione !== 2 && getObjectValue(res, 'InserisciRichiestaServizioTcb', null)) || modalitaAssunzione === 2) &&
      datiUtente !== null){
              if(modalitaAssunzione === 1 || modalitaAssunzione === 3){
                history.push(`${PUBLIC_URL}/configurazionerichiestatcb/${getNomeServizioTCB(servizioTCB.id)}/${res.InserisciRichiestaServizioTcb}`, { personation: true })
                }
                else if(modalitaAssunzione === 2 && servizioTCB){
                  history.push(`${PUBLIC_URL}/${locale}/c/516/r/${
                    servizioTCB.id === 1 ? '999997' :
                      servizioTCB.id === 2 ? '999998' :
                        servizioTCB.id === 3 ? '999999' : ''}`)
                }
            }
  }

  return (
    <>
      <StyledCardQTC key={modalitaAssunzione.toString()} >
        <Row fluid justifycontent="space-between" padding="0 0 .5em 0">
          <Text
            tag="h4"
            value={label}
            size="f7"
            color="primary"
            transform="uppercase"
            letterSpacing="0.05em"
            weight="bold"
          />
           <ButtonIcon
            onClick={() => { setOpenInfo.bind(this); setOpenInfo(modalitaAssunzione) }}
            color="primary" icon="info" fontSize="f9" name="pulsante informazioni"
            aria-label="informazioni"
          />
        </Row>
        <Row fluid padding="0 0 1em 0">
          <Text
            tag="p"
            value={description}
            size="f7"
            color="black"
          />
        </Row>

        <Row fluid justifycontent="space-between" alignitems="flex-end">
          <Column xs="7" padding="0 0.5em 0 0">
            <Text
              tag="small"
              value="da"
              size="f7"
              color="darkGrey"
            />
            <p>
              <Text
                value={showPrice(modalitaAssunzione)}
                transform="uppercase"
                letterSpacing="0.05em"
                tag="span"
                size="f5"
                color="black"
                weight="bold"
              />
              <Text
                value={tcbFilters.orario.id === 3 || tcbFilters.orario.id === 5 ? "/ora" : "/mese"}
                transform="uppercase"
                letterSpacing="0.05em"
                tag="small"
                size="f8"
                color="black"
                weight="bold"
              />
            </p>
          </Column>
          {modalitaAssunzione === 1 ?
            <Column xs="7" padding="1em 0.5em 0 0">
              <Button
                label="simula i costi"
                fontSize="f7"
                color="primary"
                onClick={() => { setOpenSimulatore.bind(this); setOpenSimulatore(true) }}
              />
            </Column>
            : null}
          <Column
            xs="5"
            padding="0 0 0 0.5em" alignself="flex-end">
               <Tooltip
                    fluid
                    position="top"
                    color="white"
                    bgcolor="blue"
                    posAdjustment="20%"
                    preventOnHover={!((Risultato === null || Risultato === undefined) && errori)}
                    value="Per inviare la richiesta è necessario compilare i campi obbligatori di tutte le sezioni">
            <Button
              label="procedi"
              fontSize="f7"
              disabled={errori && !Risultato && isCfRicercaValorizzato}
              color="blue"
              onClick={  async ()  => {
                if (datiUtente === null
                  && !datiLogin.modal) {
                  openLoginModal(!datiLogin.modal)
                } else {
                  if (modalitaAssunzione === 2) {
                    AddEnte(-1);
                  }
                  if ((modalitaAssunzione === 1) || (modalitaAssunzione === 3)) {
                    const res = await inserisciRichiestaTcb({
                      idUtenteRichiedente: Risultato !== undefined ? Risultato.id_utente :
                      datiUtente.idCittadino,
                      tyRichiesta: modalitaAssunzione,
                      id_servizio_erogato_ente: servizioTCB.id,
                      arrayConfig: [{
                        cd_attributo: cdAttributo.CD_LIVELLO_CONTRATTUALE,
                        cd_val_attributo: tcbFilters.contract.id,
                      },
                      {
                        cd_attributo: cdAttributo.CD_ORARIO_LAVORO,
                        cd_val_attributo: tcbFilters.orario.id,
                      },
                      {
                        cd_attributo: cdAttributo.CD_TIPOLOGIA_ASSUNZIONE,
                        cd_val_attributo: modalitaAssunzione,
                      }
                      ],
                      js_impersonificazione: {
                        cdOperatore: datiUtente.idCittadino,
                        cd_utente: Risultato !== undefined ? Risultato.id_utente :
                         datiUtente.idCittadino,
                        cognomeUtente: dataset.cognome,
                        nomeUtente: dataset.nome,
                        cfUtente: dataset.codicefiscale,
                        emailUtente: dataset && dataset.email ? dataset.email : null,
                        flUtenteCensito: Risultato !== undefined ? "S" : "N"
                      }
                    });
                redirectTcb(res);
                  }
                }
            }
              }
            />
            </Tooltip>
          </Column>
        </Row>
      </StyledCardQTC>
    </>
  )
};

CardQTC.displayName = 'CardQTC';
const mapStateToProps = (state) => ({
  preventivoLightTCB: state.requestTCB.preventivoLightTCB,
  enti: state.user.enti,
  datiLogin: state.datiLogin,
  richiestaInoltrata: state.graphql.InserisciModificaRichiestaServizioTcb,
});
const mapDispatchToProps = {
  AddEnte,
  TCBStepper,
  resetField,
  openLoginModal,
  graphqlRequest
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(withAuthentication(CardQTC)));