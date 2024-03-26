
export const estraiDatiAnagraficiFormFieldsValues = [
  '',
  `query EstraiDatiAnagraficiFormFieldsValues {
    EstraiDatiAnagraficiFormFieldsValues {
        sessoFieldValues {
          tyDominioTcb
          cdDominioTcb
          pgVisualizzazione
          tlValoreTestuale
        }
        statoNascitaFieldValues {
          tyDominioTcb
          cdDominioTcb
          pgVisualizzazione
          tlValoreTestuale
        }
      }
  }`,
  'EstraiDatiAnagraficiFormFieldsValues',
];

export const estraiValAttributiUtente = [
  '',
  `query EstraiValAttributiUtente($idUtente: Int!, $arrayCdAttr: [Int]) {
    EstraiValAttributiUtente(
      idUtente: $idUtente,
      arrayCdAttr: $arrayCdAttr
    ) {
      idUtente
      cdAttributo
      cdValAttributo
      txVal
      txVal
      dtVal
      txNota
      txNotaOp
      fgVal
      tsModifica
      tsCreazione
    }
  }`,
  'EstraiValAttributiUtente',
];

export const inserisciModificaAttributoUtente = [
  '',
  `mutation InserisciModificaAttributoUtente($input: AttributoUtenteInput!){
    InserisciModificaAttributoUtente(
    input: $input
    )
  }`,
  'InserisciModificaAttributoUtente',
];
