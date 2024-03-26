import tabelle from 'tabelle';
import { fixtureRSost} from '../fixtures/r_sost_econ_serv_erog_ente.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { r_sost_econ_serv_erog_ente } = tabelle;
  await knex(r_sost_econ_serv_erog_ente).delete();
  // Inserts seed entriesfixtureRMunicipioServ
  const fixtureMapped = fixtureRSost.map(sost =>({
   id_contenuto_sostegno_econ:sost.idContenuto,
   id_servizio_ente:sost.idServizio
    }));
  return await knex(r_sost_econ_serv_erog_ente).insert(fixtureMapped);

};