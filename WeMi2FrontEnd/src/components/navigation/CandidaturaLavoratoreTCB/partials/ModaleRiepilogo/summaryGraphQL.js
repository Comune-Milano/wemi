
export const estraiDati = [
  '',
  `query estraiDatiSummary($idUtente: Int) {
    estraiDatiSummary(idUtente: $idUtente ){
      cd_attributo
      cd_val_attributo
      nr_val
      tx_val
      fg_val
      dt_val
      tx_nota
      cd_val_attributo_2
      id_servizio_riferimento
      oj_allegato_off
    }
  }`,
];
export const estraiDatiPartials = [
  '',
  `query {
    estraiDatiPartials
      }     
  `,
  
];

export const estraiDatiAnagraficiFormFieldsValues = [
  '',
  `query EstraiDatiAnagraficiFormFieldsValues {
    EstraiDatiAnagraficiFormFieldsValues {
        sessoFieldValues {
          tyDominioTcb
          cdDominioTcb
          pgVisualizzazione
          tlValoreTestuale
        }
        statoNascitaFieldValues {
          tyDominioTcb
          cdDominioTcb
          pgVisualizzazione
          tlValoreTestuale
        }
      }
  }`,
  'EstraiDatiAnagraficiFormFieldsValues'
];

export const estraiFlagsCandidaturaQuery = [
  '',
  `
    query estraiFlagsCandidatura($idUtente: Int!) {
      estraiFlagsCandidatura (idUtente: $idUtente) {
        tata,
        colf,
        badante
      }
    }
  `,
  'estraiFlagsCandidatura',
];


export const estraiEsperienzeLavoratore = [
  '',
  `
    query estraiEsperienzeLavoratore ($idUtenteLav: Int!) {
      estraiEsperienzeLavoratore(idUtenteLav: $idUtenteLav) {
        idRichiesta
        serviziPrestati
        inizioPeriodo
        finePeriodo
        descrizioneEsp
        attributi {
          cd_attributo
          cd_val_attributo
          tx_val
        }
        nomeServizioAltro
      }
    }
  `,
  'estraiEsperienzeLavoratore',
];

export const estraiDatiDisponibilitaCandidaturaLavoratore = [
  "",
  `query estraiDatiDisponibilitaCandidaturaLavoratore($input: inputEstraiDatiDisponibilitaCandidaturaLavoratore!) {
    estraiDatiDisponibilitaCandidaturaLavoratore(input: $input)
  }`,
  "estraiDatiDisponibilitaCandidaturaLavoratore"
];

export const estraiDatiCompetenzeTata = [
  '',
  `query estraiDatiCompetenzeTata ($idUtenteLav: Int!) {
    estraiDatiCompetenzeTata (idUtenteLav: $idUtenteLav) {
      flagCandidatura
      mansioniColf 
      altreMansioniColf
      faccendeDomestiche
      mansioniTata {
        idMans
        fasceEtaSelezionate
      }
      terapieFlag
      terapieSpecificate
      altroFlag
      altreMansioniTata
    }
  }
  `,
  'estraiDatiCompetenzeTata',
];

export const estraiDatiOperatore = [
  '',
  `query estraiDatiOperatore ($idUtenteLav: Int!, $arrayIdServizi: [Int]!)
  {
    estraiDatiOperatore(
      idUtenteLav: $idUtenteLav,
      arrayIdServizi: $arrayIdServizi
    ) {
      anniEspTata
      anniEspColf
      dtItaliaDal
      anniEspBadante
      statoCandidatura
      vincoliCandidatura
      votoEspTata
      votoEspColf
      votoEspBadante
      iscrittoInps
      iscrittoRegioneLombardia
      notaOperatore
      documentiLavoratore
    }
  }
  `,
  'estraiDatiOperatore'
]
export const EstraiFileLavoratore = [
  '',
  `query estraiFileLavoratore ($idUtenteLav: Int!, $idAllegato: Int!){
    estraiFileLavoratore(idUtenteLav: $idUtenteLav, idAllegato: $idAllegato)
  }`,
  'estraiFileLavoratore'
];