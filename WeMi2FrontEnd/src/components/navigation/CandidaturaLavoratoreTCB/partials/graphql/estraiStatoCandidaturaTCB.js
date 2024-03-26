export const estraiStatoCandidatura = [
  '',
  `query estraiStatoCandidatura($idUtenteLav: Int!){
    estraiStatoCandidatura(idUtenteLav: $idUtenteLav){
    cd_ultimo_stato_offerta
    }
  }`,
  'estraiStatoCandidatura',
];