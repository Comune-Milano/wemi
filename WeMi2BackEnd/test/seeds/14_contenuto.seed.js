import tabelle from 'tabelle';
import { fixtureContenuto } from '../fixtures/contenuto.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { contenuto } = tabelle;
  await knex(contenuto).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureContenuto.map(contenuto =>({
      id_contenuto:knex.raw("nextval('wemi2.seq_contenuto')"),
      ty_contenuto:contenuto.tyContenuto,
      id_contenuto_rif:contenuto.idContenutoRif,
      ty_sottotipo_contenuto:contenuto.tySottotipo,
      nr_ordine_visualizzazione:contenuto.nrVisualizzazione,
      pg_versione:contenuto.pgVersione,
      tl_testo_1:contenuto.tlTesto1,
      tl_testo_2:contenuto.tlTesto2,
      tl_testo_3:contenuto.tlTesto3,
      tl_testo_4:contenuto.tlTesto4,
      tl_testo_5:contenuto.tlTesto5,
      ln_link_1:contenuto.lnLink1,
      ln_link_2:contenuto.lnLink2,
      id_media1:contenuto.idMedia1,
      id_media2:contenuto.idMedia2,
      id_media3:contenuto.idMedia3,
      dt_inizio_val:contenuto.dtInizioVal,
      dt_fine_val:contenuto.dtFineVal,
      js_dati_contenuto:contenuto.jsDatiContenuto,
      ts_creazione:contenuto.tsCreazione
    }));
  return await knex(contenuto).insert(fixtureMapped);

};