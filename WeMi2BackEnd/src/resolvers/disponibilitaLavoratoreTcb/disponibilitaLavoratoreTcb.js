/** @format */

import { DisponibilitaLavoratoreDAO } from "../../dao/disponibilitaLavoratore/disponibilitaLavoratoreDAO";

export default {
  Query: {
    EstraiTipologieOrarioLavoratore: async (parent, args, context, info) => {
      const disponibilitaLavoratoreDAO = new DisponibilitaLavoratoreDAO(context, args);
      const [
        tipologieOrarioOffertaServizio,
        tipologieOrarioCalendarioOffertaServizio
      ] = await disponibilitaLavoratoreDAO.estraiTipologieOrarioLavoratore();

      return {
        tipologieOrarioOffertaServizio: tipologieOrarioOffertaServizio.map(
          x => ({ checked: true, value: +x.codiceAttributo })
        ),
        tipologieOrarioCalendarioOffertaServizio: tipologieOrarioCalendarioOffertaServizio.map(
          x => ({
            checked: true,
            value: +x.codiceAttributo,
            calendarValues: {
              lunedì: x.lunedi,
              martedì: x.martedi,
              mercoledì: x.mercoledi,
              giovedì: x.giovedi,
              venerdì: x.venerdi,
              sabato: x.sabato,
              domenica: x.domenica
            }
          })
        )
      };
    },
    EstraiDatiStatoOccupazionaleLavoratore: async (parent, args, context, info) => {
      const disponibilitaLavoratoreDAO = new DisponibilitaLavoratoreDAO(context, args);
      const [
        [dataDisponipileDal],
        [codiceStatoOcc],
        serviziAbilitati
      ] = await disponibilitaLavoratoreDAO.getDatiStatoOccupazionale();

      return {
        codiceStatoOccupazionale: codiceStatoOcc
          ? {
            id: codiceStatoOcc.id,
            value: codiceStatoOcc.value
          }
          : null,
        ...dataDisponipileDal,
        serviziAbilitati
      };
    },
    EstraiDatiDisponibilitaOraria: async (parent, args, context, info) => {
      const disponibilitaLavoratoreDAO = new DisponibilitaLavoratoreDAO(context, args);

      const [
        mezzaGiornataDiRiposo,
        nrOreSettimanaliDisponibilita,
        stipendioConvivente,
        spaziConvivente,
        stipendioConvivenzaRidotta,
        stipendioNonConvivente,
        spaziConvivenzaRidotta,
        stipendioPresenzaNotturna,
        stipendioAssistenzaNotturna,
        stipendioWeekend
      ] = await disponibilitaLavoratoreDAO.estraiDatiDisponibilitaOraria();

      return {
        mezzaGiornataDiRiposo: mezzaGiornataDiRiposo
          ? mezzaGiornataDiRiposo.map(x => ({
            id: +x.codiceAttributo,
            value: x.value
          }))
          : null,
        nrOreSettimanaliDisponibilita: nrOreSettimanaliDisponibilita
          ? nrOreSettimanaliDisponibilita.map(x => ({
            id: +x.codiceAttributo
          }))
          : null,
        stipendioConvivente: stipendioConvivente
          ? stipendioConvivente.map(x => ({
            id: +x.codiceAttributo,
            value: x.value
          }))[0]
          : null,
        spaziConvivente: spaziConvivente
          ? spaziConvivente.map(x => ({
            id: +x.codiceAttributo,
            text: x.tx_val
          }))
          : null,
          stipendioConvivenzaRidotta: stipendioConvivenzaRidotta
          ? stipendioConvivenzaRidotta.map(x => ({
            id: +x.codiceAttributo,
            value: x.value
          }))[0]
          : null,
          stipendioNonConvivente: stipendioNonConvivente
          ? stipendioNonConvivente.map(x => ({
            id: +x.codiceAttributo,
            value: x.value
          }))[0]
          : null,
          spaziConvivenzaRidotta: spaziConvivenzaRidotta
          ? spaziConvivenzaRidotta.map(x => ({
            id: +x.codiceAttributo,
            text: x.tx_val
          }))
          : null,
          stipendioPresenzaNotturna: stipendioPresenzaNotturna
          ? stipendioPresenzaNotturna.map(x => ({
            id: +x.codiceAttributo,
            value: x.value
          }))[0]
          : null,
          stipendioAssistenzaNotturna: stipendioAssistenzaNotturna
          ? stipendioAssistenzaNotturna.map(x => ({
            id: +x.codiceAttributo,
            value: x.value
          }))[0]
          : null,
          stipendioWeekend: stipendioWeekend
          ? stipendioWeekend.map(x => ({
            id: +x.codiceAttributo,
            value: x.value
          }))[0]
          : null,
      };
    },
  },
  Mutation: {
    AggiornaStatoOccupazionale: async (parent, args, context, info) => {
      let risultato = false;
      return await context.db.tx(async t => {
        const disponibilitaLavoratoreDAO = new DisponibilitaLavoratoreDAO(context, args, t);
        const [[dataDisponibileDa], [codiceStatoOcc]] = await disponibilitaLavoratoreDAO.getDatiStatoOccupazionale()

        if (codiceStatoOcc) {
          await disponibilitaLavoratoreDAO.aggiornaStatoOccupazionale().then(() => risultato = true);
        }
        if (dataDisponibileDa) {
          await disponibilitaLavoratoreDAO.aggiornaDataStatoOccupazionale().then(() => risultato = true);
        }

        if (!codiceStatoOcc && args.input.codiceStatoOccupazionale) {
          await disponibilitaLavoratoreDAO.inserisciStatoOccupazionale().then(() => risultato = true);
        }
        if (!dataDisponibileDa && args.input.dataDisponibileDa) {
          await disponibilitaLavoratoreDAO.inserisciDataStatoOccupazionale().then(() => risultato = true);
        }

        return risultato
      });
    },
    ConfermaDisponibilitaOrariaLavoratore: async (parent, args, context, info) => {
      const disponibilitaLavoratoreDAO = new DisponibilitaLavoratoreDAO(context, args);

      let result = false;
      if (args.input.checkboxesTipologiaOrarioUnchecked.length > 0) {
        const tipologieOrarioUncheckedExist = await disponibilitaLavoratoreDAO.verificaTipologieOrarioLavoratoreUnchecked();
        context.logger.info(tipologieOrarioUncheckedExist);
        if (tipologieOrarioUncheckedExist){
          await disponibilitaLavoratoreDAO.eliminaTipologieOrario(tipologieOrarioUncheckedExist);
          result = true
        }
      }

      //aggiorna utente_offerta_lav con ultimo operatore e timestamp
      await disponibilitaLavoratoreDAO.aggiornaUtenteOffertaLav();
      // eliminare tutti i dati
      await disponibilitaLavoratoreDAO.eliminareDatiTipologieOrario();

      if (args.input.checkboxesTipologiaOrarioChecked.length > 0) {
        const tipologieOrarioCheckedExist = await disponibilitaLavoratoreDAO.verificaTipologieOrarioLavoratoreChecked();

        context.logger.info(tipologieOrarioCheckedExist);
        await disponibilitaLavoratoreDAO.inserisciAggiornaTipologieOrario(tipologieOrarioCheckedExist);
        result = true
      }

      return result;
    }
  }
};
