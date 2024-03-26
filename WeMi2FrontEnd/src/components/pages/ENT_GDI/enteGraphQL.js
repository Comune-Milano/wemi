/** @format */

export const enteAll = () => [
  '',
  `{
        enteAll {
          id_ente
          nm_ente
          tx_email_referente
        }
      }`,
];
export const usersCollegatiEnte = (id) => [
  'usersCollegatiEnte',
  `{
    usersCollegatiEnte(idEnte: ${id}){
      email
      id_utente
    }
        
  
  }`,
];
export const entePK = (id) => [
  '',
`{
    entePK(id_ente: ${id}){
      id_ente,
      nm_ente,
      id_partita_iva_ente,
      ptx_email,
      nm_ente_completo,
      cd_stato_ente,
      spaziWeMi,
      categorie
    }
  }`
];
export const enteDatiPK = (id) => [
  '',
  `{
    enteDatiPK(id_ente_rif:${id}){
      id_ente_rif
      tl_descrizione_ente
      oj_media_logo
      nm_nome_media
      ty_mime_type_media
      id_img_logo
      js_referente
      js_primo_contatto
      note_per_cittadino
      js_altre_info
      js_note_adminwemi
      sede_principale
      sede_secondarie
      allegatiEnte {
        id_media
        cd_dominio
        tl_valore_testuale
        ty_mime_type_media
        nm_nome_media
        iw_path
      }
      iw_path_logo
    }
  }`,
];

export const EstraiListaEnte = () => [
  '',
  `{
    EstraiListaEnte{
      id_ente
      id_partita_iva_ente
      nm_ente
      nm_ente_completo
      pg_versione
      accreditato
      ptx_email
      cd_stato_ente
      tl_valore_testuale
      id_utente
      idStt
      ts_variazione_stato
      ptx_username
    }
  }`,
];

export const ModificaDatiPropriEnte = (id,s,u) => [
  '',
  `mutation{
    ModificaDatiPropriEnte(
      input:{id_ente:${id}, 
      cd_stato_ente:"${s}", 
      id_utente:${u}})
  }`,
];

export const usersAddedEntePK = (id_ente) => [
  '',
  `{
    usersAddedEntePK(id_ente:${id_ente}){
      email
    }
  }`,
];


export const utenteAdd = (username, id_ente) => [
  '',
  `mutation{
    utenteAdd(input:{
      ptx_username:"${username}",
      id_ente:${id_ente}
    })
  }`,
];

export const utenteRemove = (username, id_ente) => [
  '',
  `mutation{
    utenteRemove(input:{
      ptx_username:"${username}",
      id_ente:${id_ente}
    })
  }`,
];

