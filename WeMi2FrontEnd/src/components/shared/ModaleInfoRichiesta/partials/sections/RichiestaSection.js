/** @format */

import React from 'react';
import { Row } from 'components/ui/Grid'
import Text from 'components/ui/Text';
import Hr from 'components/ui/Hr';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import moment from 'moment';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import { isNumber } from 'utils/functions/typeCheckers';
import RowSection from './RowSection';

const RichiestaSection = ({ richiestaEnte }) => {
  const idRichiestaBase = getObjectValue(richiestaEnte, 'id_richiesta_servizio_base', null);
  const dataCreazione = getObjectValue(richiestaEnte, 'ts_creazione', null);
  const costoTotaleCalcolato = getObjectValue(richiestaEnte, 'im_costo_totale_calcolato', null);

  const jsDatiRichiesta = getObjectValue(richiestaEnte, 'richiestaServizioBase.js_dati_richiesta', {});
  const numeroPersone = getObjectValue(jsDatiRichiesta, 'qtPersone', null);
  const numeroPrestazioni = getObjectValue(jsDatiRichiesta, 'qtBaseRichiesta', null);
  const notaRichiesta = getObjectValue(jsDatiRichiesta, 'txNotaRichiesta', null);
  const richiestaDisponibilità = getObjectValue(jsDatiRichiesta, 'fgRichiestaDisponibilita');
  const mansioni = getObjectValue(jsDatiRichiesta, 'mansioni');
  const destinatari = getObjectValue(jsDatiRichiesta, 'destinatari');
  const indirizzo = getObjectValue(jsDatiRichiesta, 'indirizzo');
  const momentiGiornata = getObjectValue(jsDatiRichiesta, 'momentiGiornata');

  const periodoRichiestaDal = getObjectValue(richiestaEnte, 'richiestaServizioBase.dt_periodo_richiesto_dal', null);
  const periodoRichiestaAl = getObjectValue(richiestaEnte, 'richiestaServizioBase.dt_periodo_richiesto_al', null);

  const testoSostantivoPrestazioni = getObjectValue(richiestaEnte, 'servizioEnte.service.prezzo.tl_testo_sostantivo.it', null);
  const isGenereUnitaPrezzoMaschile = getObjectValue(richiestaEnte, 'servizioEnte.service.prezzo.fg_genere_maschile', null);

  return (
    <Row fluid margin="0 0 3em 0">
      <Text
        transform="uppercase"
        letterSpacing="0.05em"
        value={`Richiesta ${idRichiestaBase} del ${moment(dataCreazione).format('DD/MM/YYYY')}`}
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
        label={`Numero di ${testoSostantivoPrestazioni} ${isGenereUnitaPrezzoMaschile ? 'richiesti' : 'richieste'}`}
        value={numeroPrestazioni}
      />
      {
        richiestaDisponibilità ? (
          <RowSection
            label="Periodo richiesto"
            value={
              periodoRichiestaDal && periodoRichiestaAl ?
                `dal ${moment(periodoRichiestaDal).format('DD/MM/YYYY')} al ${moment(periodoRichiestaAl).format('DD/MM/YYYY')}` :
                null
            }
          />
        ) : null
      }
      {
        isNumber(costoTotaleCalcolato) ? (
          <RowSection
            label="Prezzo previsto"
            value={costoTotaleCalcolato === 0 ? 'gratuito' : moneyFormat(costoTotaleCalcolato, true)}
          />
        ) : null
      }
      <RowSection
        label="Indirizzo"
        value={indirizzo || null}
      />
      <RowSection
        label="Momento della giornata"
        value={momentiGiornata?.join(', ') || null}
      />
      <RowSection
        label="Destinatari"
        value={destinatari?.join(', ') || null}
      />
      <RowSection
        label="Mansioni"
        value={mansioni?.join(', ') || null}
      />
      <RowSection
        newLine
        label="Nota alla richiesta"
        value={notaRichiesta || null}
      />
    </Row>
  );
};

RichiestaSection.displayName = 'RichiestaSection';
export default RichiestaSection;
