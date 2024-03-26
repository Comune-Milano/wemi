import stringSimilarity from 'string-similarity';
import ServizioDAO from 'dao/servizioGenerale/servizioGeneraleDAO';

export default {
  Query:{
    servizioPK: async (parent, args, context, info) => {
      const sql = `
        SELECT 
          id_servizio,
          id_categoria_accreditamento,
          contenuto.tl_testo_1 as "txTitoloServizio",
          contenuto.tl_testo_2 as "txDescrizioneServizio",
          servizio.cd_unita_prezzo, 
          tx_tags_ricerca
        FROM ${context.tabelle.contenuto} contenuto
          INNER JOIN ${context.tabelle.servizio} servizio ON
            contenuto.id_contenuto = servizio.id_servizio
          INNER JOIN ${context.tabelle.d_unita_prezzo_servizio} dups ON
            dups.cd_unita_prezzo = servizio.cd_unita_prezzo
        WHERE 
          id_servizio=$[idServizio]`;
      context.logger.info(sql,args);

      let result = await context.db.oneOrNone(sql, args);

      return {
        id_servizio: result.id_servizio,
        id_categoria_accreditamento: result.id_categoria_accreditamento,
        txTitoloServizio: result.txTitoloServizio,
        txDescrizioneServizio: result.txDescrizioneServizio,
        cd_unita_prezzo: result.cd_unita_prezzo,
        tx_tags_ricerca: result.tx_tags_ricerca,
        idCategoria: args.idCategoria,
      }
    },
    category: async(parent, args, context, info) => {
      if (args.idCategoria) {
        const dao = new ServizioDAO(context.db);
        return dao.findCategory(args.idCategoria);
      }
      return null;
    },
    services: async(parent, args, context, info) => {
      const dao = new ServizioDAO(context.db, context.queryBuilder, context.formatter);
      return dao.findServices({
        ...args.filters,
      })
    },
    serviziAll: async (parent, args, context, info) => {
      let result;
      const sql = `
      SELECT
       id_servizio,  id_categoria_accreditamento,
        contenuto.tl_testo_1 as "txTitoloServizio", contenuto.tl_testo_2 as "txDescrizioneServizio",cd_unita_prezzo, 
        tx_tags_ricerca, id_media, convert_from(oj_media, 'UTF-8') as oj_media, 
        contenuto1.id_contenuto as "idCategoria",
        contenuto1.tl_testo_1 as "txTitoloCategoria"
      FROM wemi2.contenuto_associato
      INNER JOIN wemi2.contenuto as contenuto ON contenuto.id_contenuto = id_contenuto_primario
      INNER JOIN wemi2.servizio ON contenuto.id_contenuto = id_servizio
      INNER JOIN wemi2.contenuto as contenuto1 ON id_contenuto_associato = contenuto1.id_contenuto
	    LEFT JOIN wemi2.media ON contenuto1.id_media1= id_media
		INNER JOIN wemi2.contenuto_stt on wemi2.contenuto_stt.id_contenuto= contenuto.id_contenuto
      where id_contenuto_associato=$[idCategoria] 
      AND 
      ${args.stt ?  `( wemi2.contenuto_stt.cd_stato_contenuto = 2 
        OR wemi2.contenuto_stt.cd_stato_contenuto=1 )` : 
        `wemi2.contenuto_stt.cd_stato_contenuto=2 `}  
        AND ts_variazione_stato = (
      select MAX(ts_variazione_stato)
      from wemi2.contenuto_stt
        where id_contenuto =  contenuto.id_contenuto 
    )
      `;
      await context.db.any(sql, args).then(res => result = res);
      let servizi = [];

      for(let i=0; i<result.length; i+=1)  {
        servizi.push({
          id_servizio: result[i].id_servizio,
          id_categoria_accreditamento: result[i].id_categoria_accreditamento,
          txTitoloServizio: result[i].txTitoloServizio,
          txDescrizioneServizio: result[i].txDescrizioneServizio,
          cd_unita_prezzo: result[i].cd_unita_prezzo,
          tx_tags_ricerca: result[i].tx_tags_ricerca,
          idCategoria: result[i].idCategoria,
          categoriaPrincipaleServizio: [
            {
            idCategoria: result[i].idCategoria,
            txTitoloCategoria: result[i].txTitoloCategoria,
            media: {
              oj_media: result[i].oj_media
            }
          }
          ]     
        });
      };
      if (!servizi.length > 0){
        const sql = `
        SELECT
        id_media, convert_from(oj_media, 'UTF-8') as oj_media, 
        cnt.id_contenuto as "idCategoria",
        cnt.tl_testo_1 as "txTitoloCategoria"
      FROM wemi2.contenuto as cnt
      LEFT JOIN wemi2.media ON cnt.id_media1= id_media
    INNER JOIN wemi2.contenuto_stt on wemi2.contenuto_stt.id_contenuto= 140
      where cnt.id_contenuto=$[idCategoria] 
      AND 
     wemi2.contenuto_stt.cd_stato_contenuto=2 
        AND ts_variazione_stato = (
      select MAX(ts_variazione_stato)
      from wemi2.contenuto_stt
        where id_contenuto =  $[idCategoria] 
    )
        `;
        await context.db.any(sql, args).then(res => result = res);
        for(let i=0; i<result.length; i+=1)  {
          servizi.push({
            id_servizio: -1,
            id_categoria_accreditamento: null,
            txTitoloServizio: null,
            txDescrizioneServizio: null,
            cd_unita_prezzo: null,
            tx_tags_ricerca: null,
            idCategoria: result[i].idCategoria,
            categoriaPrincipaleServizio: [
              {
              idCategoria: result[i].idCategoria,
              txTitoloCategoria: result[i].txTitoloCategoria,
              media: {
                oj_media: result[i].oj_media
              }
            }
            ]
            
          });
        }
      }
        return servizi;
    },
    matchParoleRicerca: async (parent, args, context, info) => {
      let sql, tagsRicerca,serviziRisultanti = [];
      
      await context.db.tx(async t =>{
      
        if(args.text){
          sql=`SELECT ${context.tabelle.servizio}.*, 
          contenuto.tl_testo_1 as "txTitoloServizio",
          contenuto.tl_testo_2 as "txDescrizioneServizio",
          categoria.id_contenuto as "idCategoria",
          regexp_split_to_array(LOWER(tx_tags_ricerca),' ') as array_tag
          from ${context.tabelle.servizio}
          INNER JOIN ${context.tabelle.contenuto} as contenuto ON contenuto.id_contenuto = id_servizio
          INNER JOIN ${context.tabelle.contenuto_associato} as associazione ON associazione.id_contenuto_primario = contenuto.id_contenuto
          INNER JOIN ${context.tabelle.contenuto} as categoria ON categoria.id_contenuto = id_contenuto_associato
          where	associazione.nm_relazione='CL2'
        `;
        await t.any(sql,args)
        .then(result => tagsRicerca = result)
        .catch(error => {throw new Error(error)})
        if(tagsRicerca && tagsRicerca.length>0){
          for(let i=0; i<tagsRicerca.length; i+=1){
            let bestMatch =stringSimilarity.findBestMatch(args.text.toLowerCase(),tagsRicerca[i].array_tag).bestMatch.rating;
            context.logger.info(bestMatch)
            if( bestMatch>= 0.6)
            serviziRisultanti.push(
              {
                id_servizio: tagsRicerca[i].id_servizio,
                id_categoria_accreditamento: tagsRicerca[i].id_categoria_accreditamento,
                txTitoloServizio: tagsRicerca[i].txTitoloServizio,
                txDescrizioneServizio: tagsRicerca[i].txDescrizioneServizio,
                cd_unita_prezzo: tagsRicerca[i].cd_unita_prezzo,
                tx_tags_ricerca: tagsRicerca[i].tx_tags_ricerca,
                categoriaPrincipaleServizio:[{
                  idCategoria: tagsRicerca[i].idCategoria
                }]
              }
            )
          }
           }
         }
        
      })
      return serviziRisultanti;
      
      
  
    } 
  },
  Service: {
    categoria: async (parent, args, context, info) => {
      if (parent.categoryId) {
        const dao = new ServizioDAO(context.db);
        return dao.findCategory(parent.categoryId);
      }
      return null;
    },
  },
Servizio: {
  categoriaAccreditamentoServizio: async (parent, args, context, info) => {
    const sql = `
    select   id_contenuto as "idCategoria", tl_testo_1 as "txTitoloCategoria"
    from    ${context.tabelle.contenuto}
    where id_contenuto = $[id_categoria_accreditamento]
  `;
  context.logger.info(sql);
    return await context.db.any(sql, parent);
  },
  categoriaPrincipaleServizio: async(parent, args, context, info) => {
    if (!parent.idCategoria) {
      return [];
    }
    if (parent.categoriaPrincipaleServizio) {
      return parent.categoriaPrincipaleServizio;
    }
    const sql = `
      SELECT  
        contenuto.id_contenuto as "idCategoria",
        contenuto.tl_testo_1 as "txTitoloCategoria"
      FROM ${context.tabelle.contenuto_associato} c_a
        INNER JOIN ${context.tabelle.contenuto} as contenuto 
         ON c_a.id_contenuto_associato = contenuto.id_contenuto
      WHERE
        c_a.nm_relazione='CL2' 
        and contenuto.id_contenuto=$[idCategoria]
        and c_a.id_contenuto_primario=$[id_servizio]
    `;
    const result = await context.db.oneOrNone(sql, parent);
    return [
      {
        idCategoria: result.idCategoria,
        txTitoloCategoria: result.txTitoloCategoria,
        media: {
          oj_media: result.oj_media
        }
      }
    ]
  },
  prezzo: async (parent, args, context, info) => {
    const sql = `
    select  cd_unita_prezzo,
    tl_testo_aggettivo,
    tl_testo_sostantivo,
    fg_genere
    from    ${context.tabelle.d_unita_prezzo_servizio}
    where cd_unita_prezzo = $[cd_unita_prezzo]
    `;
    context.logger.info(sql);
    return await context.db.oneOrNone(sql, parent, result => ({
      ...result,
      fg_genere_maschile: result.fg_genere === '0'
    }));
  },
  }
}
  
  