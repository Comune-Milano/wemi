export const getMaxOrderService = [
  '',
  `query getMaxOrderService {
        getMaxOrderService
     }
  `,
  'getMaxOrderService'];

export const getPublishedAccreditationCategories = [
  '',
  `query EstraiListaCategorieAccreditamentoPubblicate {
       EstraiListaCategorieAccreditamentoPubblicate{
         id_contenuto
         tl_testo_1
       }
   }
   `,
  'EstraiListaCategorieAccreditamentoPubblicate',
];

export const getUnitPrice = [
  '',
  `query EstraiUnitaPrezzoAll {
     EstraiUnitaPrezzoAll{
       cd_unita_prezzo
       title
       }
   }
   `,
  'EstraiUnitaPrezzoAll',
];

export const getLevel2Categories = [
  '',
  `query contenutoPubblicatoByTy($ty_contenuto:Int!) {
     contenutoPubblicatoByTy(ty_contenuto:$ty_contenuto){
       id_contenuto
       tl_testo_1
       }
   }
   `,
  'contenutoPubblicatoByTy',
];

export const mansioniPubblicateAll = [
  '',
  `query mansioniPubblicateAll{
     mansioniPubblicateAll{
       idMansione
       txTitoloMansione
       }
   }
   `,
  'mansioniPubblicateAll',
];

export const destinatariPubblicati = [
  '',
  `query destinatariPubblicati{
     destinatariPubblicati{
       idDestinatario
       txDestinatario
       }
   }
   `,
  'destinatariPubblicati',
];
