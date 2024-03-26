/** @format */

import React from 'react';
import styled from 'styled-components';
import { Row } from 'components/ui/Grid';
import media from 'utils/media-queries';
import { colors } from 'theme';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import ModaleInfoRichiestaLeftColumn from './ModaleInfoRichiestaLeftColumn';
import ModaleInfoRichiestaRightColumn from './ModaleInfoRichiestaRightColumn';

const StyledRow = styled(Row)`
    ${props => (!props.rispostaNonRicevutaEnte || props.statoRichiestaEnte.chiusaEnte) && media.md`
        > div:first-child {
            border-right: 2px solid ${colors.grey};
        }
    `}
`;

const ModaleInfoRichiestaBody = ({ richiestaEnte }) => {
  const [ultimoStatoRichiestaBase] = getObjectValue(richiestaEnte, 'richiestaServizioBase.storiaStati', null);
  const [ultimoStatoRichiestaEnte] = getObjectValue(richiestaEnte, 'richiestaServizioBase.storiaStatiEnte', null);
  const dataPeriodoPropostoDalRecensione = getObjectValue(richiestaEnte, 'dt_periodo_proposto_dal', null);
  const dataPeriodoPropostoAlRecensione = getObjectValue(richiestaEnte, 'dt_periodo_proposto_al', null);
  const costoTotaleRecensione = getObjectValue(richiestaEnte, 'im_costo_totale_ente', null);
  // const noteEnteRecensione = getObjectValue(richiestaEnte, 'tx_note_ente', null);

  const rispostaNonRicevutaEnte = !(dataPeriodoPropostoDalRecensione && dataPeriodoPropostoAlRecensione &&
                                   (costoTotaleRecensione || costoTotaleRecensione === 0));
  const statoRichiestaBase = {
    aperta: ultimoStatoRichiestaBase.cd_stato_richiesta_servizio === '1',
    pagata: ultimoStatoRichiestaBase.cd_stato_richiesta_servizio === '2',
    rifiutataChiusa: ultimoStatoRichiestaBase.cd_stato_richiesta_servizio === '3',
    scaduta: ultimoStatoRichiestaBase.cd_stato_richiesta_servizio === '4',
  };

  const statoRichiestaEnte = {
    inoltrata: ultimoStatoRichiestaEnte.cd_stato_ric_serv_ente === '1',
    accettata: ultimoStatoRichiestaEnte.cd_stato_ric_serv_ente === '2',
    conversazcione: ultimoStatoRichiestaEnte.cd_stato_ric_serv_ente === '3',
    annullataCittadino: ultimoStatoRichiestaEnte.cd_stato_ric_serv_ente === '4',
    chiusaEnte: ultimoStatoRichiestaEnte.cd_stato_ric_serv_ente === '5',
    scaduta: ultimoStatoRichiestaEnte.cd_stato_ric_serv_ente === '6',
    pagata: ultimoStatoRichiestaEnte.cd_stato_ric_serv_ente === '8',
  };

  return (
    <StyledRow
      margin="2em 0 0 0"
      rispostaNonRicevutaEnte={rispostaNonRicevutaEnte}
      statoRichiestaEnte={statoRichiestaEnte}
    >
      <ModaleInfoRichiestaLeftColumn
        richiestaEnte={richiestaEnte}
        statoRichiestaBase={statoRichiestaBase}
        statoRichiestaEnte={statoRichiestaEnte}
        rispostaNonRicevutaEnte={rispostaNonRicevutaEnte}
      />
      <ModaleInfoRichiestaRightColumn
        richiestaEnte={richiestaEnte}
        statoRichiestaBase={statoRichiestaBase}
        statoRichiestaEnte={statoRichiestaEnte}
        rispostaNonRicevutaEnte={rispostaNonRicevutaEnte}
      />
    </StyledRow>
  );
};

ModaleInfoRichiestaBody.displayName = 'ModaleInfoRichiestaBody';
export default ModaleInfoRichiestaBody;
