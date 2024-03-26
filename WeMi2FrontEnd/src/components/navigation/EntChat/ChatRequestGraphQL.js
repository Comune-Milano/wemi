/** @format */
export const sendMessage = args => [
    'sendMessage',
`mutation{
        sendMessage(
          
          input:{ id_richiesta_servizio_ente: ${args.id_richiesta_servizio_ente},
            tx_testo_messaggio:"${args.tx_testo_messaggio}"  
          }
        ){
          id_richiesta_servizio_ente
        }
      }`
  ];

  export const retrieveMessages = idRichiesta => [
    'messaggiUtenteEnte',
 ` 
 { 
    retrieveMessages(id_richiesta_servizio:${idRichiesta}){
      id_richiesta_servizio_ente
      tx_testo_messaggio 
      fg_msg_ente
      id_utente_autore_msg
      ts_creazione
    }
}
        
      `
  ]

export const disattivaChat = idRichiestaEnte =>[
  'disattivaChat',
  `
  mutation{
    DisattivaChatRichiestaServizioEnte(idRichiestaEnte: ${idRichiestaEnte})
  } 
  `
]



export const scambiaInformazioni = args => 
   [
  'scambiaInformazioni',
`mutation{
  updateStatoChat(idRichiestaEnte:${args.idRichiestaEnte}, statoChat:"${args.statoChat}", previousState: "${args.previousState}")
}`
];


export const allegaPreventivo = args =>[
  'allegaPreventivo', 
 `
  mutation{
    AllegaFileRichiestaServizioEnte(idRichiestaEnte:${args.idRichiestaEnte}, media:{
      ty_mime_type_media: "${args.tymedia}",
      nm_nome_media:"${args.nmMedia}",
      oj_media: "${args.ojMedia}"
    })
  }
  `
]
