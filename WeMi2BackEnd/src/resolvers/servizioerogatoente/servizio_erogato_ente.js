import { isNullOrUndefined, isString } from "util";
import EnteDAO from '../../dao/ente/enteDAO';
import { deleteRDest, deleteRDestLiv1 } from 'sql/rdestliv1servizioerog/deleteRDestLiv1';
import { insertRDest, insertRDestLiv1 } from 'sql/rdestliv1servizioerog/insertRDestLiv1';
import { updateForInserisciDatiServizioEnte } from 'sql/servizioerogatoente/updateForInserisciDatiServizioEnte';
import { updateQTempoMaxAttivazione } from 'sql/servizioerogatoente/updateQTempoMaxAttivazione';
import { deleteRMunicipioServEnte } from 'sql/rmunicipioservitoservente/deleteRMunicipioServEnte';
import { insertRMunicipioServEnte } from 'sql/rmunicipioservitoservente/insertRMunicipioServEnte';
import { deleteRFasciaOrariaErogSrvEnte } from 'sql/rfasciaorarioerogservente/deleteRFasciaOrariaErogSrvEnte';
import { insertRFasciaOrariaErogSrvEnte } from 'sql/rfasciaorarioerogservente/insertRFasciaOrariaErogSrvEnte';
import { updateCdTipo } from 'sql/servizioerogatoente/updateCdTipo';
import { deleteRMansioneServErogEnte } from 'sql/rmansioneserverogente/deleteRMansioneServErogEnte';
import { insertRMansioneServErogEnte } from 'sql/rmansioneserverogente/insertRMansioneServErogEnte';
import { deleteRSostEconServErogEnte } from 'sql/rsosteconserverogente/deleteRSostEconServErogEnte';
import { insertRSostEconServErogEnte } from 'sql/rsosteconserverogente/insertRSostEconServErogEnte';
import { insertServizioErogatoStt } from 'sql/servizioerogatoentestt/insertServizioErogatoStt';
import { updateNote } from 'sql/servizioerogatoente/updateNote';
import { deleteRDestLiv2 } from 'sql/rdestliv2servizioerog/deleteRDestLiv2';
import { insertRDestLiv2 } from 'sql/rdestliv2servizioerog/insertRDestLiv2';
import { selectServizioErogatoEnte004, selectServizioErogatoEnte004Admin } from 'sql/servizioerogatoente/estraiservizioerogatoente004';
import { selectMansioniServizioErogato } from 'sql/rmansioneserverogente/mansioniservizioerogato';
import { ServizioErogatoEnteController } from 'controller/servizioErogatoEnte/ServizioErogatoEnteController';
import { selectEstraiDettaglioAmministrativoServizioEnte, selectSliderImg } from 'sql/servizioerogatoente/select';
import { selectCdContenutoFromServizioErogatoEnte } from 'sql/contenuto/selezione';
import { cdContenuto018 } from 'constants/db/cdContenuto018';
import { ServizioEnteController } from 'controller/servizioente';

/** @format */

const EstraiRecensioniValide = (idServizio) => {
  const sql = `
  SELECT 
  qt_media_singola_recensione,
  count(qt_media_singola_recensione), 
  id_ente
  FROM wemi2.servizio_erogato_ente
  inner join wemi2.ente ON ente.id_ente = servizio_erogato_ente.id_ente_erogatore
  inner join wemi2.richiesta_servizio_ente ON richiesta_servizio_ente.id_servizio_erogato_ente = servizio_erogato_ente.id_servizio_ente
  inner join wemi2.recensione_servizio_ente ON recensione_servizio_ente.id_rich_serv_rec = richiesta_servizio_ente.id_richiesta_servizio_ente
  inner join wemi2.recensione_servizio_ente_stt ON recensione_servizio_ente_stt.id_rich_serv_rec = recensione_servizio_ente.id_rich_serv_rec
  where cd_stato_recensione='3' and wemi2.servizio_erogato_ente.id_servizio_riferimento=${idServizio} and wemi2.recensione_servizio_ente_stt.ts_variazione_stato =( 
              select MAX(ts_variazione_stato)
                from wemi2.recensione_servizio_ente_stt
              where wemi2.recensione_servizio_ente_stt.id_rich_serv_rec=recensione_servizio_ente.id_rich_serv_rec
               
              ) 
        group by wemi2.recensione_servizio_ente_stt.id_rich_serv_rec ,qt_media_singola_recensione,id_ente`;

  return sql;
};

