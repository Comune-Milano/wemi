export const estraiFormFieldValues002 = [
  '',
  `query EstraiFormFieldValues002 ($idServizio: Int!) {
    EstraiFormFieldValues002 (idServizio: $idServizio) {
      relazioneFieldValues {
          cdDominioTcb
          tlValoreTestuale
        }
        relazioneFieldValuesTata {
          cdDominioTcb
          tlValoreTestuale
        }
        sessoFieldValues {
          cdDominioTcb
          tlValoreTestuale
        }
        fasciaEtaFieldValues {
          cdDominioTcb
          tlValoreTestuale
        }
        patologieFieldValues {
          cdDominioTcb
          tlValoreTestuale
        }
        altezzaFieldValues {
          cdDominioTcb
          tlValoreTestuale
        }
        corporaturaFieldValues {
          cdDominioTcb
          tlValoreTestuale
        }
        lingueParlateFieldValues {
          cdDominioTcb
          tlValoreTestuale
        }
        linguaItalianaFieldValues {
          cdDominioTcb
          tlValoreTestuale
        }
        deambulazioneFieldValues {
          cdDominioTcb
          tlValoreTestuale
        }
      }
  }`,
  'EstraiFormFieldValues002',
];

export const estraiDatiConfigurazioneRichiesta002 = [
  '',
  `query EstraiDatiConfigurazioneRichiesta002(
    $idRichiestaTcb: Int!,
    $idServizio: Int!
    ) {
      EstraiDatiConfigurazioneRichiesta002(idRichiestaTcb: $idRichiestaTcb, idServizio: $idServizio ) {
      beneficiari {
          pgBen
          relazione {
            cdAttributo
            tlValoreTestuale
            dominioTcb
            cdValAttributo
          }
          altroRelazione
          nomeBen {
            cdAttributo
            txVal
            dominioTcb
            cdValAttributo
          }
          cognomeBen {
            cdAttributo
            txVal
            dominioTcb
            cdValAttributo
          }
          sesso {
            cdAttributo
            tlValoreTestuale
            dominioTcb
            cdValAttributo
          }
          eta {
            cdAttributo
            nrVal
            dominioTcb
            cdValAttributo
          }
          fasciaEta {
            cdAttributo
            tlValoreTestuale
            dominioTcb
            cdValAttributo
          }
          patologieBambino {
            cdAttributo
            tlValoreTestuale
            txNota
            dominioTcb
            cdValAttributo
          }
          patologieAnziano {
            cdAttributo
            tlValoreTestuale
            txNota
            dominioTcb
            cdValAttributo
          }
          altreInfoPatologie {
            cdAttributo
            txVal
            dominioTcb
            cdValAttributo
          }
          deambulazione {
            cdAttributo
            tlValoreTestuale
            dominioTcb
            cdValAttributo
          }
          altroDeambulazione
          altezza{
            cdAttributo
            tlValoreTestuale
            dominioTcb
            cdValAttributo
          }
          corporatura {
            cdAttributo
            tlValoreTestuale
            dominioTcb
            cdValAttributo
          }
          altreInfo{
            cdAttributo
            txVal
            dominioTcb
            cdValAttributo
          }
          lingue{
            cdAttributo
            tlValoreTestuale
            txNota
            dominioTcb
            cdValAttributo
          } 
    }
  altriFratelliFlag{
    cdAttributo
    flag    
    cdValAttributo
  }
  altriFlag{
    cdAttributo
    txNota
    flag    
    cdValAttributo
  }
  nonniFlag{
    cdAttributo
    flag    
    cdValAttributo
  }  
}
}`,
  'EstraiDatiConfigurazioneRichiesta002',
];

const jsonNoquotesOnKeys = (obj) => {
  if (typeof obj === 'object') { obj = JSON.stringify(obj); }
  obj = obj.replace(/"(\w+)"\s*:/g, '$1:');
  return obj;
};

export const inserisciModificaAttributoBeneficiarioTCB = [
  '',
  `mutation InserisciModificaAttributoBeneficiarioTCB($input: AttributoBeneficiarioInput!){
    InserisciModificaAttributoBeneficiarioTCB(
    input: $input
    )
  }`,
  'InserisciModificaAttributoBeneficiarioTCB',
];

export const inserisciModificaDatiRichiesta002 = [
  '',
  `mutation InserisciModificaAttributo($input: AttributoInput!){
    InserisciModificaAttributo(
    input: $input
    )
  }`,
  'InserisciModificaAttributo',
];

export const inserisciBeneficiarioTCB = [
  '',
  `mutation InserisciBeneficiarioTCB($idRichiestaTcb: Int!, $pgBen: Int!){
    InserisciBeneficiarioTCB(
        idRichiestaTcb: $idRichiestaTcb,
        pgBen: $pgBen
        )
    }`,
  'InserisciBeneficiarioTCB',
];

export const eliminaBeneficiarioTCB = [
  '',
  `mutation EliminaBeneficiarioTCB($idRichiestaTcb: Int!, $pgBen: Int!) {
    EliminaBeneficiarioTCB(
      idRichiestaTcb: $idRichiestaTcb,
      pgBen: $pgBen
      )
    }`,
];

export const modificaFasciaEtaBeneficiarioTCB = [
  '',
  `mutation ModificaFasciaEtaBeneficiarioTCB($idRichiestaTcb: Int!, $pgBen: Int!, $fasciaEta: ArrayConfig!) {
    ModificaFasciaEtaBeneficiarioTCB(
      idRichiestaTcb: $idRichiestaTcb,
      pgBen: $pgBen,
      fasciaEta: $fasciaEta,
      )
    }`,
];
