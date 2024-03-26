export const rimuoviElemento = idPagamento => 
   [
  'rimuoviElemento',
` 
mutation{
    rimuoviDalCarrello(idPagamento:${idPagamento})
  }    
    `
];