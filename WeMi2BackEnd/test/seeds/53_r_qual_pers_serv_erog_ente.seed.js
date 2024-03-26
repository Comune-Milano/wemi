import tabelle from 'tabelle';
import { fixtureRQualPers} from '../fixtures/r_qual_pers_serv_erog_ente.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { r_qual_pers_serv_erog_ente } = tabelle;
  await knex(r_qual_pers_serv_erog_ente).delete();
  // Inserts seed entriesfixtureRMunicipioServ
  const fixtureMapped = fixtureRQualPers.map(qual =>({
   id_servizio_ente:qual.idServizio,
   id_qualifica:qual.idQualifica,
   ty_personale_rif:qual.tyPersonale
    }));
  return await knex(r_qual_pers_serv_erog_ente).insert(fixtureMapped);

};