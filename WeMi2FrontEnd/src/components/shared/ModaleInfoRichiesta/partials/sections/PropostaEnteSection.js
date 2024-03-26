/** @format */

import React from 'react';
import { Row } from 'components/ui/Grid'
import Text from 'components/ui/Text';
import Hr from 'components/ui/Hr';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import moment from 'moment';
import RowSection from './RowSection';
import { moneyFormat } from 'utils/formatters/moneyFormat';

const PropostaEnteSection = ({ richiestaEnte }) => {
  
  const periodoRichiestaDal = getObjectValue(richiestaEnte, 'dt_periodo_proposto_dal', null);
  const periodoRichiestaAl = getObjectValue(richiestaEnte, 'dt_periodo_proposto_al', null);
  const costoTotaleEnte = getObjectValue(richiestaEnte, 'im_costo_totale_ente', null);
  const nominativoOperatore = getObjectValue(richiestaEnte, 'js_dati_lavoratore.txNominativoOperatore', null);
  const scadenzaDisponibilita = getObjectValue(richiestaEnte, 'ts_scadenza_acquisto', null);
  const noteEnte = getObjectValue(richiestaEnte, 'tx_note_ente', null);
  const numeroPersone = getObjectValue(richiestaEnte, 'richiestaServizioBase.js_dati_richiesta.qtPersone', null);
  const numeroPrestazioni = getObjectValue(richiestaEnte, 'richiestaServizioBase.js_dati_richiesta.qtBaseRichiesta', null);
  const richiestaDisponibilità = getObjectValue(richiestaEnte, 'richiestaServizioBase.js_dati_richiesta.fgRichiestaDisponibilita');

  return (
    <Row fluid margin="0 0 3em 0">
      <Text
        transform="uppercase"
        letterSpacing="0.05em"
        value="Proposta dell'ente"
        size="f6"
        color="primary"
        tag="h3"
        weight="bold"
      />
      <Hr height="1.5px" width="100%" color="primary" top="0" bottom="2em" />
      {!richiestaDisponibilità ? (
        <>
          <RowSection
            label="Numero di persone"
            value={numeroPersone}
          />
          <RowSection
            label="Numero di prestazioni"
            value={numeroPrestazioni}
          />
        </>
      ) : null}
      <RowSection
        label="Periodo"
        value={
          periodoRichiestaDal && periodoRichiestaAl ?
            `dal ${periodoRichiestaDal || "-"} al ${periodoRichiestaAl || "-"}` :
            null
        }
      />
      <RowSection
        label="Prezzo"
        value={costoTotaleEnte === 0 ? 'gratuito' : moneyFormat(costoTotaleEnte, true)}
      />
      <RowSection
        label="Operatore"
        value={ nominativoOperatore }
      />
      <RowSection
        label="Scadenza disponibilità"
        value={
          scadenzaDisponibilita ?
            `ore ${moment(scadenzaDisponibilita).format('HH:mm')} del ${moment(scadenzaDisponibilita).format('DD/MM/YYYY')}` :
            null
        }
      />
      <RowSection
        label="Nota alla risposta"
        value={noteEnte}
        newLine
      />
    </Row>
  );
};

PropostaEnteSection.displayName = 'PropostaEnteSection';
export default PropostaEnteSection;
