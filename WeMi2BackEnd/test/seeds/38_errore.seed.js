import tabelle from 'tabelle';
import { fixtureErrore } from '../fixtures/errore.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { errore } = tabelle;
  await knex(errore).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureErrore.map(errore =>({
   cd_errore:errore.cdErrore,
   tl_descrizione_errore:errore.tlDescrizione
    }));
  return await knex(errore).insert(fixtureMapped);

};