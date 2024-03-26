const jsonNoquotesOnKeys = (obj) => {
  if (typeof obj === "object")
      obj = JSON.stringify(obj);
  obj=obj.replace(/"(\w+)"\s*:/g, '$1:');
  return obj;
  }

export const serviziByCategoria = idCategoria => [
    'RichiestaServizi',
    `
    {
    serviziAll(idCategoria: ${idCategoria}){
      id_servizio
      tx_tags_ricerca
      txTitoloServizio
      categoriaPrincipaleServizio{
        idCategoria
      }
    }
  }`
  ];
  export const matchParole = text =>[
    "",
`{
      matchParoleRicerca(text:"${text}"){
      id_servizio
      txTitoloServizio
      txDescrizioneServizio
      id_categoria_accreditamento
      categoriaPrincipaleServizio{
        idCategoria
      }
    }
  }
    `,
  ]
export const InoltraEmailRichiesta = dati => [
  '',
   `
    mutation{
      InoltraEmailRichiesta(dati:${jsonNoquotesOnKeys(dati)})
  }`
]