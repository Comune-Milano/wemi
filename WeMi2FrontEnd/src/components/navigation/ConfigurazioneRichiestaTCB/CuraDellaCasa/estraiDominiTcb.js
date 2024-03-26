/** @format */

  export const estraiBase = [
    '',
    `{
      EstraiMansioniColf {
        tyDominioTcb
        cdDominioTcb
        pgVisualizzazione
        txTitoloMansione
      }
      EstraiSuperficieCasa {
        tyDominioTcb
        cdDominioTcb
        pgVisualizzazione
        tlValoreTestuale
      }
      EstraiNumeroStanze {
        tyDominioTcb
        cdDominioTcb
        pgVisualizzazione
        tlValoreTestuale
      }
      EstraiNumeroBagni {
        tyDominioTcb
        cdDominioTcb
        pgVisualizzazione
        tlValoreTestuale
      }
      EstraiCaratteristicheAbitazione {
        tyDominioTcb
        cdDominioTcb
        pgVisualizzazione
        tlValoreTestuale
      }
    }`
    
  ];
  export const estraiMansioniColf = () => [
      '',
      `{
        EstraiMansioniColf {
          tyDominioTcb
          cdDominioTcb
          pgVisualizzazione
          txTitoloMansione
        }
        
      }`
  ];
  
  export const estraiSuperficieCasa = () => [
    '',
    `{
      EstraiSuperficieCasa {
        tyDominioTcb
        cdDominioTcb
        pgVisualizzazione
        tlValoreTestuale
      }
    }`
];

export const estraiNumeroStanze = () => [
  '',
  `{
    EstraiNumeroStanze {
      tyDominioTcb
      cdDominioTcb
      pgVisualizzazione
      tlValoreTestuale
    }
  }`
];

export const estraiNumeroBagni = () => [
  '',
  `{
    EstraiNumeroBagni {
      tyDominioTcb
      cdDominioTcb
      pgVisualizzazione
      tlValoreTestuale
    }
  }`
];


export const estraiCaratteristicheAbitazione = () => [
  '',
  `{
    EstraiCaratteristicheAbitazione {
      tyDominioTcb
      cdDominioTcb
      pgVisualizzazione
      tlValoreTestuale
    }
  }`
];


export const estraiDatiConfigurazioneRichiesta004 = [
'', 
`query EstraiDatiConfigurazioneRichiesta004($idRichiestaTcb: Int!) {
EstraiDatiConfigurazioneRichiesta004(idRichiestaTcb: $idRichiestaTcb ){
  idRichiestaTcb
  superficieCasa {
    tlValoreTestuale
    cdAttributo
    dominioTcb
    cdValAttributo
    tsModifica
    tsCreazione    
  }
  numeroStanze{
    tlValoreTestuale
    cdAttributo
    dominioTcb
    cdValAttributo
    tsModifica
    tsCreazione    
  }
  numeroBagni{
    tlValoreTestuale
    cdAttributo
    dominioTcb
    cdValAttributo
    tsModifica
    tsCreazione    
  }
  abitazione{
    tlValoreTestuale
    cdAttributo
    dominioTcb
    cdValAttributo
    tsModifica
    tsCreazione    
  }
  piano {
    cdAttributo
    txVal
    dominioTcb
    cdValAttributo
    tsModifica
    tsCreazione    
  }
fumatoriFlag {
  cdAttributo
  flag
  dominioTcb
  cdValAttributo
  tsModifica
   tsCreazione
}
flagCasa{
  cdAttributo
  flag
  dominioTcb
  cdValAttributo
  tsModifica
   tsCreazione
}
  ascensoreFlag{
  cdAttributo
  flag
  dominioTcb
  cdValAttributo
  tsModifica
   tsCreazione
}
  terrazzaFlag{
  cdAttributo
  flag
  dominioTcb
  cdValAttributo
  tsModifica
   tsCreazione
}
  giardinoFlag{
  cdAttributo
  flag
  nrVal
  dominioTcb
  cdValAttributo
  tsModifica
   tsCreazione
}
  
  mansioni {
    txTitoloMansione
    cdDominioTcb
    tyDominioTcb
  }
  altroValue
  
}
}`,
'EstraiDatiConfigurazioneRichiesta004'
]