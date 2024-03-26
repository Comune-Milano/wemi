export const inserisciFeedbackServizioEnte = (myJSON) => [
    '',
     `
     mutation {
      inserisciFeedbackServizioEnte (input: {
        id_rich_serv_rec: ${myJSON.id_rich_serv_rec}
        qt_media_singola_recensione:${myJSON.qt_media_singola_recensione}
        js_dati_recensione:{
          qtVelocita: ${myJSON.qtVelocita}
          qtCortesia: ${myJSON.qtCortesia}
          qtPuntualita: ${myJSON.qtPuntualita}
          txNotaRecensione: "${myJSON.txNotaRecensione}"
        }
      })
    }
     `,
  ];