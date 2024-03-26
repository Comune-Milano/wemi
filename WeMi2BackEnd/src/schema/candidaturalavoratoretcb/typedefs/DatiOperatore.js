export const DatiOperatore =  ` 

  type DatiOperatore {
    anniEspTata: Int
    anniEspColf: Int
    anniEspBadante: Int
    statoCandidatura: Int
    dtItaliaDal: Timestamp
    vincoliCandidatura: String
    votoEspTata: Int
    votoEspColf: Int
    votoEspBadante: Int
    iscrittoInps: Boolean
    iscrittoRegioneLombardia: Boolean
    notaOperatore: String
    documentiLavoratore: [JSON]
  }

`;