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
const estraitipologiaContrattoQueryName = 'EstraiTipologiaContratto';

export const getConfiguration = [
  '',
  `query ${queryName}($idServizio: Int!, $annoRiferimento: Int!){
    livelliContrattuali: ${estraiLivelliQueryName}(
      idServizio: $idServizio
    ) {
        nr_anno_rif
        cd_categoria_contrattuale
        cd_tipo_orario_lavoro
        im_importo_contributo
        paga_minima_contrattuale
        im_importo_indennita
        im_importo_indennita_tata
        im_importo_indennita_badante
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
    tipologiaContratto: ${estraitipologiaContrattoQueryName}{
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
    maxOre: EstraiMaxOre {
      cd_dominio_tcb
      tl_valore_testuale
      nr_valore_max_rif
    }
  }
  `,
];

const estraiContributoQueryName = 'EstraiContributi';

export const getContributi = [
  '',
  `query ${estraiContributoQueryName} ($input: ContributiInput!) {
    ${estraiContributoQueryName} (input: $input) {
      tyContributoTcb
      contributoSicuaf
      contributoOrarioDipendente
    }
  }`,
  estraiContributoQueryName,
]
