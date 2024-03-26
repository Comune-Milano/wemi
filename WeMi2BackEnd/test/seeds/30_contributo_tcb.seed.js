import tabelle from 'tabelle';
import { fixtureContributoTcb } from '../fixtures/contributo_tcb.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { contributo_tcb } = tabelle;
  await knex(contributo_tcb).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureContributoTcb.map(contributo =>({
     nr_ore_da:contributo.nrOreDa,
     nr_ore_a:contributo.nrOreA,
     im_retr_effettiva_oraria_da:contributo.imRetrDa,
     im_retr_effettiva_oraria_a:contributo.imRetrA,
     im_contributo_orario_si_cuaf:contributo.imContributoOrarioSi,
     im_contributo_orario_no_cuaf_1:contributo.imContributoOrarioNo,
     im_contributo_orario_dip:contributo.imContributoOrarioDip
    }));
  return await knex(contributo_tcb).insert(fixtureMapped);

};