export const EstraiRecensioneTCB = [
  '',
  `query EstraiRecensioneTCB($id_rich_serv_rec: Int!){
        EstraiRecensioneTCB(
            id_rich_serv_rec: $id_rich_serv_rec
        ){
  id_rich_serv_rec
  qt_media_singola_recensione
  js_dati_recensione
  js_dati_recensione_wemi
  ts_creazione
  cd_stato_rec
  cd_stato_rec_wemi
        }
    }`,
  'EstraiRecensioneTCB',
];
