import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import styled from 'styled-components';
import { colors } from 'theme';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import media from 'utils/media-queries';
import NavLink from 'components/router/NavLink';
import ModaleRiepilogo from 'components/navigation/ConfigurazioneRichiestaTCB/ModaleRiepilogo';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { cdAttributo } from 'components/navigation/ConfigurazioneRichiestaTCB/CodiciAttributi';
import ID_SERVIZIO_TATA from 'types/tcbConstants';
import { getNomeServizioTCB } from 'utils/functions';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import { withRouter, generatePath } from 'react-router';
import { PAGE_FEEDBACK_LAVORATORE_URL } from 'types/url';
import checkCittadino from 'utils/functions/checkCittadino';
import { FEEDBACK_CONFERMATO, FEEDBACK_RILASCIATO, FEEDBACK_RICHIESTO } from 'types/stati-richieste/feedback';
import * as STATI from '../../../constants';
import { estraiAttributiDomanda as estraiAttributiDomandaQ } from '../../../../ConfigurazioneRichiestaTCB/estraiAttributiGraphql';
import { getRiepilogoData, InviaAnnullaRichiestaTCB } from './DrawerGraphQL';

const EnteRow = styled(Row)`
  border-top: 2px solid ${colors.primary};
  width: 100%;
`;

const StyledBody = styled.div`
  padding: 3em 3em;
  ${media.md`
    padding: 3em 6em;
  `}

`;

