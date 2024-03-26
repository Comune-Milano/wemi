/** @format */
import { ApolloError } from 'apollo-server';
import { CLOSE_CHAT_ERROR, DELETE_ATTACHMENT_ERROR } from '../../errors/errors';
import { TEMPLATE_CHAT_RIC_ENTE, TEMPLATE_NOTIFICA_ENTE_CHAT } from '../../constants/templates/database_template';
import { EMAIL_TYPE } from 'constants/templates/type_email';
import { SingletonFactoryEmail } from 'utility/email/factoryemail';
import { PAGE_REQUESTSINDEX_URL } from 'constants/router/url';
import { TY_AMMINISTRATORE_ENTE } from 'constants/userroles';
import { CHAT_CHIUSA } from 'constants/db/chatStatus';
import { searchUser } from 'sql/utente/searchUser';
import { searchState } from 'sql/conversazione/searchState';
import { insertMessage } from 'sql/conversazione/insertMessage';

export default {
  Query: {
    retrieveMessages: async (parent, args, context, info) => {
      const sql = `
          select    id_richiesta_servizio_ente,
                    id_conversazione_ut_ente,
                    tx_testo_messaggio,
                    id_utente_autore_msg,
                    fg_msg_ente,
                    ts_creazione
          from    ${context.tabelle.conversazione_utente_ente}
          where   id_richiesta_servizio_ente = $[id_richiesta_servizio]
          ORDER BY ts_creazione ASC`;
      context.logger.info(sql, args);
      return await context.db.any(sql, args);
    },
    getAttachment: async (parent, args, context, info) => {
      const sql = `
      SELECT *
      FROM  ${context.tabelle.media} media
      INNER JOIN ${context.tabelle.richiesta_servizio_ente}  richiesta
        on media.id_media = richiesta.id_preventivo_ente
      WHERE
        richiesta.id_richiesta_servizio_ente = $[id_richiesta_servizio]`;
      context.logger.info(sql, args)
      let risultato = await context.db.oneOrNone(sql, args);
      if (risultato !== null) {
        risultato.oj_media = risultato.oj_media.toString();
      }
      return risultato;
    },
  },
  Mutation: {
    deleteAttachment: async (parent, args, context, info) => {
      let sql, result;
      try {
        await context.db.tx('eliminazioneAllegatoEnte', async t => {
          const updateSql = `
            UPDATE ${context.tabelle.richiesta_servizio_ente}
            SET id_preventivo_ente=null 
            WHERE id_preventivo_ente = $[id_media]
          `;
          context.logger.info(updateSql, args)
          await t.oneOrNone(updateSql, args)

          const deleteSql = `
            DELETE 
            FROM ${context.tabelle.media} 
            WHERE id_media = $[id_media]
          `;
          context.logger.info(deleteSql, args)
          await t.oneOrNone(deleteSql, args)
        })
      } catch (error) {
        throw new ApolloError(DELETE_ATTACHMENT_ERROR.message, DELETE_ATTACHMENT_ERROR.code);
      }
      return true;
    },
    sendMessage: async (parent, args, context, info) => {
      let rs, rsFinale;
      const { user: { idUtente } } = context;
      try {
        await context.db.tx('conversazioneAddTxt', async t => {
          await t.batch([
            context.logger.info(searchUser)
            , await t.one(searchUser, { ...args, idUtente }).then(async contenuto => {
              rsFinale = contenuto;
            }),
          ]);
          //controllare lo stato della chat
          await t.batch([
            context.logger.info(searchState, args.input)
            , await t.one(searchState, args.input).then(async contenuto => {
              rs = contenuto;
            }),
          ]);

          if (rs.cd_stato_chat == CHAT_CHIUSA && rsFinale.ty_operatore_ente < TY_AMMINISTRATORE_ENTE) {
            //if the first message is from the CITTADINO
            throw new ApolloError(CLOSE_CHAT_ERROR.message, CLOSE_CHAT_ERROR.code);
          } else {
            if (rsFinale) {
              const fg_msg_ente = rsFinale.ty_operatore_ente >= TY_AMMINISTRATORE_ENTE ? 'Y' : 'N';
              const sqlInsertMessage = insertMessage(fg_msg_ente);
              await t.batch([
                context.logger.info(sqlInsertMessage, args)
                , await t.one(sqlInsertMessage, { ...args.input, idUtente }).then(async contenuto => {
                  rs = contenuto;
                }),
              ]);
            }
          }
        });

        return rs;
      }
      catch (error) {
        context.logger.error(error, 'Error while trying to send a new chat message');
        throw new ApolloError(error.message, error.code);
      }

    }
  }
};