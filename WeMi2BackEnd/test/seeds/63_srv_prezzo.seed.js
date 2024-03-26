import tabelle from 'tabelle';
import { fixtureSrvPrezzo} from '../fixtures/srv_prezzo.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { srv_prezzo } = tabelle;
  await knex(srv_prezzo).delete();
  // Inserts seed entriesfixtureRMunicipioServ
  const fixtureMapped = fixtureSrvPrezzo.map(prezzo =>({
   id_prezzo:knex.raw("nextval('wemi2.seq_prezzo')"),
   id_servizio_ente:prezzo.idServizioEnte,
   cd_tipo_offerta_srv:prezzo.cdTipoOfferta,
   dt_inizio:prezzo.dtInizio,
   dt_fine:prezzo.dtFine,
   tx_titolo_finanziamento:prezzo.txFinanz,
   qt_minima_unita:prezzo.qtMinimaUnita,
   im_prezzo_minimo:prezzo.imPrezzoMinimo,
   im_prezzo_minimo_cond:prezzo.imPrezzoMinimo,
   cd_tipo_servizio_erog:prezzo.cdTipoServizioErog,
   tx_note_al_prezzo:prezzo.txNotePrezzo,
   ts_creazione:prezzo.tsCreazione
    }));
  return await knex(srv_prezzo).insert(fixtureMapped);

};