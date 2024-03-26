import tabelle from 'tabelle';
import { fixtureRMunicipioServ} from '../fixtures/r_municipio_servito_serv_ente.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { r_municipio_servito_serv_ente } = tabelle;
  await knex(r_municipio_servito_serv_ente).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureRMunicipioServ.map(mun =>({
   id_servizio_ente:mun.idServizio,
   cd_municipio_servito:mun.cdMunicipio
    }));
  return await knex(r_municipio_servito_serv_ente).insert(fixtureMapped);

};