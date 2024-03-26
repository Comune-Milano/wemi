import tabelle from 'tabelle';
import { fixtureDatiEnte } from '../fixtures/dati_propri_ente.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { datiPropriEnte } = tabelle;
  await knex(datiPropriEnte).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureDatiEnte.map(ente =>({
    id_ente_rif:ente.idEnte,
    tl_descrizione_ente:ente.tlDescr,
    id_img_logo:ente.idImg,
    id_pdf_tc:ente.idPdf,
    js_referente:ente.jsReferente,
    js_primo_contatto:ente.jsPrimoContatto,
    js_altre_info:ente.jsInfo,
    js_note_adminwemi:ente.jsNote,
    ts_creazione:ente.tsCreazione
    }));
  return await knex(datiPropriEnte).insert(fixtureMapped);

};