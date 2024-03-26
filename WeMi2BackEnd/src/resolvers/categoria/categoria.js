import ServizioDAO from 'dao/servizioGenerale/servizioGeneraleDAO';
import { STORAGE_ABS_PATH } from 'environment';

export default {
  Query: {
    categoriaPK: async (parent, args, context, info) => {
      const sql = `
            select  id_contenuto as "idCategoria", tl_testo_1 
                    as "txTitoloCategoria"
            from    ${context.tabelle.contenuto}
            where id_contenuto = $[idCategoria]`;
      context.logger.info(sql, args);
      return await context.db.many(sql, args);
    },
    allCategorie: async (parent, args, context, info) => {
      let aree;
      let sqlAree = `select * from wemi2.contenuto 
    inner JOIN wemi2.contenuto_stt ON wemi2.contenuto_stt.id_contenuto= contenuto.id_contenuto
    where  ${args && args.stt == 3 ? '(cd_stato_contenuto=2 or cd_stato_contenuto=1 ) and ' : 'cd_stato_contenuto=2 and '} ty_contenuto = 3  and ts_variazione_stato = (  
       select MAX(ts_variazione_stato)
    from wemi2.contenuto_stt
      where id_contenuto =  contenuto.id_contenuto 
  )`;
      await context.db.any(sqlAree).then(result => aree = result);
      const dao = new ServizioDAO(context.db, context.queryBuilder, context.formatter);
      const sql = `
    select  contenuto.id_contenuto as "idCategoria", contenuto.tl_testo_1 
            as "txTitoloCategoria", id_media,
            ty_mime_type_media,
            contenuto.ty_sottotipo_contenuto as "sottotipo",
            nm_nome_media,
            convert_from(oj_media, 'UTF-8') as oj_media,
            CONCAT('${STORAGE_ABS_PATH}', '/', iw_path) AS "iw_path",
            contenuto1.id_contenuto as "idArea",
            contenuto1.tl_testo_1 as "txTitoloArea",
            contenuto1.nr_ordine_visualizzazione as "nrOrdineVisualizzazione"
    from    ${context.tabelle.contenuto} as contenuto
    left join ${context.tabelle.media} ON contenuto.id_media1 = id_media
    inner join ${context.tabelle.contenuto_associato} ON id_contenuto = id_contenuto_primario 
    inner join ${context.tabelle.contenuto} as contenuto1 ON contenuto1.id_contenuto = contenuto_associato.id_contenuto_associato 
    LEFT JOIN wemi2.contenuto_stt ON wemi2.contenuto_stt.id_contenuto= contenuto.id_contenuto
    where  ${args && args.stt == 4 ? '(cd_stato_contenuto=2 or cd_stato_contenuto=1 ) and ' : 'cd_stato_contenuto=2 and '} contenuto.ty_contenuto=4   and ts_variazione_stato = (
      select MAX(ts_variazione_stato)
      from wemi2.contenuto_stt
        where id_contenuto =  contenuto.id_contenuto 
    )

    order by contenuto.nr_ordine_visualizzazione ASC `;
      context.logger.info(sql, args);
      let result = await context.db.any(sql, args);

      let categoria = [];
      for (let i = 0; i < result.length; i += 1) {
        const servizi = await dao.findServices({ idCategoria: result[i].idCategoria });
        //vengono inseriti solo se hanno servizi
        if (servizi.length) {
          let found = false;
          let arrayAree = [];
          for (let j = 0; j < result.length; j += 1)
            for (let x = 0; x < aree.length; x += 1)
              if (result[j].idCategoria === result[i].idCategoria && aree[x].id_contenuto === result[j].idArea)
                arrayAree.push({
                  idArea: result[j].idArea,
                  txTitoloArea: result[j].txTitoloArea,
                  nrOrdineVisualizzazione: result[j].nrOrdineVisualizzazione,
                });
          categoria.forEach((element) => {
            if (element.idCategoria === result[i].idCategoria) {
              found = true;
            }
          });

          let json = {};
          if (!found) {
            json.idCategoria = result[i].idCategoria;
            json.txTitoloCategoria = result[i].txTitoloCategoria;
            json.sottotipo = result[i].sottotipo;
            json.media = {};
            json.media.id_media = result[i].id_media;
            json.media.ty_mime_type_media = result[i].ty_mime_type_media;
            json.media.nm_nome_media = result[i].nm_nome_media;
            json.media.oj_media = result[i].oj_media;
            json.media.iw_path  = result[i].iw_path;
            json.areeCategoria = arrayAree;

            categoria.push(json);
          }
        }
      }
      return categoria;
    },
  },
  Categoria: {
    
  },
};
