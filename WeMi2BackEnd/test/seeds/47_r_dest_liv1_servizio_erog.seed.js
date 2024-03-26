import tabelle from 'tabelle';
import { fixtureRDest1 } from '../fixtures/r_dest_liv1_servizio_erog.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { r_dest_liv1_servizio_erog } = tabelle;
  await knex(r_dest_liv1_servizio_erog).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureRDest1.map(dest =>({
   id_destinatario_liv1:dest.idDestinatario,
   id_servizio_ente:dest.idServizio
    }));
  return await knex(r_dest_liv1_servizio_erog).insert(fixtureMapped);

};