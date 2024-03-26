/** @format */
import {  ApolloError } from 'apollo-server-core';
import { withFilter } from 'apollo-server';
import { pubsub, SESSION_EXPIRATION } from 'utility/contextcreation';
import { selectByIdUtente } from 'sql/valattributout/selectByIdUtente';
import { deleteByCdAttributo } from 'sql/valattributout/deleteByCdAttributo';
import { updateValAttributoUt } from 'sql/valattributout/updateValAttributoUt';
import { insertValAttributoUt } from 'sql/valattributout/insertValAttributoUt';
import { selectValAttributiUtente } from 'sql/valattributout/selectValAttributiUtente';
import { trovaOperatoriDaIdEnte } from 'sql/roperatoreente/operatoridaidente';
import { aggiornaUltimaModifica } from 'sql/candidaturaTCB/aggiornaUltimaModifica';
import { FIND_USER_ERROR } from 'errors/errors';
import UserDomain from 'domain/UtenteDomain';

export default {
  Subscription: {
    sessionExpirationNotify: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(SESSION_EXPIRATION),
        (payload, args, context) => {
          context.logger.trace('Session Expired: ', context.sessionIndex, payload.sessionIndex);
          if (context.sessionIndex === payload.sessionIndex) {
            return true;
          }

          return false;
        }
      ),
    },
  },
  Query: {
    estraiDatiUtente: (parent, args, context) => {
      const { email } = args;
      try {
        /**
         * Generate the session and send to the authentication services
         */
        return context.db.task(async task => {
          const userDomain = new UserDomain({ ...context, db: task });
          const user = await userDomain.loginLocal(email);
          context.req.session.user = user;
          // console.log('estraiDatiUtente ', JSON.stringify(user))

          return user;
        });
      }
      catch (error) {
        context.logger.error(error, 'Errore nel login');
        throw new ApolloError(FIND_USER_ERROR.message, FIND_USER_ERROR.code);
      }



    },

    usersAddedEntePK: async (parent, args, context) => {

      context.logger.info(trovaOperatoriDaIdEnte, args);
      return await context.db.any(trovaOperatoriDaIdEnte, { idEnte: args.id_ente });
    },
    usersCollegatiEnte: async (parent, args, context) => {
      context.logger.info(trovaOperatoriDaIdEnte, args);
      return await context.db.any(trovaOperatoriDaIdEnte, args);
    },

    datiUtente: async (parent, args, context) => {

      let sql =
        ` SELECT * FROM ${context.tabelle.utente}
       WHERE id_utente =$[idUtente] `;
      context.logger.info(sql, args);
      let rs = await context.db.oneOrNone(sql, args);
      context.logger.info(rs);
      return rs;
    },

    datiEnte: async (_, args, context) => {
      const sql = `
        SELECT * FROM wemi2.ente
        JOIN wemi2.utente 
        ON utente.id_utente = ente.id_utente_admin
        WHERE id_ente = $[idEnte]
      `;
      return await context.db.oneOrNone(sql, args);
    },

    EstraiValAttributiUtente: async (_, args, context) => {
      const { idUtente, arrayCdAttr } = args;
      let attrUt;

      await context.db.any(selectValAttributiUtente, { idUtente: idUtente, arrayCdAttr: arrayCdAttr }).then(res => attrUt = res);

      return attrUt;
    },

  },

  Mutation: {
    utenteAdd: async (parent, args, context) => {
      let rs = {}, sql;

      sql = `
      SELECT id_utente FROM ${context.tabelle.utente} WHERE ptx_username=$[ptx_username]`;
      context.logger.info(sql, args);
      let rsUtente = await context.db.oneOrNone(sql, args.input);
      context.logger.info('ID Utente Trovato:', rsUtente);

      await context.db.tx('txInsert', async t => {
        if (rsUtente) {
          rs.id_utente = rsUtente.id_utente;
        }
        else {
          sql = `
          INSERT INTO ${context.tabelle.utente} (
               id_utente, 
               cd_profilo_utente,
               fg_accettazione_privacy_wemi,
               ptx_codice_fiscale, 
               ptx_username, 
               ptx_codana,
               ty_operatore_ente, 
               fg_lavoratore,
               ptx_email,
               js_anagrafica_residenza,
               ts_ultima_modifica, 
               ts_creazione)
            VALUES (
               nextVal('wemi2.seq_utente'),
               'A',
               null,
               null, 
               $[ptx_username], 
               null,
               null, 
               null,
               null,
               null,
               localtimestamp, 
               localtimestamp)
        returning *`;
          context.logger.info(sql, args.input);
          await t.one(sql, args.input)

            .then(async utente => {
              context.logger.info('Inserito utente', utente.id_utente);
              rs.id_utente = utente.id_utente;
            });
        }

        sql = `
        SELECT 
              id_utente, id_ente 
        FROM 
              ${context.tabelle.r_operatore_ente} 
        WHERE 
              (id_ente=$[id_ente] AND id_utente=${rs.id_utente})`;
        context.logger.info(sql, args);
        let relazione = await t.oneOrNone(sql, args.input);
        context.logger.info('Relazione Trovata:', relazione);


        if (relazione) {
          rs.relazione = 'relazione già esistente';
        }
        else {
          sql = `
                INSERT INTO ${context.tabelle.r_operatore_ente} (
                  id_ente, 
                  id_utente)
                  VALUES (
                    $[id_ente], 
                    ${rs.id_utente})
              `;
          context.logger.info(sql, args);
          rs.relazione = 'relazione creata';
          await t.oneOrNone(sql, args.input);
        }
      });

      context.logger.info('RESULT SET:', rs);
      return rs;
    },

    utenteRemove: async (parent, args, context) => {
      let rs = {}, sql;

      sql = `
      SELECT id_utente FROM ${context.tabelle.utente} WHERE ptx_username=$[ptx_username]`;
      context.logger.info(sql, args);
      let rsUtente = await context.db.oneOrNone(sql, args.input);
      context.logger.info('ID Utente Trovato:', rsUtente);

      await context.db.tx('txDelete', async t => {
        rs.id_utente = rsUtente.id_utente;
        sql = `
          DELETE 
          FROM 
                ${context.tabelle.r_operatore_ente} 
          WHERE 
                (id_ente=$[id_ente] AND id_utente=${rs.id_utente})`;
        context.logger.info(sql, args);
        let relazione = await t.oneOrNone(sql, args.input);
        context.logger.info('Relazione Cancellata:', relazione);
      });

      context.logger.info('RESULT SET:', rs);
      return rs;
    },



    // Gestisco la tabella val_attributo_ut dove venono storicizzati gli attributi riguardanti l'utente


    InserisciModificaAttributoUtente: async (parent, args, context) => {
      await context.db.tx('InserisciModificaAttributoUtente', async t => {
        let cdAttr;
        let exist = true;

        /** Cerco tutti gli attributi nella tabella val_attributo_ut che sono stati inseriti per l'utente
         * specificato.
         */
        await t.batch([

          await t.any(selectByIdUtente, args.input).then((result) => cdAttr = result.map(el => parseInt(el.cd_attributo))),
        ]);

        /** Ciclo gli attributi che arrivano */
        await Promise.all(args.input.arrayConfig.map(async (val, index) => {

          context.logger.info(`Attributo n°${index + 1}: `, val);


          /** Non sono liste, controllo se sono già presenti,
           * se lo sono, o aggiorno o elimino,
           * altrimenti inserisco.
           */
          if (cdAttr.includes(val.cd_attributo)) {

            /** Controllo se il cd_val_attributo è maggiore di zero, per determinare se l'attributo vada
             * aggiornato (se si) o eliminato (se uguale a -1)
             */
            if (parseInt(val.cd_val_attributo) >= 0) {
              const updateValAttributoUtConst = updateValAttributoUt(val);

              context.logger.info(updateValAttributoUtConst);
              await t.oneOrNone(updateValAttributoUtConst, { ...args.input, val });
            }
            else if (parseInt(val.cd_val_attributo) === -1) {
              const ls = val.cd_attributo;
              context.logger.info(deleteByCdAttributo);
              await t.oneOrNone(deleteByCdAttributo, { ...args.input, ls });
            }
          }
          /** Non sono presenti in tabella, li inserisco.  */
          else if (!cdAttr.includes(val.cd_attributo) && val.cd_val_attributo !== -1) {
            const insertValAttributoConst = insertValAttributoUt(val, exist);
            await t.oneOrNone(insertValAttributoConst, { ...args.input, val });
          }          
        }));
        
        await t.oneOrNone(aggiornaUltimaModifica, { id_lavoratore: args.input.idUtente, id_utente_mod: context.user.idUtente });

      });
      return 'Attributi utente correttamente inseriti';
    },
  },

};
