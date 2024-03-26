/** @format */

import { updateForConfermaRecensione } from "sql/valattributodomanda/updateForConfermaRecensione";
import { insertOrUpdateRecensione } from "sql/recensioneente/insertOrUpdateRecensione";
import  RecensioneLavoratoreTcbDAO from "dao/recensionelavoratoreTCB/recensioneLavoratoreTcbDAO";
import { selectRecensioneMax } from "sql/recensioneente/selectRecensioneMax";
import { updateStatoFeedback } from "sql/recensioneente/updateStatoFeedback";

export default {
  Query: {
    ListaMansioni: async (parent, args, context, info) => {
     const daoLista = new RecensioneLavoratoreTcbDAO(context.db);
      return await daoLista.getMansioni(args.id_richiesta_servizio_tcb);
    },
    ListaMansioniAdmin: async (parent, args, context, info) => {
      const daoLista = new RecensioneLavoratoreTcbDAO(context.db);
       return await daoLista.getMansioni(args.id_richiesta_servizio_tcb);
     },
    ListaMansioniLavoratore: async (parent, args, context, info) => {
      const daoLista = new RecensioneLavoratoreTcbDAO(context.db);
       return await daoLista.getMansioni(args.id_richiesta_servizio_tcb);
     },
    EstraiDatiLavoratore: async (parent, args, context, info) => {
      const daoLavoratore = new RecensioneLavoratoreTcbDAO(context.db)
      return await daoLavoratore.getDatiLavoratore(context,args.codiceRichiesta,args.locale);
    },
    EstraiRichiesta: async (parent, args, context, info) => {
     const daoRichiesta = new RecensioneLavoratoreTcbDAO(context.db)
      return await daoRichiesta.getRichiesta(args.id_richiesta_servizio_tcb);
    },
    EstraiRichiestaAdmin: async (parent, args, context, info) => {
      const daoRichiesta = new RecensioneLavoratoreTcbDAO(context.db)
       return await daoRichiesta.getRichiesta(args.id_richiesta_servizio_tcb);
     },
    EstraiRichiestaLavoratore: async (parent, args, context, info) => {
      const daoRichiesta = new RecensioneLavoratoreTcbDAO(context.db)
       return await daoRichiesta.getRichiesta(args.id_richiesta_servizio_tcb);
     },
    EstraiRecensione: async (parent, args, context, info) => {
      const daoRecensione = new RecensioneLavoratoreTcbDAO(context.db)
      return await daoRecensione.getRecensione(args.id_rich_serv_rec,args.pg_rich_serv_rec);
    },
    EstraiRecensioneAdmin: async (parent, args, context, info) => {
      const daoRecensione = new RecensioneLavoratoreTcbDAO(context.db)
      return await daoRecensione.getRecensione(args.id_rich_serv_rec,args.pg_rich_serv_rec);
    },
    EstraiRecensioneLavoratore: async (parent, args, context, info) => {
      const daoRecensione = new RecensioneLavoratoreTcbDAO(context.db)
      return await daoRecensione.getRecensione(args.id_rich_serv_rec);
    },
    EstraiAllFeedbacks: async (parent, args, context, info) => {
      const daoRecensione = new RecensioneLavoratoreTcbDAO(context.db)
      return await daoRecensione.getAllFeedbacks(args.id_rich_serv_rec);
    },
    EstraiRecensioniMultiple: async (parent, args, context, info) => {
      const sql = `
      SELECT *
      FROM wemi2.recensione_servizio_ente
      WHERE id_rich_serv_rec IN (${args.idRecensioni.join(",")})
      `
        ;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    }
  },
  Mutation: {
    ConfermaRecensione: async (parent, args, context, info) => {
      let exist = false;
      const {user} = context;
      const idUtente = user.idUtente;
      context.logger.info(selectRecensioneMax);
      let result = await context.db.any(selectRecensioneMax, args);
      context.logger.info(result)
      if (result.length>0) {
        exist = true;
        if (args.JsonFiltro) { 
          for (let i = 0; i < args.JsonFiltro.length; i++) {

          const updateForConfermaRecensioneConst = updateForConfermaRecensione(args.JsonFiltro[i].checked,args,i);
                     context.logger.info(updateForConfermaRecensioneConst);
                     await context.db.oneOrNone(updateForConfermaRecensioneConst, {...args,
                      cd_attributo:args.JsonFiltro[i].cd_attributo,
                      cd_val_attributo: args.JsonFiltro[i].cd_val_attributo,
                      nota:args.JsonFiltro[i].nota
                     }
                      );
            }
          }

        const insertOrUpdateRecensioneConst = insertOrUpdateRecensione(exist);

        context.logger.info(insertOrUpdateRecensioneConst);
        return await context.db.oneOrNone(insertOrUpdateRecensioneConst, {...args,idUtente});


      } else {
        if (args.JsonFiltro) { 
          for (let i = 0; i < args.JsonFiltro.length; i++) {

          const updateForConfermaRecensioneConst = updateForConfermaRecensione(args.JsonFiltro[i].checked);
                     context.logger.info(updateForConfermaRecensioneConst);
                     await context.db.oneOrNone(updateForConfermaRecensioneConst, {...args,
                      cd_attributo:args.JsonFiltro[i].cd_attributo,
                      cd_val_attributo: args.JsonFiltro[i].cd_val_attributo
                     }
                      );
            }
          }
        }
        const insertOrUpdateRecensioneConst2 = insertOrUpdateRecensione(exist);


        context.logger.info(insertOrUpdateRecensioneConst2);
        return await context.db.oneOrNone(insertOrUpdateRecensioneConst2, {...args,idUtente});
      },
      UpdateCdStatoRec: (parent, args, context, info) => {
        const { user: { idUtente }} = context;
        context.logger.info(updateStatoFeedback);
        return context.db.oneOrNone(updateStatoFeedback, {...args,idUtente});
      }
    }
  }

