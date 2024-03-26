/** @format */
import jsonNoquotesOnKeys from 'utils/functions/jsonNoquotesOnKeys';

export const dominioByTipoS = (st) => [
  '',
  `{
    dominioByTipoS(ty_dominio:"${st}"){
      value
      textValue
    }
  }`,
];

export const inserisciDatiMerchant = [
  '',
  `
    mutation($merchant: InputMerchant!){
      setDatiMerchant(
        merchant: $merchant
      )
    }
  `,
];

export const contenutoByTyS = (nome, IdTy) => [
  nome,
  `{
    contenutoByTyS(ty_contenuto:${IdTy}){
      value
      textValue
    }
  }`,
];
export const EstraiDatiPropriEnteR = (id) => [
  '',
  `{
    EstraiDatiPropriEnte(id_ente:${id}){
      id_ente
      id_partita_iva_ente
      nm_ente
      nm_ente_completo
      nr_operatori_servizi_wemi
      ptx_email
      cd_stato_ente
      tl_valore_testuale
      id_utente
      ts_variazione_stato
      cd_stato_ente
      id_spazio_wemi
      id_cat_accreditamento
      pg_versione
      datiMerchant {
        idEnte
        merchantId
        publicKey
        privateKey
        dataInizio
        dataFine
      }
  }
}`
];

export const EstraiDatiPropriEnte = [
  '',
  `query EstraiDatiPropriEnte($id_ente: Int!) {
    EstraiDatiPropriEnte(id_ente: $id_ente){
        id_ente
        id_partita_iva_ente
        nr_operatori_servizi_wemi
        nm_ente
        nm_ente_completo
        ptx_email
        cd_stato_ente
        tl_valore_testuale
        id_utente
        ts_variazione_stato
        cd_stato_ente
        id_spazio_wemi
        id_cat_accreditamento
        pg_versione
        datiMerchant {
          idEnte
          merchantId
          publicKey
          privateKey
          dataInizio
          dataFine
        }
    }
  }`,
  'EstraiDatiPropriEnte'
];




export const ModificaDatiIdentificativiEnte = (id, myJSON) => [
  '',

  `mutation
 {ModificaDatiIdentificativiEnte(input:{
   id_ente:${id},
   ptx_email:"${myJSON.ptx_email ? myJSON.ptx_email.toString() : ""}",
   id_partita_iva_ente:"${myJSON.id_partita_iva_ente ? myJSON.id_partita_iva_ente.toString() : ""}",
   nm_ente:"${myJSON.nm_ente ? myJSON.nm_ente.toString() : ""}",
   nr_operatori_servizi_wemi:${myJSON.nr_operatori_servizi_wemi ? myJSON.nr_operatori_servizi_wemi : null},
   nm_ente_completo:"${myJSON.nm_ente_completo ? myJSON.nm_ente_completo.toString() : ""}",
   cd_stato_ente:"${myJSON.cd_stato_ente ? myJSON.cd_stato_ente.toString() : ""}",
   id_spazio_wemi:${JSON.stringify(myJSON.id_spazio_wemi ? myJSON.id_spazio_wemi : "")},
   id_cat_accreditamento:${JSON.stringify(myJSON.id_cat_accreditamento ? myJSON.id_cat_accreditamento : "")}})}`,

];

export const InserisciDatiIdentificativiEnte = (myJSON) => [
  '',

  `mutation{InserisciDatiIdentificativiEnte(input:{ptx_email:"${myJSON.ptx_email.toString()}",id_partita_iva_ente:"${myJSON.id_partita_iva_ente.toString()}",nm_ente:"${myJSON.nm_ente.toString()}",nr_operatori_servizi_wemi:${myJSON.nr_operatori_servizi_wemi ? myJSON.nr_operatori_servizi_wemi : null},nm_ente_completo:"${myJSON.nm_ente_completo.toString()}",cd_stato_ente:"${myJSON.cd_stato_ente.toString()}",id_spazio_wemi:${JSON.stringify(myJSON.id_spazio_wemi)},id_cat_accreditamento:${JSON.stringify(myJSON.id_cat_accreditamento)},idCittadino:${myJSON.idCittadino}, js_sede:{nomeSede:"Sede Legale",indirizzo: {txCAP: null,txCitta: "",txIndirizzo: "",txProvincia: "" }}})}`,
];

