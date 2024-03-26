export const contenutoByTy = (idCategoria) => [
    'CategoriaTesto',
    `{
        contenutoByTy(ty_contenuto:${idCategoria}){
          tl_testo_1
          id_contenuto
        }
      }`
  ];

  export const CategorieZone = () => [
    "CategorieLivello1",
    `{
      allAree{
        idArea
        txTitoloArea
      }
    }
    `,
  ];
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
    `
  ]
  