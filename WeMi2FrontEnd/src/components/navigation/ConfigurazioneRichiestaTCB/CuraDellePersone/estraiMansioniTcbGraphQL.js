/** @format */


export const estraiMansioniTata = [
  '',
  `query EstraiMansioniTata{
        EstraiMansioniTata {
          tyDominioTcb
          cdDominioTcb
          pgVisualizzazione
          txTitoloMansione
        }
      }`,
  'EstraiMansioniTata'
];



export const estraiMansioniBadante = [
  '',
  `query EstraiMansioniBadante{
      EstraiMansioniBadante {
        tyDominioTcb
        cdDominioTcb
        pgVisualizzazione
        txTitoloMansione
      }
    }`,
  'EstraiMansioniBadante'
];

export const estraiFasciaEta = [
  '',
  `query EstraiFasciaEta{
    EstraiFasciaEta {
        tyDominioTcb
        cdDominioTcb
        tlValoreTestuale
      }
    }`,
  'EstraiFasciaEta'
];

export const estraiFasceEtaRichiesta = (idRequest, cdAttr, locale) => [
  '',
  `{
  EstraiAttributoTCBRichiesta(idRichiestaTcb: ${idRequest},
  cdAttributo: ${cdAttr}, locale: "${locale}") {
    cdAttributo
    tlValoreTestuale
    dominioTcb
    cdValAttributo
  }
}`
];

export const estraiDatiConfigurazioneRichiesta003 = [
  '',
  `query EstraiDatiConfigurazioneRichiesta003($input: DatiConfigurazioneRichiesta003Input) {
    EstraiDatiConfigurazioneRichiesta003(input: $input) {
        idRichiestaTcb
        mansioni {
          tyDominioTcb
          cdDominioTcb
          txTitoloMansione
          txNota
          attributoTcb {
            cdAttributo
            tlValoreTestuale
            dominioTcb
            cdValAttributo   
            }
          arrayBen
          }          
        }
  }`,
  'EstraiDatiConfigurazioneRichiesta003'
];

export const estraiAttributoBeneficiarioTCB = [
  '',
  `query EstraiAttributoBeneficiarioTCB($idRichiestaTcb: Int!, $cdAttributo: Float!) {
  EstraiAttributoBeneficiarioTCB(
    idRichiestaTcb: $idRichiestaTcb,
    cdAttributo: $cdAttributo
  ) {
    pgBen
    txVal
  }
}`,
  'EstraiAttributoBeneficiarioTCB'
];