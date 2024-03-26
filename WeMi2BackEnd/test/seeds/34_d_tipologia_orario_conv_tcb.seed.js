import tabelle from 'tabelle';
import { fixtureTipoOrario } from '../fixtures/d_tipologia_orario_conv_tcb.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { d_tipologia_orario_conv_tcb } = tabelle;
  await knex(d_tipologia_orario_conv_tcb).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureTipoOrario.map(tipo =>({
    cd_tipologia_orario:tipo.cdTipoOrario,
    tl_valore_testuale:tipo.tlTesto,
    pg_visualizzazione:tipo.pgVis
    }));
  return await knex(d_tipologia_orario_conv_tcb).insert(fixtureMapped);

};