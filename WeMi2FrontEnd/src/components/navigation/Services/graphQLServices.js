/** @format */

export const contenutoTy = (nome, id) => [
  nome,
  `{
    contenutoTy(ty_contenuto_id:${id})
    {
      id_contenuto
      tl_testo_1
      tl_testo_2
      js_dati_contenuto
    }
  }
  `,
];

export const aree = () => [
  "aree",
  `{
    allAree{
      idArea
      txTitoloArea
    }
  }
  `,
];

export const categorie = () => [
  "categorie",
  `{
    allCategorie{
      idCategoria
      txTitoloCategoria
      media{
        id_media
        oj_media
      }
      areeCategoria{
        idArea
      }
    }
  }
  `,
];
export const serviziByCategoria = idCategoria => [
  'servizi',
  `
  {
  serviziAll(idCategoria: ${idCategoria}){
    id_servizio
    tx_tags_ricerca
    txTitoloServizio
    categoriaPrincipaleServizio{
      idCategoria
      txTitoloCategoria
     	media{
        id_media
        oj_media
      }
    }
  }
}`
];
