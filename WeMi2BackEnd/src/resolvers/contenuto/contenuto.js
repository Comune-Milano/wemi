import { isString, isNullOrUndefined } from "util";
import { findContentWithState, findCountOfContentWithState } from "sql/contenuto/selezione";
import ServizioGeneraleDao from '../../dao/servizioGenerale/servizioGeneraleDAO';
import { ContenutoDAO } from 'dao/contenuto/contenutoDAO';
import { tyContenuto as tyContenutoConstants } from 'constants/db/ty_contenuto';
import { selectContenutoMediaAdd } from "sql/contenuto/selectContenutoMediaAdd";
import { updateOrdineVis } from "sql/contenuto/updateOrdineVis";
import { selectByTyContenuto } from "sql/contenuto/selectByTyContenuto";
import { deleteByIdContenuto } from "sql/contenutostt/deleteByIdContenuto";
import { insertForContenutoMediaAdd } from "sql/media/insertForContenutoMediaAdd";
import { selectNextVal } from "sql/contenuto/selectNextVal";
import { insertContenutoForContenutoMediaAdd } from "sql/contenuto/insertContenutoForContenutoMediaAdd";
import { insertServizioForContenutoMediaAdd } from "sql/servizio/insertServizioForContenutoMediaAdd";
import { insertSttForContenutoMediaAdd } from "sql/contenutostt/insertSttForContenutoMediaAdd";
import { insertServizioWithOptions } from "sql/servizio/insertServizioWithOptions";
import { deleteForContenutoMediaAdd } from "sql/contenutoassociato/deleteForContenutoMediaAdd";
import { insertContenutoAssociato } from "sql/contenutoassociato/insertContenutoAssociato";
import { selectByIdContenuto } from "sql/contenuto/selectByIdContenuto";
import { updateForModificaContenuto } from "sql/servizio/updateForModificaContenuto";
import { selectByTyContenutoOrder } from "sql/contenuto/selectByTyContenutoOrder";
import { updateMediaForModificaContenuto } from "sql/media/updateMediaForModificaContenuto";
import {insertMediaForModificaContenuto} from "sql/media/insertMediaForModificaContenuto";
import { updateSetIdMedia } from "sql/contenuto/updateSetIdMedia";
import { updateIdMediaNull } from "sql/contenuto/updateIdMediaNull";
import { deleteMediaForModificaContenuto } from "sql/media/deleteMediaForModificaContenuto";
import { UpdateContenutoForModificaContenuto } from "sql/contenuto/UpdateContenutoForModificaContenuto";
import {selezionaByIdUtenteSql} from "sql/utente/selezione";
import { insertForStatoContenutoUPD } from "sql/contenutostt/insertForStatoContenutoUPD";
import { STORAGE_BOUND_PATH, STORAGE_ABS_PATH } from 'environment';
import path from 'path';
import { deleteFile } from "utility/deleteFile";
import { saveFileFromBase64 } from "utility/saveFileFromBase64";
import { selectMediaById } from "sql/media/select";
import { ApolloError } from 'apollo-server';
import { CONTENT_MEDIA_PK_ID_ERROR } from 'errors/errors';
import { AreaContentManagement } from "controller/areamanagement";
import { selectPublishedContentsById } from "sql/contenuto/selectPublishedContentsById";

