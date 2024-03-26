import tabelle from 'tabelle';
import { fixtureUtenteOffServ } from '../fixtures/utente_offerta_servizio.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { utente_offerta_servizio } = tabelle;
  await knex(utente_offerta_servizio).delete();
  // Inserts seed entriesfixtureRMunicipioServ
  const fixtureMapped = fixtureUtenteOffServ.map(offerta =>({
  id_utente_lav:offerta.idUtenteLav,
  id_servizio_riferimento:offerta.idServizio,
  nr_anni_esperienza:offerta.nrAnniEsp,
  nr_voto_operatore:offerta.nrVotoOp,
  dt_disponibile_serv_dal:offerta.dtDisponibileDal,
  tx_lunedi:offerta.txLunedi,
  tx_martedi:offerta.txMartedi,
  tx_mercoledi:offerta.txMercoledi,
  tx_giovedi:offerta.txGiovedi,
  tx_venerdi:offerta.txVenerdi,
  tx_sabato:offerta.txSabato,
  tx_domenica:offerta.txDomenica,
  nr_ore_totali:offerta.nrOreTotali,
  ts_ultima_modifica:offerta.tsUltModifica,
  ts_creazione:offerta.tsCreazione
    }));
  return await knex(utente_offerta_servizio).insert(fixtureMapped);

};