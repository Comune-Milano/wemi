/** @format */
const jsonNoquotesOnKeys = (obj) => {
  if (typeof obj === 'object') obj = JSON.stringify(obj);
  obj = obj.replace(/"(\w+)"\s*:/g, '$1:');
  return obj;
};

export const EstraiServizioErogatoEnte004 = (id) => [
  '',
  `{
      EstraiServizioErogatoEnte004(id_ente:${id}){
              id_servizio_ente
              id_servizio_riferimento
              pg_versione
              nm_ente
              cat_accreditamento
              serv_offerto
              ts_creazione
              ts_variazione_stato
              cd_stato_dati_servizio_ente
              cd_stato_dati_servizio_ente_desc
              id_utente
      }
      }`,
];

export const EstraiListaEnte = (status) => [
  '',
  `{
      EstraiListaEnte{
        id_ente
        nm_ente
      }
    }`,
];


export const EstraiDettaglioAmministrativoServizioEnte = (id_servizio, id) => [
  'EstraiDettaglioAmministrativoServizioEnte',
  `{
      dFasciaOrariaAll{
        id_periodo
        tl_valore_testuale
      }
      EstraiSostegniEconomiciPubblicati{
        idSostegno
        txSostegno
      }
      municipioAll{
        idMunicipio
        nmMunicipio
      }
      mansioneAll{
        idMansione
        txTitoloMansione
      }
      mansioniPubblicate(id_servizio_ente:${id_servizio}){
        idMansione
        txTitoloMansione
        nrOrdineVisualizzazione
       }
      destinatari{
        idDestinatario
        txDestinatario
        destinatariSecondoLivello{
          idDestinatario
          txDestinatario
          idDestinatarioPrimoLivello
        }
      }
      destinatariServizio(id_servizio:${id_servizio}){
        idDestinatario
        txDestinatario
        destinatariSecondoLivello{
          idDestinatario
          txDestinatario
          idDestinatarioPrimoLivello
        }
      }
      EstraiServizioErogatoEnte004(id_ente:${id}){
        cd_stato_dati_servizio_ente
        id_servizio_ente,
        id_servizio_riferimento

      }
      entePK(id_ente:${id}){
        cd_stato_ente
        datiEnte{
          sedeEnte{
            id_sede
            js_sede
          }
        }
      }
      contenutoPerQualifiche{
        tl_testo_1
        id_contenuto
      }
      EstraiDettaglioAmministrativoServizioEnte(id_servizio_ente:${id_servizio}){
        fg_0_18_anni
        is_018
        sliderImg
        nm_descrittore_movimento
        nm_descrittore_relazioni
        nm_descrittore_competenze
        nm_descrittore_creativita
        nm_descrittore_autodeterm
        qualifiche_interne
        qualifiche_esterne
        tl_procedura_attivazione 
        tx_note_al_prezzo
        nomeServizio
        ulterioriInformazioni
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
        im_prezzo_minimo
        im_prezzo_minimo_offerta_calc
        js_note_adminwemi_su_servizio
        tl_descrizione_serv_erog_ente
        id_servizio_ente
        qt_min_pers
        cd_modalita_erogazione
        qt_max_pers
        sediErogatrici{
          js_sede
          id_sede
          fg_accompagnamento_sede
        }
      dt_inizio_val_offerta_prezzo
      dt_fine_val_offerta_prezzo
      dt_inizio_erog_serv
      dt_fine_erog_serv
      tx_altre_mansioni
      tx_altra_sede
      fg_accompagnamento_altra_sede
      qt_tempo_max_attivazione
      js_info_personale
      cd_tipo_offerta_srv
      cd_tipo_servizio_erog
      listaSostegniEconomiciSupportati{
        idSostegno
        txSostegno
      }
      listaMunicipiServiti{
        idMunicipio
        nmMunicipio
      }
      listaMansioniSvolte{
        idMansione
        txTitoloMansione
        order
        nrOrdineVisualizzazione
      }
      listaPeriodiErogazione{
        id_periodo
        tl_valore_testuale
      }
      service{
        txDescrizioneServizio
        txTitoloServizio
        tl_testo_aggettivo
        prezzo {
          cd_unita_prezzo
          tl_testo_sostantivo
          tl_testo_aggettivo
        }
      id_servizio
        categoriaAccreditamentoServizio{
          txTitoloCategoria
        }
        
      }
        ente{
          nm_ente
          id_ente
          nm_ente_completo
          datiEnte{
            note_per_cittadino
            js_primo_contatto
            js_altre_info
            js_note_adminwemi
            js_referente
          }
        }
      listaDestinatariPrimoLivello{
        idDestinatario
        txDestinatario
        destinatariSecondoLivello{
          idDestinatario
          idDestinatarioPrimoLivello
          txDestinatario
        }
      }
      listaDestinatariSecondoLivello{
        idDestinatario
        txDestinatario
        idDestinatarioPrimoLivello
      }
      }
    }`,
];

