import tabelle from 'tabelle';
import { fixtureServizioErogatoEnteStt} from '../fixtures/servizio_erogato_ente_stt.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { servizio_erogato_ente_stt } = tabelle;
  await knex(servizio_erogato_ente_stt).delete();
  // Inserts seed entriesfixtureRMunicipioServ
  const fixtureMapped = fixtureServizioErogatoEnteStt.map(servizio =>({
   id_servizio_ente:servizio.idServizioEnte,
   ts_variazione_stato:servizio.tsVariazione,
   cd_stato_dati_servizio_ente:servizio.cdStato,
   id_utente:servizio.idUtente
    }));
  return await knex(servizio_erogato_ente_stt).insert(fixtureMapped);

};