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

export const estraiDatiCompetenzeBadante = [
  '',
  `query estraiDatiCompetenzeBadante ($idUtenteLav: Int!) {
    estraiDatiCompetenzeBadante (idUtenteLav: $idUtenteLav) {
      flagCandidatura
      mansioniBadante
      altreMansioniBadante
      faccendeDomestiche
      mansioniColf 
      altreMansioniColf
    }
  }
  `,
  'estraiDatiCompetenzeBadante',
];
