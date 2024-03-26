export const DominioTcbByTipoTcb = [
  "",
  `query dominioTcbByTipoTcb($ty_dominio_tcb: Float!) {
    dominioTcbByTipoTcb(ty_dominio_tcb: $ty_dominio_tcb) {
      value,
      textValue
    }
  }`,
  "dominioTcbByTipoTcb"
];

export const AggiornaStatoOccupazionale = [
  "",
  `mutation AggiornaStatoOccupazionale($input: InputAggiornaStatoOccupazionale!) {
    AggiornaStatoOccupazionale(input: $input)
  }`,
  "AggiornaStatoOccupazionale"
];

export const EstraiDatiStatoOccupazionaleLavoratore = [
  "",
  `query EstraiDatiStatoOccupazionaleLavoratore($input: InputLavoratore!) {
    EstraiDatiStatoOccupazionaleLavoratore(input: $input)
  }`,
  "EstraiDatiStatoOccupazionaleLavoratore"
]

export const EstraiTipologieOrarioLavoratore = [
  "",
  `query EstraiTipologieOrarioLavoratore($input: InputLavoratore!) {
    EstraiTipologieOrarioLavoratore(input: $input)
  }`,
  "EstraiTipologieOrarioLavoratore"
]

export const EstraiDatiDisponibilitaOraria = [
  "",
  `query EstraiDatiDisponibilitaOraria($input: InputLavoratore!) {
    EstraiDatiDisponibilitaOraria(input: $input)
  }`,
  "EstraiDatiDisponibilitaOraria"
]

export const ConfermaDisponibilitaOrariaLavoratore = [
  "",
  `mutation ConfermaDisponibilitaOrariaLavoratore($input: InputConfermaDisponibilitaOraria!) {
    ConfermaDisponibilitaOrariaLavoratore(input: $input)
  }`,
  "ConfermaDisponibilitaOrariaLavoratore"
]
