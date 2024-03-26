const saveAnonymousPdfMutationName = 'saveAnonymousPdf';

export const saveAnonymousPdf = [
  '',
  `mutation ${saveAnonymousPdfMutationName}($idUtenteLav: Int!, $pdfBase64: String!){
    ${saveAnonymousPdfMutationName}(idUtenteLav: $idUtenteLav, pdfBase64: $pdfBase64)
    }
`,
saveAnonymousPdfMutationName
];
