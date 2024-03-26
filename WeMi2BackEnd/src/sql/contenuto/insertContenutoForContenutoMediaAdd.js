import tabelle from 'tabelle';

export const insertContenutoForContenutoMediaAdd = (args) => {
    let baseQuery = `
INSERT INTO ${tabelle.contenuto} (
  id_contenuto,
  ty_contenuto,
  id_contenuto_rif,
  ty_sottotipo_contenuto,
  nr_ordine_visualizzazione,
  pg_versione,`;

    if (args.input.tl_testo_1) {
        baseQuery += `tl_testo_1,`
    }
    if (args.input.tl_testo_2) {
        baseQuery += `tl_testo_2,`
    }
    if (args.input.tl_testo_3) {
        baseQuery += `tl_testo_3,`
    }
    if (args.input.tl_testo_4) {
        baseQuery += `tl_testo_4,`
    }
    if (args.input.tl_testo_5) {
        baseQuery += `tl_testo_5,`
    }
    if (args.input.js_dati_contenuto) {
        baseQuery += `js_dati_contenuto,`
    }
    baseQuery += `ln_link_1,
  ln_link_2,
  id_media1,
  id_media2,
  id_media3,
  dt_inizio_val,
  dt_fine_val,
  ts_creazione)
VALUES ($[idContenuto],
    $[ty_contenuto], 
    $[idContenuto],
    $[ty_sottotipo_contenuto],
    $[nr_ordine_visualizzazione],
    1,`;

    if (args.input.tl_testo_1) {
        baseQuery += `$[tl_testo_1],`;
    }
    if (args.input.tl_testo_2) {
        baseQuery += `$[tl_testo_2],`;
    }
    if (args.input.tl_testo_3) {
        baseQuery += `$[tl_testo_3],`;
    }
    if (args.input.tl_testo_4) {
        baseQuery += `$[tl_testo_4],`;
    }
    if (args.input.tl_testo_5) {
        baseQuery += `$[tl_testo_5],`;
    }
    if (args.input.js_dati_contenuto) {
        baseQuery += `$[js_dati_contenuto:json],`;
    }

    baseQuery += `$[ln_link_1],
       $[ln_link_2],
       $[idMedia1],
       $[idMedia2],
       $[idMedia3],
       localtimestamp,
       $[dt_fine_val],
       localtimestamp)
returning * `;

    return baseQuery;
}