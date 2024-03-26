export const estraiRichiestePerIdEnteNew = [
  '',
  `query EstraiRichiesteServizioEntePerIdEnte($input: inputEstraiRichiesteEnte!) {
    EstraiRichiesteServizioEntePerIdEnte(
      input: $input) {
          count
          countDaRichiedere
          countConfermati
          countDaConfermare
          result {
            idRichiestaServizioEnte
            idRichiestaServizioBase
            nmEnte
            username
            idUtente
            cognomeUtente
            dataNascitaUtente
            isYoung
            codiceFiscaleUtente
            nomeUtente
            timestampCreazione
            anagraficaUtente
            datiLavoratore
            nomeServizio
            statoRecensione
            statoRichiestaBase
            statoRichiestaEnte
            statoChat
            servizioEnte {
              id_servizio_ente
              listaPeriodiErogazione {
                tl_valore_testuale
                id_periodo
              }
            }
          }
        }
    }
`,
  'EstraiRichiesteServizioEntePerIdEnte',
];

export const EstraiRichiestaEnte = [
  '',
  `query EstraiRichiestaEnte ($idRichiestaEnte: Int!) {
    EstraiRichiestaEnte (idRichiestaEnte: $idRichiestaEnte) {
      id_richiesta_servizio_ente
      ts_creazione
      im_costo_totale_ente
      id_utente_richiedente
      im_costo_totale_calcolato
      servizioEnte {
        id_servizio_ente
        service {
          id_servizio
          txTitoloServizio
        }
      }
      richiestaServizioBase{
         idRichiestaBase
         dt_periodo_richiesto_dal
         dt_periodo_richiesto_al
         js_dati_richiesta
      }
    }
  }
  `,
  'EstraiRichiestaEnte',
];
