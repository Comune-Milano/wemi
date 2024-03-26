import path from 'path';
import { ApolloError } from 'apollo-server';
import EnteDAO from '../../dao/ente/enteDAO';
import { VALIDATION_ERROR } from '../../errors/errors';
import { inserisciMediaEnteSql } from 'sql/media/insert';
import { inserisciAllegatoEnteSql } from 'sql/allegatoente/insert';
import { estraiAllegatoEnteSql } from 'sql/allegatoente/select';
import { 
  aggiornaLogoDatiPropriEnteSql,
} from 'sql/dati_propri_ente/update';
import { eliminaMediaEnteSql } from 'sql/media/delete';
import { 
  eliminaAllegatoEnteByIdSql,
} from 'sql/allegatoente/delete';
import {
  selezionaByUsername,
  selezionaByIdUtenteSql,
  selezionaUtenteAdminEnteSql,
  selezioneIdUtenteAdmin,
} from 'sql/utente/selezione';
import { inserisciRelazioneOperatoreEnteSql } from 'sql/roperatoreente/insert';
import { updateTyOperatoreEnteSql } from 'sql/utente/update';
import { selezionaEnteOperatoreSql } from 'sql/roperatoreente/select';
import { findEnti, findServicesEnte, selezionaEnteByOperatoreEnteAdminSql } from 'sql/ente/selezione';
import { inserisciUtenteAdminEnte, inserisciUtenteOperatoreEnteSql } from 'sql/utente/inserimento';
import { eliminaOperatoreEnteSql } from 'sql/roperatoreente/delete';
import {
  INSERT_OPERATORE_VALIDATION_ERROR,
  INSERT_OPERATORE_ADMIN_VALIDATION_ERROR,
  INSERT_LAVORATORE_VALIDATION_ERROR,
  DELETE_OPERATORE_ASSOCIATO_VALIDATION_ERROR,
  INSERT_OPERATORE_WEMI_ADMIN_VALIDATION_ERROR,
} from 'errors/schedaente';
import { CITTADINO, AMMINISTRATORE, OPERATORE_ENTE } from 'constants/usercode';
import { TY_OPERATORE_ENTE, TY_AMMINISTRATORE_ENTE, FLAG_LAVORATORE, TY_CITTADINO } from 'constants/userroles';
import { updateNoteAdmin } from 'sql/dati_propri_ente/updateNoteAdmin';
import { updateIdSede } from 'sql/servizioerogatoente/updateIdSede';
import { deleteSede } from 'sql/sede_ente/deleteSede';
import { updateSedeEnte } from 'sql/sede_ente/updateSedeEnte';
import { insertSedeEnte } from 'sql/sede_ente/insertSedeEnte';
import { updateDatiPropriEnte } from 'sql/dati_propri_ente/updateDatiPropriEnte';
import { updateTy1 } from 'sql/sede_ente/updateTy1';
import { insertStt } from 'sql/ente_stt/insertStt';
import { saveFileFromBase64 } from 'utility/saveFileFromBase64';
import { deleteFile } from 'utility/deleteFile';
import { STORAGE_ABS_PATH } from 'environment';
import { ProfileManager } from 'domain/profiles';
import { insertUtenteXente } from 'sql/utente/insertEnte';
import { searchUserByEmail } from 'sql/utente/searchUserByEmail';
import { insertEnte, insertEnteStt } from 'sql/ente/insert';
import { insertSpazioWemi } from 'sql/r_spazio_wemi_ente/insert';
import { insertCatAcc } from 'sql/r_cat_acc_ente/insert';
import { insertDatiPropriEnte } from 'sql/dati_propri_ente/insert';
import { TY_SEDE } from 'constants/db/sede';

