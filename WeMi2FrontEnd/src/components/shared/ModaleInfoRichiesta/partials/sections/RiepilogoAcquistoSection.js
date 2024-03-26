/** @format */

import React from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Hr from 'components/ui/Hr';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { colors } from 'theme';
import moment from 'moment';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import { isNumber } from 'utils/functions/typeCheckers';
import RowSection from './RowSection';

const RiepilogoAcquistoSection = ({ richiestaEnte }) => {
  const dataPagamento = getObjectValue(richiestaEnte, 'datiPagamento.ts_creazione', null);
  const numeroPersone = getObjectValue(richiestaEnte, 'richiestaServizioBase.js_dati_richiesta.qtPersone', null);
  const numeroPrestazioni = getObjectValue(richiestaEnte, 'richiestaServizioBase.js_dati_richiesta.qtBaseRichiesta', null);
  const periodoRichiestaDal = getObjectValue(richiestaEnte, 'dt_periodo_proposto_dal', null);
  const periodoRichiestaAl = getObjectValue(richiestaEnte, 'dt_periodo_proposto_al', null);
  const costoTotaleEnte = getObjectValue(richiestaEnte, 'im_costo_totale_ente', null);
  const nominativoOperatore = getObjectValue(richiestaEnte, 'js_dati_lavoratore.txNominativoOperatore', null);
  const noteEnte = getObjectValue(richiestaEnte, 'tx_note_ente', null);
  const importoVoucher = getObjectValue(richiestaEnte, 'datiPagamento.js_dati_pagamento.importoVoucher', null);
  const altraModPagamento = getObjectValue(richiestaEnte, 'datiPagamento.js_dati_pagamento.altraModalita', false);

  return (
    <Row fluid margin="0 0 3em 0">
      <Text
        transform="uppercase"
        letterSpacing="0.05em"
        value={`Riepilogo acquisto del ${moment(dataPagamento).format('DD/MM/YYYY')}`}
        size="f6"
        color="primary"
        tag="h3"
        weight="bold"
      />
      <Hr height="1.5px" width="100%" color="primary" top="0" bottom="2em" />
      <RowSection
        label="Numero di persone"
        value={numeroPersone}
      />
      <RowSection
        label="Numero di prestazioni"
        value={numeroPrestazioni}
      />
      <RowSection
        label="Periodo richiesto"
        value={
          periodoRichiestaDal && periodoRichiestaAl ?
            `dal ${periodoRichiestaDal || '-'} al ${periodoRichiestaAl || '-'}` :
            null
        }
      />
      {importoVoucher && isNumber(costoTotaleEnte) ? (
        <Row fluid margin="0 0 1em 0">
          <Text
            whitespace="pre"
            value="Prezzo: "
            size="f7"
            color={colors.grey}
            tag="p"
          />
          &nbsp;
          <Text
            whitespace="pre-line"
            value={`${moneyFormat(costoTotaleEnte, true)}`}
            size="f7"
            color={colors.darkGrey}
            tag="h3"
            weight="bold"
          />
            &nbsp;
          <Text
            whitespace="pre-line"
            value="di cui importo voucher"
            size="f7"
            color={colors.grey}
          />
            &nbsp;
          <Text
            whitespace="pre-line"
            value={`${moneyFormat(Number(importoVoucher), true)}`}
            size="f7"
            color={colors.darkGrey}
            tag="h3"
            weight="bold"
          />
        </Row>
      )
        : null
       }
      {!importoVoucher && isNumber(costoTotaleEnte) ? (
        <RowSection
          label="Prezzo"
          value={costoTotaleEnte === 0 ? 'gratuito' : moneyFormat(costoTotaleEnte, true)}
        />
      )
        : null
      }
      {altraModPagamento ? (
        <Row fluid margin="0 0 1em 0">
          <Text
            value="L'importo è stato saldato con la modalità concordata con l'ente."
            size="f7"
            tag="p"
          />
        </Row>
      ) : null
      }
      <RowSection
        label="Operatore"
        value={nominativoOperatore}
      />
      <RowSection
        label="Nota"
        value={noteEnte}
        newLine
      />
    </Row>
  );
};

RiepilogoAcquistoSection.displayName = 'RiepilogoAcquistoSection';
export default RiepilogoAcquistoSection;
