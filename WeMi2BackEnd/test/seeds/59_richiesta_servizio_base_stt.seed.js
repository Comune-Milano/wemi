import tabelle from 'tabelle';
import { fixtureRichiestaBaseStt} from '../fixtures/richiesta_servizio_base_stt.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { richiesta_servizio_base_stt } = tabelle;
  await knex(richiesta_servizio_base_stt).delete();
  // Inserts seed entriesfixtureRMunicipioServ
  const fixtureMapped = fixtureRichiestaBaseStt.map(ric =>({
   id_richiesta_servizio:ric.idRichiesta,
   ts_variazione_stato:ric.tsVariazione,
   cd_stato_richiesta_servizio:ric.cdStato,
   id_utente:ric.idUtente
    }));
  return await knex(richiesta_servizio_base_stt).insert(fixtureMapped);

};