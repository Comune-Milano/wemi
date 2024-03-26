import tabelle from 'tabelle';
import { isNullOrUndefined, isString, isNumber } from "util";

export const UpdateContenutoForModificaContenuto = (args, media1,media2,media3) => {
    let baseQuery = `UPDATE ${tabelle.contenuto} SET `;

    if (args.input.subtypeContenuto && args.input.subtypeContenuto === -1) {
        baseQuery += ' ty_sottotipo_contenuto=null,';
    } else if (args.input.subtypeContenuto && args.input.subtypeContenuto !== -1) {
        baseQuery += ` ty_sottotipo_contenuto=$[subtypeContenuto],`;
    }
    if (args.input.ordineVisualizzazione) {
        baseQuery += `nr_ordine_visualizzazione=$[ordineVisualizzazione],`;
    }
    if (args.input.versione) {
        baseQuery += `pg_versione=$[versione],`;
    }
    if (args.input.txTesto1){
        baseQuery += `tl_testo_1=$[txTesto1],`;
    }
    if (args.input.txTesto2){
        baseQuery += `tl_testo_2=$[txTesto2],`;
    }
    if (args.input.txTesto3){
        baseQuery += `tl_testo_3=$[txTesto3],`;
    }
    if(args.input.txTesto4){
        baseQuery += `tl_testo_4=$[txTesto4],`;
    }
    if(args.input.txTesto5){
        baseQuery += `tl_testo_5=$[txTesto5],`;
    }
    if(isString(args.input.link1)){
        args.input.link1 = args.input.link1.trim();
        baseQuery += `ln_link_1=$[link1],`;
    } else {
        baseQuery += `ln_link_1 = '',`
    }
    if(isString(args.input.link2)){
        args.input.link2 = args.input.link2.trim();
        baseQuery += `ln_link_2=$[link2],`;
    } else {
        baseQuery += `ln_link_2 = '',`
    }
    if(media1 && media1.id_media){
        baseQuery += `id_media1=$[id_media1],`
    }
    if(media2 && media2.id_media){
        baseQuery += `id_media2=$[id_media2],`
    }
    if(media3 && media3.id_media){
        baseQuery += `id_media3=$[id_media3],`
    }
    if(args.input.js_dati_contenuto){
        baseQuery += `js_dati_contenuto=$[js_dati_contenuto:json],`
    }

    baseQuery +=` ts_creazione=localtimestamp
    WHERE id_contenuto = $[idContenuto] RETURNING *;`

    return baseQuery;
};