export default {
  Query: {
    EstraiServizioErogatoEnte: async (parent, args, context, info) => {
      const sql = `SELECT id_servizio_ente, 
      id_servizio_riferimento, id_ente_erogatore, 
      tl_descrizione_serv_erog_ente, 
      im_prezzo_minimo, 
      im_prezzo_minimo_offerta_calc, 
      dt_inizio_val_offerta_prezzo, 
      dt_fine_val_offerta_prezzo, 
      cd_tipo_offerta_srv, 
      id_sede_erogazione_srv, 
      tx_altre_mansioni, 
      js_dati_prezzo, 
      js_info_personale, 
      cd_modalita_erogazione, 
      cd_tipo_servizio_erog, 
      qt_min_pers, qt_max_pers, 
      dt_inizio_erog_serv, dt_fine_erog_serv, js_note_adminwemi_su_servizio, fg_accetta_preventivo, pg_versione, ts_creazione
      FROM ${context.tabelle.servizio_erogato_ente}
      WHERE id_servizio_ente = $[idServizioErogato]`;
      return await context.db.oneOrNone(sql, args);
    },
    EstraiDescrittoriBenessere: async (parent, args, context, info) => {
      const servizioEnteController = new ServizioEnteController(context);
      return servizioEnteController.getDescriptors(args);
    },
    RicercaEntiErogantiServizio: async (parent, args, context, info) => {
      const sql = `
      select 
      id_servizio_ente,
       id_servizio_riferimento, 
      id_ente_erogatore, 
      tl_descrizione_serv_erog_ente, 
      im_prezzo_minimo, 
      im_prezzo_minimo_offerta_calc, 
      dt_inizio_val_offerta_prezzo, 
      dt_fine_val_offerta_prezzo, 
      cd_tipo_offerta_srv, 
      id_sede_erogazione_srv, 
      tx_altre_mansioni, 
      js_dati_prezzo, 
      js_info_personale, 
      cd_modalita_erogazione, 
      cd_tipo_servizio_erog, 
      qt_min_pers, qt_max_pers, 
      dt_inizio_erog_serv, 
      dt_fine_erog_serv, 
      js_note_adminwemi_su_servizio, 
      fg_accetta_preventivo, 
      pg_versione, 
      ts_creazione
      from ( 
       select coalesce(avg(qt_media_singola_recensione),0) as media_recensioni,  
       count(qt_media_singola_recensione) as "numeroRecensioni",
       id_servizio_ente,
       id_servizio_riferimento, id_ente_erogatore, tl_descrizione_serv_erog_ente,
       im_prezzo_minimo, 
       im_prezzo_minimo_offerta_calc, 
       t1.dt_inizio_val_offerta_prezzo,
       t1.dt_fine_val_offerta_prezzo, 
       cd_tipo_offerta_srv, id_sede_erogazione_srv, 
       tx_altre_mansioni, js_dati_prezzo, js_info_personale, cd_modalita_erogazione,
       cd_tipo_servizio_erog, qt_min_pers, qt_max_pers, dt_inizio_erog_serv, 
       dt_fine_erog_serv, js_note_adminwemi_su_servizio, fg_accetta_preventivo, 
       pg_versione, t1.ts_creazione
       from  ${context.tabelle.servizio_erogato_ente} as t1
       INNER JOIN ${context.tabelle.servizio} ON 
            t1.id_servizio_riferimento=${context.tabelle.servizio
        }.id_servizio
        left JOIN ${context.tabelle.richiesta_servizio_ente} ON 
        t1.id_servizio_ente=${context.tabelle.richiesta_servizio_ente}.id_servizio_erogato_ente
        left JOIN ${context.tabelle.recensione_ente} ON 
        ${context.tabelle.richiesta_servizio_ente}.id_richiesta_servizio_ente=${context.tabelle.recensione_ente
        }.id_rich_serv_rec
            where $[input.service] = id_servizio

            --costo
            ${args.input.costo ? args.input.costo > 0 ? 'and (im_prezzo_minimo <= $[input.costo]) ' : '' : ''}

            --fascia oraria
            ${args.input.orario ? args.input.orario.length > 0 ? args.input.orario.map(item =>
          `and ${item}  in (select  cd_fascia_oraria_erog_srv_ente
                from ${context.tabelle.r_fascia_oraria_erog_srv_ente}
                where ${context.tabelle.r_fascia_oraria_erog_srv_ente}.id_servizio_ente = t1.id_servizio_ente 
                )
               ` ).toString().split(',').join(' ') : '' : ''}


               --tipo offerta
               ${args.input.offerta ? args.input.offerta.length > 0 ? `and (${  args.input.offerta.map((item, index) =>
            `  ${item} = cd_tipo_offerta_srv ${args.input.offerta.length > 0 ? args.input.offerta[index] === args.input.offerta[args.input.offerta.length - 1] ? ' ' : 'or ' : 'or '} 
                 ` ).toString().split(',').join(' ')  })` : '' : ''}
                
            --municipio
            ${args.input.municipio ? args.input.municipio !== 0 ? `and $[input.municipio] in (select  cd_municipio_servito
              from ${context.tabelle.r_municipio_servito_serv_ente}
							where ${context.tabelle.r_municipio_servito_serv_ente}.id_servizio_ente = t1.id_servizio_ente
              
              )` : '' : ''}



          --destinatariLiv1
            ${args.input.destinatariLiv1 ? args.input.destinatariLiv1.length > 0 ?
          args.input.destinatariLiv1.map(item =>
            `and ${item}  in (select id_destinatario_liv1
                from ${context.tabelle.r_dest_liv1_servizio_erog}
                where ${context.tabelle.r_dest_liv1_servizio_erog}.id_servizio_ente = t1.id_servizio_ente
                )
               ` ).toString().split(',').join(' ') : '' : ''}
               --destinatariLiv2
               ${args.input.destinatariLiv2 ? args.input.destinatariLiv2.length > 0 ? args.input.destinatariLiv2.map(item =>
              `and ${item}  in (select id_destinatario_liv2
                  from ${context.tabelle.r_dest_liv2_servizio_erog}
                  where ${context.tabelle.r_dest_liv2_servizio_erog}.id_servizio_ente = t1.id_servizio_ente
                  )
                 ` ).toString().split(',').join(' ') : '' : ''}


            
           --mansione
           ${args.input.mansione ? args.input.mansione.length > 0 ? args.input.mansione.map(item =>
                `and  ${item}  in (select  id_mansione
            from ${context.tabelle.r_mansione_serv_erog_ente}

            inner JOIN wemi2.contenuto_stt ON wemi2.r_mansione_serv_erog_ente.id_mansione= wemi2.contenuto_stt.id_contenuto
            
            inner JOIN wemi2.contenuto_stt ON wemi2.contenuto_stt.id_contenuto= ${context.tabelle.r_mansione_serv_erog_ente}.id_servizio_ente
        
           
            where  wemi2.contenuto_stt.cd_stato_contenuto=2 and ${context.tabelle.contenuto}.ty_contenuto = 11 and ${context.tabelle.r_mansione_serv_erog_ente}.id_servizio_ente = t1.id_servizio_ente and ${context.tabelle.r_mansione_serv_erog_ente}.id_servizio_ente = t1.id_servizio_ente and ts_variazione_stato = (
              select MAX(ts_variazione_stato)
              from wemi2.contenuto_stt
             
            )
           ` ).toString().split(',').join(' ') : '' : ''}
           --tipo servizio
           ${args.input.tipologia ? args.input.tipologia !== 0 ? 'and cd_tipo_servizio_erog=$[input.tipologia] ' : '' : ''}
            group by id_servizio_ente ) as t
            ${args.input.rating ? args.input.rating !== 0 ? 'where (media_recensioni >= $[input.rating])' : '' : ''}
           ${args.input.order ? args.input.order === 1 ? 'order by im_prezzo_minimo ASC' : '' : ''}
           ${args.input.order ? args.input.order === 2 ? 'order by im_prezzo_minimo DESC' : '' : ''}
           ${args.input.order ? args.input.order === 3 ? 'order by media_recensioni DESC' : '' : ''}
           `;
      context.logger.info(sql, args);
      let recensioni = await context.db.any(EstraiRecensioniValide(args.input.service), args);
      let result = await context.db.any(sql, args);
      for (let i = 0; i < result.length; i++) {
        for (let y = 0; y < recensioni.length; y++) {
          if (result[i].id_ente_erogatore === recensioni[y].id_ente) {
            result[i].media_recensioni = result[i].media_recensioni ? parseInt(result[i].media_recensioni) + parseInt(recensioni[y].qt_media_singola_recensione) : parseInt(recensioni[y].qt_media_singola_recensione);
            result[i].numeroRecensioni = result[i].numeroRecensioni ? parseInt(result[i].numeroRecensioni) + parseInt(recensioni[y].count) : recensioni[y].count;

          }

        }
      }
      for (let i = 0; i < result.length; i++) {
        if (result[i].media_recensioni)
          result[i].media_recensioni = parseInt(result[i].media_recensioni / result[i].numeroRecensioni);
      }
      return result;

    },

    RicercaEntiErogantiServizioSpaziWeMi: async (parent, args, context, info) => {
      let servSpazi, arrServSpazi = [];
      const sql = `
      select 
            id_servizio_ente, 
            id_servizio_riferimento, 
            id_spazio_wemi,
            tl_testo_1,
            id_ente_erogatore, 
            tl_descrizione_serv_erog_ente, 
            im_prezzo_minimo, 
            im_prezzo_minimo_offerta_calc, 
            dt_inizio_val_offerta_prezzo, 
            dt_fine_val_offerta_prezzo, 
            cd_tipo_offerta_srv, 
            id_sede_erogazione_srv, 
            tx_altre_mansioni, 
            js_dati_prezzo,
            js_info_personale,
            cd_modalita_erogazione,
            cd_tipo_servizio_erog,
            qt_min_pers, qt_max_pers, 
            dt_inizio_erog_serv, 
            dt_fine_erog_serv, 
            js_note_adminwemi_su_servizio, 
            fg_accetta_preventivo, 
            t.pg_versione, 
            t.ts_creazione
   
      from ( 
       select 
       id_servizio_ente,
       id_servizio_riferimento, id_ente_erogatore, tl_descrizione_serv_erog_ente,
        im_prezzo_minimo, im_prezzo_minimo_offerta_calc, 
        dt_inizio_erog_serv,
        dt_inizio_val_offerta_prezzo,
         dt_fine_val_offerta_prezzo, 
         cd_tipo_offerta_srv, id_sede_erogazione_srv, 
         tx_altre_mansioni, js_dati_prezzo, js_info_personale, cd_modalita_erogazione,
          cd_tipo_servizio_erog, qt_min_pers, qt_max_pers,  
          dt_fine_erog_serv, js_note_adminwemi_su_servizio, fg_accetta_preventivo, 
          t1.pg_versione, t1.ts_creazione
            from  ${context.tabelle.servizio_erogato_ente} as t1
            INNER JOIN ${context.tabelle.servizio} ON 
            t1.id_servizio_riferimento=${context.tabelle.servizio
        }.id_servizio
        left JOIN ${context.tabelle.richiesta_servizio_ente} ON 
        t1.id_servizio_ente=${context.tabelle.richiesta_servizio_ente}.id_servizio_erogato_ente
        left JOIN ${context.tabelle.recensione_ente} ON 
        ${context.tabelle.richiesta_servizio_ente}.id_richiesta_servizio_ente=${context.tabelle.recensione_ente
        }.id_rich_serv_rec
            where $[input.service] = id_servizio

            --costo
            ${args.input.costo ? args.input.costo > 0 ? 'and (im_prezzo_minimo <= $[input.costo]) ' : '' : ''}

            --fascia oraria
            ${args.input.orario ? args.input.orario.length > 0 ? args.input.orario.map(item =>
          `and ${item}  in (select  cd_fascia_oraria_erog_srv_ente
                from ${context.tabelle.r_fascia_oraria_erog_srv_ente}
                where ${context.tabelle.r_fascia_oraria_erog_srv_ente}.id_servizio_ente = t1.id_servizio_ente 
                )
               ` ).toString().split(',').join(' ') : '' : ''}


               --tipo offerta
               ${args.input.offerta ? args.input.offerta.length > 0 ? `and (${  args.input.offerta.map((item, index) =>
            `  ${item} = cd_tipo_offerta_srv ${args.input.offerta.length > 0 ? args.input.offerta[index] === args.input.offerta[args.input.offerta.length - 1] ? ' ' : 'or ' : 'or '} 
                 ` ).toString().split(',').join(' ')  })` : '' : ''}
                
            --municipio
            ${args.input.municipio ? args.input.municipio !== 0 ? `and $[input.municipio] in (select  cd_municipio_servito
              from ${context.tabelle.r_municipio_servito_serv_ente}
							where ${context.tabelle.r_municipio_servito_serv_ente}.id_servizio_ente = t1.id_servizio_ente
              
              )` : '' : ''}



          --destinatariLiv1
            ${args.input.destinatariLiv1 ? args.input.destinatariLiv1.length > 0 ?
          args.input.destinatariLiv1.map(item =>
            `and ${item}  in (select id_destinatario_liv1
                from ${context.tabelle.r_dest_liv1_servizio_erog}
                where ${context.tabelle.r_dest_liv1_servizio_erog}.id_servizio_ente = t1.id_servizio_ente
                )
               ` ).toString().split(',').join(' ') : '' : ''}
               --destinatariLiv2
               ${args.input.destinatariLiv2 ? args.input.destinatariLiv2.length > 0 ? args.input.destinatariLiv2.map(item =>
              `and ${item}  in (select id_destinatario_liv2
                  from ${context.tabelle.r_dest_liv2_servizio_erog}
                  where ${context.tabelle.r_dest_liv2_servizio_erog}.id_servizio_ente = t1.id_servizio_ente
                  )
                 ` ).toString().split(',').join(' ') : '' : ''}


            
           --mansione
           ${args.input.mansione ? args.input.mansione.length > 0 ? args.input.mansione.map(item =>
                `and  ${item}  in (select  id_mansione
            from ${context.tabelle.r_mansione_serv_erog_ente}

            inner JOIN wemi2.contenuto_stt ON wemi2.r_mansione_serv_erog_ente.id_mansione= wemi2.contenuto_stt.id_contenuto
            
            inner JOIN wemi2.contenuto_stt ON wemi2.contenuto_stt.id_contenuto= ${context.tabelle.r_mansione_serv_erog_ente}.id_servizio_ente
        
           
            where  wemi2.contenuto_stt.cd_stato_contenuto=2 and ${context.tabelle.contenuto}.ty_contenuto = 11 and ${context.tabelle.r_mansione_serv_erog_ente}.id_servizio_ente = t1.id_servizio_ente and ${context.tabelle.r_mansione_serv_erog_ente}.id_servizio_ente = t1.id_servizio_ente and ts_variazione_stato = (
              select MAX(ts_variazione_stato)
              from wemi2.contenuto_stt
             
            )
           ` ).toString().split(',').join(' ') : '' : ''}
           --tipo servizio
           ${args.input.tipologia ? args.input.tipologia !== 0 ? 'and cd_tipo_servizio_erog=$[input.tipologia] ' : '' : ''}
            group by id_servizio_ente ) as t
            INNER JOIN ${context.tabelle.r_spazio_wemi_ente} as spazi ON
            spazi.id_ente = t.id_ente_erogatore
             INNER JOIN ${context.tabelle.contenuto} as cont ON
              id_contenuto = spazi.id_spazio_wemi
            ${args.input.rating ? args.input.rating !== 0 ? 'where (media_recensioni >= $[input.rating])' : '' : ''}
           ${args.input.order ? args.input.order === 1 ? 'order by im_prezzo_minimo ASC' : '' : ''}
           ${args.input.order ? args.input.order === 2 ? 'order by im_prezzo_minimo DESC' : '' : ''}
           ${args.input.order ? args.input.order === 3 ? 'order by media_recensioni DESC' : '' : ''}
           `;
      context.logger.info(sql, args);
      await context.db.any(sql, args).then(res => servSpazi = res);

      let recensioni = await context.db.any(EstraiRecensioniValide(args.input.service), args);
      for (let i = 0; i < servSpazi.length; i++) {
        for (let y = 0; y < recensioni.length; y++) {

          if (servSpazi[i].id_ente_erogatore === recensioni[y].id_ente) {
            servSpazi[i].media_recensioni = servSpazi[i].media_recensioni ? parseInt(servSpazi[i].media_recensioni) + parseInt(servSpazi[y].qt_media_singola_recensione) : parseInt(recensioni[y].qt_media_singola_recensione);
            servSpazi[i].numeroRecensioni = servSpazi[i].numeroRecensioni ? parseInt(servSpazi[i].numeroRecensioni) + parseInt(servSpazi[y].count) : recensioni[y].count;

          }

        }
      }
      for (let i = 0; i < servSpazi.length; i++) {
        if (servSpazi[i].media_recensioni)
          servSpazi[i].media_recensioni = parseInt(servSpazi[i].media_recensioni / servSpazi[i].numeroRecensioni);
      }


      if (servSpazi.length > 0) {

        servSpazi.map(spazio => {
          if (!arrServSpazi.length > 0 ||
            (arrServSpazi.length > 0 && arrServSpazi.find(el => el.id_ente_erogatore !== spazio.id_ente_erogatore)))
            arrServSpazi.push(spazio);
        });
      }
      context;
      return arrServSpazi.map(el => {
        let arraySpazi = [];
        servSpazi.filter(el2 => {
          if (el2.id_ente_erogatore === el.id_ente_erogatore)
            arraySpazi.push({
              idSpazioWeMi: el2.id_spazio_wemi,
              tlValoreTestuale: el2.tl_testo_1,
            });
        });

        return {
          ...el,
          spaziWeMi: arraySpazi,
        };

      });

    },

    EstraiServiziPerCategoriediAccredidatmentoEnte: async (parent, args, context, info) => {
      let rs = {}, sql, dummy = '(';

      sql = `
          SELECT  
          r.id_cat_accreditamento AS value,
          c.tl_testo_1 ->> 'it' AS "textValue"
          FROM ${context.tabelle.r_cat_acc_ente} r
          LEFT OUTER JOIN ${context.tabelle.contenuto} c
                ON r.id_cat_accreditamento=c.id_contenuto
          WHERE r.id_ente=$[id_ente]
          `;
      context.logger.info(sql, args);
      rs.categorie = await context.db.any(sql, args);
      context.logger.info(rs, 'ciaso');
      if (rs.categorie.length > 0) {
        rs.categorie.map(async k => {
          context.logger.info('ele:', k.value);
          dummy = `${dummy + k.value  },`;
        });

        dummy = `${dummy.slice(0, -1)  })`;
        context.logger.info('le tue categorie per l\'ente selezionato sono:', dummy);

        sql = ` 
            SELECT       
                  s.id_servizio AS value,
                  c.tl_testo_1 ->> 'it' AS "textValue",
                  contenuto.tl_testo_1 ->> 'it' as "catAccreditamento"
            FROM  ${context.tabelle.servizio} s
            LEFT OUTER JOIN ${context.tabelle.contenuto} c
             ON c.id_contenuto=s.id_servizio
            LEFT OUTER JOIN ${context.tabelle.contenuto} contenuto
             ON contenuto.id_contenuto=s.id_categoria_accreditamento 

	    inner join ${context.tabelle.contenuto_stt} st on c.id_contenuto = st.id_contenuto
		and st.ts_variazione_stato = (select max(st2.ts_variazione_stato)
							 	from ${context.tabelle.contenuto_stt} as st2
							 	where st2.id_contenuto = c.id_contenuto)

            WHERE id_categoria_accreditamento IN ${dummy} AND st.cd_stato_contenuto = 2 
            ORDER BY "textValue" ASC, "catAccreditamento" ASC
          `;
        context.logger.info(sql, args);
        rs.servizi = await context.db.any(sql, args);
      }
      return rs.servizi;
    },

    EstraiServizioErogatoEnte004: async (parent, args, context, info) => {
      context.logger.info(selectServizioErogatoEnte004, args);
      return await context.db.any(selectServizioErogatoEnte004, args);
    },
    EstraiServizioErogatoEnte004Admin: async (parent, args, context, info) => {
      context.logger.info(selectServizioErogatoEnte004Admin, args);
      return await context.db.any(selectServizioErogatoEnte004Admin, args);
    },
    EstraiDettaglioAmministrativoServizioEnte: async (parent, args, context, info) => {
      context.logger.info(selectEstraiDettaglioAmministrativoServizioEnte, args);
      const res = await context.db.oneOrNone(selectEstraiDettaglioAmministrativoServizioEnte, args);
      // da abilitare con 0-18
      res.fg_0_18_anni = res.fg_0_18_anni === '1';
      context.logger.info(selectCdContenutoFromServizioErogatoEnte, args);
      const cdContenuto = await context.db.oneOrNone(selectCdContenutoFromServizioErogatoEnte, args);
      if(cdContenuto?.cd_contenuto === cdContenuto018){
        res.is_018 = true;
      }
      context.logger.info(selectSliderImg, args);
      const resImg1 = await context.db.oneOrNone(selectSliderImg, { ...args, nr_progressivo_slider: 1 });
      const resImg2 = await context.db.oneOrNone(selectSliderImg, { ...args, nr_progressivo_slider: 2 });
      const resImg3 = await context.db.oneOrNone(selectSliderImg, { ...args, nr_progressivo_slider: 3 });
      const sliderImg= {
        slider1: resImg1 || undefined,
        slider2: resImg2 || undefined, 
        slider3: resImg3 || undefined,
      };
      return { 
        sliderImg, 
        ...res,
      };
    },

  },
  Mutation: {
    InoltraCompilazioneEnte: async (parent, args, context, info) => {
      let sql;
      await context.db.tx('Complilazione', async t => {
        sql = `INSERT INTO ${context.tabelle.servizio_erogato_ente_stt}
    (id_servizio_ente,ts_variazione_stato,cd_stato_dati_servizio_ente,id_utente)
    VALUES ($[id_servizio_ente],localtimestamp,$[cd_stato_dati_servizio_ente],$[id_utente]) RETURNING *;`;
        context.logger.info(sql);
        await t.oneOrNone(sql, args.input);


        if (args.input.js_note_adminwemi_su_servizio) {
          sql = `UPDATE ${context.tabelle.servizio_erogato_ente}
SET ${args.input.js_note_adminwemi_su_servizio ? 'js_note_adminwemi_su_servizio=$[js_note_adminwemi_su_servizio]' : ''}
WHERE id_servizio_ente=$[id_servizio_ente]`;
          context.logger.info(sql);
          await t.oneOrNone(sql, args.input);
        }
      });
    },



    InserisciDatiServizioEnte: async (parent, args, context, info) => {
      const { user: { idUtente } } = context;
      let sql, risultatofinale;

      await context.db.tx('DatiServizi', async t => {
        const servizioErogatoEnteController = new ServizioErogatoEnteController(t, context);
        await servizioErogatoEnteController.insert(args.input);

        await t.none(deleteRDestLiv1, args.input);

        for (let i = 0; i < args.input.id_destinatario_liv1.length; i++) {
          const id_destinatario_liv1 = args.input.id_destinatario_liv1[i];

          await t.oneOrNone(insertRDestLiv1, { ...args.input, id_destinatario_liv1: id_destinatario_liv1 }).then(result => risultatofinale = result);
        }

        await t.none(deleteRDestLiv2, args.input)

        for (let i = 0; i < args.input.id_destinatario_liv2.length; i++) {
          const id_destinatario_liv2 = args.input.id_destinatario_liv2[i];


          context.logger.info(insertRDestLiv2);
          await t.oneOrNone(insertRDestLiv2, { ...args.input, id_destinatario_liv2: id_destinatario_liv2 });
        }
        const updateForInserisciDatiServizioEnteConst = updateForInserisciDatiServizioEnte(args);

        context.logger.info(updateForInserisciDatiServizioEnteConst);
        await t.oneOrNone(updateForInserisciDatiServizioEnteConst, args.input);

        if (args.input.qt_tempo_max_attivazione !== undefined) {
          const updateQTempoMaxAttivazioneConst = updateQTempoMaxAttivazione(args);
          context.logger.info(updateQTempoMaxAttivazioneConst);
          await t.oneOrNone(updateQTempoMaxAttivazioneConst, args.input);
        }
        
        await t.none(deleteRMunicipioServEnte, args.input)

        for (let i = 0; i < args.input.cd_municipio_servito.length; i++) {

          const cd_municipio_servito = args.input.cd_municipio_servito[i];

          context.logger.info(insertRMunicipioServEnte);
          await t.oneOrNone(insertRMunicipioServEnte, { ...args.input, cd_municipio_servito: cd_municipio_servito });
        }

        await t.none(deleteRFasciaOrariaErogSrvEnte, args.input);

        for (let i = 0; i < args.input.cd_fascia_oraria_erog_srv_ente.length; i++) {

          const cd_fascia_oraria_erog_srv_ente = args.input.cd_fascia_oraria_erog_srv_ente[i];

          context.logger.info(insertRFasciaOrariaErogSrvEnte);
          await t.oneOrNone(insertRFasciaOrariaErogSrvEnte, { ...args.input, cd_fascia_oraria_erog_srv_ente: cd_fascia_oraria_erog_srv_ente });
        }

        const updateCdTipoConst = updateCdTipo(args);

        context.logger.info(updateCdTipoConst);
        await t.oneOrNone(updateCdTipoConst, args.input);



        await t.none(deleteRMansioneServErogEnte, args.input);

        for (let i = 0; i < args.input.mansioni.length; i++) {
          const id_mansione = args.input.mansioni[i].idMansione;
          const {order} = args.input.mansioni[i];

          context.logger.info(insertRMansioneServErogEnte);
          await t.oneOrNone(insertRMansioneServErogEnte, { ...args.input, id_mansione: id_mansione, order });
        }


        await t.none(deleteRSostEconServErogEnte, args.input);

        for (let i = 0; i < args.input.id_contenuto_sostegno_econ.length; i++) {
          const id_contenuto_sostegno_econ = args.input.id_contenuto_sostegno_econ[i];
          context.logger.info(insertRSostEconServErogEnte);
          await t.oneOrNone(insertRSostEconServErogEnte, { ...args.input, id_contenuto_sostegno_econ: id_contenuto_sostegno_econ });
        }


        context.logger.info(insertServizioErogatoStt);
        await t.oneOrNone(insertServizioErogatoStt, { ...args.input, id_utente: idUtente });


        if (args.input.js_note_adminwemi_su_servizio) {
          const updateNoteConst = updateNote(args);
          context.logger.info(updateNoteConst);
          await t.oneOrNone(updateNoteConst, args.input);
        }

      });
    },

    InserisciServizioEnte004: async (parent, args, context, info) => {
      const { user: { idUtente } } = context;
      let rs = {}, sql;
      rs.id_ente = args.input.id_ente_erogatore;
      rs.id_utente = idUtente;
      rs.servizi = args.input.id_servizio_riferimento;
      context.logger.info('PSQL id_ente/id_utente/servizi:', rs.id_ente, rs.id_utente, rs.servizi);
      rs.servizi.map(async ele => {
        context.logger.info('ITERAZIONE id_serv_rif:', ele);
        let id;
        sql = 'SELECT nextVal(\'seq_servizio_erogato_ente\')';
        id = await context.db.one(sql);
        context.logger.info('PSQL ID Nuovo Servizio Erogato:', id);
        sql = `
              INSERT INTO wemi2.servizio_erogato_ente(
               id_servizio_ente,
               id_servizio_riferimento,
               id_ente_erogatore,
               tl_descrizione_serv_erog_ente,
               qt_tempo_max_attivazione,
               im_prezzo_minimo,
               im_prezzo_minimo_offerta_calc,
               dt_inizio_val_offerta_prezzo,
               dt_fine_val_offerta_prezzo,
               cd_tipo_offerta_srv,
               id_sede_erogazione_srv,
               tx_altre_mansioni,
               js_dati_prezzo,
               js_info_personale,
               cd_modalita_erogazione,
               cd_tipo_servizio_erog,
               qt_min_pers,
               qt_max_pers,
               dt_inizio_erog_serv,
               dt_fine_erog_serv,
               js_note_adminwemi_su_servizio,
               fg_accetta_preventivo,
               pg_versione,
               ts_creazione)
                VALUES (
                  ${id.nextval},
                  ${ele},
                  ${rs.id_ente},
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  1,
                  1,
                  localtimestamp);

              INSERT INTO wemi2.servizio_erogato_ente_stt(
                id_servizio_ente,
                ts_variazione_stato,
                cd_stato_dati_servizio_ente,
                id_utente)
              VALUES (
                  ${id.nextval}, 
                  localtimestamp,
                  2,
                  ${rs.id_utente})
          `;
        context.logger.info('Your query is:', sql);
        return await context.db.oneOrNone(sql);
      });

      return rs;
    },

  },

  ServizioErogatoEnte: {
    js_dati_prezzo: async (parent, args, context, info) => {
      const dao = new EnteDAO(context.db, context.queryBuilder, context.formatter);
      const prezzo = await dao.getPrezzo(parent.id_servizio_ente);
      if (!prezzo) {
        return null;
      }
      const persone = await dao.getPersone(prezzo.idPrezzo);
      const listinoPrezzi = [];
      for (let i = 0; i < persone.length; i += 1) {
        const offerta = await dao.getQuantita(persone[i].idPrezzoPersone);
        listinoPrezzi.push({
          ...persone[i],
          offerta,
        });
      }
      return {
        ...prezzo,
        listinoPrezzi,
      };
    },
    sediErogatrici: async (parent, args, context, info) => {
      const servizioErogatoEnteController = new ServizioErogatoEnteController(context.db, context);
      const res = await servizioErogatoEnteController.find(parent.id_servizio_ente);
      return res.sediErogatrici;
    },
    storiaStati: async (parent, args, context, info) => {
      const sql = `
      SELECT id_servizio_ente, ts_variazione_stato,
       cd_stato_dati_servizio_ente, id_utente
      FROM ${context.tabelle.servizio_erogato_ente_stt}
      WHERE id_servizio_ente = $[id_servizio_ente]
      `;
      context.logger.info(sql, parent);
      return await context.db.any(sql, parent);
    },
    ultimoStato: async (parent, args, context, info) => {
      const sql = `
      select  id_servizio_ente, ts_variazione_stato,
      cd_stato_dati_servizio_ente, id_utente
      from ${context.tabelle.servizio_erogato_ente_stt}
      where id_servizio_ente = $[id_servizio_ente] and ts_variazione_stato = (
      select MAX(ts_variazione_stato)
          from ${context.tabelle.servizio_erogato_ente_stt}
          where id_servizio_ente = $[id_servizio_ente]
      )
      `;
      context.logger.info(sql, parent);
      return await context.db.oneOrNone(sql, parent);

    },
    ente: async (parent, args, context, info) => {
      const sql = `
        SELECT ente.id_ente, id_partita_iva_ente, nm_ente, 
        nm_ente_completo, id_utente_admin, pg_versione, 
        dt_inizio_val, dt_fine_val, ts_creazione, cd_stato_ente
       FROM ${context.tabelle.ente}
       LEFT  JOIN ${context.tabelle.ente_stt} ON ente_stt.id_ente=ente.id_ente
       where ente.id_ente =$[id_ente_erogatore]  and ts_variazione_stato = (select MAX(ts_variazione_stato)
       from wemi2.ente_stt 
       where id_ente=$[id_ente_erogatore])
      `;
      context.logger.info(sql);
      return await context.db.oneOrNone(sql, parent);
    },
    service: async (parent, args, context, info) => {
      const sql = `
      SELECT  tl_testo_aggettivo, tl_testo_sostantivo, id_servizio, id_categoria_accreditamento, 
      tx_tags_ricerca, 
      ${context.tabelle.servizio}.cd_unita_prezzo as "cdUnitaPrezzo", 
      ${context.tabelle.d_unita_prezzo_servizio}.tl_testo_aggettivo as "tlTestoAggettivo",
      ${context.tabelle.d_unita_prezzo_servizio}.tl_testo_sostantivo  as "tlTestoSostantivo",
      ${context.tabelle.contenuto}.tl_testo_1 as "txTitoloServizio",
      ${context.tabelle.contenuto}.tl_testo_2 as "txDescrizioneServizio",
      contenuto_riferimento.tl_testo_1 as "txTitoloCategoria", 
      contenuto_riferimento.id_contenuto as "idCategoria"
      from ${context.tabelle.servizio}
         inner join ${context.tabelle.contenuto} ON ${context.tabelle.contenuto}.id_contenuto 
         = ${context.tabelle.servizio}.id_servizio
         inner join ${context.tabelle.contenuto_associato} ON ${context.tabelle.contenuto}.id_contenuto = 
         ${context.tabelle.contenuto_associato}.id_contenuto_primario
         inner join ${context.tabelle.contenuto} as contenuto_riferimento ON contenuto_riferimento.id_contenuto =
          ${context.tabelle.contenuto_associato}.id_contenuto_associato
          left join ${context.tabelle.d_unita_prezzo_servizio} ON ${context.tabelle.servizio}.cd_unita_prezzo = d_unita_prezzo_servizio.cd_unita_prezzo
           WHERE id_servizio =$[id_servizio_riferimento] 
          LIMIT 1 `;
      context.logger.info(sql);
      let result = await context.db.oneOrNone(sql, parent);
      let servizio = { id_servizio: -1 };

      if (!isNullOrUndefined(result)) {
        servizio = {
          id_servizio: result.id_servizio,
          id_categoria_accreditamento: result.id_categoria_accreditamento,
          txTitoloServizio: result.txTitoloServizio,
          txDescrizioneServizio: result.txDescrizioneServizio,
          cd_unita_prezzo: result.cdUnitaPrezzo,
          prezzo: {
            cd_unita_prezzo: result.cdUnitaPrezzo,
            tl_testo_aggettivo: result.tlTestoAggettivo,
            tl_testo_sostantivo: result.tlTestoAggettivo,
          },
          tx_tags_ricerca: result.tx_tags_ricerca,
          idCategoria: result.idCategoria,
          categoriaPrincipaleServizio: [
            {
              idCategoria: result.idCategoria,
              txTitoloCategoria: result.txTitoloCategoria,
            }],
        };
      }
      context.logger.info(servizio);
      return servizio;
    },

    listaDestinatariPrimoLivello: async (parent, args, context, info) => {
      const sql = `
      select   wemi2.contenuto.id_contenuto as "idDestinatario",
      tl_testo_1 as "txDestinatario"
from    wemi2.contenuto
    
  inner join wemi2.contenuto_stt on wemi2.contenuto_stt.id_contenuto = wemi2.contenuto.id_contenuto
      where    ty_contenuto=15 and wemi2.contenuto_stt.cd_stato_contenuto=2
and wemi2.contenuto_stt.ts_variazione_stato = 
(SELECT MAX(ts_variazione_stato)
 FROM wemi2.contenuto_stt
 where wemi2.contenuto.id_contenuto = wemi2.contenuto_stt.id_contenuto
) 
and wemi2.contenuto.id_contenuto

in (select t.id_destinatario_liv1
from wemi2.r_dest_liv1_servizio_erog as t
where id_servizio_ente=$[id_servizio_ente])
      ORDER BY nr_ordine_visualizzazione ASC
      `;
      context.logger.info(sql);
      return await context.db.any(sql, parent);
    },
    listaDestinatariSecondoLivello: async (parent, args, context, info) => {
      const sql = `
      select   wemi2.contenuto.id_contenuto as "idDestinatario",
      tl_testo_1 as "txDestinatario", 
      id_contenuto_associato as "idDestinatarioPrimoLivello"
from    wemi2.contenuto
   inner join ${context.tabelle.contenuto_associato} ON id_contenuto_primario = id_contenuto 
  inner join wemi2.contenuto_stt on wemi2.contenuto_stt.id_contenuto = wemi2.contenuto.id_contenuto
      where    ty_contenuto=16 and wemi2.contenuto_stt.cd_stato_contenuto=2
and wemi2.contenuto_stt.ts_variazione_stato = 
(SELECT MAX(ts_variazione_stato)
 FROM wemi2.contenuto_stt
 where wemi2.contenuto.id_contenuto = wemi2.contenuto_stt.id_contenuto
) 
and wemi2.contenuto.id_contenuto

in (select t.id_destinatario_liv2
from wemi2.r_dest_liv2_servizio_erog as t
where id_servizio_ente=$[id_servizio_ente])
      ORDER BY nr_ordine_visualizzazione ASC
      `;
      context.logger.info(sql);
      return await context.db.any(sql, parent);
    },
    listaMunicipiServiti: async (parent, args, context, info) => {
      const sql = `
      select  cd_municipio as "idMunicipio", tl_valore_testuale as "nmMunicipio"
      from ${context.tabelle.d_municipio}
   inner join ${context.tabelle.r_municipio_servito_serv_ente} ON 
   ${context.tabelle.r_municipio_servito_serv_ente}.cd_municipio_servito = ${context.tabelle.d_municipio}.cd_municipio          
   where id_servizio_ente=$[id_servizio_ente]`;
      context.logger.info(sql);
      return await context.db.any(sql, parent);
    },
    listaMansioniSvolte: async (parent, args, context, info) => {
      const sql = selectMansioniServizioErogato;
      context.logger.info(sql);
      return await context.db.any(sql, parent);
    },
    listaModalitaPagamento: async (parent, args, context, info) => {
      const sql = `
      select  offerta.cd_tipo_offerta_srv as "cdOfferta", tl_valore_testuale, pg_visualizzazione
      from ${context.tabelle.d_tipo_offerta} as offerta
	  inner join ${context.tabelle.servizio_erogato_ente} ON 
	  ${context.tabelle.servizio_erogato_ente}.cd_tipo_offerta_srv = offerta.cd_tipo_offerta_srv
      where id_servizio_ente=$[id_servizio_ente]
      ORDER BY pg_visualizzazione ASC
   
   `;
      context.logger.info(sql, parent);
      return await context.db.any(sql, parent);
    },
    listaPeriodiErogazione: async (parent, args, context, info) => {
      const sql = `
      select  cd_fascia_oraria as id_periodo,
      tl_valore_testuale, 
           pg_visualizzazione
      from ${context.tabelle.r_fascia_oraria_erog_srv_ente}
   inner join ${context.tabelle.d_fascia_oraria} on 
   ${context.tabelle.d_fascia_oraria}.cd_fascia_oraria= ${context.tabelle.r_fascia_oraria_erog_srv_ente}.cd_fascia_oraria_erog_srv_ente
   where id_servizio_ente=$[id_servizio_ente]`;
      context.logger.info(sql);
      return await context.db.any(sql, parent);
    },
    listaSostegniEconomiciSupportati: async (parent, args, context, info) => {
      const sql = `
      select    id_contenuto as "idSostegno",
      tl_testo_1 as "txSostegno"
      from    ${context.tabelle.contenuto}
      where    ty_contenuto=17 and id_contenuto
      in (select id_contenuto_sostegno_econ
      from ${context.tabelle.r_sost_econ_serv_erog_ente} 
      where id_servizio_ente=$[id_servizio_ente])
      ORDER BY nr_ordine_visualizzazione ASC;`;
      context.logger.info(sql);
      return await context.db.any(sql, parent);
    },

  },


};
