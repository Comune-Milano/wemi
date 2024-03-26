import tabelle from 'tabelle';
import { fixtureUtente } from '../fixtures/utente.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { utente } = tabelle;
  await knex(utente).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureUtente.map(utente =>({
   id_utente:knex.raw("nextval('wemi2.seq_utente')"),
   cd_profilo_utente:utente.cdProfilo,
   fg_accettazione_privacy_wemi:utente.fgAccett,
   ptx_codice_fiscale:utente.ptxCF,
   ptx_username:utente.ptxUser,
   ptx_codana:utente.ptxCodana,
   ty_operatore_ente:utente.tyOperatore,
   fg_lavoratore:utente.fg_lavoratore,
   ptx_email:utente.pxtEmail,
   tx_nome_utente:utente.txNome,
   tx_cognome_utente:utente.txCognome,
   cd_sesso_utente:utente.cdSesso,
   dt_nascita:utente.dtNascita,
   js_anagrafica_residenza:utente.jsAnagrafica,
   ts_primo_login:utente.tsLogin,
   ts_ultima_modifica:utente.tsModifica,
   ts_creazione:utente.tsCreazione
    }));
  return await knex(utente).insert(fixtureMapped);

};