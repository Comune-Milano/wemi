export const entePK = idEnte => ['entePK',
`{
    entePK(id_ente:${idEnte}){
      nm_ente
      id_ente
      js_dati_prezzo {
        cdTipoOffertaServizio
        cdTipoServizioErog
        dataInizio
        dataFine
        txTitoloFinanziamento
        qtMinimaUnita
        txNoteAlPrezzo
        listinoPrezzi {
          qtPersoneDa
          qtPersoneA
          offerta {
            qtUnitaDa
            qtUnitaA
            valore
          }
        }
      }
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
  }`];