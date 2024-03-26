import tabelle from 'tabelle';
import { fixtureRecensioneEnteStt} from '../fixtures/recensione_servizio_ente_stt.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { recensione_ente_stt } = tabelle;
  await knex(recensione_ente_stt).delete();
  // Inserts seed entriesfixtureRMunicipioServ
  const fixtureMapped = fixtureRecensioneEnteStt.map(rec =>({
   id_rich_serv_rec:rec.idRichiesta,
   ts_variazione_stato:rec.tsVariazione,
   cd_stato_recensione:rec.cdStato,
   id_utente:rec.idUtente
    }));
  return await knex(recensione_ente_stt).insert(fixtureMapped);

};