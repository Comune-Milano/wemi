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

export const estraiDatiCompetenzeColf = [
  '',
  `query estraiDatiCompetenzeColf ($idUtenteLav: Int!) {
    estraiDatiCompetenzeColf (idUtenteLav: $idUtenteLav) {
      flagCandidatura
      mansioniColf 
      altreMansioniColf
    }
  }
  `,
  'estraiDatiCompetenzeColf',
];
