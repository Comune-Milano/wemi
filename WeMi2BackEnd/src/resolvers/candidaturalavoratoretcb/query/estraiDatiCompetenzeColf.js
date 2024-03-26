import {
  estraiDatiCompetenzeColfQuery
} from '../queries/queries';


export const estraiDatiCompetenzeColf =   async (parent, args, context, info) => {
  let altreMansioniColf;
  let mansioniColf = [];
  const { idUtenteLav } = args;
  const [[flag], mansioniColfArr] = await context.db.multi(estraiDatiCompetenzeColfQuery, { idUtenteLav });
  mansioniColf = mansioniColfArr.map(
    mansColf => {
      if (mansColf.cd_val_attributo === '0') {
        altreMansioniColf = mansColf.tx_val;
      }; return mansColf.cd_val_attributo
    }
  );
  return {
    flagCandidatura: flag.value,
    mansioniColf: mansioniColf,
    altreMansioniColf: altreMansioniColf,
  }
}