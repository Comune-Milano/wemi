export const estraiDatiLoginEnte = [
  '',
  `
    query datiEnte($idEnte: Int!) {
      datiEnte(idEnte: $idEnte) 
    }
  `,
  'datiEnte',
];