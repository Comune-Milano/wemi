import tabelle from 'tabelle';
import { fixtureRDest2 } from '../fixtures/r_dest_liv2_servizio_erog.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { r_dest_liv2_servizio_erog } = tabelle;
  await knex(r_dest_liv2_servizio_erog).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureRDest2.map(dest =>({
   id_destinatario_liv2:dest.idDestinatario,
   id_servizio_ente:dest.idServizio
    }));
  return await knex(r_dest_liv2_servizio_erog).insert(fixtureMapped);

};