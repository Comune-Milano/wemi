const saveCompletePdfMutationName = 'saveCompletePdf';

export const saveCompletePdf = [
  '',
  `mutation ${saveCompletePdfMutationName}($idUtenteLav: Int!, $pdfBase64: String!){
    ${saveCompletePdfMutationName}(idUtenteLav: $idUtenteLav, pdfBase64: $pdfBase64)
    }
`,
saveCompletePdfMutationName
];
