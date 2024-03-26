export const saveCompletePdf = [
  '',
  `mutation saveCompletePdf($idUtenteLav: Int!, $pdfBase64: String!)
  {
    saveCompletePdf(idUtenteLav: $idUtenteLav, pdfBase64: $pdfBase64)
   }`,
];

export const saveAnonymousPdf = [
  '',
  `mutation saveAnonymousPdf($idUtenteLav: Int!, $pdfBase64: String!)
  {
    saveAnonymousPdf(idUtenteLav: $idUtenteLav, pdfBase64: $pdfBase64)
   }`,
];

export const InvioEmailPromemoriaDisponibilita = [
  "",
  `query InvioEmailPromemoriaDisponibilita($idLavoratore: Int!) {
    InvioEmailPromemoriaDisponibilita(idLavoratore: $idLavoratore)
  }`,
  "InvioEmailPromemoriaDisponibilita"
];
