export const getEnteData = [
  '',
  `query ($idEnte: Int!) {
    EstraiAllegatiEnte(
      id_ente: $idEnte
    ) {
        id_media
        ty_allegato
        nm_nome_media
        tl_valore_testuale
        ty_mime_type_media
    }

    entePK(
      id_ente:$idEnte
    ){
      nm_ente
      nm_ente_completo
      id_ente
      serviziAccreditati{
        txTitoloServizio
        id_servizio
        idServizioErogato
        categoriaPrincipaleServizio {
          idCategoria
        }
      }
      datiEnte{
        tl_descrizione_ente
        js_referente
        js_altre_info
        js_primo_contatto
        media{
            oj_media
          }
        sedeEnte{
          js_sede
        }
      }
    }
  }`,
]

