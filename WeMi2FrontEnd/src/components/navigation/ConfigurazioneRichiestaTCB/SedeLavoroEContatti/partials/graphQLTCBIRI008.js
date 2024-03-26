export const EstraiDatiSede = () => [
  'EstraiDatiSede',
  `{
        EstraiSessoBeneficiario{
          cdDominioTcb
          tlValoreTestuale
        }
        municipioAll{
          idMunicipio
          nmMunicipio
        }
        dominioTcbByTipoTcb(ty_dominio_tcb:25){
          value
          textValue
        }
      }`,
];

export const EstraiStatoNascia= [
  ``,
  ` { 
    EstraiStatoNascita{
        cdDominioTcb
        tlValoreTestuale
        pgVisualizzazione
       }
   }`,
   ``
]

export const EstraiInfoUtente = [
  '',
  `query datiUtente ($idUtente : Int!)
    {
        datiUtente(idUtente: $idUtente)
      }`,
  
];

const jsonNoquotesOnKeys = (obj) => {
  if (typeof obj === "object")
    obj = JSON.stringify(obj);
  obj = obj.replace(/"(\w+)"\s*:/g, '$1:');
  return obj;
}


export const inserisciModificaDatiRichiesta008 = [
  '',
  `mutation InserisciModificaAttributo ($input: AttributoInput!)
  {
     InserisciModificaAttributo(input: $input )
   }`
];

export const estraiDatiRichiesta008 = [
  '',
  `
    query EstraiDatiConfigurazioneRichiesta008 ( $datiRichiesta : DatiRichiesta!)
  {
    EstraiDatiConfigurazioneRichiesta008 ( datiRichiesta: $datiRichiesta )
    {
      cd_attributo
      cd_val_attributo
      tx_val
      dt_val
      tx_nota
      nr_val
      fg_val
    }
  }
`,
'EstraiDatiConfigurazioneRichiesta008'
];

export const cercaVia=[
  '',
  `
    query cercaVia ( $via : String!)
  {
    cercaVia ( via: $via )
    {
      pointX
  pointY
    }
  }
`,
'cercaVia'
]

export const cercaMunicipio= [
  '',
  `
    query cercaMunicipio ( $coordinate: Coordinate! )
  {
    cercaMunicipio ( coordinate: $coordinate )
    {
      idMunicipio
      nmMunicipio
    }
  }
`,
'cercaMunicipio'
]