export const InserisciDatiIPropriEnteStatless = [
  '',
  `mutation InserisciDatiIPropriEnte ($input: InserisciDatiIPropriEnteInput!){
    InserisciDatiIPropriEnte(input: $input) 
    } `,
  'InserisciDatiIPropriEnte',
];

export const InserisciDatiIPropriEnte = (myJSON, status, flag) => [
  '',

  `mutation{
    InserisciDatiIPropriEnte(input:{
      gestisciMedia:${myJSON.gestisciMedia && jsonNoquotesOnKeys(myJSON.gestisciMedia)}
      id_ente_rif:${parseInt(myJSON.id_ente_rif)}
      tl_descrizione_ente:${myJSON.tl_descrizione_ente && jsonNoquotesOnKeys(myJSON.tl_descrizione_ente)}
      js_referente:${myJSON.js_referente && jsonNoquotesOnKeys(myJSON.js_referente)}
      js_primo_contatto:${myJSON.js_primo_contatto && jsonNoquotesOnKeys(myJSON.js_primo_contatto)}
      note_per_cittadino: ${myJSON.notePerCittadino ? jsonNoquotesOnKeys({value:myJSON.notePerCittadino}) : {}}
      js_altre_info:${myJSON.js_altre_info && jsonNoquotesOnKeys(myJSON.js_altre_info)}
      js_sede:${myJSON.sede_principale && jsonNoquotesOnKeys(myJSON.sede_principale)}
      cd_stato_ente:${status}
      operatori: ${myJSON.operatori && jsonNoquotesOnKeys(myJSON.operatori)}
      eliminaUsers:${myJSON.eliminaUsers && jsonNoquotesOnKeys(myJSON.eliminaUsers)}
      operazione:${flag}
      js_note:${myJSON.js_note_adminwemi && jsonNoquotesOnKeys(myJSON.js_note_adminwemi)}
      js_sede_secondaria:${myJSON.sede_secondarie && jsonNoquotesOnKeys(myJSON.sede_secondarie)}
      eliminaSedi:[${myJSON.eliminaSedi}]
    })
  }`
];

export const InserisciDatiIPropriEnteNewVersione = [
  '',

  `mutation InserisciDatiIPropriEnte ($input: InserisciDatiIPropriEnteInput!) {
    InserisciDatiIPropriEnte(input: $input )
  }`,
];

export const AltraSedeEntePK = (id) => [
  '',
  `{
    AltraSedeEntePK(id_ente:${id}){
      id_sede
      js_sede
    }
  }`,
];

export const sedeRemove = (id) => [
  '',
  `mutation{
    sedeRemove(id_sede:${id})
  }`,
];

export const sedeInsert = (id, ty, name) => [
  '',
  `mutation{
    sedeInsert(input:{
      id_ente_rif: ${id},
      ty_sede:${ty}
      js_sede:{nomeSede:"${name}", indirizzo: {
          txCAP: null,
          txCitta: "",
          txIndirizzo: "",
          txProvincia: ""
      }}
    })
  }`,
];

export const sedeUpdate = (id, myJSON) => [
  '',
  `mutation{
    sedeUpdate(input:{
      id_sede: ${id}
      js_sede:${jsonNoquotesOnKeys(myJSON.altra_sede)}
    })
  }`,
];

export const modificaNoteEnte = (id, obj, status, utente) => [
  '',
  `mutation{
    modificaNoteEnte(input:{
      id_ente_rif:${id}
      js_note_adminwemi:${jsonNoquotesOnKeys(obj)}
      cd_stato_ente:${status}
      id_utente:${utente}
    })
  }`
];

export const EstraiAllegatoEnte = [
  '',
  `query EstraiAllegatoEnte($id_ente: Int!, $id_media: Int!) {
    EstraiAllegatoEnte(id_ente: $id_ente, id_media: $id_media)
  }`,
  'EstraiAllegatoEnte',
];
