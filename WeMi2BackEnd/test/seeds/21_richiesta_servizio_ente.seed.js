import tabelle from 'tabelle';
import { fixtureRichiestaEnte } from '../fixtures/richiesta_servizio_ente.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { richiesta_servizio_ente } = tabelle;
  await knex(richiesta_servizio_ente).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureRichiestaEnte.map(richiesta =>({
      id_richiesta_servizio_ente:knex.raw("nextval('wemi2.seq_richiesta_servizio_ente')"),
      id_richiesta_servizio_base:richiesta.idRichiestaBase,
      id_servizio_erogato_ente:richiesta.idServizio,
      id_interno_trans_pag:richiesta.idInternoTrans,
      im_costo_totale_calcolato:richiesta.imCostoTotaleCalc,
      im_costo_totale_ente:richiesta.imCostoTotalEnte,
      js_dati_lavoratore:richiesta.jsDati,
      dt_periodo_proposto_dal:richiesta.dtDal,
      dt_periodo_proposto_al:richiesta.dtAl,
      cd_fascia_oraria_proposta:richiesta.cdFascia,
      ts_scadenza_acquisto:richiesta.tsScadenza,
      tx_note_ente:richiesta.txNote,
      id_preventivo_ente:richiesta.idPrev,
      ts_creazione:richiesta.tsCreazione
    }));
  return await knex(richiesta_servizio_ente).insert(fixtureMapped);

};