export default {
  Footer: {
    col1: async (parent, args, context, info) => {

      const sql = `
      SELECT  
      wemi2.contenuto.id_contenuto,
              ty_contenuto,
              id_contenuto_rif,
              ty_sottotipo_contenuto,
              nr_ordine_visualizzazione,
              pg_versione,
              tl_testo_1,
              tl_testo_2,
              tl_testo_3,
              tl_testo_4,
              tl_testo_5,
              ln_link_1,
              ln_link_2,
              id_media1,
              media1.nm_nome_media as nm_nome_media1,
              convert_from(media1.oj_media,'UTF-8') as oj_media1,
              media2.nm_nome_media as nm_nome_media2,
              convert_from(media2.oj_media,'UTF-8') as oj_media2,
              id_media2,
              id_media3,
              dt_inizio_val,
              dt_fine_val,
              js_dati_contenuto,
              wemi2.contenuto.ts_creazione
      FROM    wemi2.contenuto
      left JOIN wemi2.contenuto_stt ON wemi2.contenuto_stt.id_contenuto= wemi2.contenuto.id_contenuto
      left join wemi2.media as media1 on media1.id_media = wemi2.contenuto.id_media1
      left join wemi2.media as media2 on media2.id_media = wemi2.contenuto.id_media2
      left join wemi2.media as media3 on media3.id_media = wemi2.contenuto.id_media3
      where ${parent.args && parent.args.stt == 10 ? '(cd_stato_contenuto=2 or cd_stato_contenuto=1 ) and ' : 'cd_stato_contenuto=2 and '}  wemi2.contenuto.ty_contenuto = 10 and    ts_variazione_stato = (
        select MAX(ts_variazione_stato)
        from wemi2.contenuto_stt
          where wemi2.contenuto_stt.id_contenuto =   wemi2.contenuto.id_contenuto 
      )
      ORDER BY nr_ordine_visualizzazione ASC`;

      return await context.db.any(sql, args);
    },
    col2: async (parent, args, context, info) => {
      const sql = `
      SELECT  
      wemi2.contenuto.id_contenuto,
              ty_contenuto,
              id_contenuto_rif,
              ty_sottotipo_contenuto,
              nr_ordine_visualizzazione,
              pg_versione,
              tl_testo_1,
              tl_testo_2,
              tl_testo_3,
              tl_testo_4,
              tl_testo_5,
              ln_link_1,
              ln_link_2,
              id_media1,
              media1.nm_nome_media as nm_nome_media1,
              convert_from(media1.oj_media,'UTF-8') as oj_media1,
              media2.nm_nome_media as nm_nome_media2,
              convert_from(media2.oj_media,'UTF-8') as oj_media2,
              id_media2,
              id_media3,
              dt_inizio_val,
              dt_fine_val,
              js_dati_contenuto,
              wemi2.contenuto.ts_creazione
              FROM    wemi2.contenuto
              left JOIN wemi2.contenuto_stt ON wemi2.contenuto_stt.id_contenuto= wemi2.contenuto.id_contenuto
              left join wemi2.media as media1 on media1.id_media = wemi2.contenuto.id_media1
              left join wemi2.media as media2 on media2.id_media = wemi2.contenuto.id_media2
              left join wemi2.media as media3 on media3.id_media = wemi2.contenuto.id_media3
      where ${parent.args && parent.args.stt == 11 ? '(cd_stato_contenuto=2 or cd_stato_contenuto=1 ) and ' :
          'cd_stato_contenuto=2 and '}  wemi2.contenuto.ty_contenuto = 11 and    ts_variazione_stato = (
        select MAX(ts_variazione_stato)
        from wemi2.contenuto_stt
          where wemi2.contenuto_stt.id_contenuto =   wemi2.contenuto.id_contenuto 
      )
      ORDER BY nr_ordine_visualizzazione ASC`;


      return await context.db.any(sql, parent);
    },
  },
  Query: {

    EstraiTag: async (parent, args, context, info) => {
      const dao = new ServizioGeneraleDao(context.db);
      return await dao.findTagsByFilter(args.string);
    },
    EstraiListaCategorieAccreditamento: async (parent, args, context, info) => {
      let result = []
      const sql = `
        select id_contenuto, tl_testo_1 from ${context.tabelle.contenuto} where ty_contenuto = 13
      `;
      context.logger.info("sql: estratte categorie accreditamento ")
      await context.db.any(sql, args).then(risultato => result = risultato).catch(error => { throw new Error(error) });
      return result;
    },

    EstraiListaCategorieAccreditamentoPubblicate: async (parent, args, context, info) => {
      let result = []
      const sql = `
        SELECT contenuto.id_contenuto, 
        tl_testo_1 
        FROM ${context.tabelle.contenuto} AS contenuto
        LEFT JOIN ${context.tabelle.contenuto_stt} st on contenuto.id_contenuto = st.id_contenuto
        WHERE contenuto.ty_contenuto = 13
          AND st.cd_stato_contenuto = 2 
          AND st.ts_variazione_stato = (SELECT max(st2.ts_variazione_stato)
                          FROM ${context.tabelle.contenuto_stt} AS st2
                          WHERE st2.id_contenuto = contenuto.id_contenuto)
        ORDER BY nr_ordine_visualizzazione;
      `;
      context.logger.info("sql: estratte categorie accreditamento ")
      await context.db.any(sql, args).then(risultato => result = risultato).catch(error => { throw new Error(error) });
      return result;
    },

    EstraiContenutoCompleto: async (parent, args, context, info) => {
      let result;
      const sql = `
        select 
        contenuto_principale.id_contenuto,
        contenuto_principale.ty_contenuto, 
        contenuto_principale.id_contenuto_rif,
        contenuto_principale.ty_sottotipo_contenuto, 
        contenuto_principale.nr_ordine_visualizzazione, 
        contenuto_principale.pg_versione, 
        contenuto_principale.tl_testo_1, 
        contenuto_principale.tl_testo_2, 
        contenuto_principale.tl_testo_3, 
        contenuto_principale.tl_testo_4, 
        contenuto_principale.tl_testo_5, 
        contenuto_principale.ln_link_1, 
        contenuto_principale.ln_link_2, 
        contenuto_principale.id_media1, 
        contenuto_principale.id_media2, 
        contenuto_principale.id_media3, 
        contenuto_principale.dt_inizio_val::timestamp with time zone, 
        contenuto_principale.dt_fine_val::timestamp with time zone,
        contenuto_principale.js_dati_contenuto, 
        contenuto_principale.ts_creazione,
        associato.id_contenuto as associato_id_contenuto,
        associato.ty_contenuto as associato_ty_contenuto, 
        associato.id_contenuto_rif as associato_id_contenuto_rif,
        associato.ty_sottotipo_contenuto as associato_ty_sottotipo, 
        associato.nr_ordine_visualizzazione as associato_ordine_visualizzazione, 
        associato.pg_versione as associato_pg_versione, 
        associato.tl_testo_1 as associato_tl_testo_1, 
        associato.tl_testo_2 as associato_tl_testo_2, 
        associato.tl_testo_3 as associato_tl_testo_3, 
        associato.tl_testo_4 as associato_tl_testo_4, 
        associato.tl_testo_5 as associato_tl_testo_5, 
        associato.ln_link_1 as associato_ln_link_1, 
        associato.ln_link_2 as associato_ln_link_2, 
        associato.id_media1 as associato_id_media_1, 
        associato.id_media2 as associato_id_media_2, 
        associato.id_media3 as associato_id_media_3, 
        associato.dt_inizio_val as associato_dt_inizio_val, 
        associato.dt_fine_val as associato_dt_fine_val,
        associato.js_dati_contenuto as associato_js_dati_contenuto, 
        associato.ts_creazione as associato_ts_creazione,
        media1.id_media as media1_id_media,
        media1.ty_mime_type_media as media1_ty_mime,
        media1.nm_nome_media as media1_nm_nome_media,
        convert_from(media1.oj_media,'UTF-8') as media1_oj_media,
        media1.ts_creazione as media1_ts_creazione,
        media2.id_media as media2_id_media,
        media2.ty_mime_type_media as media2_ty_mime,
        media2.nm_nome_media as media2_nm_nome_media,
        convert_from(media2.oj_media,'UTF-8') as media2_oj_media,
        media2.ts_creazione as media2_ts_creazione,
        media3.id_media as media3_id_media,
        media3.ty_mime_type_media as media3_ty_mime,
        media3.nm_nome_media as media3_nm_nome_media,
        convert_from(media3.oj_media,'UTF-8') as media3_oj_media,
        media3.ts_creazione as media3_ts_creazione,
        servizio.cd_unita_prezzo,
        servizio.tx_tags_ricerca,
        servizio.id_categoria_accreditamento
        from ${context.tabelle.contenuto} as contenuto_principale
        left join ${context.tabelle.media} as media1 ON media1.id_media = contenuto_principale.id_media1
        left join ${context.tabelle.media} as media2 ON media2.id_media = contenuto_principale.id_media2
        left join ${context.tabelle.media} as media3 ON media3.id_media = contenuto_principale.id_media3
        left join ${context.tabelle.contenuto_associato} ON id_contenuto_primario 
        = contenuto_principale.id_contenuto
        left join ${context.tabelle.servizio} ON contenuto_principale.id_contenuto = id_servizio
        left outer join ${context.tabelle.contenuto} as associato ON associato.id_contenuto = id_contenuto_associato
        where contenuto_principale.id_contenuto = $[idContenuto]
        ORDER BY contenuto_principale.nr_ordine_visualizzazione ASC
        `;

      await context.db.any(sql, args).then(risultato => result = risultato).catch(error => { throw new Error(error) });

      let contenutoCompleto = {};
      if (result.length > 0) {
        contenutoCompleto.id_contenuto = result[0].id_contenuto;
        contenutoCompleto.ty_contenuto = result[0].ty_contenuto;
        contenutoCompleto.id_contenuto_rif = result[0].id_contenuto_rif;
        contenutoCompleto.ty_sottotipo_contenuto = result[0].ty_sottotipo_contenuto;
        contenutoCompleto.nr_ordine_visualizzazione = result[0].nr_ordine_visualizzazione;
        contenutoCompleto.pg_versione = result[0].pg_versione;
        contenutoCompleto.tl_testo_1 = result[0].tl_testo_1;
        contenutoCompleto.tl_testo_2 = result[0].tl_testo_2;
        contenutoCompleto.tl_testo_3 = result[0].tl_testo_3;
        contenutoCompleto.tl_testo_4 = result[0].tl_testo_4;
        contenutoCompleto.tl_testo_5 = result[0].tl_testo_5;
        contenutoCompleto.ln_link_1 = result[0].ln_link_1;
        contenutoCompleto.ln_link_2 = result[0].ln_link_2;
        contenutoCompleto.id_media1 = result[0].id_media1;
        contenutoCompleto.id_media2 = result[0].id_media2;
        contenutoCompleto.id_media3 = result[0].id_media3;
        contenutoCompleto.dt_inizio_val = result[0].dt_inizio_val;
        contenutoCompleto.dt_fine_val = result[0].dt_fine_val;
        contenutoCompleto.js_dati_contenuto = result[0].js_dati_contenuto;
        contenutoCompleto.ts_creazione = result[0].ts_creazione;
        contenutoCompleto.associati = [];
        contenutoCompleto.media1 = {};
        contenutoCompleto.media1.id_media = result[0].media1_id_media;
        contenutoCompleto.media1.ty_mime_type_media = result[0].media1_ty_mime;
        contenutoCompleto.media1.nm_nome_media = result[0].media1_nm_nome_media;
        contenutoCompleto.media1.oj_media = result[0].media1_oj_media;
        contenutoCompleto.media1.ts_creazione = result[0].media1_ts_creazione;
        contenutoCompleto.media2 = {};
        contenutoCompleto.media2.id_media = result[0].media2_id_media;
        contenutoCompleto.media2.ty_mime_type_media = result[0].media2_ty_mime;
        contenutoCompleto.media2.nm_nome_media = result[0].media2_nm_nome_media;
        contenutoCompleto.media2.oj_media = result[0].media2_oj_media;
        contenutoCompleto.media2.ts_creazione = result[0].media2_ts_creazione;
        contenutoCompleto.media3 = {};
        contenutoCompleto.media3.id_media = result[0].media3_id_media;
        contenutoCompleto.media3.ty_mime_type_media = result[0].media3_ty_mime;
        contenutoCompleto.media3.nm_nome_media = result[0].media3_nm_nome_media;
        contenutoCompleto.media3.oj_media = result[0].media3_oj_media;
        contenutoCompleto.media3.ts_creazione = result[0].media3_ts_creazione;
        contenutoCompleto.tagsRicerca = result[0].tx_tags_ricerca;
        contenutoCompleto.unitaPrezzo = result[0].cd_unita_prezzo;
        contenutoCompleto.idCategoriaAccreditamento = result[0].id_categoria_accreditamento;
        for (let i = 0; i < result.length; i += 1)
          for (let j = 0; j < result.length; j += 1)
            if (result[i].id_contenuto === result[j].id_contenuto) {
              let found = false;
              for (let z = 0; z < contenutoCompleto.associati.length; z += 1)
                if (contenutoCompleto.associati[z].id_contenuto === result[j].associato_id_contenuto)
                  found = true;
              if (!found)
                contenutoCompleto.associati.push({
                  id_contenuto: result[j].associato_id_contenuto,
                  ty_contenuto: result[j].associato_ty_contenuto,
                  id_contenuto_rif: result[j].associato_id_contenuto_rif,
                  ty_sottotipo_contenuto: result[j].associato_ty_sottotipo,
                  nr_ordine_visualizzazione: result[j].associato_ordine_visualizzazione,
                  pg_versione: result[j].associato_pg_versione,
                  tl_testo_1: result[j].associato_tl_testo_1,
                  tl_testo_2: result[j].associato_tl_testo_2,
                  tl_testo_3: result[j].associato_tl_testo_3,
                  tl_testo_4: result[j].associato_tl_testo_4,
                  tl_testo_5: result[j].associato_tl_testo_5,
                  ln_link_1: result[j].associato_ln_link_1,
                  ln_link_2: result[j].associato_ln_link_2,
                  id_media1: result[j].associato_id_media_1,
                  id_media2: result[j].associato_id_media_2,
                  id_media3: result[j].associato_id_media_3
                });
            }
        const controllerArea = new AreaContentManagement(context);
        const area = await controllerArea.getArea({ id: args.idContenuto });
        contenutoCompleto.associates = area.associates;
      }
      else {
        contenutoCompleto.id_contenuto = -1;
      }
      //gli associati vengono ordinati per nr_ordine_visualizzazione
      contenutoCompleto.associati.sort((a,b) => a.nr_ordine_visualizzazione - b.nr_ordine_visualizzazione );

      return contenutoCompleto;
    },
    queryFooter: async (parent, args, context, info) => {

      return { idFooter: 1, args };

    },
    estraiVociMenuPreviewLivello1: async (parent, args, context, info) => {
      let result;
      const sql = `
      SELECT liv1.id_contenuto as "idLiv1",
      liv1.tl_testo_1 as "txLiv1",
      liv1.ln_link_1 as "linkLiv1",
      liv1.js_dati_contenuto as "jsDatiContenuto",
      livello2.cd_stato_contenuto as "statoLiv2",
      liv2.id_contenuto as "idLiv2",
      liv2.tl_testo_1 as "txLiv2",
      liv2.ln_link_1 as "linkLiv2",
      liv2.ty_sottotipo_contenuto as "sottotipo",
      media1.id_media as media1_id,
      convert_from(media1.oj_media,'UTF-8') as media1_oj,
      media1.ty_mime_type_media as media1_mime_type, 
      media1.nm_nome_media as media1_nm
      FROM  ${context.tabelle.contenuto} as liv1
      LEFT JOIN ${context.tabelle.contenuto_associato} as associazione ON associazione.id_contenuto_associato = liv1.id_contenuto_rif
      LEFT JOIN ${context.tabelle.contenuto} as liv2 ON liv2.id_contenuto = associazione.id_contenuto_primario
      LEFT JOIN ${context.tabelle.media} as media1 ON media1.id_media = liv2.id_media2 
      LEFT JOIN wemi2.contenuto_stt as livello1 ON livello1.id_contenuto= liv1.id_contenuto
      LEFT JOIN wemi2.contenuto_stt as livello2 ON livello2.id_contenuto = liv2.id_contenuto 
      where liv1.ty_contenuto = 1 and 
      (liv2.id_contenuto is null or liv2.ty_contenuto = 2) and 
      (livello1.cd_stato_contenuto=2 or livello1.cd_stato_contenuto=1 ) and
      livello1.ts_variazione_stato = (
        select MAX(ts_variazione_stato)
        from wemi2.contenuto_stt
          where id_contenuto =  liv1.id_contenuto 
      )   and (livello2.id_contenuto is null or livello2.ts_variazione_stato = (select MAX(ts_variazione_stato) 
      from wemi2.contenuto_stt 
      where id_contenuto =  liv2.id_contenuto)) 
      
      order by liv1.nr_ordine_visualizzazione ASC
          `;

      await context.db.any(sql, args).then(risultato => result = risultato);

      // const sql=`SELECT 
      // ${context.tabelle.contenuto}.id_contenuto as "idLiv2",
      // ${context.tabelle.contenuto}.tl_testo_1 as "txLiv2",
      // ${context.tabelle.contenuto}.ln_link_1 as "linkLiv2",
      // ${context.tabelle.contenuto}.ty_sottotipo_contenuto as "sottotipo",
      // media1.id_media as media1_id,
      // convert_from(media1.oj_media,'UTF-8') as media1_oj,
      // media1.ty_mime_type_media as media1_mime_type, 
      // media1.nm_nome_media as media1_nm,
      // ts_variazione_stato
      // FROM ${context.tabelle.contenuto} 
      // LEFT JOIN ${context.tabelle.contenuto_associato} ON id_contenuto_associato = contenuto.id_contenuto_rif
      // LEFT JOIN ${context.tabelle.contenuto} as contenuto1 ON contenuto1.id_contenuto = id_contenuto_primario  
      // LEFT JOIN ${context.tabelle.media} as media1 ON media1.id_media = ${context.tabelle.contenuto}.id_media2 
      // LEFT JOIN wemi2.contenuto_stt  ON contenuto_stt.id_contenuto= contenuto.id_contenuto
      // where  contenuto.ty_contenuto = 2 and contenuto_stt.cd_stato_contenuto = 2  and contenuto_stt.ts_variazione_stato = (
      //   select MAX(ts_variazione_stato)
      //   from wemi2.contenuto_stt 
      //     where  wemi2.contenuto_stt .id_contenuto = contenuto.id_contenuto 
      // ) 

      // order by contenuto.nr_ordine_visualizzazione ASC`
      // ;
      //       
      //       let result = await context.db.many(sql,args)


      let livello1 = []

      for (let i = 0; i < result.length; i += 1) {
        let array = []
        for (let j = 0; j < result.length; j += 1) {
          if (result[i].idLiv1 === result[j].idLiv1 && result[j].idLiv2 && result[j].statoLiv2 == 2)
            array.push({
              idLiv2: result[j].idLiv2,
              txLiv2: result[j].txLiv2,
              linkLiv2: result[j].linkLiv2,
              sottotipo: result[j].sottotipo,
              media1: {
                id_media: result[j].media1_id,
                oj_media: result[j].media1_oj,
                nm_nome_media: result[j].media1_nm,
                ty_mime_type_media: result[j].media1_mime_type
              }
            })
        }
        let found = false;
        for (let z = 0; z < livello1.length; z++)
          if (livello1[z].idLiv1 === result[i].idLiv1)
            found = true;
        if (!found)
          livello1.push({
            idLiv1: result[i].idLiv1,
            txLiv1: result[i].txLiv1,
            linkLiv1: result[i].linkLiv1,
            footerColDx: !isNullOrUndefined(result[i].jsDatiContenuto) ? result[i].jsDatiContenuto.footer_col_dx : false,
            liv2: array
          })
      }

      return livello1;


    },

    estraiVociMenuPreviewLivello2: async (parent, args, context, info) => {
      let result;
      const sql = `
      SELECT liv1.id_contenuto as "idLiv1",
      liv1.tl_testo_1 as "txLiv1",
      liv1.ln_link_1 as "linkLiv1",
      liv1.js_dati_contenuto as "jsDatiContenuto",
      livello2.cd_stato_contenuto as "statoLiv2",
      liv2.id_contenuto as "idLiv2",
      liv2.tl_testo_1 as "txLiv2",
      liv2.ln_link_1 as "linkLiv2",
      liv2.ty_sottotipo_contenuto as "sottotipo",
      media1.id_media as media1_id,
      convert_from(media1.oj_media,'UTF-8') as media1_oj,
      media1.ty_mime_type_media as media1_mime_type, 
      media1.nm_nome_media as media1_nm
      FROM  ${context.tabelle.contenuto} as liv1
      LEFT JOIN ${context.tabelle.contenuto_associato} as associazione ON associazione.id_contenuto_associato = liv1.id_contenuto_rif and nm_relazione = 'ML1'
      LEFT JOIN ${context.tabelle.contenuto} as liv2 ON liv2.id_contenuto = associazione.id_contenuto_primario
      LEFT JOIN ${context.tabelle.media} as media1 ON media1.id_media = liv2.id_media2 
      LEFT JOIN wemi2.contenuto_stt as livello1 ON livello1.id_contenuto= liv1.id_contenuto
      LEFT JOIN wemi2.contenuto_stt as livello2 ON livello2.id_contenuto = liv2.id_contenuto 
      where liv1.ty_contenuto = 1 and 
      (liv2.id_contenuto is null or liv2.ty_contenuto = 2) and 
      livello1.cd_stato_contenuto=2 and 
      livello1.ts_variazione_stato = (
        select MAX(ts_variazione_stato)
        from wemi2.contenuto_stt
          where id_contenuto =  liv1.id_contenuto 
      )   and (livello2.id_contenuto is null or livello2.ts_variazione_stato = 
        (select MAX(ts_variazione_stato) 
         from wemi2.contenuto_stt  
         where id_contenuto =  liv2.id_contenuto)) 
      
      order by liv1.nr_ordine_visualizzazione ASC
          `;

      await context.db.any(sql, args).then(risultato => result = risultato);

      // const sql=`SELECT 
      // ${context.tabelle.contenuto}.id_contenuto as "idLiv2",
      // ${context.tabelle.contenuto}.tl_testo_1 as "txLiv2",
      // ${context.tabelle.contenuto}.ln_link_1 as "linkLiv2",
      // ${context.tabelle.contenuto}.ty_sottotipo_contenuto as "sottotipo",
      // media1.id_media as media1_id,
      // convert_from(media1.oj_media,'UTF-8') as media1_oj,
      // media1.ty_mime_type_media as media1_mime_type, 
      // media1.nm_nome_media as media1_nm,
      // ts_variazione_stato
      // FROM ${context.tabelle.contenuto} 
      // LEFT JOIN ${context.tabelle.contenuto_associato} ON id_contenuto_associato = contenuto.id_contenuto_rif
      // LEFT JOIN ${context.tabelle.contenuto} as contenuto1 ON contenuto1.id_contenuto = id_contenuto_primario  
      // LEFT JOIN ${context.tabelle.media} as media1 ON media1.id_media = ${context.tabelle.contenuto}.id_media2 
      // LEFT JOIN wemi2.contenuto_stt  ON contenuto_stt.id_contenuto= contenuto.id_contenuto
      // where  contenuto.ty_contenuto = 2 and contenuto_stt.cd_stato_contenuto = 2  and contenuto_stt.ts_variazione_stato = (
      //   select MAX(ts_variazione_stato)
      //   from wemi2.contenuto_stt 
      //     where  wemi2.contenuto_stt .id_contenuto = contenuto.id_contenuto 
      // ) 

      // order by contenuto.nr_ordine_visualizzazione ASC`
      // ;
      //       
      //       let result = await context.db.many(sql,args)


      let livello1 = []

      for (let i = 0; i < result.length; i += 1) {
        let array = []
        for (let j = 0; j < result.length; j += 1) {
          if (result[i].idLiv1 === result[j].idLiv1 && (result[j].idLiv2 && result[j].statoLiv2 == 2 || result[j].statoLiv2 == 1))
            array.push({
              idLiv2: result[j].idLiv2,
              txLiv2: result[j].txLiv2,
              linkLiv2: result[j].linkLiv2,
              sottotipo: result[j].sottotipo,
              media1: {
                id_media: result[j].media1_id,
                oj_media: result[j].media1_oj,
                nm_nome_media: result[j].media1_nm,
                ty_mime_type_media: result[j].media1_mime_type
              }
            })
        }
        let found = false;
        for (let z = 0; z < livello1.length; z++)
          if (livello1[z].idLiv1 === result[i].idLiv1)
            found = true;
        if (!found)
          livello1.push({
            idLiv1: result[i].idLiv1,
            txLiv1: result[i].txLiv1,
            linkLiv1: result[i].linkLiv1,
            footerColDx: !isNullOrUndefined(result[i].jsDatiContenuto) ? result[i].jsDatiContenuto.footer_col_dx : false,
            liv2: array
          })
      }

      return livello1;


    },
    estraiVociMenu: async (parent, args, context, info) => {
      let result;
      const sql = `
      SELECT liv1.id_contenuto as "idLiv1",
      liv1.tl_testo_1 as "txLiv1",
      liv1.ln_link_1 as "linkLiv1",
      liv1.js_dati_contenuto as "jsDatiContenuto",
      livello2.cd_stato_contenuto as "statoLiv2",
      liv2.id_contenuto as "idLiv2",
      liv2.tl_testo_1 as "txLiv2",
      liv2.ln_link_1 as "linkLiv2",
      liv2.ty_sottotipo_contenuto as "sottotipo",
      media1.id_media as media1_id,
      convert_from(media1.oj_media,'UTF-8') as media1_oj,
      media1.ty_mime_type_media as media1_mime_type, 
      media1.nm_nome_media as media1_nm
      FROM  ${context.tabelle.contenuto} as liv1
      LEFT JOIN ${context.tabelle.contenuto_associato} as associazione ON associazione.id_contenuto_associato = liv1.id_contenuto_rif
      LEFT JOIN ${context.tabelle.contenuto} as liv2 ON liv2.id_contenuto = associazione.id_contenuto_primario
      LEFT JOIN ${context.tabelle.media} as media1 ON media1.id_media = liv2.id_media2 
      LEFT JOIN wemi2.contenuto_stt as livello1 ON livello1.id_contenuto= liv1.id_contenuto
      LEFT JOIN wemi2.contenuto_stt as livello2 ON livello2.id_contenuto = liv2.id_contenuto 
      where liv1.ty_contenuto = 1 and 
      (liv2.id_contenuto is null or liv2.ty_contenuto = 2) and 
      livello1.cd_stato_contenuto=2 and 
      livello1.ts_variazione_stato = (
        select MAX(ts_variazione_stato)
        from wemi2.contenuto_stt
          where id_contenuto =  liv1.id_contenuto 
      )   and (livello2.id_contenuto is null or livello2.ts_variazione_stato = (select MAX(ts_variazione_stato) 
      from wemi2.contenuto_stt 
      where id_contenuto =  liv2.id_contenuto)) 
      order by liv1.nr_ordine_visualizzazione ASC, liv2.nr_ordine_visualizzazione ASC
          `;

      await context.db.any(sql, args).then(risultato => result = risultato);

      let livello1 = []

      for (let i = 0; i < result.length; i += 1) {
        let array = []
        for (let j = 0; j < result.length; j += 1) {
          if (result[i].idLiv1 === result[j].idLiv1 && result[j].idLiv2 && result[j].statoLiv2 == 2)
            array.push({
              idLiv2: result[j].idLiv2,
              txLiv2: result[j].txLiv2,
              linkLiv2: result[j].linkLiv2,
              sottotipo: result[j].sottotipo,
              media1: {
                id_media: result[j].media1_id,
                oj_media: result[j].media1_oj,
                nm_nome_media: result[j].media1_nm,
                ty_mime_type_media: result[j].media1_mime_type
              }
            })
        }
        let found = false;
        for (let z = 0; z < livello1.length; z++)
          if (livello1[z].idLiv1 === result[i].idLiv1)
            found = true;
        if (!found)
          livello1.push({
            idLiv1: result[i].idLiv1,
            txLiv1: result[i].txLiv1,
            linkLiv1: result[i].linkLiv1,
            footerColDx: !isNullOrUndefined(result[i].jsDatiContenuto) ? result[i].jsDatiContenuto.footer_col_dx : false,
            liv2: array
          })
      }
      return livello1;
    },

    contenutoAll: async (parent, args, context, info) => {
      const sql = `
          SELECT  
                id_contenuto,
                ty_contenuto,
                id_contenuto_rif,
                ty_sottotipo_contenuto,
                nr_ordine_visualizzazione,
                pg_versione,
                tl_testo_1,
                tl_testo_2,
                tl_testo_3,
                tl_testo_4,
                tl_testo_5,
                ln_link_1,
                ln_link_2,
                id_media1,
                id_media2,
                id_media3,
                dt_inizio_val,
                dt_fine_val,
                js_dati_contenuto,
                ts_creazione
          FROM    ${context.tabelle.contenuto}
          ORDER BY id_contenuto;
          `;

      return await context.db.any(sql, args);
    },
    contenutoTestoSchedaIntrod: async (parent, args, context, info) => {
      args.language = args.language || 'it';



      const sql = `
      SELECT
       ${context.tabelle.contenuto}.tl_testo_1,
       ${context.tabelle.contenuto}.tl_testo_2,
       ${context.tabelle.contenuto}.tl_testo_3
      
      FROM    ${context.tabelle.contenuto} 
      LEFT JOIN wemi2.contenuto_stt ON wemi2.contenuto_stt.id_contenuto= contenuto.id_contenuto
      where ${args && !args.stt ? 'cd_stato_contenuto=2 and ' : '(cd_stato_contenuto=2 or cd_stato_contenuto=1 ) and '} contenuto.ty_contenuto = $[ty_contenuto]    and ts_variazione_stato = (
        select MAX(ts_variazione_stato)
        from wemi2.contenuto_stt
          where id_contenuto =  contenuto.id_contenuto 
      ) `

      return await context.db.any(sql, args);
    },
    contenutoPK: async (parent, args, context, info) => {
      const sql = `
        SELECT  
                id_contenuto,
                ty_contenuto,
                id_contenuto_rif,
                ty_sottotipo_contenuto,
                nr_ordine_visualizzazione,
                pg_versione,
                tl_testo_1,
                tl_testo_2,
                tl_testo_3,
                tl_testo_4,
                tl_testo_5,
                ln_link_1,
                ln_link_2,
                id_media1,
                id_media2,
                id_media3,
                dt_inizio_val,
                dt_fine_val,
                js_dati_contenuto,
                ts_creazione
        FROM    ${context.tabelle.contenuto}
        WHERE   id_contenuto = $[id_contenuto]`;

      return await context.db.oneOrNone(sql, args);
    },

    contenutoByTy: async (parent, args, context, info) => {
      const sql = `
        SELECT  
                id_contenuto,
                ty_contenuto,
                id_contenuto_rif,
                ty_sottotipo_contenuto,
                nr_ordine_visualizzazione,
                pg_versione,
                tl_testo_1,
                tl_testo_2,
                tl_testo_3,
                tl_testo_4,
                tl_testo_5,
                ln_link_1,
                ln_link_2,
                id_media1,
                id_media2,
                id_media3,
                dt_inizio_val,
                dt_fine_val,
                js_dati_contenuto,
                ts_creazione
        FROM    ${context.tabelle.contenuto}
        WHERE   ty_contenuto = $[ty_contenuto]
        ORDER BY nr_ordine_visualizzazione ASC`;
      return await context.db.any(sql, args);
    },

    contenutoPubblicatoByTy: async (parent, args, context, info) => {
      const contenutoDAO = new ContenutoDAO(context.db, context.formatter);
      return contenutoDAO.getPublishedContentsByType(args.ty_contenuto);
    },
    //query per estrazione qualifiche pubblicate da parte dell'admin, da fare vedere nella scheda servizi
    contenutoPerQualifiche: async (parent, args, context, info) => {

      const sql = `
      SELECT  
      contenuto.id_contenuto,
      ty_contenuto,
      id_contenuto_rif,
      ty_sottotipo_contenuto,
      nr_ordine_visualizzazione,
      pg_versione,
      tl_testo_1,
      tl_testo_2,
      tl_testo_3,
      tl_testo_4,
      tl_testo_5,
      ln_link_1,
      ln_link_2,
      id_media1,
      id_media2,
      id_media3,
      dt_inizio_val,
      dt_fine_val,
      js_dati_contenuto,
      ts_creazione
FROM    ${context.tabelle.contenuto}
LEFT JOIN wemi2.contenuto_stt ON wemi2.contenuto_stt.id_contenuto= contenuto.id_contenuto
WHERE   ty_contenuto = 18 and contenuto_stt.cd_stato_contenuto = 2 and    ts_variazione_stato = (
  select MAX(ts_variazione_stato)
  from wemi2.contenuto_stt
    where wemi2.contenuto_stt.id_contenuto =   wemi2.contenuto.id_contenuto 
)
ORDER BY nr_ordine_visualizzazione ASC
      `
      return await context.db.any(sql, args);
    },

    contenutoByTyS: async (parent, args, context, info) => {
      args.language = args.language || 'it';
      const sql = `
      SELECT
      ${context.tabelle.contenuto}.id_contenuto AS "value",
        tl_testo_1,
        coalesce(tl_testo_1 ->> $[language], tl_testo_1 ->> 'it') AS "textValue"
      FROM    ${context.tabelle.contenuto}
      LEFT JOIN wemi2.contenuto_stt as livello1 ON livello1.id_contenuto= contenuto.id_contenuto
      WHERE   ty_contenuto = $[ty_contenuto] and livello1.cd_stato_contenuto = 2 and 
      livello1.ts_variazione_stato = (
        select MAX(ts_variazione_stato)
        from wemi2.contenuto_stt
         where id_contenuto = contenuto.id_contenuto )`;
      return await context.db.any(sql, args);
    },

    contenutoTy: async (parent, args, context, info) => {

      args.cd_stato_contenuto = args.cd_stato_contenuto || null;

      args.ricerca = args.ricerca ? '%' + args.ricerca + '%' : null;

      return await context.db.task(async t => {

        const counter = await t.one(findCountOfContentWithState, args);

        const data = await t.any(findContentWithState, args);

        const dataToReturn = [];

        for (const value of data) {
          value.count = counter.count;
          dataToReturn.push(value);
        }

        return dataToReturn;

      });

    },

    contenutoMediaPK: async (parent, args, context, info) => {
      const sql = `
      SELECT
      c.id_contenuto,
      ty_contenuto,
      id_contenuto_rif,
      ty_sottotipo_contenuto,
      nr_ordine_visualizzazione,
      pg_versione,
      tl_testo_1,
      tl_testo_2,
      tl_testo_3,
      tl_testo_4,
      tl_testo_5,
      ln_link_1,
      ln_link_2,
      id_media1,
      id_media2,
      id_media3,
      dt_inizio_val,
      dt_fine_val,
      js_dati_contenuto,
      c.ts_creazione,

      id_contenuto_primario,
      id_contenuto_associato,
      nm_relazione,
      cass.ts_creazione AS "ts_creazioneASS",

      -- cstt.id_contenuto AS "id_contenutoSTT",
      ts_variazione_stato,
      cd_stato_contenuto,
      id_utente,
      -- m1.id_media AS "id_media1",
      m1.ty_mime_type_media AS "ty_mime_type_media1",
      m1.nm_nome_media AS "nm_nome_media1",
      convert_from(m1.oj_media, 'UTF-8') AS "oj_media1",
      -- m2.id_media AS "id_media2",
      m2.ty_mime_type_media AS "ty_mime_type_media2",
      m2.nm_nome_media AS "nm_nome_media2",
      convert_from(m2.oj_media, 'UTF-8') AS "oj_media2",
      -- m3.id_media AS "id_media3",
      m3.ty_mime_type_media AS "ty_mime_type_media3",
      m3.nm_nome_media AS "nm_nome_media3",
      convert_from(m3.oj_media, 'UTF-8') as "oj_media3"

FROM ${context.tabelle.contenuto} c

 LEFT OUTER JOIN ${context.tabelle.contenuto_associato} cass
  ON (c.id_contenuto = id_contenuto_primario)
  
 LEFT OUTER JOIN ${context.tabelle.contenuto_stt} cstt
  ON (c.id_contenuto = cstt.id_contenuto)

 LEFT OUTER JOIN ${context.tabelle.media} m1
  ON (c.id_media1 = m1.id_media)

 LEFT OUTER JOIN ${context.tabelle.media} m2
  ON (c.id_media2 = m2.id_media)

 LEFT OUTER JOIN ${context.tabelle.media} m3
  ON (c.id_media3 = m3.id_media)

WHERE c.id_contenuto= $[id_contenuto] and ts_variazione_stato = (select max(ts_variazione_stato)
from ${context.tabelle.contenuto_stt}
where id_contenuto = $[id_contenuto])
;
`;
      let r = await context.db.any(sql, args);
      let jsonContent = { ...r };
      for (const content of r) {
        jsonContent = content
      }
      context.logger.info(jsonContent);
      // context.logger.info("PSQL", r)
      const numberKeys = Object.keys(jsonContent)?.length;
      if(numberKeys === 0 || !numberKeys) {
        // result is empty
        throw new ApolloError(CONTENT_MEDIA_PK_ID_ERROR.message, CONTENT_MEDIA_PK_ID_ERROR.code);
      }
      return jsonContent;

    },

    contenutoById: async (parent, args, context, info) => {
      const contenutoDAO = new ContenutoDAO(context.db, context.formatter);
      return contenutoDAO.getPublishedContentById(args.idContenuto);
    },

    contenutoTestoCarousel: async (parent, args, context, info) => {
      args.language = args.language || 'it';
      const sql = `
        SELECT
          ${context.tabelle.contenuto}.tl_testo_1,
          ${context.tabelle.contenuto}.tl_testo_2,
          ${context.tabelle.contenuto}.tl_testo_3,
          ${context.tabelle.contenuto}.tl_testo_4,
          ${context.tabelle.contenuto}.tl_testo_5,
          ${context.tabelle.contenuto}.ln_link_1,

          ${context.tabelle.contenuto}.id_contenuto,
          ${context.tabelle.contenuto}.nr_ordine_visualizzazione,
          convert_from(m1.oj_media, 'UTF-8') AS "oj_media1",
          CONCAT('${STORAGE_ABS_PATH}', '/', m1.iw_path) AS "iw_path_media1",
          convert_from(m2.oj_media, 'UTF-8')  AS "oj_media2",
          convert_from(m3.oj_media, 'UTF-8') AS "oj_media3"
        FROM    ${context.tabelle.contenuto} 
        left join ${context.tabelle.media} as m1 on id_media1 = m1.id_media
        left join ${context.tabelle.media} as m2 on id_media2 = m2.id_media
        left join ${context.tabelle.media} as m3 on id_media3 = m3.id_media
        LEFT JOIN wemi2.contenuto_stt ON wemi2.contenuto_stt.id_contenuto= contenuto.id_contenuto
        where ${args && !args.stt ? 'cd_stato_contenuto=2 and ' : '(cd_stato_contenuto=2 or cd_stato_contenuto=1 ) and '} contenuto.ty_contenuto = $[ty_contenuto]   and ts_variazione_stato = (
          select MAX(ts_variazione_stato)
          from wemi2.contenuto_stt
            where id_contenuto =  contenuto.id_contenuto 
        ) 
        ORDER BY nr_ordine_visualizzazione`;

      return await context.db.any(sql, args);
    },

    contenutoCards: async (parent, args, context, info) => {
      args.language = args.language || 'it';
      const sql = `

      SELECT
        ${context.tabelle.contenuto}.tl_testo_1,
        ${context.tabelle.contenuto}.tl_testo_2,
        ${context.tabelle.contenuto}.tl_testo_3,
        ${context.tabelle.contenuto}.id_contenuto,
        convert_from(m1.oj_media, 'UTF-8') AS "oj_media1",
        CONCAT('${STORAGE_ABS_PATH}', '/', m1.iw_path) AS "iw_path_media1",
      ${context.tabelle.contenuto}.nr_ordine_visualizzazione

      FROM    ${context.tabelle.contenuto} 

      left join ${context.tabelle.media} as m1 on id_media1 = m1.id_media
      LEFT JOIN wemi2.contenuto_stt ON wemi2.contenuto_stt.id_contenuto= contenuto.id_contenuto
      where ${args && !args.stt ? 'cd_stato_contenuto=2 and ' : '(cd_stato_contenuto=2 or cd_stato_contenuto=1 ) and '} contenuto.ty_contenuto = $[ty_contenuto]    and ts_variazione_stato = (
        select MAX(ts_variazione_stato)
        from wemi2.contenuto_stt
          where id_contenuto =  contenuto.id_contenuto 
      )
      ORDER BY nr_ordine_visualizzazione`
      return await context.db.any(sql, args);
    },



    contenutoSpazioSingoloWemi: async (parent, args, context, info) => {
      args.language = args.language || 'it';
      const sql = `
      SELECT
       ${context.tabelle.contenuto}.tl_testo_1,
       ${context.tabelle.contenuto}.tl_testo_2,
       ${context.tabelle.contenuto}.tl_testo_3,
       ${context.tabelle.contenuto}.tl_testo_4,
       ${context.tabelle.contenuto}.tl_testo_5,
       ${context.tabelle.contenuto}.js_dati_contenuto,
       ${context.tabelle.contenuto}.id_contenuto,
        convert_from(m1.oj_media, 'UTF-8') AS "oj_media1"
      FROM    ${context.tabelle.contenuto} 
      left join ${context.tabelle.media} as m1 on id_media1 = m1.id_media
      LEFT JOIN wemi2.contenuto_stt ON wemi2.contenuto_stt.id_contenuto= contenuto.id_contenuto
      where ${args && !args.stt ? 'cd_stato_contenuto=2 and ' : '(cd_stato_contenuto=2 or cd_stato_contenuto=1 ) and '} contenuto.ty_contenuto = $[ty_contenuto]    and ts_variazione_stato = (
        select MAX(ts_variazione_stato)
        from wemi2.contenuto_stt
          where id_contenuto =  contenuto.id_contenuto 
      ) `
      return await context.db.any(sql, args);
    },

    estraiSpaziWeMiPubblicati: async (parent, args, context, info) => {
      const contenutoDAO = new ContenutoDAO(context.db, context.formatter);
      return contenutoDAO.getPublishedContentsByType(tyContenutoConstants.SPAZI_WEMI);
    },

    estraiContenutoPrivacy: (parent, args, context, info) => {
      const contenutoDAO = new ContenutoDAO(context.db, context.formatter);
      return contenutoDAO.getPublishedPrivacyContent();
    },
  },


  Mutation: {
    //ModificaStatoContenuto
    statoContenutoUPD: async (parent, args, context, info) => {
      
      await context.db.none(insertForStatoContenutoUPD, args.input);
      return args.input.cd_stato_contenuto;
    },
    //InserisciContenuto
    contenutoMediaADD: async (parent, args, context, info) => {

      const { user } = context;
      const { idUtente } = user;

      context.logger.info("RESOLVER", args);
      // let rs;
      let idContenuto;
      let idMedia1 = args.input.id_media1;
      let idMedia2 = args.input.id_media2;
      let idMedia3 = args.input.id_media3;
      let sql;
      await context.db.tx('txInsert', async t => {

        //todo gestione indice <0 e >numero elementi array
        let voci_menu = []
        context.logger.info("tipo della voce da inserire", args.input.ty_contenuto)
        //estraggo tutte le voci del menu che hanno quel tipo

        await t.batch([
          await t.any(selectContenutoMediaAdd,args.input).then(
            result => {
              voci_menu = result
            }
          ).catch(error => {
            throw new Error(error)
          })
        ])

        //aggiungendo nuova voce solo shift a destra
        context.logger.info("voci estratte: ", voci_menu);
        let posizione = args.input.nr_ordine_visualizzazione;
        context.logger.info("nuova posizione da occupare", posizione)
        let count = 1;
        voci_menu.map(async (contenuto) => {
          if (contenuto.nr_ordine_visualizzazione >= posizione) {
            contenuto.nr_ordine_visualizzazione = posizione + count;
            count++
          }
          await t.batch([
            await t.oneOrNone(updateOrdineVis,contenuto).then(
            result => context.logger.info("posizione aggiornata")).catch(error => { throw new Error(error) })
          ])
        }
        )
        if (args.input.ty_contenuto === 9) {
          let risultatoElimina;
          await t.batch([
            await t.any(selectByTyContenuto, args.input).then(_ => risultatoElimina = true
            ).catch(_ => { risultatoElimina = false })
          ]);
          if (risultatoElimina) {

            await t.batch([
              await t.oneOrNone(deleteByIdContenuto, args.input).then(
                _ => risultatoElimina = true
              ).catch(_ => { risultatoElimina = false })
            ]);
          }
        }

        if (args.input.oj_media1) {
          const media1 = {
            ty_mime_type_media: args.input.ty_mime_type_media1,
            nm_nome_media: args.input.nm_nome_media1,
            oj_media: args.input.oj_media1,
          }
          await t.one(insertForContenutoMediaAdd, { ...media1, build_iw_path: true })
            .then(data => {
              context.logger.info("Insert media1 for contenuto done.", data.id_media);
              idMedia1 = data.id_media;

              const storageBoundFilesPath = path.join(__dirname, STORAGE_BOUND_PATH);
              // Adds the new file to the storage.
              return saveFileFromBase64(storageBoundFilesPath, data.iw_path, args.input.oj_media1);
            });
        }

        if (args.input.oj_media2) {
          const media2 = {
            ty_mime_type_media: args.input.ty_mime_type_media2,
            nm_nome_media: args.input.nm_nome_media2,
            oj_media: args.input.oj_media2,
          }

          await t.one(insertForContenutoMediaAdd, { ...media2, build_iw_path: true })
            .then(data => {
              context.logger.info("Insert media2 for contenuto done.", data.id_media);
              idMedia2 = data.id_media;

              const storageBoundFilesPath = path.join(__dirname, STORAGE_BOUND_PATH);
              // Adds the new file to the storage.
              return saveFileFromBase64(storageBoundFilesPath, data.iw_path, args.input.oj_media2);
            })
        }

        if (args.input.oj_media3) {
          const media3 = {
            ty_mime_type_media:args.input.ty_mime_type_media3,
            nm_nome_media:args.input.nm_nome_media3,
            oj_media:args.input.oj_media3,
          }
          await t.one(insertForContenutoMediaAdd, { ...media3, build_iw_path: false })

            .then(data => {
              context.logger.info("Inserito 3", data.id_media)
              idMedia3 = data.id_media
            })
        }
        await t.one(selectNextVal)
          .then(async seq => {
            context.logger.info("Inserimento contenuto:", seq)
            idContenuto = seq.id_contenuto;

            const insertContenutoForContenutoMediaAddConst = insertContenutoForContenutoMediaAdd(args);

            await t.one(insertContenutoForContenutoMediaAddConst, { ...args.input, idMedia1, idMedia2, idMedia3, idContenuto }
            )
          })


          .then(async () => {
            context.logger.info("<< Inserimento contenuto storico >>")
            if (args.input.tipologia_contenuto === 6) {
              await t.batch([
                await t.oneOrNone(insertServizioForContenutoMediaAdd, {...args.input,idContenuto}).then(
                  _ => true
                ).catch(error => { throw new Error(error) })
              ])
            }
            await t.one(insertSttForContenutoMediaAdd, { ...args.input, idContenuto, id_utente: idUtente }
            )
          })
        if (args.input.ty_contenuto === 6) {
          //TODO aggiornamento tag
          const dao = new ServizioGeneraleDao(t);
          const insertServizioWithOptionsConst = insertServizioWithOptions(args);
          await t.batch([
            await t.oneOrNone(insertServizioWithOptionsConst, {...args.input,idContenuto}).then(
              _ => true
            ).catch(error => { throw new Error(error) }),
            await dao.updateTags(idContenuto, args.input.txTagsRicerca)
          ])

          let nmRelazione;
          if (args.input.associatiCatLiv2) {
            nmRelazione = 'CL2';
            const deleteForContenutoMediaAddConst = deleteForContenutoMediaAdd(nmRelazione);
            await t.batch([
              await t.oneOrNone(deleteForContenutoMediaAddConst, {idContenuto,nmRelazione}).then(
                _ => true
              ).catch(error => { throw new Error(error) })
            ])
            let catLiv2 = args.input.associatiCatLiv2;
            for (let i = 0; i < catLiv2.length; i += 1){
              const cat = catLiv2[i];
              const insertContenutoAssociatoConst = insertContenutoAssociato(nmRelazione);
              await t.batch([
                await t.oneOrNone(insertContenutoAssociatoConst, {cat, idContenuto, nmRelazione}).then(
                  _ => true
                ).catch(error => { throw new Error(error) })
              ])}
          }
          if (args.input.associatiDestinatari && args.input.associatiDestinatari.length > 0) {
            nmRelazione = 'TL1';
            const deleteForContenutoMediaAddConst2 = deleteForContenutoMediaAdd(nmRelazione);
            await t.batch([
        
              await t.oneOrNone(deleteForContenutoMediaAddConst2, {idContenuto,nmRelazione}).then(
                _ => true
              ).catch(error => { throw new Error(error) })
            ])
            let destinatari = args.input.associatiDestinatari;
            for (let i = 0; i < destinatari.length; i += 1){
              const cat = destinatari[i];
              const insertContenutoAssociatoConst2 = insertContenutoAssociato(nmRelazione);
              await t.batch([
                await t.oneOrNone(insertContenutoAssociatoConst2,{cat,idContenuto, nmRelazione}).then(
                  _ => true
                ).catch(error => { throw new Error(error) })
              ])}
          }
          if (args.input.associatiMansioni && args.input.associatiMansioni.length > 0) {
            nmRelazione = 'MC';
            const deleteForContenutoMediaAddConst3 = deleteForContenutoMediaAdd(nmRelazione);
            await t.batch([
              await t.oneOrNone(deleteForContenutoMediaAddConst3, {idContenuto,nmRelazione}).then(
                _ => true
              ).catch(error => { throw new Error(error) })
            ])
            let mansioni = args.input.associatiMansioni;
            for (let i = 0; i < mansioni.length; i += 1){
            const cat = mansioni[i];
            const insertContenutoAssociatoConst3 = insertContenutoAssociato(nmRelazione);
              await t.batch([
                await t.oneOrNone(insertContenutoAssociatoConst3,{cat,idContenuto, nmRelazione}).then(
                  _ => true
                ).catch(error => { throw new Error(error) })
              ])}
          }
        }

        if (args.input.associatesSections) {
          const nmRel = 'SEZ';
          const controllerArea = new AreaContentManagement({ ...context, db: t});
          await controllerArea.saveArea({
            id: idContenuto,
            associates: args.input.associatesSections || [],
            relation: nmRel,
          });
        }

        if (args.input.associati) {
          let associati = args.input.associati.map(elemento =>
            ({ id_contenuto_associato: elemento.id, nm_relazione: elemento.nmRelazione }))

          for (let i = 0; i < associati.length; i += 1) {
            const nmRelazione = associati[i].nm_relazione;
            const cat = associati[i].id_contenuto_associato;
            
            const insertContenutoAssociatoConst4 = insertContenutoAssociato(nmRelazione);

            await t.oneOrNone(insertContenutoAssociatoConst4,{cat,idContenuto, nmRelazione}).then(_ => true).catch(error => { throw new Error(error) });

          }
        }

      })
      return true;
    },

    InserimentoContenuto: async (parent, args, context, info) => {
      let sql, media1, media2, media3, risultato;
      await context.db.tx('InserimentoContenutoTx', async t => {

        if (args.input.media1) {
          if (args.input.media1.id_media)
            await t.batch([
              sql = `UPDATE ${context.tabelle.media} 
            SET ty_mime_type_media = $[ty_mime_type_media],
            nm_nome_media = $[nm_nome_media],oj_media = $[oj_media],
            ts_creazione= localtimestamp
              WHERE id_media = $[id_media]
              returning *;
              `,
              await t.oneOrNone(sql, args.input.media1).then(
                result => media1 = result
              ).catch(error => { throw new Error(error) })
            ])
          else
            await t.batch([
              sql = `INSERT INTO ${context.tabelle.media} (id_media,ty_mime_type_media,
              nm_nome_media,
              oj_media,
              ts_creazione)
              VALUES (nextval('${context.sequence.seq_media}'),$[ty_mime_type_media],$[nm_nome_media],$[oj_media],localtimestamp)
              returning *;
              `,
              await t.oneOrNone(sql, args.input.media1).then(
                result => media1 = result
              ).catch(error => { throw new Error(error) })
            ]);

        }
        if (args.input.media2) {
          if (args.input.media2.id_media)
            await t.batch([
              sql = `UPDATE ${context.tabelle.media} 
            SET ty_mime_type_media = $[ty_mime_type_media],
            nm_nome_media = $[nm_nome_media],oj_media = $[oj_media],
            ts_creazione= localtimestamp
              WHERE id_media = $[id_media]
              returning *;
              `,
              await t.oneOrNone(sql, args.input.media2).then(
                result => media2 = result
              ).catch(error => { throw new Error(error) })
            ])
          else
            await t.batch([
              sql = `INSERT INTO ${context.tabelle.media} (id_media,ty_mime_type_media,
              nm_nome_media,
              oj_media,
              ts_creazione)
              VALUES (nextval('${context.sequence.seq_media}'),$[ty_mime_type_media],$[nm_nome_media],$[oj_media],localtimestamp)
              returning *;
              `,
              await t.oneOrNone(sql, args.input.media2).then(
                result => media2 = result
              ).catch(error => { throw new Error(error) })
            ]);

        }
        if (args.input.media3) {
          if (args.input.media3.id_media)
            await t.batch([
              sql = `UPDATE ${context.tabelle.media} 
            SET ty_mime_type_media = $[ty_mime_type_media],
            nm_nome_media = $[nm_nome_media],oj_media = $[oj_media],
            ts_creazione= localtimestamp
              WHERE id_media = $[id_media]
              returning *;
              `,
              await t.oneOrNone(sql, args.input.media3).then(
                result => media3 = result
              ).catch(error => { throw new Error(error) })
            ])
          else
            await t.batch([
              sql = `INSERT INTO ${context.tabelle.media} (id_media,ty_mime_type_media,
              nm_nome_media,
              oj_media,
              ts_creazione)
              VALUES (nextval('${context.sequence.seq_media}'),$[ty_mime_type_media],$[nm_nome_media],$[oj_media],localtimestamp)
              returning *;
              `,
              await t.oneOrNone(sql, args.input.media3).then(
                result => media3 = result
              ).catch(error => { throw new Error(error) })
            ]);

        }
        await t.batch([
          sql = `INSERT INTO ${context.tabelle.contenuto} 
          (id_contenuto, ty_contenuto, id_contenuto_rif,
          ${args.input.subtypeContenuto ? `ty_sottotipo_contenuto,` : ``}
          ${args.input.ordineVisualizzazione ? `nr_ordine_visualizzazione,` : ``}    
          ${args.input.versione ? `pg_versione,` : ``}
          ${args.input.txTesto1 ? `tl_testo_1,` : ``} 
          ${args.input.txTesto2 ? `tl_testo_2,` : ``} 
          ${args.input.txTesto3 ? `tl_testo_3,` : ``} 
          ${args.input.txTesto4 ? `tl_testo_4,` : ``}
          ${args.input.txTesto5 ? `tl_testo_5,` : ``}  
          ${args.input.link1 ? `ln_link_1,` : ``} 
          ${args.input.link2 ? `ln_link_2,` : ``}
          ${args.input.validitaDal ? `dt_inizio_val,` : ``} 
          ${args.input.validitaAl ? `dt_fine_val,` : ``} 
          ${media1 && media1.id_media ? `id_media1,` : ``}
          ${media2 && media2.id_media ? `id_media2,` : ``}
          ${media3 && media3.id_media ? `id_media3,` : ``}
          ts_creazione)
          VALUES (nextval('${context.sequence.seq_contenuto}'),
          $[typeContenuto],
          nextval('${context.sequence.seq_contenuto}'),
            ${args.input.subtypeContenuto ? `$[subtypeContenuto],` : ``}
          ${args.input.ordineVisualizzazione ? `$[ordineVisualizzazione],` : ``}    
          ${args.input.versione ? `$[versione],` : ``}
          ${args.input.txTesto1 ? `$[txTesto1],` : ``} 
          ${args.input.txTesto2 ? `$[txTesto2],` : ``} 
          ${args.input.txTesto3 ? `$[txTesto3],` : ``} 
          ${args.input.txTesto4 ? `$[txTesto4],` : ``}
          ${args.input.txTesto5 ? `$[txTesto5],` : ``}  
          ${args.input.link1 ? `$[link1],` : ``} 
          ${args.input.link2 ? `$[link2],` : ``}
          ${args.input.validitaDal ? `$[validitaDal],` : ``} 
          ${args.input.validitaAl ? `$[validitaAl],` : ``} 
          ${media1 && media1.id_media ? `${media1.id_media},` : ``}
          ${media2 && media2.id_media ? `${media2.id_media},` : ``}
          ${media3 && media3.id_media ? `${media3.id_media},` : ``}
          localtimestamp
          ) RETURNING *;`,
          await t.oneOrNone(sql, args.input).then(result => risultato = result).catch(error => {
            throw new Error(error);
          })
        ]);
        await t.batch([
          sql = ``,
          await t.oneOrNone(sql.args.input)
        ])
      })
      if (risultato)
        return true;
      return false;
    },
    ModificaContenuto: async (parent, args, context, info) => {
      let sql, media1, media2, media3, risultato, utenteFound, statoRisultato;
      await context.db.tx('ModificaContenutoTx', async t => {

        //estraggo il tipo dell'input
        let tipologia_contenuto;
        let voci_menu = [];
        await t.batch([
          await t.oneOrNone(selectByIdContenuto, args.input).then(
            result => tipologia_contenuto = result.ty_contenuto
          ).catch(error => { throw new Error(error) })
        ])
        if (tipologia_contenuto === 6) {
          const dao = new ServizioGeneraleDao(t);
          const updateForModificaContenutoConst = updateForModificaContenuto(args);
          await t.batch([
            await t.oneOrNone(updateForModificaContenutoConst, args.input).then(
              _ => true
            ).catch(error => { throw new Error(error) }),
            await dao.updateTags(args.input.idContenuto, args.input.txTagsRicerca)
          ])

          let nmRel;

          if (args.input.associatiCatLiv2) {
            nmRel = 'CL2';
            const deleteForModificaContenutoConst = deleteForContenutoMediaAdd(nmRel);
            await t.batch([
              await t.oneOrNone(deleteForModificaContenutoConst, {...args.input,nmRelazione:nmRel}).then(
                _ => true
              ).catch(error => { throw new Error(error) })
            ])
            let catLiv2 = args.input.associatiCatLiv2;
            for (let i = 0; i < catLiv2.length; i += 1){
              const insertForModificaContenutoConst = insertContenutoAssociato(nmRel);
              const cat = catLiv2[i];
              await t.batch([
                await t.oneOrNone(insertForModificaContenutoConst, {...args.input,cat,nmRelazione:nmRel}).then(
                  _ => true
                ).catch(error => { throw new Error(error) })
              ])}

          }
          if (args.input.associatiDestinatari) {
            nmRel = 'TL1';
            const deleteForModificaContenutoConst2 = deleteForContenutoMediaAdd(nmRel);
            await t.batch([
              await t.oneOrNone(deleteForModificaContenutoConst2, {...args.input,nmRelazione:nmRel}).then(
                _ => true
              ).catch(error => { throw new Error(error) })
            ])
            let destinatari = args.input.associatiDestinatari;
            for (let i = 0; i < destinatari.length; i += 1){
              const insertForModificaContenutoConst2 = insertContenutoAssociato(nmRel);
              const cat = destinatari[i];
              await t.batch([
                await t.oneOrNone(insertForModificaContenutoConst2, {...args.input,cat,nmRelazione:nmRel}).then(
                  _ => true
                ).catch(error => { throw new Error(error) })
              ])}
          }
          if (args.input.associatiMansioni) {
            nmRel = 'MC';
            const deleteForModificaContenutoConst3 = deleteForContenutoMediaAdd(nmRel);
            await t.batch([
              await t.oneOrNone(deleteForModificaContenutoConst3, {...args.input,nmRelazione:nmRel}).then(
                _ => true
              ).catch(error => { throw new Error(error) })
            ])
            let mansioni = args.input.associatiMansioni;
            for (let i = 0; i < mansioni.length; i += 1){
              const insertForModificaContenutoConst3 = insertContenutoAssociato(nmRel);
              const cat = mansioni[i];
              await t.batch([
                await t.oneOrNone(insertForModificaContenutoConst3, {...args.input,cat,nmRelazione:nmRel}).then(
                  _ => true
                ).catch(error => { throw new Error(error) })
              ])}
          }
        }

        //estraggo tutte le voci del menu che hanno quel tipo
        await t.batch([
          await t.many(selectByTyContenutoOrder, {tipologiaCont: tipologia_contenuto}).then(
            result => voci_menu = result
          ).catch(error => { throw new Error(error) })
        ])
        // aumento il progressivo di ogni elemento uguale o maggiore
        // se nuova posizione maggiore posizione attuale shift a sinistra, altrimenti a destra
        let shiftSinistra = false;
        voci_menu.map(contenuto => {
          if (contenuto.id_contenuto == args.input.idContenuto) {
            if (args.input.ordineVisualizzazione > contenuto.nr_ordine_visualizzazione) {
              shiftSinistra = true;
            }
          }
        })
        let posizione = args.input.ordineVisualizzazione;
        let nuovaPosizione = 1;
        let count = 1;
        voci_menu.map(async (contenuto, index) => {
          if (contenuto.id_contenuto != args.input.idContenuto) {
            if (shiftSinistra && contenuto.nr_ordine_visualizzazione <= posizione) {
              contenuto.nr_ordine_visualizzazione = nuovaPosizione
              nuovaPosizione++;
            } else if (!shiftSinistra && contenuto.nr_ordine_visualizzazione >= posizione) {
              contenuto.nr_ordine_visualizzazione = posizione + count;
              count++
            }
            await t.batch([
              await t.oneOrNone(updateOrdineVis,contenuto).then(
                result => context.logger.info("posizione aggiornata")
              ).catch(error => { throw new Error(error) })
            ])
          }
        })

        // SEZIONE MEDIA
        if (args.input.media1) {
          const storageBoundPath = path.join(__dirname, STORAGE_BOUND_PATH);

          // An id_media is provided, so we're either removing or patching an existing file
          if (args.input.media1.id_media) {
            // Get the old media
            const { iw_path } = await t.one(selectMediaById, args.input.media1);

            // Remove the file from the storage.
            try {
              await deleteFile(storageBoundPath, iw_path);
            } catch (error) {
              context.logger.error(error, 'Errore nella cancellazione del file.');
            }

            // Replace the old media with the new media.
            if (args.input.media1.oj_media) {
              media1 = await t.oneOrNone(
                updateMediaForModificaContenuto, {
                  ...args.input.media1,
              });
              // Adds the new file to the storage.
              await saveFileFromBase64(storageBoundPath, media1.iw_path, args.input.media1.oj_media);
            } else { // The media was removed.
              let deleteFromContenuto, deleteFromMedia;
              // Remove the link between content and media.
              const updateIdMedia1Null = updateIdMediaNull('media1');
              await t.oneOrNone(updateIdMedia1Null, { idContenuto: args.input.idContenuto});
              // Delete the media.
              await t.oneOrNone(deleteMediaForModificaContenuto, args.input.media1);
            }
          }

          // An id_media is not provided, we're dealing with a fresh insert.
          if (!args.input.media1.id_media) {
            const nextvalMedia = context.sequence.seq_media;
            const updateSetIdMedia1 = updateSetIdMedia('media1');
            await t.batch([
              media1 = await t.one(insertMediaForModificaContenuto, {
                ...args.input.media1,
                build_iw_path: true,
                nextvalMedia
              }),
              await saveFileFromBase64(storageBoundPath, media1.iw_path, args.input.media1.oj_media),
              media1 = await t.oneOrNone(updateSetIdMedia1, {
                idContenuto: args.input.idContenuto,
                id_media: media1.id_media
              }),
            ]);
          }
        }

        if (args.input.media2) {
          const storageBoundPath = path.join(__dirname, STORAGE_BOUND_PATH);

          // An id_media is provided, so we're either removing or patching an existing file
          if (args.input.media2.id_media) {
            // Get the old media
            const { iw_path } = await t.one(selectMediaById, args.input.media2);

            // Remove the file from the storage.
            try {
              await deleteFile(storageBoundPath, iw_path);
            } catch (error) {
              context.logger.error('Errore nella cancellazione del file.', error);
            }

            // Replace the old media with the new media.
            if (args.input.media2.oj_media) {
              media2 = await t.oneOrNone(
                updateMediaForModificaContenuto, {
                  ...args.input.media2,
              });
              // Adds the new file to the storage.
              await saveFileFromBase64(storageBoundPath, media2.iw_path, args.input.media2.oj_media);
            } else { // The media was removed.
              let deleteFromContenuto, deleteFromMedia;
              // Remove the link between content and media.
              const updateIdMedia2Null = updateIdMediaNull('media2');
              await t.oneOrNone(updateIdMedia2Null, { idContenuto: args.input.idContenuto});
              // Delete the media.
              await t.oneOrNone(deleteMediaForModificaContenuto, args.input.media2);
            }
          }

          // An id_media is not provided, we're dealing with a fresh insert.
          if (!args.input.media2.id_media) {
            const nextvalMedia = context.sequence.seq_media;
            const updateSetIdMedia2 = updateSetIdMedia('media2');
            await t.batch([
              media2 = await t.one(insertMediaForModificaContenuto, {
                ...args.input.media2,
                build_iw_path: true,
                nextvalMedia
              }),
              await saveFileFromBase64(storageBoundPath, media2.iw_path, args.input.media2.oj_media),
              media2 = await t.oneOrNone(updateSetIdMedia2, {
                idContenuto: args.input.idContenuto,
                id_media: media2.id_media
              }),
            ]);
          }
        }

        if (args.input.media3) {
          if (args.input.media3.oj_media && args.input.media3.id_media && args.input.media3.id_media !== -1)
            await t.batch([
              await t.oneOrNone(updateMediaForModificaContenuto, args.input.media3).then(
                result => media3 = result
              ).catch(error => { throw new Error(error) })
            ])
          else if (args.input.media3.ty_mime_type_media !== '-1') {
            const nextvalMedia = context.sequence.seq_media;
            let updateSetIdMedia3;
            await t.batch([
              await t.oneOrNone(insertMediaForModificaContenuto, {
                ...args.input.media3,
                build_iw_path: false,
                nextvalMedia:nextvalMedia
              }).then(
                result => media3 = result
              ).catch(error => { throw new Error(error) }),
              updateSetIdMedia3 = updateSetIdMedia('media3'),
              await t.oneOrNone(updateSetIdMedia3, {idContenuto:args.input.idContenuto,id_media:media3.id_media}).then(
                result => media1 = result
              ).catch(error => { throw new Error(error) })
            ]);
          }
          else if (args.input.media3.ty_mime_type_media === '-1') {
            let deleteFromContenuto, deleteFromMedia;
            const updateIdMedia3Null = updateIdMediaNull('media3');
            await t.oneOrNone(updateIdMedia3Null, { idContenuto: args.input.idContenuto}).then(_ => deleteFromContenuto = true).catch(_ => deleteFromContenuto = false)

            if (deleteFromContenuto) {
              await t.oneOrNone(deleteMediaForModificaContenuto, args.input.media3).then(_ => deleteFromMedia = true).catch(_ => deleteFromMedia = false)
            }
          }
        }
        const UpdateContenutoForModificaContenutoConst = UpdateContenutoForModificaContenuto(args,media1,media2,media3);
        await t.batch([
          await t.oneOrNone(UpdateContenutoForModificaContenutoConst, {...args.input,
            id_media1:media1 && media1.id_media?media1.id_media:null,
            id_media2:media2 && media2.id_media?media2.id_media:null,
            id_media3:media3 && media3.id_media?media3.id_media:null,
            }).then(result => risultato = result)
        ]);
        if (risultato) {
          await t.batch([
            await t.oneOrNone(selezionaByIdUtenteSql, {id_utente:args.input.idUtente}).then(result => utenteFound = result)
          ])
          if (utenteFound) {
            // await t.batch([
            //   sql = `
            //   INSERT INTO ${context.tabelle.contenuto_stt}(
            //     id_contenuto, ts_variazione_stato, cd_stato_contenuto, id_utente)
            //     VALUES ($[idContenuto], localtimestamp, '$[statoContenuto]', $[idUtente]) RETURNING *;
            //   `,
            //   context.logger.info(sql, args.input),
            //   await t.oneOrNone(sql, args.input).then(result=> statoRisultato=result)
            // ]);

            if (args.input.associatesSections) {
              const nmRel = 'SEZ';
              const controllerArea = new AreaContentManagement({ ...context, db: t});
              await controllerArea.saveArea({
                id: args.input.idContenuto,
                associates: args.input.associatesSections || [],
                relation: nmRel,
              });
            }

            if (args.input.associati) {
              const deleteForModificaContenutoConst = deleteForContenutoMediaAdd();
              await t.batch([
                await t.oneOrNone(deleteForModificaContenutoConst, args.input)
              ]);

              for (let i = 0; i < args.input.associati.length; i += 1){
                const cat = args.input.associati[i].id;
                const nmRelazione = args.input.associati[i].nmRelazione;
                const insertContenutoAssociatoModificaContenuto = insertContenutoAssociato(nmRelazione);
                await t.batch([
                  await t.oneOrNone(insertContenutoAssociatoModificaContenuto, {...args.input, cat, nmRelazione})
                ])}

            }
          }
        }
      })
      if (risultato)
        return true;
      return false;
    },
  }
};
