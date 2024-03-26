import tabelle from 'tabelle';
import { fixtureMinimoContr } from '../fixtures/minimo_contrattuale_tcb.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { minimo_contrattuale_tcb } = tabelle;
  await knex(minimo_contrattuale_tcb).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureMinimoContr.map(minimo =>({
   nr_anno_rif:minimo.nrAnnoRif,
   ty_dominio_tcb:minimo.tyDominio,
   cd_tipo_orario_lavoro:minimo.cdTipoOrario,
   cd_categoria_contrattuale:minimo.cdCategoria,
   cd_livello_contrattuale:minimo.cdLivello,
   im_importo_contributo:minimo.imContributo,
   im_importo_indennita:minimo.imIndennita
    }));
  return await knex(minimo_contrattuale_tcb).insert(fixtureMapped);

};