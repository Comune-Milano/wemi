
import { ServizioEnteController } from 'controller/servizioente';
import { STORAGE_ABS_PATH } from 'environment';


export default {
  Query: {
    EstraiMedia: async (parent,args,context,info) => {
      const sql = `
          SELECT  
          id_media,
          ty_mime_type_media,
          nm_nome_media,
          oj_media,
          ts_creazione
          FROM    ${context.tabelle.media}
          WHERE id_media = $[idMedia]
          `;
      context.logger.info(sql, args);
      return await context.db.any(sql, args);
    },
    EstraiAllegatiEnte: async (parent,args,context,info) => {
      const sql = `
      SELECT 
      allegato_ente.id_media,
      tl_valore_testuale,
      nm_nome_media,
      ty_mime_type_media,
      ty_allegato
      FROM wemi2.allegato_ente
      LEFT JOIN wemi2.media ON wemi2.media.id_media = wemi2.allegato_ente.id_media
      LEFT JOIN wemi2.dominio ON allegato_ente.ty_allegato = dominio.cd_dominio AND wemi2.dominio.ty_dominio = 'ALLEGATO_ENTE'
      WHERE id_ente = $[id_ente]
      ORDER BY dominio.pg_visualizzazione
      `;
      context.logger.info(sql);
      return await context.db.any(sql, args);;
    },
    EstraiAllegatiServizioEnte: async(parent, args, context, info) => {
      const servizioEnteController = new ServizioEnteController(context);
      return servizioEnteController.getAttachments(args);
    },
    EstraiMediaBase64: async (parent,args,context,info) => {
      const sql = `
        SELECT 
        convert_from(oj_media, 'UTF-8') as oj_media
        FROM wemi2.media
        WHERE id_media = $[id_media]
        `;
      context.logger.info(sql);
      return await context.db.oneOrNone(sql, args);;
    },
    mediaAll: async (parent, args, context, info) => {
      const sql = `
          SELECT  
                id_media AS "value", 
                nm_nome_media AS "textValue"
          FROM    ${context.tabelle.media}
          ORDER BY nm_nome_media;
          `;
      context.logger.info(sql, args);
      return await context.db.any(sql, args);
    },
  
    mediaPK: async (parent, args, context, info) => {
      const sql = `
          SELECT  
                id_media,
                ty_mime_type_media,
                nm_nome_media,
                oj_media,
                ts_creazione
          FROM  ${context.tabelle.media}
          WHERE   id_media=$[id_media]
          `;
      context.logger.info(sql, args);
      return await context.db.oneOrNone(sql, args);
    },
      
  
  },
  
  Mutation: {
    DeleteMediaWithContenuto: async (parent, args, context, info) => {
      let risultato,contenuti,sql;
      await context.db.tx('EliminaMediaTx', async t => {
        sql = `
            SELECT * 
            FROM ${context.tabelle.contenuto}
            WHERE id_media1=$[idMedia] or id_media2=$[idMedia] or id_media3=$[idMedia];
        `;
        await  t.any(sql,args).then(risultato => contenuti=risultato).catch(_ => risultato=false);
        if(contenuti){
          contenuti.map(async contenuto =>{
            sql = `
            UPDATE ${context.tabelle.contenuto}
            SET ${contenuto.id_media1 && contenuto.id_media1 == args.idMedia ?  'id_media1=null,' : ' '}
            ${contenuto.id_media2 && contenuto.id_media2 == args.idMedia ?  'id_media2=null,' : ' '}
            ${contenuto.id_media3 && contenuto.id_media3 == args.idMedia?  'id_media3=null,' : ' '}
            ts_creazione=localtimestamp
            WHERE id_contenuto=$[idContenuto] and (id_media1=$[idMedia] or id_media2=$[idMedia] or id_media3=$[idMedia])
          `;
            context.logger.info(sql,{idContenuto: contenuto.id_contenuto,idMedia: args.idMedia});
            await t.oneOrNone(sql,{idContenuto: contenuto.id_contenuto,idMedia: args.idMedia}).then(_ => risultato=true).catch(_ => risultato=false);
          });
         
        } 
        sql = `
             DELETE FROM ${context.tabelle.media}
            WHERE id_media=$[idMedia]
            RETURNING *;
        `;
        await t.oneOrNone(sql,args).then(_ => risultato=true).catch(_ => risultato=false);
      });
      return risultato;
    },
    mediaADD: async (parent, args, context, info) => {
      const sql = `
          INSERT INTO ${context.tabelle.media} (
            id_media,
            ty_mime_type_media,
            nm_nome_media,
            oj_media,
            ts_creazione)
          VALUES (
            nextval('wemi2.seq_media'), 
            $[ty_mime_type_media], 
            $[nm_nome_media],
            $[oj_media],
            localtimestamp
          )`;
      context.logger.info(sql, args);
      return await context.db.none(sql, args.input);
    },
  
    mediaUPD: async (parent, args, context, info) => {
      const sql = `
          UPDATE  ${context.tabelle.media}
            SET
               ty_mime_type_media=$[ty_mime_type_media],
               nm_nome_media=$[nm_nome_media],
               oj_media=$[oj_media]
            WHERE   id_media = $[id_media]
          `;
      context.logger.info(sql, args);
      return await context.db.none(sql, args.input);
    },
  
  
  
  },
  
};
  