/** @format */

  
  export const estraiMansioniAnimali = () => [
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


  

export const estraiDatiConfigurazioneRichiesta009 = (id) => [
  '',
  `{
    EstraiDatiConfigurazioneRichiesta009(idRichiestaTcb: ${id}) {
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
        
      }
    }
  }`,
];