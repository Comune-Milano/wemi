export const estraiRichiesteEnteNew = [
  '',
  `
  query estraiRichiesteEnte( $input: inputEstraiRichiesteEnte! ){
    estraiRichiesteEnte(input: $input){
      count
      result {
        idRichiestaServizioEnte
        idRichiestaServizioBase
        nmEnte
        nomeUtente
        cognomeUtente
        username
        timestampCreazione
        nomeUtente
        cognomeUtente
        datiLavoratore
        nomeServizio
        statoRecensione
        js_impersonificazione
        statoRichiestaBase
        statoRichiestaEnte
        statoChat
        periodoRichiestoDal
        periodoRichiestoAl
        prezzoProposto
        prezzoFinale
        DatiPrezzo
        tipoOfferta
        TipoServizioErog
        PrezzoMinimo
        jsDatiRichiesta
        inizioValOffertaPrezzo
        fineValOffertaPrezzo
        periodoPropostoDal
        periodoPropostoAl
        servizioEnte {
          listaPeriodiErogazione {
            tl_valore_testuale
            id_periodo
          }
        }
      }
    }
  }   
`,
  'estraiRichiesteEnte',
];

export const estraiRichiesteEnte = numeroElementi => [
  'estraiTutteLeRichieste',
  ` {
    estraiRichiesteEnte(input:{numeroElementi:${numeroElementi} }){
      count
      result {
        idRichiestaServizioEnte
        idRichiestaServizioBase
        nmEnte
        nomeUtente
        cognomeUtente
        username
        timestampCreazione
        nomeUtente
        cognomeUtente
        datiLavoratore
        nomeServizio
        statoRecensione
        js_impersonificazione
        statoRichiestaBase
        statoRichiestaEnte
        statoChat
        periodoRichiestoDal
        periodoRichiestoAl
        prezzoProposto
        prezzoFinale
        DatiPrezzo
        tipoOfferta
        TipoServizioErog
        PrezzoMinimo
        jsDatiRichiesta
        inizioValOffertaPrezzo
        fineValOffertaPrezzo
        periodoPropostoDal
        periodoPropostoAl
        servizioEnte {
          listaPeriodiErogazione {
            tl_valore_testuale
            id_periodo
          }
        }
      }
    }
  }   
`];

export const updateDatiRichiestaEnte = args => 
   [
  'DatiAccettazioneRichiestaEnte',
 `mutation {
  ChiudiRichiestaServizioEnte(
        datiUpdate: {
            idRichiestaEnte: ${args.idRichiestaEnte},
           ${args.validita ? `validita: "${args.validita}",`:``}
           ${args.nomeLavoratore ? `nomeLavoratore: "${args.nomeLavoratore}",`:``}
           ${args.importo ? `importoTotale: ${args.importo},`:``}
           ${args.matricolaLavoratore ? `matricolaLavoratore: ${args.matricolaLavoratore},`:``}
           ${args.dateFrom ? `disponibilitaDa: "${args.dateFrom}",`: ``}
           ${args.dateTo ? `disponibilitaA: "${args.dateTo}",`: ``}
            fasciaOraria: ${args.orario}
            infoAggiuntive:  "${args.notes}"
        }
            )
  }   
    `
];