const contenutoTyQueryName = 'contenutoTy';


export const getContenutoTy = [
  '',
  `query ${contenutoTyQueryName}(
    $typeContenuto: Int!, 
    $statoContenuto: Int,
    $ricerca: String,
    $offset: Int
  ) {
    ${contenutoTyQueryName}(ty_contenuto:$typeContenuto, cd_stato_contenuto:$statoContenuto, offset: $offset, ricerca: $ricerca)
    {
      id_contenuto
      id_contenuto_rif
      ty_sottotipo_contenuto
      nr_ordine_visualizzazione
      pg_versione
      tl_testo_1
      tl_testo_2
      tl_testo_3
      tl_testo_4
      tl_testo_5
      cd_stato_contenuto
      cd_stato_contenuto_desc
      js_dati_contenuto
      count
    }
  }`,
  contenutoTyQueryName
];