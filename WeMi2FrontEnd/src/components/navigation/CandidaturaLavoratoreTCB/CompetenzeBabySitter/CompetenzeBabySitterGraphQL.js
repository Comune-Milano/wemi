/** @format */


export const estraiMansioniTata = [
  '',
  `query EstraiMansioniTataCandidatura {
        EstraiMansioniTataCandidatura {
          tyDominioTcb
          cdDominioTcb
          pgVisualizzazione
          txTitoloMansione
        }
      }
  `,
  'EstraiMansioniTataCandidatura',
];


export const estraiFasceEta = [
  '',
  `query EstraiFasciaEta {
        EstraiFasciaEta{
          tyDominioTcb
          cdDominioTcb
          pgVisualizzazione
          tlValoreTestuale
        }
      }
  `,
  'EstraiFasciaEta',
];


export const estraiMansioniColf = [
  '',
  `query EstraiMansioniColf {
        EstraiMansioniColf {
          tyDominioTcb
          cdDominioTcb
          pgVisualizzazione
          txTitoloMansione
          }
        }
  `,
  'EstraiMansioniColf',
];

export const estraiMansioniBadante = [
  '',
  `query EstraiMansioniBadante {
        EstraiMansioniBadante {
          tyDominioTcb
          cdDominioTcb
          pgVisualizzazione
          txTitoloMansione
        }
      }
  `,
  'EstraiMansioniBadante',
];

export const estraiDatiCompetenzeTata = [
  '',
  `query estraiDatiCompetenzeTata ($idUtenteLav: Int!) {
    estraiDatiCompetenzeTata (idUtenteLav: $idUtenteLav) {
      flagCandidatura
      mansioniColf 
      altreMansioniColf
      faccendeDomestiche
      mansioniTata {
        idMans
        fasceEtaSelezionate
      }
      terapieFlag
      terapieSpecificate
      altroFlag
      altreMansioniTata
    }
  }
  `,
  'estraiDatiCompetenzeTata',
];
