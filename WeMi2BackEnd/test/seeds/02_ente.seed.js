import tabelle from 'tabelle';
import { fixtureEnte } from '../fixtures/ente.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { ente } = tabelle;
  await knex(ente).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureEnte.map(ente =>({
   id_ente:knex.raw("nextval('wemi2.seq_ente')"),
   id_partita_iva_ente:ente.idPartitaIva,
   nm_ente:ente.nmEnte,
   nm_ente_completo:ente.nmEnteCompl,
   id_utente_admin:ente.idUtente,
   pg_versione:ente.pgVers,
   id_ente_rif:ente.idEnteRif,
   dt_inizio_val:ente.dtInizioVal,
   dt_fine_val:ente.dtFineVal,
   ts_creazione:ente.tsCreazione
    }));
  return await knex(ente).insert(fixtureMapped);

};