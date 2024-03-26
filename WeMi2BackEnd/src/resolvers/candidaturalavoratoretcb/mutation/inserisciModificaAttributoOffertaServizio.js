
import {
  verificaUtenteOffertaServizio,
  resettaAttributiListaOffertaServizio,
  resettaAttributiAssociatiOffertaServizio,
  aggiornaAttributiOffertaServizio,
  eliminaAttributiOffertaServizio,
  inserisciAttributiOffertaServizio,
  inserisciAttributiAssociatiOffertaServizio,
  verificaAttributiPresentiOffertaServizio,
  inizializzaUtenteOffertaServizio,
  updateFlagsCandidaturaTataQuery,
  updateFlagsCandidaturaColfQuery,
  updateFlagsCandidaturaBadanteQuery
} from '../queries/queries';
import { deleteFromAttributoRelOffertaServizioByIdServizio } from 'sql/valattributoreloffservlav/delete';
import { deleteFromAttributoCalendarioOffertaServizioByIdServizio } from 'sql/valattributocaloffservlav/delete';
import { deleteFromOffertaServizioByIdServizio } from 'sql/valattributooffertaservizio/delete';
import { deleteFromUtenteOffertaByIdServizio } from 'sql/utenteoffertaservizio/delete';
import {
  ID_SERVIZIO_TATA,
  ID_SERVIZIO_COLF,
  ID_SERVIZIO_BADANTE
} from 'constants/db/servizio_riferimento_tcb';
import { aggiornaUltimaModifica } from 'sql/candidaturaTCB/aggiornaUltimaModifica';

// Gestisco la tabella val_attributo_offerta_servizio dove venono storicizzati gli attributi riguardanti l'offerta di un servizio specifico

