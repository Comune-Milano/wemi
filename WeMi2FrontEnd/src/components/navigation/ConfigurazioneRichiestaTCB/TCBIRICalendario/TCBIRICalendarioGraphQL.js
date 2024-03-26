const jsonNoquotesOnKeys = (obj) => {
    if (typeof obj === "object")
        obj = JSON.stringify(obj);
    obj=obj.replace(/"(\w+)"\s*:/g, '$1:');
    return obj;
    }

export const EstraiFasciaOrariaSettimanale = (nrOreRichieste)=>
['FasciaOrariaSettimanale',
`{
    EstraiFasciaOrariaSettimanale(nrOreRichieste:${nrOreRichieste}){
      idOrario
      txOrario
    }
  }  `];

export const EstraiDatiDisponibilita = (args) =>[
    'EstraiDatiDisponibilita'
    ,
`  {
        EstraiDatiConfigurazioneRichiestaDisponibilita(
                    datiDisponibilita:{
            
            idRichiestaTcb:${args.idRichiesta},
            
            arrayConfig:${jsonNoquotesOnKeys(args.arrayConfig)}
                    }){
            idRichiestaTcb
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
          calendarioTCB
        }
        
          
        }
        }`
          ]

  export const InserisciDatiDisponibilita = (args)=>
['InsertDatiDisponibilita',
`
mutation{
    InserisciDatiDisponibilita(input:{
          idRichiestaTcb:${args.idRichiesta},
         arrayConfig:${jsonNoquotesOnKeys(args.arrayConfig)}
    })
  }
`
]

export const estraiInformazioniDisponibilita = () => [
    'infoDisponibilita',
    `{
        EstraiSpaziPrevisti{
            idSpazioPrevisto
            txSpazioPrevisto
        }
        tipoOrarioLavoroAll{
            cd_dominio_tcb
            tl_valore_testuale
        }
        EstraiSistemazione{
            idSistemazione
            txSistemazione
        }
        EstraiTipologiaContratto{
            idContratto
            txContratto
        }
        EstraiGiorniSettimana{
            idGiorno
            txGiorno
        }
        EstraiFasceStipendio{
            idStipendio
            valStipendio
        }
     
    }`
];