import tabelle from 'tabelle';
import { fixtureRFascia } from '../fixtures/r_fascia_oraria_erog_srv_ente.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { r_fascia_oraria_erog_srv_ente } = tabelle;
  await knex(r_fascia_oraria_erog_srv_ente).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureRFascia.map(fascia =>({
   id_servizio_ente:fascia.idServizio,
   cd_fascia_oraria_erog_srv_ente:fascia.cdFascia
    }));
  return await knex(r_fascia_oraria_erog_srv_ente).insert(fixtureMapped);

};