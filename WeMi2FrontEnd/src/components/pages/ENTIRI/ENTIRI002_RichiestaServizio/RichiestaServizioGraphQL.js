
const searchCategoryQueryName = 'category';
export const getService = [
  '',
  `query($idServizio: Int!, $idCategoria: Int) {
    servizioPK(idServizio:$idServizio, idCategoria:$idCategoria){
      id_servizio
      txTitoloServizio
      txDescrizioneServizio
      prezzo {
        tl_testo_sostantivo
        fg_genere_maschile
      }
    }
    ${searchCategoryQueryName}(
      idCategoria: $idCategoria
    ) {
      name
    }
  }`,
  '',
];