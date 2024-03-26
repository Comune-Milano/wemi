import {
  inizializzaRicBaseEsperienzeLavoratoreMutation,
  inizializzaRicBaseSttEsperienzeLavoratoreMutation,
  inizializzaRicEnteEsperienzeLavoratoreMutation,
  inizializzaRicEnteSttEsperienzeLavoratoreMutation,
  inizializzaRecRicEnteEsperienzeLavoratoreMutation,
  inizializzaRicTcbEsperienzeLavoratoreMutation,
  inizializzaRMatchRicLavEsperienzeLavoratoreMutation,
  insertUpdateEsperienzeLavoratoreMutation,
  verificaCambioServizioRichiestaQuery,
  aggiornaServizioEsperienzaMutation,
  aggiornaPeriodoEsperienzaMutation,
  aggiornaDescEsperienzaMutation,
  rimuoviAttributiMansioniServizioMutation,
  inizializzaRicBaseEsperienzeLavoratoreAltroMutation,
  estraiMansioniServizioTcbQuery,
  aggiornaPeriodoEsperienzaTipologiaMutation,
  inizializzaRecRicEnteSttEsperienzeLavoratoreMutation,
} from '../queries/queries';
import { isNullOrUndefined } from 'util';
import { estraiByAttributiEidRichiesta } from 'sql/valattributodomanda/estraibyattributi';
import { updateRecensione } from 'sql/recensioneente/updaterecensione';
import { findMaxVariazioneStatoByIdRicEnte } from 'sql/richiestabasestt/findmaxvariazionestato';
import { RICHIESTA_ENTE_STORICO_ESP_LAV, RICHIESTA_ENTE_STORICO_ESP_LAV_FINALIZZATA } from 'resolvers/richiestaservizioente/constants/StatoRichiestaEnte';

import { aggiornaUltimaModifica } from 'sql/candidaturaTCB/aggiornaUltimaModifica';

