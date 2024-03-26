
import React, { useState } from 'react';
import { generatePath, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { AddEnte, resetField, TCBStepper, openLoginModal, graphqlRequest } from 'redux-modules/actions/authActions';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';
import { colors } from 'theme';
import { cdAttributo } from 'components/navigation/ConfigurazioneRichiestaTCB/CodiciAttributi';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import withAuthentication from 'hoc/withAuthentication';
import { getNomeServizioTCB } from 'utils/functions';
import { getIdServizio } from 'utils/functions/getIdServizio';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import { isNumber } from 'utils/functions/typeCheckers';
import { PAGE_ENTI_SERVICE_FLOW, PAGE_TCBIRI002MODIFICA_URL } from 'types/url';
import { NON_CONVIVENTI, WEEKEND } from 'types/tipologiaOrario';
import minPrice from './utils/minPrice';
import { inserisciRichiestaTCB as inserisciRichiestaTCBM } from '../InserisciRichiestaTcbGraphql';
import { HIRING_TYPE_TCB } from '../constants';

const StyledCardQTC = styled.div`
  width: 100%;
  padding: 1em 0em 3em;
  border-top: 2px solid ${colors.black};
  height: auto;
`;

const CardQTC = ({
  domain,
  price,
  userProfile,
  setOpenInfo,
  livelliContrattuali,
  tcbFilters,
  setOpenSimulatore,
  label,
  services = [],
  description,
  modalitaAssunzione,
  datiLogin,
  openLoginModal,
  servizioTCB,
  loaded,
}) => {
  const [inserimentoRichiestaTcb, inserisciRichiestaTcb] = useGraphQLRequest(
    undefined,
    inserisciRichiestaTCBM
  );

  const [redirect, setRedirect] = useState(false);

  const showPrice = (modAss) => {
    if (loaded) {
      const price = minPrice(modAss, livelliContrattuali, tcbFilters.orario.id, tcbFilters.contract.id);
      return (price) ? moneyFormat(price, true) : '--€ ';
    }
    return 'N/D ';
  };

  const datiUtente = userProfile.datiLogin;

  const getUrl = (modAss) => {
    const idCategoria = getIdServizio(servizioTCB.cd_dominio_tcb);
    const service = services.find(servizio => {
      if (servizio.idTechnicalService !== idCategoria) {
        return false;
      }
      if (servizio.idHourType !== tcbFilters.orario?.id) {
        return false;
      }
      return true;
    });
    if (modAss === HIRING_TYPE_TCB.DIRECT || modAss === HIRING_TYPE_TCB.FAMILY_BOOKLET) {
      const pathStepperTCB = generatePath(PAGE_TCBIRI002MODIFICA_URL, {
        tcb: getNomeServizioTCB(servizioTCB.cd_dominio_tcb).toLocaleLowerCase(),
        idRichiesta: getObjectValue(inserimentoRichiestaTcb, 'data.InserisciRichiestaServizioTcb', null),
      });
      return pathStepperTCB;
    }
    if (HIRING_TYPE_TCB.INSTITUTION && service) {
      const pathInstitution = generatePath(PAGE_ENTI_SERVICE_FLOW, {
        idServizio: getObjectValue(service, 'idService', ''),
      });
      return pathInstitution;
    }
    return '';
  };

  price = isNumber(price) ? price : 'N/D';
  const isInstitutionPurchase = modalitaAssunzione === HIRING_TYPE_TCB.INSTITUTION;
  const isLogged = datiUtente !== null;
  const hasRequestTCB = !!getObjectValue(inserimentoRichiestaTcb, 'data.InserisciRichiestaServizioTcb', null);
  const hasToRedirectFluxTCB = !isInstitutionPurchase && hasRequestTCB && isLogged;
  return (
    <>
      {redirect &&
        (hasToRedirectFluxTCB || isInstitutionPurchase) ? (
          <Redirect
            to={getUrl(modalitaAssunzione)}
          />
      ) : null}
      <StyledCardQTC key={modalitaAssunzione.toString()}>
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
            onClick={() => { setOpenInfo(modalitaAssunzione); }}
            color="primary"
            icon="info"
            fontSize="f9"
            name="pulsante informazioni"
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
                value={domain === HIRING_TYPE_TCB.INSTITUTION ? moneyFormat(price, true) : showPrice(modalitaAssunzione)}
                transform="uppercase"
                letterSpacing="0.05em"
                tag="span"
                size="f5"
                color="black"
                weight="bold"
              />
              <Text
                value={tcbFilters.orario.id === NON_CONVIVENTI || tcbFilters.orario.id === WEEKEND ? '/ora' : '/mese'}
                transform="uppercase"
                letterSpacing="0.05em"
                tag="small"
                size="f8"
                color="black"
                weight="bold"
              />
            </p>
          </Column>
          {modalitaAssunzione === HIRING_TYPE_TCB.DIRECT ? (
            <Column xs="7" padding="1em 0.5em 0 0">
              <Button
                label="simula i costi"
                fontSize="f7"
                color="primary"
                onClick={() => { setOpenSimulatore(true); }}
              />
            </Column>
          )
            : null}
          <Column
            xs="5"
            padding="0 0 0 0.5em"
            alignself="flex-end"
          >
            <Button
              label="procedi"
              fontSize="f7"
              color="blue"
              onClick={async () => {
                const hasToLogin = !isLogged && !datiLogin.modal;
                const hasToOpenLoginModal = hasToLogin && !isInstitutionPurchase;
                if (hasToOpenLoginModal) {
                  openLoginModal(!datiLogin.modal);
                  return;
                }
                if (!isInstitutionPurchase && isLogged) {
                  await inserisciRichiestaTcb({
                    idUtenteRichiedente: datiUtente.idCittadino,
                    tyRichiesta: modalitaAssunzione,
                    id_servizio_erogato_ente: servizioTCB.cd_dominio_tcb,
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
                    },
                    ],
                  });
                }
                setRedirect(true);
              }
              }
            />
          </Column>
        </Row>
      </StyledCardQTC>
    </>
  );
};

CardQTC.displayName = 'CardQTC';
const mapStateToProps = (state) => ({
  enti: state.user.enti,
  datiLogin: state.datiLogin,
  richiestaInoltrata: state.graphql.InserisciModificaRichiestaServizioTcb,
});
const mapDispatchToProps = {
  AddEnte,
  TCBStepper,
  resetField,
  openLoginModal,
  graphqlRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withAuthentication(CardQTC));
