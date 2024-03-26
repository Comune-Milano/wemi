import tabelle from 'tabelle';
import { fixtureServizio } from '../fixtures/servizio.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { servizio } = tabelle;
  await knex(servizio).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureServizio.map(servizio =>({
      id_servizio:servizio.idServizio,
      id_categoria_accreditamento:servizio.idCatAcc,
      tx_tags_ricerca:servizio.txTags,
      cd_unita_prezzo:servizio.cdUnita
    }));
  return await knex(servizio).insert(fixtureMapped);

};