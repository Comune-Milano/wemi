/** @format */
import { updateRecensioneWeMi } from 'sql/recensioneente/updaterecensionewemi';
import { selectRecensioneTCB } from 'sql/recensioneente/selectRecensione';


export default {
    Query: {
        EstraiRecensioneTCB: async (parent, args, context, info) => {
          context.logger.info(selectRecensioneTCB, args);
          return await context.db.one(selectRecensioneTCB, args);
        }},
    Mutation: {
        InserisciFeedbackTCB: async (parent, args, context, info) => {

            const { user } = context;
            const { idUtente } = user;

            const statoRecensione = 3;

            return await context.db.tx('FeedBack', async t => {
              const recensione = await t.one(selectRecensioneTCB, { ...args.input, statoRecensione });
              context.logger.info(updateRecensioneWeMi, { ...args.input, ...recensione, statoRecensione });
              const { idRichiesta } = await t.one(updateRecensioneWeMi, { ...recensione, ...args.input,  statoRecensione });
              return idRichiesta;
              // sql = `
              //   INSERT INTO ${context.tabelle.recensione_ente_stt}
              //   (ts_variazione_stato, cd_stato_recensione, id_utente, id_rich_serv_rec)
              //   VALUES
              //     (
              //       localtimestamp,
              //       11,
              //       $[id_utente],
              //       $[id_rich_serv_rec]
              //     );
              // `;
              // context.logger.info(sql, args);
              // await t.none(sql, { ...args.input, id_utente: idUtente })
            })
     }, }
};

