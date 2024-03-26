import tabelle from 'tabelle';
import { fixtureIndennita } from '../fixtures/indennita_tcb.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { indennita_tcb } = tabelle;
  await knex(indennita_tcb).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureIndennita.map(indennita =>({
   nr_anno_rif:indennita.nrAnnoRif,
   im_pranzo:indennita.imPranzo,
   im_cena:indennita.imCena,
   im_alloggio:indennita.imAlloggio
    }));
  return await knex(indennita_tcb).insert(fixtureMapped);

};