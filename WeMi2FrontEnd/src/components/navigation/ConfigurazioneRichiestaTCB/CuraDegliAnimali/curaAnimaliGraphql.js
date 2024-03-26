/** @format */

export const mansioni = (IdTy) => [
    '',
    `{
        dominioTcbByTipoTcb(ty_dominio_tcb:${IdTy}){
            value,
            textValue
      }
    }`,
  ];

  export const estraiDatiRichiestaVoceMenu2 = (id) => [
    '',
    `{
      estraiDatiRichiestaVoceMenu2(idRichiestaTcb:${id}){
        cdAttributo,
        cdValAttributo,
        dominioTcb,
        tx_nota,
        fg_mansione_svolta
      }
    }`,
  ];

  export const InserisciDatiRichiestaVoceMenu2 = (id, cod, text, tx, mansione) => [
    '',
    `mutation{
      InserisciDatiRichiestaVoceMenu2(
        input:{
          id_richiesta_servizio_tcb:${id},
          cd_attributo: ${cod},
          tx_val: "${text}",
          tx_nota: "${tx}",
          fg_mansione_svolta:${mansione}
        })
    }`,
  ];