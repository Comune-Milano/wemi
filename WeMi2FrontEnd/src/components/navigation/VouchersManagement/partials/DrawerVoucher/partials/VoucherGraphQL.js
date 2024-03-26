
export const estraiVoucher = [
  '',
  `query getVoucher($idVoucher: Int!) {
    getVoucher(idVoucher: $idVoucher) {
      idVoucher
      inizioValidita
      fineValidita
      state
      code
      cfIntestatario
      nomeTitolare
      cognomeTitolare
      cellContatto
      emailContatto
      cfMinore
      totalImport
      remainingImport
      countedImport
      bando
      dateLastModified
      transazioniVoucher
    }
  }
`,
  'getVoucher',
];

export const annulloVoucher = [
  '',
  `
    mutation annullaVoucher($id:Int!){
        annullaVoucher(id: $id)
      }`,
  'annullaVoucher',
];

export const ripristinaVoucher = [
  '',
  `
    mutation ripristinoVoucher($id:Int!){
        ripristinoVoucher(id: $id)
      }`,
  'ripristinoVoucher',
];
