import tabelle from 'tabelle';
import { fixtureRSede} from '../fixtures/r_sede_ente_servizio_erog.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { r_sede_ente_servizio_erog } = tabelle;
  await knex(r_sede_ente_servizio_erog).delete();
  // Inserts seed entriesfixtureRMunicipioServ
  const fixtureMapped = fixtureRSede.map(sede =>({
   id_servizio_ente:sede.idServizio,
   id_sede_erogazione_srv:sede.idSede
    }));
  return await knex(r_sede_ente_servizio_erog).insert(fixtureMapped);

};