const DrawerTCB = ({
  Data,
  getModalInfo,
  locale = 'it',
  history,
  setOpenModalAnnullamento,
  closeDrawer,
}) => {
  const isCittadinoLavoratore = checkCittadino(Data.datiLogin);
  const inviaAnnullamentoTCB = useStatelessGraphQLRequest(InviaAnnullaRichiestaTCB);
  const richiestaIsChiusa = Data.stato === STATI.RICHIESTA_TCB_CHIUSA;
  const richiestaIsFinalizzata = Data.stato === STATI.RICHIESTA_TCB_FINALIZZATA;

  const [attributiDomanda, getAttributiDomanda] = useGraphQLRequest(
    undefined,
    estraiAttributiDomandaQ,
    {
      idRichiestaTcb: Data.idRichiestaTCB,
      arrayConfig: [
        cdAttributo.CD_ORARIO_LAVORO,
      ],
    },
    true
  );

  const orario = (!attributiDomanda.pristine && !attributiDomanda.isLoading) ? {
    id: attributiDomanda.data.find(el => el.cd_attributo === cdAttributo.CD_ORARIO_LAVORO) ?
      getObjectValue(attributiDomanda.data.find(el => el.cd_attributo === cdAttributo.CD_ORARIO_LAVORO), 'cd_val_attributo', null)
      : null,
  } : null;

  const showPrice = (price) => (price) ? moneyFormat(price, true) : '--€';
  const nomeServizio = getNomeServizioTCB(Data.idServizio);
  const pathBozza = `/configurazionerichiestatcb/${nomeServizio}/${Data.idRichiestaTCB}`;

  const annullaRichiesta = () => {
    inviaAnnullamentoTCB({
      input: {
        id_richiesta_servizio_ente: Data.idRichiestaTCB,
      },
    }).then(ris => {
      if (ris) {
        setOpenModalAnnullamento(true);
        closeDrawer();
      }
    });
  };

  const isInoltrata = Number.parseInt(Data.stato, 10) === Number.parseInt(STATI.RICHIESTA_TCB_INOLTRATA, 10);
  const isGestione = Number.parseInt(Data.stato, 10) === Number.parseInt(STATI.RICHIESTA_TCB_GESTIONE, 10);
  const isAnnullamento = Number.parseInt(Data.stato, 10) === Number.parseInt(STATI.RICHIESTA_TCB_RICHIESTA_ANNULLAMENTO, 10);

  return (
    <StyledBody>
      <EnteRow fluid padding="0.3em 0 0 0">
        <Column xs="12" lg={(!Data.disableBozza || Data.vediRecensione) ? '7' : '6'} md={(!Data.disableBozza || Data.vediRecensione) ? '7' : '6'} sm="7" padding="0">
          <Text
            tag="h4"
            value={`Servizio ${Data.nomeServizio}`}
            color="primary"
            weight="bold"
            transform="uppercase"
            letterSpacing="0.05em"
            marging="0 0 0.5em 0"
            size="f6"
          />
          <Text
            tag="span"
            value={Data.statoRichiestaTestuale}
            size="f7"
          />
        </Column>
        {!(!Data.disableBozza || Data.vediRecensione) && (!richiestaIsChiusa && !richiestaIsFinalizzata) ? (
          <Column xs="12" lg="3" md="6" sm="5" padding="1em 0 0 0" sizepadding={{ md: '0 0 0 1em', lg: '0' }}>
            {
              Data.prezzo ? (
                <>
                  <Text tag="small" value={!Data.richiestaTCBIsClosed ? 'da' : 'prezzo'} size="f7" color="darkGrey" weight="semiBold" />
                  {' '}
                  <br />
                  <Text tag="strong" value={showPrice(Data.prezzo)} size="f5" weight="bold" color={!Data.richiestaTCBIsClosed ? 'black ' : 'primary'} />
                  <Text
                    value={orario && (orario.id === 3 || orario.id === 5) ? '/ora' : '/mese'}
                    transform="uppercase"
                    letterSpacing="0.05em"
                    tag="small"
                    size="f7"
                    color={!Data.richiestaTCBIsClosed ? 'black' : 'primary'}
                    weight="bold"
                  />
                </>
              )
                : null
            }
          </Column>
        )
          : (richiestaIsChiusa || richiestaIsFinalizzata) ? (
            <Column xs="12" lg="3" md="6" sm="5" padding="1em 0 0 0" sizepadding={{ md: '0 0 0 1em', lg: '0' }}>
              <Text
                tag="small"
                value="Data chiusura"
                size="f7"
                color="darkGrey"
                weight="semiBold"
              />
              <br />
              <Text
                value={Data.dataCambioStato}
                transform="uppercase"
                letterSpacing="0.05em"
                tag="small"
                size="f7"
                color={richiestaIsChiusa ? 'black' : 'primary'}
                weight="bold"
              />
            </Column>
          )
            : null}
        {(!Data.disableRiepilogo || !Data.disableCurriculum) && (
          <Column xs="12" lg="3" padding="1em 0 0 0" sizepadding={{ md: '0.5em 0 0 1em' }} margin="0 0 0 auto">
            {
              !Data.disableRiepilogo ? (
                <Button
                  color="primary"
                  label="RIEPILOGO"
                  margin="2px"
                  onClick={() => {
                    getModalInfo(Data);
                  }}
                >
                </Button>
              )
                : null
            }
            {
              (isInoltrata || isGestione || isAnnullamento) ? (
                <Button
                  color="primary"
                  label="Annulla"
                  margin="2px"
                  onClick={() => annullaRichiesta()}
                  disabled={isAnnullamento}
                />
              )
                : null
            }
            {
              !Data.disableCurriculum ? (
                <a
                  download
                  href={Data.curriculum}
                >
                  <Button
                    color="primary"
                    label="CURRICULUM"
                    margin="2px"
                  />
                </a>
              )
                : null
            }
          </Column>
        )}
        {!Data.disableBozza ? (
          <Column xs="12" lg="3" padding="1em 0 0 0" sizepadding={{ lg: '0.5em 0 0 1em' }} margin="0 0 0 auto">
            <NavLink
              to={pathBozza}
              width="100%"
            >
              <Button
                color="primary"
                label="MODIFICA BOZZA"
                margin="2px"
              />
            </NavLink>
          </Column>
        ) : null}

        {(isCittadinoLavoratore || Data.vediRecensione) &&
          (Data.statoRecensione === Number.parseInt(FEEDBACK_RICHIESTO, 10)
            || Data.statoRecensione === Number.parseInt(FEEDBACK_RILASCIATO, 10) ||
            Data.statoRecensione === Number.parseInt(FEEDBACK_CONFERMATO, 10)) ? (
              <Column xs="12" lg="3" padding="1em 0 0 0" sizepadding={{ md: '0.5em 0 0 1em' }} margin="0 0 0 auto">
                <Button
                  color="primary"
                  label={(Data.statoRecensione === Number.parseInt(FEEDBACK_RILASCIATO, 10) ||
                    Data.statoRecensione === Number.parseInt(FEEDBACK_CONFERMATO, 10)) ?
                  'Visualizza recensione' : 'Scrivi una recensione'}
                  margin="2px"
              // disabled={Data.statoRecensione === 2}
                  onClick={() => {
                    const path = generatePath(PAGE_FEEDBACK_LAVORATORE_URL, { idRichiesta: Data.idRichiestaTCB });
                    history.push(path);
                  }}
                />
              </Column>
        ) : null}
      </EnteRow>
    </StyledBody>
  );
};

DrawerTCB.displayName = 'Drawer TCB';

export default withRouter(DrawerTCB);