export const inizializzaModificaEsperienzeLavoratore = async (_, args, context, info) => {
  let idRicBase, idRicEnte, idRicTcb, updateEsp = false, serviziCorrelati = [], oldServiziPrestati = [],
    mansioniTCB = [], attributiFamigliaRows = [];
  const { user } = context;
  const { idUtente } = user;
  const { tipologiaServizio, idRichiesta, idUtenteLav, serviziPrestati, inizioPeriodo, finePeriodo, descrizioneEsp, arrayAttrFamiglia } = args.input;
  let idServizio = serviziPrestati[0];
  await context.db.tx('inizializzaModificaEsperienzeLavoratore', async t => {

    /** Definisco un metodo per generare le row da inserire come attributi della famiglia nella tabella
     * val_attributo_domanda
     */
    const getAttributiFamigliaRows = (idRicTcb) => {
      return arrayAttrFamiglia.map(el => ({
        id_richiesta_servizio_tcb: idRicTcb,
        cd_attributo: el.cd_attributo,
        cd_val_attributo: el.cd_val_attributo,
        tx_val: el.tx_val,
        ts_modifica: 'localtimestamp',
        ts_creazione: 'localtimestamp',
      }))
    };

    /** 
     * Voglio ottenere ty_dominio_tcb e cd_attributo per le mansioni TCB avendo come input
     * gli ID dei servizi TCB selezionati.
     * Ho bisogno che sia una function, in modo tale da potermi calcolare anche il codice attributo
     * del servizio precedentemente selezionato ed eliminare così le mansioni inserite in precedenza
     * dalla tabella val_attributo_domanda
    */
    const getDominiMansArray = (idSerArr) => {
      const mansioniArray = [];
      idSerArr.forEach(idSer => {
        switch (idSer) {
          case 1:
            mansioniArray.push(40);
            break;
          case 2:
            mansioniArray.push(41);
            break;
          case 3:
            mansioniArray.push(43);
            break;
        }
      });
      return mansioniArray;
    };

    const getCdAttributoFromTyDominioOrIdSer = (tyOrIdServ) => {
      switch (tyOrIdServ) {
        case '40' || 1:
          return 62;
        case '41' || 2:
          return 61;
        case '43' || 3:
          return 60;
        default:
          return;
      }
    }
    const arrayDominiMansioni = getDominiMansArray(serviziPrestati);

    if (!idRichiesta) {
      /** Se non ho l'idRichiesta, allora sto inserendo una nuova esperienza, che inizializzo in ogni tabella coinvolta 
 * nella creazione di richieste servizio tcb.
 * Inoltre, dopo essermi trovato le mansioni tcb per il servizio selezionato dall'utente 
 * le inserisco tutte su val_attributo_domanda, in modo tale da rendere possibile la gestione del feedback.
 */   if (tipologiaServizio) {
        const jsDatiRichiesta = { nomeServizioAltro: tipologiaServizio };
        await t.oneOrNone(inizializzaRicBaseEsperienzeLavoratoreAltroMutation, { idUtenteLav, inizioPeriodo, finePeriodo, jsDatiRichiesta, })
          .then(bas => idRicBase = bas.id_richiesta_servizio_base);
      }
      else {
        await t.oneOrNone(inizializzaRicBaseEsperienzeLavoratoreMutation, { idUtenteLav, inizioPeriodo, finePeriodo })
          .then(bas => idRicBase = bas.id_richiesta_servizio_base);
      }

      await t.oneOrNone(inizializzaRicBaseSttEsperienzeLavoratoreMutation, { idUtenteLav, idRicBase });
      await t.oneOrNone(inizializzaRicEnteEsperienzeLavoratoreMutation, { idUtenteLav, idRicBase, idServizio, descrizioneEsp })
        .then(ent => idRicEnte = ent.id_richiesta_servizio_ente);
      await t.oneOrNone(inizializzaRicEnteSttEsperienzeLavoratoreMutation, { idUtenteLav, idRicEnte });
      await t.oneOrNone(inizializzaRecRicEnteEsperienzeLavoratoreMutation, { idRicEnte });
      /**
       * Inserimento su stt con cd_stato_rec a 1
       */
      await t.none(inizializzaRecRicEnteSttEsperienzeLavoratoreMutation, { idRicEnte, idUtente });
      await t.oneOrNone(inizializzaRicTcbEsperienzeLavoratoreMutation, { idRicEnte })
        .then(tcb => idRicTcb = tcb.id_richiesta_servizio_tcb);
      await t.oneOrNone(inizializzaRMatchRicLavEsperienzeLavoratoreMutation, { idRicTcb, idUtenteLav });
      attributiFamigliaRows = getAttributiFamigliaRows(idRicTcb);
      if (arrayDominiMansioni.length > 0) {
        /** Predispongo le rows e il metodo di inserimento delle mansioni e triggero la mutation */
        await t.many(estraiMansioniServizioTcbQuery, { arrayDominiMansioni }).then(res => mansioniTCB = res);
      }
      
      if (idRicTcb && mansioniTCB.length) {
        const attrMansRows = mansioniTCB.map(el => (
          {
            id_richiesta_servizio_tcb: idRicTcb,
            cd_attributo: getCdAttributoFromTyDominioOrIdSer(el.ty_dominio_tcb),
            cd_val_attributo: el.cd_dominio_tcb,
            tx_val: null,
            ts_modifica: 'localtimestamp',
            ts_creazione: 'localtimestamp'
          }
        ));
        const inserisciAttributiMansioniServizio = insertUpdateEsperienzeLavoratoreMutation(
          attrMansRows,
          context,
          false
        );
        await t.none(inserisciAttributiMansioniServizio, { idRicTcb });
      }

    }
    else {
      /** La richiesta già esiste, di conseguenza sto facendo un update */
      updateEsp = true;
      idRicTcb = idRichiesta;
      attributiFamigliaRows = getAttributiFamigliaRows(idRicTcb);
      /**
       * Trovo massimo variazione di stato
       */
      const maxVariazioneStato = await t.one(findMaxVariazioneStatoByIdRicEnte, { idRichiesta });
      /**
       * Verifico se stato è uguale a 9
       */
      if(maxVariazioneStato.statoRichiesta === RICHIESTA_ENTE_STORICO_ESP_LAV){
        /**
         * Setto cd_stato_rec a 1
         */
        await t.none(updateRecensione, { idRichiesta });
       
      }

      /**
       * Se la richiesta non è finalizzata
       */
      if (maxVariazioneStato.statoRichiesta !== RICHIESTA_ENTE_STORICO_ESP_LAV_FINALIZZATA) {
        /**
         * Inserimento su stt con cd_stato_rec a 1
         */
        await t.none(inizializzaRecRicEnteSttEsperienzeLavoratoreMutation, { idUtente, idRicEnte: idRichiesta });
      }
     

      if (tipologiaServizio) {
        const jsDatiRichiesta = { nomeServizioAltro: tipologiaServizio };
        await t.none(aggiornaPeriodoEsperienzaTipologiaMutation, { idRicTcb, inizioPeriodo, finePeriodo, jsDatiRichiesta, });
      }
      else {
        await t.none(aggiornaPeriodoEsperienzaMutation, { idRicTcb, inizioPeriodo, finePeriodo });
      }

      if (!isNullOrUndefined(descrizioneEsp)) {
        await t.none(aggiornaDescEsperienzaMutation, { idRicTcb, descrizioneEsp });
      }


      /** Controllo a quali servizi era agganciata in precedenza l'esperienza */
      serviziCorrelati = await t.any(verificaCambioServizioRichiestaQuery, { idUtenteLav, idRicTcb });

      let oldCdAttMansArray = [];
      oldServiziPrestati = serviziCorrelati.map(el => {
        oldCdAttMansArray.push(el.cd_attributo);
        switch (el.cd_attributo) {
          case '62':
            return 1;
          case '61':
            return 2;
          case '60':
            return 3;
          default:
            return;
        }
      });
      /*** Se l'array di servizi selezionati è diverso da quello presente in tabella, 
       * aggiorno la richiesta ente e modifico le mansioni 
       * */
      if ((oldServiziPrestati.length !== serviziPrestati.length ||
        oldServiziPrestati.some(el => serviziPrestati.indexOf(el) === -1))) {
        /** Aggiorno la tabella richiesta_servizio_ente */
        await t.oneOrNone(aggiornaServizioEsperienzaMutation, { idRicTcb, idServizio });

        /** Elimino le mansioni da val_attirbuto_domanda */
        if(oldServiziPrestati.length > 0){
          await t.none(rimuoviAttributiMansioniServizioMutation, { idRicTcb, oldCdAttMansArray });
        }
        if(arrayDominiMansioni.length > 0){
          await t.many(estraiMansioniServizioTcbQuery, { arrayDominiMansioni }).then(res => mansioniTCB = res);
          const attrMansRows = mansioniTCB.map(el => (
            {
              id_richiesta_servizio_tcb: idRicTcb,
              cd_attributo: getCdAttributoFromTyDominioOrIdSer(el.ty_dominio_tcb),
              cd_val_attributo: el.cd_dominio_tcb,
              tx_val: null,
              ts_modifica: 'localtimestamp',
              ts_creazione: 'localtimestamp'
            }
          ));
          const inserisciAttributiMansioniServizio = insertUpdateEsperienzeLavoratoreMutation(
            attrMansRows,
            context,
            false
          );
          await t.none(inserisciAttributiMansioniServizio, { idRicTcb });
        }
        
      }
    }

    const response = await t.any(estraiByAttributiEidRichiesta, { idRicTcb, attributi: attributiFamigliaRows.map(el => el.cd_attributo) });
    
    const attributiNonPresenti = attributiFamigliaRows.filter(el => {

      for(const element of response){

       if(el.cd_attributo === element.cd_attributo){
         return;
       }
     }
     return el;
    
    });

    if(updateEsp && attributiNonPresenti && attributiNonPresenti.length > 0){
      const insertUpdateEsperienzeLavoratoreMutationQuery = insertUpdateEsperienzeLavoratoreMutation(
        attributiNonPresenti,
        context,
        false
      );
      await t.none(insertUpdateEsperienzeLavoratoreMutationQuery, { idRicTcb });
    }

    const insertUpdateEsperienzeLavoratoreMutationQuery = insertUpdateEsperienzeLavoratoreMutation(
      attributiFamigliaRows,
      context,
      updateEsp
    );

    await t.none(insertUpdateEsperienzeLavoratoreMutationQuery, { idRicTcb });
    await t.none(aggiornaUltimaModifica, { id_lavoratore: args.input.idUtenteLav, id_utente_mod: context.user.idUtente });

  });
  return idRicTcb;
}