import tabelle from 'tabelle';
import { fixtureMunicipio } from '../fixtures/municipio.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { d_municipio } = tabelle;
  await knex(d_municipio).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureMunicipio.map(municipio =>({
      cd_municipio: municipio.idMunicipio,
      tl_valore_testuale: municipio.nmMunicipio,
      pg_visualizzazione: municipio.idMunicipio
    }));
  return await knex(d_municipio).insert(fixtureMapped);

};