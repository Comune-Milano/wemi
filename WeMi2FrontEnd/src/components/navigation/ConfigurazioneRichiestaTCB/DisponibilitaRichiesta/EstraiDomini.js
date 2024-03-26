export const tipoOrarioTCB = () => [
  '',
  `{
        tipoOrarioLavoroAll {
        ty_dominio_tcb
        tl_valore_testuale
        cd_dominio_tcb
        pg_visualizzazione
      }
    }`,
];


export const estraiLivelliContrattuali = (idServizio) => [
  '',
  `{
      estraiConfigurazioniLivelliContrattuali(idServizio: ${idServizio}) {
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


export const estraiInformazioniDisponibilita = [
  '',
  `query ($idServizio: Int! ){
        EstraiMaxOre {
          cd_dominio_tcb
          tl_valore_testuale
          nr_valore_max_rif
        }
        EstraiSpaziPrevisti {
          cd_dominio_tcb
          tl_valore_testuale
        }
        tipoOrarioLavoroAll: TipologiaOrarioByServizioTCB (idServizio: $idServizio) {
          cd_dominio_tcb
          tl_valore_testuale
        }
        EstraiSistemazione{
          cd_dominio_tcb
          tl_valore_testuale
        }
        EstraiTipologiaContratto{
          cd_dominio_tcb
          tl_valore_testuale
        }
        EstraiGiorniSettimana {
          cd_dominio_tcb
          tl_valore_testuale
        }
        EstraiFasceStipendioConvivente {
          cd_dominio_tcb
          tl_valore_testuale
      }
        EstraiFasceStipendioNonConvivente {
                  cd_dominio_tcb
                  tl_valore_testuale
              }
        EstraiFasceStipendioConvivenzaRidotta {
                  cd_dominio_tcb
                  tl_valore_testuale
              }
        EstraiFasceStipendioPresenzaNotturna {
                  cd_dominio_tcb
                  tl_valore_testuale
              }
        EstraiFasceStipendioAssistenzaNotturna {
                  cd_dominio_tcb
                  tl_valore_testuale
              }
        EstraiFasceStipendioWeekend {
                  cd_dominio_tcb
                  tl_valore_testuale
              }
  }`
];


export const estraiDatiDisponibilita = [
  ''
  ,
  `  
  query EstraiDatiConfigurazioneRichiestaDisponibilita (
   $datiDisponibilita: DatiReferenzaLavoratore!
  ) {
      EstraiDatiConfigurazioneRichiestaDisponibilita(
      datiDisponibilita: $datiDisponibilita
    ){
          idRichiestaTcb
          calendarioTCB
       disponibilita{
        cd_attributo
        cd_val_attributo
        tx_val
        dt_val
        tx_nota
        tx_nota_op
        nr_val
        fg_val
        fg_mansione_svolta
        tl_valore_testuale
        dc_val
      }
  }
      }`,
  'EstraiDatiConfigurazioneRichiestaDisponibilita'
];

export const InserisciDatiDisponibilita = [
  '',
  `
mutation InserisciModificaAttributo ($input: AttributoInput!){
  InserisciModificaAttributo(
      input: $input
    )
  }
`,
  'InserisciModificaAttributo'
];


export const estraiEtaBeneficiari = [
  '',
  `query EstraiEtaBeneficiari(
    $idRichiestaTcb: Int!,
    ) {
      EstraiEtaBeneficiari(idRichiestaTcb: $idRichiestaTcb) {
        eta
    }
  }`,
  'EstraiEtaBeneficiari'
];

export const estraiDati = [
  ''
  ,
  `  
  query ($idRichiestaTcb: Int!, $datiDisponibilita: DatiReferenzaLavoratore!, $idServizio: Int!){
        EstraiEtaBeneficiari(idRichiestaTcb: $idRichiestaTcb) {
          nrVal
      }
         EstraiDatiConfigurazioneRichiestaDisponibilita(
         datiDisponibilita: $datiDisponibilita
       ){
             idRichiestaTcb
             calendarioTCB
          disponibilita{
           cd_attributo
           cd_val_attributo
           tx_val
           dt_val
           tx_nota
           tx_nota_op
           nr_val
           fg_val
           fg_mansione_svolta
           tl_valore_testuale
           dc_val
         }
     }
     EstraiMaxOre {
      cd_dominio_tcb
      tl_valore_testuale
      nr_valore_max_rif
    }
    EstraiSpaziPrevisti {
      cd_dominio_tcb
      tl_valore_testuale
    }
    tipoOrarioLavoroAll: TipologiaOrarioByServizioTCB (idServizio: $idServizio) {
      cd_dominio_tcb
      tl_valore_testuale
    }
    EstraiSistemazione{
      cd_dominio_tcb
      tl_valore_testuale
    }
    EstraiTipologiaContratto{
      cd_dominio_tcb
      tl_valore_testuale
    }
    EstraiGiorniSettimana {
      cd_dominio_tcb
      tl_valore_testuale
    }
    EstraiFasceStipendioConvivente {
      cd_dominio_tcb
      tl_valore_testuale
  }
    EstraiFasceStipendioNonConvivente {
              cd_dominio_tcb
              tl_valore_testuale
          }
    EstraiFasceStipendioConvivenzaRidotta {
              cd_dominio_tcb
              tl_valore_testuale
          }
    EstraiFasceStipendioPresenzaNotturna {
              cd_dominio_tcb
              tl_valore_testuale
          }
    EstraiFasceStipendioAssistenzaNotturna {
              cd_dominio_tcb
              tl_valore_testuale
          }
    EstraiFasceStipendioWeekend {
              cd_dominio_tcb
              tl_valore_testuale
          }
    } 
     `,
];