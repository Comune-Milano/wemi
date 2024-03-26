/** @format */

  
  export const estraiMansioniAnimali = [
      '',
      `{
        EstraiMansioniAnimali {
          tyDominioTcb
          cdDominioTcb
          pgVisualizzazione
          txTitoloMansione
        }
      }`
  ];


  

export const estraiDatiConfigurazioneRichiesta005 = [
  '',
  `
    query EstraiDatiConfigurazioneRichiesta005($idRichiestaTcb: Int!) {
    EstraiDatiConfigurazioneRichiesta005(idRichiestaTcb: $idRichiestaTcb) {
      idRichiestaTcb
      animaliFlag {
        cdAttributo
        flag
        dominioTcb
        cdValAttributo
        tsModifica
      }
      
      altriAnimaliFlag {
        cdAttributo
        flag
        dominioTcb
        cdValAttributo
        tsModifica
        txNota
      }
      numeroCani {
        cdAttributo
        nrVal
        dominioTcb
        cdValAttributo
        tsModifica
      }
      numeroGatti{
        cdAttributo
        nrVal
        dominioTcb
        cdValAttributo
        tsModifica
      }
      dettaglioAnimali {
        cdAttributo
        txVal
        dominioTcb
        cdValAttributo
        tsModifica
      }
      mansioni {
        tyDominioTcb
        cdDominioTcb
        txTitoloMansione
        txNota        
      }
    }
  }
  `,
];