export const InserisciServizioEnte004 = (servizi, ente) => [
  '',
  `mutation{InserisciServizioEnte004(input:{id_servizio_riferimento:[${servizi}],id_ente_erogatore:${ente}})}`,
];


export const InserisciDatiServizioEnte = (MYJSON) => [
  '',
  `mutation{InserisciDatiServizioEnte(input:{
 id_ente:${MYJSON.id_ente}
 id_destinatario_liv1:${jsonNoquotesOnKeys(MYJSON.id_destinatario_liv1)},
 id_servizio_ente:${MYJSON.id_servizio_ente},
 id_destinatario_liv2:${jsonNoquotesOnKeys(MYJSON.id_destinatario_liv2)},
 js_primo_contatto:${jsonNoquotesOnKeys(MYJSON.js_primo_contatto)},
 js_info_personale:${jsonNoquotesOnKeys(MYJSON.js_info_personale)},
id_mansione:${jsonNoquotesOnKeys(MYJSON.id_mansione)},
${MYJSON.dt_inizio_erog_serv === null ? `dt_inizio_erog_serv:${null},` : 'dt_inizio_erog_serv:' + `"${MYJSON.dt_inizio_erog_serv}"` + ','}
${MYJSON.dt_fine_erog_serv === null ? `dt_fine_erog_serv:${null},` : 'dt_fine_erog_serv:' + `"${MYJSON.dt_fine_erog_serv}"` + ','}
tx_altre_mansioni:"${MYJSON.tx_altre_mansioni}",
${MYJSON.qt_tempo_max_attivazione ? `qt_tempo_max_attivazione:${MYJSON.qt_tempo_max_attivazione},` : ''},
cd_municipio_servito:${jsonNoquotesOnKeys(MYJSON.cd_municipio_servito)},
cd_fascia_oraria_erog_srv_ente:${jsonNoquotesOnKeys(MYJSON.cd_fascia_oraria_erog_srv_ente)},
${(MYJSON.id_sede_erogazione_srv != []) || MYJSON.id_sede_erogazione_srv.length > 0 ? `id_sede_erogazione_srv:${MYJSON.id_sede_erogazione_srv},` : ''}
cd_tipo_offerta_srv:${MYJSON.cd_tipo_offerta_srv},
cd_tipo_servizio_erog:${MYJSON.cd_tipo_servizio_erog},
tx_altra_sede:${MYJSON.tx_altra_sede ? `"${MYJSON.tx_altra_sede}"` : MYJSON.tx_altra_sede},
id_contenuto_sostegno_econ:${jsonNoquotesOnKeys(MYJSON.id_contenuto_sostegno_econ)},
js_dati_prezzo:${jsonNoquotesOnKeys(MYJSON.js_dati_prezzo)},
cd_stato_dati_servizio_ente:${MYJSON.cd_stato_dati_servizio_ente},
${MYJSON.js_note_adminwemi_su_servizio ? `js_note_adminwemi_su_servizio:${jsonNoquotesOnKeys(MYJSON.js_note_adminwemi_su_servizio)},` : ''}
})} `,
];


export const InoltraCompilazioneEnte = (MYJSON) => [
  '',
  `mutation{InoltraCompilazioneEnte(input:{
   id_servizio_ente:${MYJSON.id_servizio_ente},
   cd_stato_dati_servizio_ente:${MYJSON.cd_stato_dati_servizio_ente},
   id_utente:${MYJSON.id_utente},
   ${MYJSON.js_note_adminwemi_su_servizio ? `js_note_adminwemi_su_servizio:${jsonNoquotesOnKeys(MYJSON.js_note_adminwemi_su_servizio)},` : ''}
 })}`,
];