export default {
  Query: {
   
    
    entePK: async (parent, args, context) => {
      const sql = `
      select  ente.id_ente,
              id_partita_iva_ente, 
              nm_ente,
              nm_ente_completo, 
              id_utente_admin, 
              ente.dt_inizio_val,
              ente.dt_fine_val, 
              ptx_email,
              cd_stato_ente, 
              id_cat_accreditamento,
              id_spazio_wemi
      from   ${context.tabelle.ente} ente
      left join ${context.tabelle.utente} on ente.id_utente_admin=${context.tabelle.utente}.id_utente
      left join ${context.tabelle.ente_stt} on ente.id_ente=${context.tabelle.ente_stt}.id_ente
      left join ${context.tabelle.r_cat_acc_ente} on ente.id_ente=${context.tabelle.r_cat_acc_ente}.id_ente
      left join ${context.tabelle.r_spazio_wemi_ente} on ente.id_ente=${context.tabelle.r_spazio_wemi_ente}.id_ente 
      inner join ${context.tabelle.datiPropriEnte} ON dati_propri_ente.id_ente_rif = ente.id_ente
      where   ente.id_ente = $[id_ente] and ts_variazione_stato = (  
        select MAX(ts_variazione_stato)
     from wemi2.ente_stt
       where id_ente =  ente.id_ente 
   );
      `;
      context.logger.info(sql, args);
      let result = await context.db.any(sql, args);
      let json = {};
      let categorie = [];
      let spazi = [];
      for (let i = 0; i < result.length; i = i + 1) {
        if (!json.id_ente)
          json.id_ente = result[0].id_ente;
        if (!json.id_partita_iva_ente)
          json.id_partita_iva_ente = result[0].id_partita_iva_ente;
        if (!json.nm_ente_completo)
          json.nm_ente_completo = result[0].nm_ente_completo;
        if (!json.nm_ente)
          json.nm_ente = result[0].nm_ente;
        if (!json.ptx_email)
          json.ptx_email = result[0].ptx_email;
        if (!json.cd_stato_ente)
          json.cd_stato_ente = result[0].cd_stato_ente;
        for (let y = 0; y < result.length; y += 1) {
          let found = false;
          for (let z = 0; z < categorie.length; z++)
            if (categorie[z] === result[y].id_cat_accreditamento)
              found = true;
          if (!found)
            categorie.push(result[y].id_cat_accreditamento);
        }
        // if(categorie[i]!=result[1].id_cat_accreditamento)                
        // categorie.push(result[1].id_cat_accreditamento )
        // if(categorie[i]!=result[2].id_cat_accreditamento)
        // categorie.push(result[2].id_cat_accreditamento )

        //  for(let i=0;i<categorie.length;i++)
        //     if (categorie[i]==result[y].id_cat_accreditamento)
        //     {}else{
        //  categorie.push(result[y].id_cat_accreditamento )}

        json.categorie = categorie;
        if (!json.id_spazio_wemi) {
          for (let y = 0; y < result.length; y++) {
            let found = false;
            for (let i = 0; i < categorie.length; i++)
              if (spazi[i] === result[0].id_spazio_wemi)
                found = true;
            if (!found)
              spazi.push(result[0].id_spazio_wemi);
          }
        }
        json.spaziWeMi = spazi;
        break;
      }
      return json;
    },

    enteAll: async (parent, args, context) => {
      const sql = `
        select  id_ente,
                id_partita_iva_ente,
                nm_ente,
                nm_ente_completo,
                id_utente_admin,
                pg_versione,
                dt_inizio_val,
                dt_fine_val,
                ts_creazione
        from    ${context.tabelle.ente};
        `;
      context.logger.info(sql, args);
      return await context.db.any(sql, args);
    },

    enteDatiPK: async (parent, args, context) => {
      const sql = `
      SELECT
      dpe.id_ente_rif,
      tl_descrizione_ente,
      convert_from(mdLogo.oj_media, 'UTF-8') as oj_media_logo,
      mdLogo.nm_nome_media,
      mdLogo.ty_mime_type_media,
      dpe.id_img_logo,
      js_referente,
      js_primo_contatto,
      tx_note_primo_contatto AS note_per_cittadino,
      js_altre_info,
      js_note_adminwemi,
      se.js_sede AS sede_principale,
      tsede_secondarie.sede_secondarie,
      CASE WHEN mdLogo.iw_path IS NOT NULL
           THEN CONCAT('${STORAGE_ABS_PATH}', '/', mdLogo.iw_path)
      END as iw_path_logo
      FROM ${context.tabelle.datiPropriEnte} as dpe
      LEFT OUTER JOIN ${context.tabelle.sede_ente} as se ON se.id_ente_rif = dpe.id_ente_rif AND se.ty_sede = 1
      LEFT OUTER JOIN ${context.tabelle.media} mdLogo ON mdLogo.id_media = dpe.id_img_logo
      CROSS JOIN (
        SELECT 
        json_build_object('sedi', json_agg((js_sede,se.id_sede)) ) as sede_secondarie
        FROM ${context.tabelle.sede_ente} se
        WHERE se.id_ente_rif = $[id_ente_rif]
        AND se.ty_sede > 1
      ) AS tsede_secondarie
      WHERE dpe.id_ente_rif = $[id_ente_rif];

      WITH allegatiEnte as ( 
          SELECT
          md.id_media,
          dm.cd_dominio,
          dm.tl_valore_testuale #>> '{it}' as tl_valore_testuale,
          md.ty_mime_type_media,
          md.nm_nome_media,
          dm.pg_visualizzazione,
          CASE WHEN md.iw_path IS NOT NULL
               THEN CONCAT('${STORAGE_ABS_PATH}', '/', md.iw_path)
          END as iw_path
          FROM ${context.tabelle.allegato_ente} as ae
          LEFT OUTER JOIN ${context.tabelle.media} as md on ae.id_media = md.id_media
          INNER JOIN ${context.tabelle.dominio} as dm on ae.ty_allegato = dm.cd_dominio AND dm.ty_dominio = 'ALLEGATO_ENTE'
          WHERE ae.id_ente = $[id_ente_rif]
          UNION ALL
          SELECT
          null as id_media,
          dm.cd_dominio,
          dm.tl_valore_testuale #>> '{it}' as tl_valore_testuale,
          null as ty_mime_type_media,
          null as nm_nome_media,
          dm.pg_visualizzazione,
          null as iw_path
          FROM ${context.tabelle.dominio} as dm
          WHERE dm.ty_dominio = 'ALLEGATO_ENTE'
          AND dm.cd_dominio NOT IN (
            SELECT
            ae.ty_allegato
            FROM ${context.tabelle.allegato_ente} as ae
            LEFT OUTER JOIN ${context.tabelle.media} as md on ae.id_media = md.id_media
            WHERE ae.id_ente = $[id_ente_rif]
          )
      )
      SELECT * FROM allegatiEnte ORDER BY "pg_visualizzazione" = 0 nulls last, "pg_visualizzazione";
      `;

      context.logger.info(sql, args);

      const [
        [datiEnte],
        allegatiEnte,
      ] = await context.db.multi(sql, args);

      return {
        ...datiEnte,
        allegatiEnte,
      };
    },

    EstraiListaEnte: async (parent, args, context) => context.db.task(async task => {
      context.logger.info(findEnti, args);

      const result =  await task.any(findEnti, args);
      if(!result.length){
        return [];
      }
      const servizi =  await task.any(findServicesEnte, { ...args, result: result.map(item => item.id_ente)});
      return result.map((item) => {
        const defaultReturn = {
          ...item,
          accreditato: false,
        };
        const foundElement = servizi.find(servizio => servizio.id_ente_erogatore === item.id_ente);
        if(!foundElement){
          return defaultReturn;
        }
        const { count: countServizio } = foundElement;
        if(countServizio > 0){
          return {
            ...item,
            accreditato: true,
          };
        }
        return defaultReturn;
      });
    }),

    EstraiDatiPropriEnte: async (parent, args, context) => {
      const sql = `
        SELECT  e1.id_ente,
        id_partita_iva_ente,
        nr_operatori_servizi_wemi,
        nm_ente,
        nm_ente_completo,
        ptx_email,
        cd_stato_ente,
        e2.id_utente,
        ts_variazione_stato,
        cd_stato_ente,
        d.tl_valore_testuale,
        id_spazio_wemi,
        id_cat_accreditamento,
        pg_versione

        FROM    ${context.tabelle.ente} e1
        left join wemi2.r_cat_acc_ente on e1.id_ente = wemi2.r_cat_acc_ente.id_ente
        left join wemi2.r_spazio_wemi_ente on e1.id_ente  = wemi2.r_spazio_wemi_ente.id_ente
        
        LEFT OUTER JOIN ${context.tabelle.ente_stt} e2
          ON e2.id_ente = e1.id_ente AND
             e2.ts_variazione_stato = (select max(ts_variazione_stato)
                                      from ${context.tabelle.ente_stt} ex where ex.id_ente = e1.id_ente)
        left outer  JOIN wemi2.dominio d
         ON e2.cd_stato_ente= d.cd_dominio and d.ty_dominio='STATO_ENTE' 
                                      
        LEFT OUTER JOIN ${context.tabelle.utente} u
          ON 
          e1.id_utente_admin=u.id_utente
        WHERE  e1.id_ente = $[id_ente];`;
      context.logger.info(sql, args);
      let r= await context.db.any(sql, args);
      
      let risultato={
        'id_ente':'',
        'id_partita_iva_ente':'',
        'nr_operatori_servizi_wemi':'',
        'nm_ente':'',
        'nm_ente_completo':'',
        'ptx_email':'',
        'cd_stato_ente':'',
        'id_utente':'',
        'ts_variazione_stato':'',
        'cd_stato_ente':'',
        'tl_valore_testuale':'',
        'id_spazio_wemi':[],
        'id_cat_accreditamento':[],
      };
      
      for(let i=0;i<r.length;i++){
        if(risultato.id_ente=='')
          risultato.id_ente= r[0].id_ente;
        if(risultato.id_partita_iva_ente=='')
          risultato.id_partita_iva_ente= r[0].id_partita_iva_ente;
        if(risultato.nr_operatori_servizi_wemi=='')
          risultato.nr_operatori_servizi_wemi = r[0].nr_operatori_servizi_wemi;
        if(risultato.nm_ente=='')
          risultato.nm_ente= r[0].nm_ente;
        if(risultato.nm_ente_completo=='')
          risultato.nm_ente_completo= r[0].nm_ente_completo;
        if(risultato.ptx_email=='')
          risultato.ptx_email= r[0].ptx_email;
        if( risultato.cd_stato_ente=='')
          risultato.cd_stato_ente=r[0].cd_stato_ente;
        if(risultato.id_utente=='')
          risultato.id_utente= r[0].id_utente;
        if(risultato.ts_variazione_stato=='')
          risultato.ts_variazione_stato= r[0].ts_variazione_stato;
        if(risultato.cd_stato_ente=='')
          risultato.cd_stato_ente= r[0].cd_stato_ente;
        if(risultato.tl_valore_testuale=='')
          risultato.tl_valore_testuale= r[0].tl_valore_testuale;
           
        risultato.id_spazio_wemi.push(r[i].id_spazio_wemi);
          
        risultato.id_cat_accreditamento.push(r[i].id_cat_accreditamento);
 
      }
      let arr1=[];
      for(let i=0;i<risultato.id_cat_accreditamento.length;i++){
        let p=true;
        for(let y=0;y<arr1.length;y++){
          if(risultato.id_cat_accreditamento[i]==arr1[y]){
            p=false;
            break;
          }
        }

        if(p){
          arr1.push(risultato.id_cat_accreditamento[i]);
        }
      }
      risultato.id_cat_accreditamento=arr1;
      let arr2=[];
      for(let i=0;i<risultato.id_spazio_wemi.length;i++){
        let p=true;
        for(let y=0;y<arr2.length;y++){
          if(risultato.id_spazio_wemi[i]==arr2[y]){
            p=false;
            break;
          }
        }

        if(p){
          arr2.push(risultato.id_spazio_wemi[i]);
        }
      }
     
      risultato.id_spazio_wemi=arr2;
      return risultato;
    },

    EstraiCategorieAccreditamento: async (parent, args, context) => {
      const sql = `
          SELECT  
          r.id_cat_accreditamento AS value,
          c.tl_testo_1 ->> 'it' AS "textValue"
          FROM ${context.tabelle.r_cat_acc_ente} r
          LEFT OUTER JOIN ${context.tabelle.contenuto} c
                ON r.id_cat_accreditamento=c.id_contenuto
          WHERE r.id_ente=$[id_ente]
          `;
      context.logger.info(sql, args);
      return await context.db.any(sql, args);
    },

    altreInfoEnte: async (parent, args, context) => {
      const sql = `
      SELECT js_altre_info
      FROM ${context.tabelle.datiPropriEnte}
      WHERE id_ente_rif = $[id_ente]`;
      context.logger.info(sql);
      return await context.db.oneOrNone(sql, args);
    },  

    EstraiAllegatoEnte: async (parent, args, context) => {
      const { oj_media } = await context.db.oneOrNone(estraiAllegatoEnteSql, args);
      return oj_media;
    },

    getValidDataMerchant: async (parent, args, context) => {
      const dao = new EnteDAO(context.db, context.queryBuilder, context.formatter);
      return dao.findValidDataMerchant(args.id_ente);
    },
  },
  EnteInfo: {
    datiMerchant: async (parent, args, context) => {
      const dao = new EnteDAO(context.db, context.queryBuilder, context.formatter);
      return dao.findDatiMerchant(parent.id_ente);
    },
  },
  Mutation: {
    setDatiPrezzo: async(parent, args, context) => {
      const dao = new EnteDAO(context.db, context.queryBuilder, context.formatter);
      return dao.insertOrUpdateListinoPrezzi(args.input.idServizioEnte, args.input);
    },
    setDatiMerchant: async(parent, args, context) => {
      const dao = new EnteDAO(context.db, context.queryBuilder, context.formatter);
      const merchant = {...args.merchant};
      const errors = [];
      if (!merchant.merchantId) {
        errors.push('Il merchantId è obbligatorio');
      }
      if (!merchant.publicKey) {
        errors.push('La public key è obbligatoria');
      }
      if (!merchant.privateKey) {
        errors.push('La private key è obbligatoria');
      }
      if (!merchant.dataInizio) {
        errors.push('La data di inizio è obbligatoria');
      } else if (
        merchant.dataFine &&
        new Date(merchant.dataInizio).getTime() >= new Date(merchant.dataFine).getTime()) {
        errors.push('La data di inizio deve essere precedente alla data di fine');
      } else if (
        merchant.dataFine &&
        new Date(merchant.dataFine).getTime() < new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate()).getTime()
      ) {
        errors.push('La data di fine non può essere precedente al giorno attuale');
      }
      if (errors.length > 0) {
        throw new ApolloError(
          VALIDATION_ERROR.message,
          VALIDATION_ERROR.code,
          {data: errors}
        );
      }
      return dao.insertOrUpdateMerchant(merchant, merchant.idUtente);
    },
    modificaNoteEnte: async (parent, args, context) => {
      const sql = `
      UPDATE ${context.tabelle.datiPropriEnte} 
      SET js_note_adminwemi=$[js_note_adminwemi]
      WHERE  id_ente_rif=$[id_ente_rif];

      INSERT INTO ${context.tabelle.ente_stt} (
        id_ente,
        ts_variazione_stato,
        cd_stato_ente,
        id_utente)
        VALUES (
          $[id_ente_rif], 
          localtimestamp, 
          $[cd_stato_ente],
          $[id_utente]
        );
      `;
      context.logger.info(sql, args);
      return await context.db.oneOrNone(sql, args.input);

    },

    InserisciDatiIPropriEnte: async (parent, args, context) => {
      
      const { user: { idUtente } } = context;

      await context.db.tx('sedeSecondaria', async t => {
        
        if (args.input.js_note){
          await t.none(updateNoteAdmin, args.input);
        }
          
        if(args.input.eliminaSedi){
          for(let i=0; i<args.input.eliminaSedi.length;i++){
          
            await t.none(updateIdSede, {id_sede:args.input.eliminaSedi[i]});

            await t.none(deleteSede, {id_sede:args.input.eliminaSedi[i]});}
        }

        if (args.input.js_sede_secondaria) {

         
         

          for(let i=0;i<args.input.js_sede_secondaria.length;i++){
                //se id_sede non è undefined è un update altrimenti è un insert
            if (args.input.js_sede_secondaria[i].id_sede){
              await t.none(updateSedeEnte,{
                js_sede:args.input.js_sede_secondaria[i],
                id_sede:args.input.js_sede_secondaria[i].id_sede,
                id_ente_rif:args.input.id_ente_rif,
              });
            }
            else{
              await t.none(insertSedeEnte,{
                nextval:context.sequence.seq_sede_ente,
                id_ente_rif:args.input.id_ente_rif,
                ty_sede: TY_SEDE.SECONDARIA,
                js_sede:args.input.js_sede_secondaria[i],
              });
            }
          }
        }
  
      });


      let rs = {};
      let flag = args.input.operazione;

      await context.db.tx('txUpdateOperatori', async t => {
        if(args.input.eliminaUsers && args.input.eliminaUsers.length > 0) {
          const { ptx_email } = await t.oneOrNone(selezionaByIdUtenteSql, { id_utente: idUtente });
          if (args.input.eliminaUsers.find(el => el.email === ptx_email)) {
            throw new ApolloError(
              DELETE_OPERATORE_ASSOCIATO_VALIDATION_ERROR.message,
              DELETE_OPERATORE_ASSOCIATO_VALIDATION_ERROR.code
            );
          } else {
            for(let i = 0; i < args.input.eliminaUsers.length; i++) {
              if(args.input.eliminaUsers[i].idUtente) {
                await t.multi(eliminaOperatoreEnteSql, {
                  id_utente: args.input.eliminaUsers[i].idUtente,
                  id_ente: args.input.eliminaUsers[i].idEnte,
                  ty_operatore_ente: TY_CITTADINO,
                });
              }
            }
          }
        }

        if(args.input.operatori && args.input.operatori.length > 0) {
          for(let i = 0; i < args.input.operatori.length; i++) {
            const el = args.input.operatori[i];

            const { 
              id_utente, 
              cd_profilo_utente, 
              ty_operatore_ente,
            } = await t.oneOrNone(selezionaByUsername, { email: el.email }) || {};

            if(!el.idUtente) {
              if (id_utente) {
                if(cd_profilo_utente === CITTADINO && (!ty_operatore_ente || ty_operatore_ente === TY_CITTADINO)) {
                  await t.oneOrNone(inserisciRelazioneOperatoreEnteSql, { id_utente, id_ente: args.input.id_ente_rif });
                  await t.oneOrNone(updateTyOperatoreEnteSql, { ty_operatore_ente: TY_OPERATORE_ENTE, id_utente });
                } else if (ty_operatore_ente === TY_OPERATORE_ENTE) {
                  const { nm_ente_completo } = await t.oneOrNone(selezionaEnteOperatoreSql, { id_utente });
                  throw new ApolloError(
                    INSERT_OPERATORE_VALIDATION_ERROR.message,
                    INSERT_OPERATORE_VALIDATION_ERROR.code,
                    {data: { userName: el.email, nomeEnte: nm_ente_completo}}
                  );
                } else if (ty_operatore_ente === TY_AMMINISTRATORE_ENTE) {
                  const { nm_ente_completo } = await t.oneOrNone(selezionaEnteByOperatoreEnteAdminSql, { id_utente });
                  throw new ApolloError(
                    INSERT_OPERATORE_ADMIN_VALIDATION_ERROR.message,
                    INSERT_OPERATORE_ADMIN_VALIDATION_ERROR.code,
                    {data: { userName: el.email, nomeEnte: nm_ente_completo}}
                  );
                }

                if(cd_profilo_utente === AMMINISTRATORE) {
                  throw new ApolloError(
                    INSERT_OPERATORE_WEMI_ADMIN_VALIDATION_ERROR.message,
                    INSERT_OPERATORE_WEMI_ADMIN_VALIDATION_ERROR.code,
                    {data: { userName: el.email }}
                  );
                }
              } else {
                await t.multi(inserisciUtenteOperatoreEnteSql, { 
                  email: el.email, 
                  id_ente: args.input.id_ente_rif, 
                });
              }
            }
          }
        }
      });

      await context.db.tx('txDatiPropriEnte', async t => {
        await t.oneOrNone(updateDatiPropriEnte,args.input);
      });

      await context.db.tx('txAllegatiEnte', async t => {
        const wemiMediaFilesPath = path.join(__dirname, process.env.STORAGE_BOUND_PATH, 'media');

        if (args.input.gestisciMedia && args.input.gestisciMedia.length > 0) {
          const logo = args.input.gestisciMedia.find(el => el.isLogo);
          if (logo) {
            if(logo.id_media) {
              //Update logo null
              await t.oneOrNone(aggiornaLogoDatiPropriEnteSql, {
                id_ente: logo.id_ente,
                id_media: null,
              });

              //Delete logo media
              await t.oneOrNone(eliminaMediaEnteSql, {
                id_media: logo.id_media,
              });

              try {
                //delete file from storage
                deleteFile(wemiMediaFilesPath, `${logo.id_media}_${logo.nm_nome_media_old}`);
              } catch (error) {
                context.logger.error(error, 'Errore nella cancellazione del file ente.');
              }
            }

            if(!logo.elimina) {
              const { id_media } = await t.oneOrNone(inserisciMediaEnteSql, logo);
              const fileName = `${id_media}_${logo.nm_nome_media_new}`;
              saveFileFromBase64(wemiMediaFilesPath, fileName, logo.base64);

              //Update logo
              await t.oneOrNone(aggiornaLogoDatiPropriEnteSql, {
                id_ente: logo.id_ente,
                id_media: id_media,
              });
            }
          }

          const allegatiEnte = args.input.gestisciMedia.filter(el => !el.isLogo);
          for (let index = 0; index < allegatiEnte.length; index++) {
            const el = allegatiEnte[index];

            if(el.id_media) {
              //Delete allegato
              await t.oneOrNone(eliminaAllegatoEnteByIdSql, {
                id_ente: el.id_ente,
                id_media: el.id_media,
              });

              //Delete allegato media 
              await t.oneOrNone(eliminaMediaEnteSql, {
                id_media: el.id_media,
              });
              
              try {
                //delete file from storage
                deleteFile(wemiMediaFilesPath, `${el.id_media}_${el.nm_nome_media_old}`);
              } catch (error) {
                context.logger.error(error, 'Errore nella cancellazione del file ente.');
              }
            }

            if(!el.elimina) {
              const { id_media } = await t.oneOrNone(inserisciMediaEnteSql, el);
              const fileName = `${id_media}_${el.nm_nome_media_new}`;
              saveFileFromBase64(wemiMediaFilesPath, fileName, el.base64);

              //Insert relazione allegato
              await t.oneOrNone(inserisciAllegatoEnteSql, {
                id_ente: el.id_ente,
                id_media: id_media,
                cd_dominio: el.cd_dominio,
              });
            }
          }
        }
      });

      await context.db.tx('txSedeEnte', async t => {
        //context.logger.info(sql, args.input);
        await t.none(updateTy1, args.input);
      });

      await context.db.tx('txUpdateEnteStt', async t => {
        // sql = `
        // SELECT cd_profilo_utente 
        // FROM ${context.tabelle.utente}
        // WHERE id_utente=$[id_utente]
        // `;
        // context.logger.info(sql, args.input);
        // let qualifica_utente = await t.oneOrNone(sql, args.input)
        // context.logger.info("qualifica utente", qualifica_utente);

        if (flag == true) {
          // context.logger.info(sql, args.input);
          await t.oneOrNone(insertStt, { ...args.input, id_utente: idUtente });
        }

      });

      //context.logger.info("RESULT SET:", rs);
      return rs;
    },
   
    ModificaDatiPropriEnte: async (parent, args, context) => {
      const sql = `
      INSERT INTO ${context.tabelle.ente_stt} (
        id_ente,
        ts_variazione_stato,
        cd_stato_ente,
        id_utente)
        VALUES (
          $[id_ente], 
          localtimestamp, 
          $[cd_stato_ente],
          $[id_utente]
        )
        `;
      context.logger.info(sql, args);
      return await context.db.oneOrNone(sql, args.input);
    },

    InserisciDatiIdentificativiEnte: async (parent, args, context) => {
      let rs = {}, sql;

      const { 
        id_utente, 
        cd_profilo_utente, 
        ty_operatore_ente,
        fg_lavoratore,
      } = await context.db.oneOrNone(selezionaByUsername, { email: args.input.ptx_email }) || {};

      if (id_utente) { // se l'utente è presente ed ha ty_operatore_ente != TY_CITTADINO (0) va in errore
        if (ty_operatore_ente === TY_OPERATORE_ENTE) {
          const { nm_ente_completo } = await context.db.oneOrNone(selezionaEnteOperatoreSql, { id_utente });
          throw new ApolloError(
            INSERT_OPERATORE_VALIDATION_ERROR.message,
            INSERT_OPERATORE_VALIDATION_ERROR.code,
            {data: { userName: args.input.ptx_email, nomeEnte: nm_ente_completo }}
          );
        } else if (ty_operatore_ente === TY_AMMINISTRATORE_ENTE) {
          const { nm_ente_completo } = await context.db.oneOrNone(selezionaEnteByOperatoreEnteAdminSql, { id_utente });
          throw new ApolloError(
            INSERT_OPERATORE_ADMIN_VALIDATION_ERROR.message,
            INSERT_OPERATORE_ADMIN_VALIDATION_ERROR.code,
            {data: { userName: args.input.ptx_email, nomeEnte: nm_ente_completo }}
          );
        } else if ( fg_lavoratore === FLAG_LAVORATORE ) {
            throw new ApolloError(
              INSERT_LAVORATORE_VALIDATION_ERROR.message,
              INSERT_LAVORATORE_VALIDATION_ERROR.code,
              { data: { userName: args.input.ptx_email } }
            );
          }

        if(cd_profilo_utente === AMMINISTRATORE) {
          throw new ApolloError(
            INSERT_OPERATORE_WEMI_ADMIN_VALIDATION_ERROR.message,
            INSERT_OPERATORE_WEMI_ADMIN_VALIDATION_ERROR.code,
            {data: { userName: args.input.ptx_email }}
          );
        }
      }

      // si estraggono i dati dell'utente (CITTADINO)
      rs.utente_query = await context.db.oneOrNone(searchUserByEmail, args.input);
      rs.id_utente = rs.utente_query && rs.utente_query.id_utente;

      sql = 'SELECT nextVal(\'wemi2.seq_ente\')';
      rs.nextval_query = await context.db.oneOrNone(sql, args.input);
      rs.id_ente = rs.nextval_query && rs.nextval_query.nextval;

      const users = [];
    
      await context.db.tx('txInsert', async t => {
        if (!rs.utente_query) { // se l'utente non è registrato

          // inserimento nuovo utente con ty_operatore_ente = TY_AMMINISTRATORE_ENTE 1
          const utente = await t.one(insertUtenteXente, args.input);
          context.logger.info('Inserito utente', utente.id_utente);
          rs.id_utente = utente.id_utente;
          users.push(utente);
        } else {
          users.push({ id_utente });
        } // fine IF
        // aggiornamento cd_profilo = OPERATORE_ENTE C in r_utente_profilo e ty_operatore_ente = TY_AMMINISTRATORE_ENTE 1 
        const userProfileManager = new ProfileManager({ ...context, helpers: context.queryBuilder, db: t });
        await userProfileManager.updateProfiles(users.map(user => ({
          id: user.id_utente,
          code: CITTADINO,
          tyOperatoreEnte: TY_AMMINISTRATORE_ENTE,
        }) ), OPERATORE_ENTE, {idUtente:args.input.idCittadino});
        
       // con la versione si cambierà id_ente_rif che in questo caso è l' id ma in futuro si cambierà

       // inserimento ente con id utente associato
        context.logger.info(insertEnte, args);
        await t.one(insertEnte, { ...args.input, id_ente: rs.id_ente, id_utente: rs.id_utente })

          .then(async () => {
            context.logger.info(insertEnteStt, args);
            await t.oneOrNone(insertEnteStt, { ...args.input, id_ente: rs.id_ente});
          })
          .then(async () => {
            context.logger.info('Inserito ente_stt o cancellato i precedenti', rs.id_ente);
            args.input.id_spazio_wemi.map(async ele => {
              context.logger.info(insertSpazioWemi, ele);
              await t.oneOrNone(insertSpazioWemi, { id_ente: rs.id_ente, id_spazio_wemi: ele });
            });

          })
          .then(async () => {
            context.logger.info('Inserita relazione spazi wemi', rs.id_ente);
            args.input.id_cat_accreditamento.map(async ele => {
              context.logger.info(insertCatAcc, ele);
              await t.oneOrNone(insertCatAcc, { id_ente: rs.id_ente, id_cat_accreditamento: ele });
            });
          })

          .then(async () => {
            context.logger.info(insertDatiPropriEnte);
            await t.oneOrNone(insertDatiPropriEnte, { id_ente: rs.id_ente });
          })

          .then(async () => {
            const inputQuery = {
              nextval:context.sequence.seq_sede_ente,
              id_ente_rif: rs.id_ente,
              ty_sede: TY_SEDE.PRIMARIA,
              js_sede: args.input.js_sede || {},
            };
            context.logger.info(insertSedeEnte, inputQuery);
            await t.oneOrNone(insertSedeEnte, inputQuery );
          })
      });

      context.logger.info('RESULT SET:', rs);
      return rs;
    },

    ModificaDatiIdentificativiEnte: async (parent, args, context) => {
      let rs = {}, sql;

      sql = `
      SELECT id_utente FROM ${context.tabelle.utente} WHERE ptx_email=$[ptx_email]`;
      context.logger.info(sql, args);
      let rsUtente = await context.db.oneOrNone(sql, args.input);
      context.logger.info('ID Utente Trovato:', rsUtente);

      await context.db.tx('txInsert', async t => {
        const { 
          id_utente: id_utente_admin_corrente,
          ptx_email,
        } = await t.oneOrNone(selezionaUtenteAdminEnteSql, { id_ente: args.input.id_ente }) || {};
  
        if (ptx_email !== args.input.ptx_email) {
          const {
            id_utente,
            cd_profilo_utente,
            ty_operatore_ente,
            fg_lavoratore,
          } = await t.oneOrNone(selezionaByUsername, { email: args.input.ptx_email }) || {};
    
          if (id_utente) {
            if (ty_operatore_ente === TY_OPERATORE_ENTE) {
              const { nm_ente_completo } = await t.oneOrNone(selezionaEnteOperatoreSql, { id_utente });
              throw new ApolloError(
                INSERT_OPERATORE_VALIDATION_ERROR.message,
                INSERT_OPERATORE_VALIDATION_ERROR.code,
                {data: { userName: args.input.ptx_email, nomeEnte: nm_ente_completo }}
              );
            } else if (ty_operatore_ente === TY_AMMINISTRATORE_ENTE) {
              const { nm_ente_completo } = await t.oneOrNone(selezionaEnteByOperatoreEnteAdminSql, { id_utente });
              throw new ApolloError(
                INSERT_OPERATORE_ADMIN_VALIDATION_ERROR.message,
                INSERT_OPERATORE_ADMIN_VALIDATION_ERROR.code,
                {data: { userName: args.input.ptx_email, nomeEnte: nm_ente_completo }}
              );
            } else {
              if ( fg_lavoratore === FLAG_LAVORATORE ) {
                throw new ApolloError(
                  INSERT_LAVORATORE_VALIDATION_ERROR.message,
                  INSERT_LAVORATORE_VALIDATION_ERROR.code,
                  { data: { userName: args.input.ptx_email } }
                );
              }
            }
          }

          if(cd_profilo_utente === AMMINISTRATORE) {
            throw new ApolloError(
              INSERT_OPERATORE_WEMI_ADMIN_VALIDATION_ERROR.message,
              INSERT_OPERATORE_WEMI_ADMIN_VALIDATION_ERROR.code,
              {data: { userName: args.input.ptx_email }}
            );
          }
          const userProfileManager = new ProfileManager({ ...context, helpers: context.queryBuilder, db: t });
          // Ritrovare vecchia email ente
          const userToDowngrade = await t.one(selezioneIdUtenteAdmin, args.input);
          
          // Una volta trovata riportarla a cittadino
          await userProfileManager.updateProfiles([{ id_utente: userToDowngrade.id_utente }].map(user => ({
            id: user.id_utente,
            code: OPERATORE_ENTE,
          })), CITTADINO, { idUtente: context.user.idUtente });
          if(rsUtente){
            await userProfileManager.updateProfiles([{ id_utente: rsUtente.id_utente }].map(user => ({
              id: user.id_utente,
              code: CITTADINO,
            })), OPERATORE_ENTE, { idUtente: context.user.idUtente });
          }
          
          await t.oneOrNone(updateTyOperatoreEnteSql, { ty_operatore_ente: TY_CITTADINO, id_utente: id_utente_admin_corrente });
        }

        if (rsUtente) {
          rs.id_utente = rsUtente.id_utente;
        }
        else {
          context.logger.info(inserisciUtenteAdminEnte, args.input);
          await t.one(inserisciUtenteAdminEnte, args.input)

            .then(async utente => {
              context.logger.info('Inserito utente', utente.id_utente);
              rs.id_utente = utente.id_utente;
              const userProfileManager = new ProfileManager({ ...context, helpers: context.queryBuilder, db: t });
              await userProfileManager.updateProfiles([{ id_utente: rs.id_utente }].map(user => ({
                id: user.id_utente,
                code: CITTADINO,
              })), OPERATORE_ENTE, { idUtente: context.user.idUtente });
            });
        }

        // fine IF

        sql = `
              UPDATE ${context.tabelle.ente} 
              SET 
                  id_partita_iva_ente=$[id_partita_iva_ente],
                  nr_operatori_servizi_wemi=$[nr_operatori_servizi_wemi],
                  nm_ente=$[nm_ente], 
                  nm_ente_completo=$[nm_ente_completo],
                  id_utente_admin=${rs.id_utente}
              WHERE  id_ente=$[id_ente]
              `;
        context.logger.info(sql, args);
        await t.oneOrNone(sql, args.input)

          .then(async () => {

            sql = `
              INSERT INTO ${context.tabelle.ente_stt} (
                id_ente, 
                ts_variazione_stato,
                cd_stato_ente, 
                id_utente)
                VALUES (
                  $[id_ente], 
                  localtimestamp,
                  $[cd_stato_ente], 
                  ${rs.id_utente})
              `;
            context.logger.info(sql, args);
            await t.oneOrNone(sql, args.input);
          })

          .then(async () => {
            sql = `
                    DELETE FROM ${context.tabelle.r_spazio_wemi_ente}
                    WHERE id_ente=$[id_ente];
                    DELETE FROM ${context.tabelle.r_cat_acc_ente}
                    WHERE id_ente=$[id_ente];
                  `;
            //context.logger.info(sql, args);
            await t.oneOrNone(sql, args.input);
          })

          .then(async () => {
            args.input.id_spazio_wemi.map(async ele => {
              sql = `
              INSERT INTO ${context.tabelle.r_spazio_wemi_ente} (
                        id_ente, 
                        id_spazio_wemi)
                        VALUES (
                          $[id_ente],
                          ${ele})
                `;
              context.logger.info(sql, ele);
              await t.oneOrNone(sql, args.input);
            });

          })

          .then(async () => {
            args.input.id_cat_accreditamento.map(async ele => {
              sql = `
              INSERT INTO ${context.tabelle.r_cat_acc_ente} (
                        id_ente, 
                        id_cat_accreditamento)
                        VALUES (
                          $[id_ente], 
                          ${ele})
                `;
              context.logger.info(sql, ele);
              await t.oneOrNone(sql, args.input);
            });
          })

          .then(async () => {
            context.logger.info(updateTyOperatoreEnteSql, rs.id_utente);
            await t.oneOrNone(updateTyOperatoreEnteSql, { ty_operatore_ente: TY_AMMINISTRATORE_ENTE, id_utente: rs.id_utente });
          });

      });

      context.logger.info('RESULT SET:', rs);
      return rs;
    },
  },

  Ente: {
    datiEnte: async (parent, args, context) => {
      const sql = `
      SELECT 
        id_ente_rif,
        tl_descrizione_ente, 
        id_img_logo, 
        js_referente, 
        js_primo_contatto,
        tx_note_primo_contatto  AS note_per_cittadino,
        js_altre_info, 
        js_note_adminwemi, 
        ts_creazione
      FROM ${context.tabelle.datiPropriEnte}
      WHERE id_ente_rif =$[id_ente]`;
      context.logger.info(sql);
      return await context.db.oneOrNone(sql, parent);
    },
    storiaStati: async (parent, args, context) => {
      const sql = `
      SELECT ${context.tabelle.ente_stt}.id_ente, ts_variazione_stato, cd_stato_ente, id_utente
      FROM ${context.tabelle.ente_stt}
      WHERE ${context.tabelle.ente_stt}.id_ente =$[id_ente]`;
      context.logger.info(sql);
      return await context.db.oneOrNone(sql, parent);
    },
    serviziAccreditati: async (parent, args, context) => {
      const sql = `
      select distinct on (id_servizio) id_servizio,tl_testo_1 as "txTitoloServizio", 
      servEnt.id_servizio_ente as "idServizioErogato", 
      cd_unita_prezzo, 
      id_categoria_accreditamento,
      tx_tags_ricerca
      from ${context.tabelle.servizio}
      inner join ${context.tabelle.contenuto} cnt ON id_contenuto = id_servizio
      inner join ${context.tabelle.servizio_erogato_ente} servEnt ON id_servizio_riferimento = id_servizio
      inner join ${context.tabelle.servizio_erogato_ente_stt} stt 
      ON stt.id_servizio_ente = servEnt.id_servizio_ente 
      and stt.cd_stato_dati_servizio_ente = 31 and stt.ts_variazione_stato = 
      (select max(att.ts_variazione_stato) 
      from ${context.tabelle.servizio_erogato_ente_stt} att 
      where att.id_servizio_ente = servEnt.id_servizio_ente)
      where id_ente_erogatore = $[id_ente]
      `;
      context.logger.info(sql);
      return await context.db.any(sql, parent);
    },
    listamunicipiAccreditati: async (parent, args, context) => {
      const sql = `SELECT tabella.cd_municipio as "idMunicipio", tl_valore_testuale as "nmMunicipio" 
      FROM ${context.tabelle.r_municipio_ente_accreditato} as tabella
      INNER JOIN ${context.tabelle.d_municipio} ON 
      ${context.tabelle.d_municipio}.cd_municipio = tabella.cd_municipio
      WHERE id_ente = $[id_ente]`;
      context.logger.info(sql);
      return await context.db.any(sql, parent);
    },
  },

  datiPropriEnte: {
    media: async (parent, args, context) => {
      const sql = `
      SELECT id_media, ty_mime_type_media, nm_nome_media,oj_media,ts_creazione
      FROM ${context.tabelle.media}
      WHERE id_media =$[id_img_logo]`;
      context.logger.info(sql);
      let result = await context.db.oneOrNone(sql, parent);
      if (result !== null)
        result.oj_media = result.oj_media.toString();
      return result;
    },
  },
};
