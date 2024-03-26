import {
  estraiDatiCompetenzeBadanteQuery
} from '../queries/queries';


export const estraiDatiCompetenzeBadante = async (parent, args, context, info) => {
  const { idUtenteLav } = args;
  let altreMansioniColf, altreMansioniBadante, faccendeDomesticheFlag, mansioniBadante = [], mansioniColf = [];

  const [[flag], datiComp] = await context.db.multi(estraiDatiCompetenzeBadanteQuery, { idUtenteLav });
  datiComp.map(el => {
    switch (el.cd_attributo) {
      case '127':
        faccendeDomesticheFlag = el;
        break;
      case '157':
        mansioniBadante.push(el.cd_val_attributo);
        if (el.cd_val_attributo === '0') {
          altreMansioniBadante = el.tx_val;
        };
        break;
      case '158':
        mansioniColf.push(el.cd_val_attributo);
        if (el.cd_val_attributo === '0') {
          altreMansioniColf = el.tx_val;
        };
        break;
      default:
        break;
    }
  });

  return {
    flagCandidatura: flag.value,
    mansioniBadante: mansioniBadante || [],
    altreMansioniBadante: altreMansioniBadante || '',
    faccendeDomestiche: faccendeDomesticheFlag ? faccendeDomesticheFlag.fg_val === '1' ? 1 : 2 : undefined,
    mansioniColf: mansioniColf || [],
    altreMansioniColf: altreMansioniColf || '',
  }
}

