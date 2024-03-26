/** @format */

const jsonNoquotesOnKeys = (obj) => {
  if (typeof obj === "object")
      obj = JSON.stringify(obj);
  obj=obj.replace(/"(\w+)"\s*:/g, '$1:');
  return obj;
  }


export const RecuperaUtente = [
    '',
    `query RecuperaUtente($username:String, $codicefiscale: String){
        RecuperaUtente (username:$username, codicefiscale: $codicefiscale)  {
            cognome
            nome
            ptx_codice_fiscale
            ptx_email
            id_utente
        }
    }
    `
];

export const tipoOrarioTCB = [
    '',
    `query TipologiaOrarioByServizioTCB ($idServizio: Int!) {
        TipologiaOrarioByServizioTCB(idServizio: $idServizio){
          tl_valore_testuale
          cd_dominio_tcb
        }
      }`,
  ];


  export const estraiLivelliContrattuali =  [
    '',
    `query estraiConfigurazioniLivelliContrattuali ($idServizio: Int!) {
        estraiConfigurazioniLivelliContrattuali (idServizio: $idServizio){
          nr_anno_rif
          dominioTcb
          cd_tipo_orario_lavoro
          cd_categoria_contrattuale
          im_importo_contributo
          paga_minima_contrattuale
          im_importo_indennita
          LivelloContrattuale{
            idServizio
            cdLivelloContrattuale
            livpg
            txLivelloBreve
            txLivelloLungo
          }
        }
      }`,
  ];


  
export const modalitaAssunzioneTCB  = [
  '',
  `query ModalitaAssunzioneByServizioTCB ($idServizio:Int!) {
    ModalitaAssunzioneByServizioTCB (idServizio: $idServizio){
        tl_valore_testuale
        cd_dominio_tcb
      }
    }`,
];


const inserisciModificaRichiestaMutationName = 'InserisciRichiestaServizioTcb';

// export const inserisciRichiestaTCB = (args) => [
//   '',
//   `mutation ${inserisciModificaRichiestaMutationName} (
//     $idUtenteRichiedente: Int!,
//     $arrayConfig: [ArrayConfig]
//     $id_servizio_erogato_ente: Int!
//     $js_impersonificazione: JSON
//   ) {
//     ${inserisciModificaRichiestaMutationName} (
//       input: {
//         id_utente_richiedente: ${args.idUtenteRichiedente},
//         arrayConfig: ${args.arrayConfig}
//         id_servizio_erogato_ente: ${args.id_servizio_erogato_ente}
//         js_impersonificazione: ${jsonNoquotesOnKeys(args.js_impersonificazione)}
//       }
//     )
//   }`
//   ];


export const inserisciRichiestaTCB = [
  '',
  `mutation ${inserisciModificaRichiestaMutationName} (
    $idUtenteRichiedente: Int!,
    $arrayConfig: [ArrayConfig]
    $id_servizio_erogato_ente: Int!
    $js_impersonificazione: InputImpersonificazione
    $tyRichiesta: Int!
  ) {
    ${inserisciModificaRichiestaMutationName} (
      input: {
        id_utente_richiedente: $idUtenteRichiedente,
        arrayConfig: $arrayConfig
        id_servizio_erogato_ente: $id_servizio_erogato_ente
        js_impersonificazione: $js_impersonificazione
        ty_richiesta: $tyRichiesta
      }
    )
  }`
  ];