/** @format */

export const mutationAddService = [
  'ServizioBaseAdd',
  `mutation InserisciModificaRichiestaServizioEnte ($input: ServizioBaseInput!){
      InserisciModificaRichiestaServizioEnte (input: $input )
    }`,
    ''
];

export const getIdMax = () => [
  '',
  `{
     getMaxServizioEnte{
      max_servizio_ente
    }
  }`,
];

export const getListiniPrezzi = [
  '',
  `
  query($idServiziEnte: [Int]!) {
    listiniPrezzi(
      idServiziEnte: $idServiziEnte
    ) {
      cdTipoOffertaServizio
      cdTipoServizioErog
      dataInizio
      dataFine
      idServizioEnte
      qtMinimaUnita
      listinoPrezzi {
        qtPersoneDa
        qtPersoneA
        offerta {
          qtUnitaDa
          qtUnitaA
          valore
        }
      }
    }
  }
  `,
  'listiniPrezzi',
]
