
import React, { memo } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import moment from 'moment';
import { isNullOrUndefined } from 'util';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import OrderSectionHeader from '../../Layout/SectionHeader';
import SummaryInfoRow from '../SummaryInfoRow/SummaryInfoRow';

// Formats a date.
const formatDate = date => moment(date).format('DD/MM/YY');

const ServiceRequestSummary = ({
  infoRichiestaEnte,
  locale,
}) => {
  const operatoreEnte = getObjectValue(infoRichiestaEnte, 'jsonDatiLavoratore.txNominativoOperatore', null);

  return (
    <Row padding="0">
      <Column xs={12} padding="0 0 1em 0">
        <OrderSectionHeader title="Riepilogo ordine" />
      </Column>
      <Column xs={12} padding="1em 0 0 0">
        <SummaryInfoRow
          label="Servizio:"
          text={getObjectValue(infoRichiestaEnte, `nomeServizioEnte.${locale}`)}
        />
        <SummaryInfoRow
          label="Rilasciato da:"
          text={infoRichiestaEnte.nomeEnteCompleto}
        />
        {operatoreEnte ? (
          <SummaryInfoRow
            label="Operatore"
            text={operatoreEnte}
          />
        )
          : null}
        <SummaryInfoRow
          label="Prezzo:"
          text={!isNullOrUndefined(infoRichiestaEnte.costoTotaleEnte) ? moneyFormat(infoRichiestaEnte.costoTotaleEnte, true) : 'Gratuito'}
        />
        <SummaryInfoRow
          label="Periodo:"
          text={`Dal ${infoRichiestaEnte.periodoPropostoDal || "-"} al ${infoRichiestaEnte.periodoPropostoAl || "-"}`}
        />
        <SummaryInfoRow
          label="Scadenza disponibilità:"
          text={formatDate(infoRichiestaEnte.scadenzaAcquisto)}
          padding="0 0 2em 0"
        />
        <Row padding="0">
          <Text
            value="Note aggiuntive ente:"
            size="f7"
            tag="div"
            width="100%"
          />
          <Text
            whitespace="pre-wrap"
            wordBreak="break-word"
            value={infoRichiestaEnte.noteEnte || ''}
            size="f7"
            weight="bold"
            tag="div"
            width="100%"
          />
        </Row>
      </Column>
    </Row>
  );
};
ServiceRequestSummary.displayName = 'ServiceRequestSummary';

export default memo(ServiceRequestSummary);