export const inserisciModificaAttributoOffertaServizio = async (parent, args, context, info) => {
  await context.db.tx('inserisciModificaAttributoOffertaServizio', async t => {
    const queryArrDelete = [
      deleteFromAttributoRelOffertaServizioByIdServizio(),
      deleteFromAttributoCalendarioOffertaServizioByIdServizio(),
      deleteFromOffertaServizioByIdServizio(),
      deleteFromUtenteOffertaByIdServizio()
    ];

    let utenteOffServ, cdAttr;
    const { idUtenteLav, idServizioRif } = args;
    let attributiDaEliminare = [],
      attributiDaInserire = [],
      attributiDaAggiornare = [],
      attributiListaDaInserire = [];

    if (!args.flagCandidatura) {
      await t.multi(queryArrDelete.join(";"), {
        idLavoratore: idUtenteLav,
        idServizioRiferimento: idServizioRif
      });

      let sql;
      if (idServizioRif === ID_SERVIZIO_TATA) {
        sql = updateFlagsCandidaturaTataQuery;
      }
      else if (idServizioRif === ID_SERVIZIO_COLF) {
        sql = updateFlagsCandidaturaColfQuery;
      }
      else if (idServizioRif === ID_SERVIZIO_BADANTE) {
        sql = updateFlagsCandidaturaBadanteQuery;
      }
      await t.one(sql, { idUtente: idUtenteLav, flag: '0' });

      return;
    }
    else {
      let sql;
      if (idServizioRif === ID_SERVIZIO_TATA) {
        sql = updateFlagsCandidaturaTataQuery;
      }
      else if (idServizioRif === ID_SERVIZIO_COLF) {
        sql = updateFlagsCandidaturaColfQuery;
      }
      else if (idServizioRif === ID_SERVIZIO_BADANTE) {
        sql = updateFlagsCandidaturaBadanteQuery;
      }
      await t.one(sql, { idUtente: idUtenteLav, flag: '1' });
    }

    /**
     * Inizializzo la tabella utente_offerta_servizio
     */
    utenteOffServ = await t.any(verificaUtenteOffertaServizio, args);
    if (!utenteOffServ || !utenteOffServ.length) {
      await t.oneOrNone(inizializzaUtenteOffertaServizio, args);
    };

    /** Cerco tutti gli attributi nella tabella val_attributo_offerta_servizio che sono stati inseriti 
     * per il servizio e il lavoratore specificato.
     */
    await t.any(verificaAttributiPresentiOffertaServizio, args)
      .then((result) => { context.logger.info(result); cdAttr = result.map(el => parseInt(el.cd_attributo)) });

    /**
     * Definisco un array di codici attributo che si riferiscono ad attributi di tipo "lista", in modo
     * da rendere più semplice la gestione di inserimento, cancellazione e sovrascrittura di questa tipologia
     * di attributi
     */
    let lsAttr = [117, 157, 158];
    /** Controllo se tra gli attributi che sto per inserire sono presenti attributi lista, ed elimino quelli presenti,
     * in modo da poterli poi sovrascrivere con la nuova lista che ricevo dagli input.
      */

    const attributiAssociatiDaEliminare = [];
    const attributiListaDaEliminare = [];

    lsAttr.forEach(async (ls) => {
      if ((cdAttr.includes(ls) &&
        args.arrayAttrOffertaServizio.find((val) => { return val.cd_attributo === ls }))) {
        args.arrayAttrOffertaServizio.forEach(async (val) => {
          if (val.cd_attributo === ls) {
            /**
             * Verifico se sono attirbuti lista collegati ad attributi2 nella tabella
             * val_attributo_rel_off_serv_lav, in modo da eliminare anch'essi 
             * ed inserire eventualmente la nuova lista
             */
            if (val.cd_attributo_2) {
              attributiAssociatiDaEliminare.push(ls);
            }
            else {
              attributiListaDaEliminare.push(ls);
            }
          }
        });
      };
    });

    if (attributiAssociatiDaEliminare.length > 0) {
      await t.none(resettaAttributiAssociatiOffertaServizio, {
        idServizioRif,
        idUtenteLav,
        attributiLista: attributiAssociatiDaEliminare
      });
    }

    if (attributiListaDaEliminare.length > 0) {
      await t.none(resettaAttributiListaOffertaServizio, {
        idServizioRif,
        idUtenteLav,
        attributiLista: attributiListaDaEliminare
      });
    }

    /** Ciclo gli attributi che arrivano */
    args.arrayAttrOffertaServizio.forEach((val, index) => {

      /** Controllo se non sono contenuti negli attributi Lista */
      if (lsAttr.indexOf(val.cd_attributo) === -1) {

        /** Non sono liste, quindi controllo se sono già presenti,
         * se lo sono, o aggiorno o elimino,
         * altrimenti inserisco.
         */

        if (cdAttr.includes(val.cd_attributo)) {

          /** Controllo se il cd_val_attributo è maggiore di zero, per determinare se l'attributo vada
           * aggiornato (se si) o eliminato (se uguale a -1)
           */

          if (parseInt(val.cd_val_attributo) >= 0) {
            attributiDaAggiornare = attributiDaAggiornare.concat(val);
          }
          else if (parseInt(val.cd_val_attributo) === -1) {
            attributiDaEliminare = attributiDaEliminare.concat(val.cd_attributo);
          }
        }
        /** Non sono presenti in tabella, li inserisco.  */
        else if (!cdAttr.includes(val.cd_attributo) && val.cd_val_attributo !== -1) {
          attributiDaInserire = attributiDaInserire.concat(val);
        }
      }
      /** Sono attributi Lista!
       * Controllo se voglio eliminarli e basta (cd_val_attributo === -1)
       * o se voglio inserire la nuova lista di attributi.
       */
      else if (lsAttr.indexOf(val.cd_attributo) !== -1 && val.cd_val_attributo !== -1) {
        attributiListaDaInserire = attributiListaDaInserire.concat(val)
        /** Inserisco eventuali attributi 2 associati */
      };

    });

    if (attributiDaEliminare.length) {
      await t.none(eliminaAttributiOffertaServizio, {
        idUtenteLav,
        idServizioRif,
        attributiDaEliminare
      });
    }

    if (attributiDaInserire.length) {
      const attributiDaInserireRows = attributiDaInserire.map(el => ({
        id_utente_lav: args.idUtenteLav,
        id_servizio_riferimento: args.idServizioRif,
        cd_attributo: el.cd_attributo,
        cd_val_attributo: el.cd_val_attributo,
        tx_val: el.tx_val,
        nr_val: el.nr_val,
        dt_val: el.dt_val,
        fg_val: el.fg_val,
        tx_nota: el.tx_nota,
        tx_nota_op: el.tx_nota_op,
        ts_modifica: 'localtimestamp',
        ts_creazione: 'localtimestamp',
      }));

      const inserisciAttributiOffertaServizioQuery = inserisciAttributiOffertaServizio(attributiDaInserireRows, context);
      await t.none(inserisciAttributiOffertaServizioQuery);
    }

    if (attributiDaAggiornare.length) {
      const attributiDaAggiornareQueries = attributiDaAggiornare.map(el => {
        const attributoSingolo = {
          id_utente_lav: args.idUtenteLav,
          id_servizio_riferimento: args.idServizioRif,
          cd_attributo: el.cd_attributo,
          cd_val_attributo: el.cd_val_attributo,
          tx_val: el.tx_val,
          nr_val: el.nr_val,
          dt_val: el.dt_val,
          fg_val: el.fg_val,
          tx_nota: el.tx_nota,
          tx_nota_op: el.tx_nota_op,
          ts_modifica: 'localtimestamp',
          ts_creazione: 'localtimestamp',
        };
        return aggiornaAttributiOffertaServizio(attributoSingolo, context);
      });
      await t.none(attributiDaAggiornareQueries.join(' '));
    }

    if (attributiListaDaInserire.length) {
      let attributi2Flag = false;
      let attributiListaDaInserireRows = [],
        attributiAssociatiOffertaServizioRows = [];
      attributiListaDaInserire.forEach(el => {
        attributiListaDaInserireRows = attributiListaDaInserireRows.concat({
          id_utente_lav: args.idUtenteLav,
          id_servizio_riferimento: args.idServizioRif,
          cd_attributo: el.cd_attributo,
          cd_val_attributo: el.cd_val_attributo,
          tx_val: el.tx_val,
          nr_val: el.nr_val,
          dt_val: el.dt_val,
          fg_val: el.fg_val,
          tx_nota: el.tx_nota,
          tx_nota_op: el.tx_nota_op,
          ts_modifica: 'localtimestamp',
          ts_creazione: 'localtimestamp',
        });
        if (el.cd_val_attributo_2) {
          attributi2Flag = true;
          el.cd_val_attributo_2.forEach(attr2 => {
            attributiAssociatiOffertaServizioRows = attributiAssociatiOffertaServizioRows.concat(
              {
                id_utente_lav: args.idUtenteLav,
                id_servizio_riferimento: args.idServizioRif,
                cd_attributo_1: el.cd_attributo,
                cd_val_attributo_1: el.cd_val_attributo,
                cd_attributo_2: el.cd_attributo_2,
                cd_val_attributo_2: attr2
              }
            )
          });
        }
      });
      const inserisciAttributiListaOffertaServizioQuery = inserisciAttributiOffertaServizio(attributiListaDaInserireRows, context);
      await t.none(inserisciAttributiListaOffertaServizioQuery);
      if (attributi2Flag && attributiAssociatiOffertaServizioRows.length) {
        const inserisciAttributiAssociatiOffertaServizioQuery = inserisciAttributiAssociatiOffertaServizio(attributiAssociatiOffertaServizioRows, context);
        await t.none(inserisciAttributiAssociatiOffertaServizioQuery);
      }
    }
    await t.none(aggiornaUltimaModifica, { id_lavoratore: idUtenteLav, id_utente_mod: context.user.idUtente });
  })
  return true;
}