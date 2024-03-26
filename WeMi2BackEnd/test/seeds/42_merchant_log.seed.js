import tabelle from 'tabelle';
import { fixtureMerchantLog } from '../fixtures/merchant_log.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { merchant_log } = tabelle;
  await knex(merchant_log).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureMerchantLog.map(merchant =>({
   id_ente:merchant.idEnte,
   id_merchant:merchant.idMerchant,
   id_public_key:merchant.idPublic,
   id_private_key:merchant.idPrivate,
   dt_inizio_val:merchant.dtInizio,
   dt_fine_val:merchant.dtFine,
   ts_creazione:merchant.tsCreazione,
   id_utente:merchant.idUtente
    }));
  return await knex(merchant_log).insert(fixtureMapped);

};