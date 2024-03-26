import tabelle from 'tabelle';
import { fixtureServizioTag} from '../fixtures/servizio_tag.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { servizio_tag } = tabelle;
  await knex(servizio_tag).delete();
  // Inserts seed entriesfixtureRMunicipioServ
  const fixtureMapped = fixtureServizioTag.map(servizio =>({
   id_servizio:servizio.idServizio,
   tx_tag_ricerca:servizio.txTagRicerca
    }));
  return await knex(servizio_tag).insert(fixtureMapped);
};