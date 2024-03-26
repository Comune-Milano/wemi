export const simulatoreCosto = args => ['simulatoreCosto',
` 
{
    EstraiIndennita(annoRiferimento: ${args.annoRiferimento}){
        annoRiferimento
        indennitaPranzo
        indennitaCena
        indennitaAlloggio
      }
    EstraiContributo(input:{TBO:${args.tbo}, oreSettimanali:${args.ore}}){
        contributoNocuaf
      }
    estraiConfigurazioniLivelliContrattuali(idServizio:${args.idServizio}){
        cd_categoria_contrattuale
        cd_tipo_orario_lavoro
        im_importo_contributo
        paga_minima_contrattuale
        im_importo_indennita
      }
    tipoOrarioLavoroAll{
        cd_dominio_tcb
        tl_valore_testuale
    }
}
`]

const queryName = 'configurazioni';
const estraiLivelliQueryName = 'estraiConfigurazioniLivelliContrattuali';
const estraiOrariQueryName = 'TipologiaOrarioByServizioTCB';
const EstraiIndennitaQueryName = 'EstraiIndennita';

export const getConfiguration = [
  '',
  `query ${queryName}($idServizio: Int!, $annoRiferimento: Int!){
    livelliContrattuali: ${estraiLivelliQueryName}(
      idServizio: $idServizio
    ) {
      cd_categoria_contrattuale
      cd_tipo_orario_lavoro
      im_importo_contributo
      paga_minima_contrattuale
      im_importo_indennita
      LivelloContrattuale {
        idServizio
        cdLivelloContrattuale
        livpg
        txLivelloBreve
        txLivelloLungo
      }
    }
    orari: ${estraiOrariQueryName} (
      idServizio: $idServizio
    ) {
      cd_dominio_tcb
      tl_valore_testuale
    }
    indennita: ${EstraiIndennitaQueryName}(
      annoRiferimento: $annoRiferimento
    ){
      annoRiferimento
      indennitaPranzo
      indennitaCena
      indennitaAlloggio
    } 
  }
  `,
];

const estraiContributoQueryName = 'EstraiContributo';

export const getContributo = [
  '',
  `query ${estraiContributoQueryName} ($tariffa: Float!, $oreSettimanali: Int!) {
    data: ${estraiContributoQueryName} (
      input:{
        TBO: $tariffa,
        oreSettimanali: $oreSettimanali
      }
    ) {
      contributoSicuaf
    }
  }`,
]
