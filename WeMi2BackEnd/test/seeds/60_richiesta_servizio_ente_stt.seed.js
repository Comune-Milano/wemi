import tabelle from 'tabelle';
import { fixtureRichiestaEnteStt} from '../fixtures/richiesta_servizio_ente_stt.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { richiesta_servizio_ente_stt } = tabelle;
  await knex(richiesta_servizio_ente_stt).delete();
  // Inserts seed entriesfixtureRMunicipioServ
  const fixtureMapped = fixtureRichiestaEnteStt.map(ric =>({
   id_richiesta_servizio_ente:ric.idRichiesta,
   ts_variazione_stato:ric.tsVariazione,
   cd_stato_ric_serv_ente:ric.cdStatoRic,
   cd_stato_chat:ric.cdStatoChat,
   id_utente:ric.idUtente
    }));
  return await knex(richiesta_servizio_ente_stt).insert(fixtureMapped);

};