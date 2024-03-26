import tabelle from 'tabelle';
import { fixtureMerchant } from '../fixtures/merchant.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { merchant } = tabelle;
  await knex(merchant).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureMerchant.map(merchant =>({
   id_ente:merchant.idEnte,
   id_merchant:merchant.idMerchant,
   id_public_key:merchant.idPublic,
   id_private_key:merchant.idPrivate,
   dt_inizio_val:merchant.dtInizio,
   dt_fine_val:merchant.dtFine,
   ts_creazione:merchant.tsCreazione
    }));
  return await knex(merchant).insert(fixtureMapped);

};