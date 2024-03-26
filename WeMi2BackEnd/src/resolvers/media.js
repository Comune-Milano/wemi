export default {
    Query: {
  
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
  
  
  
    }
  
  };
  