
import {
  estrai0016,
  delete0016,
  insert0016
} from '../queries/queries';

export const inserisciDati0016 =  async (parent, args, context) => {
  const risultatoSelect = await context.db.any(estrai0016, args.input);
  let controlloPatologieGeneriche = false;
  let controlloPatologieAnziani = false;
  const arrDaEliminare = [];
  risultatoSelect.forEach((ele) => {
    // TODO: Remove "parseInt"
    if (parseInt(ele.cd_attributo) === parseInt(args.input.cdAttributoPatologieGeneriche) && !controlloPatologieGeneriche) {
      arrDaEliminare.push(args.input.cdAttributoPatologieGeneriche);
      controlloPatologieGeneriche = true;
    }
    // TODO: Remove "parseInt"
    if ( parseInt(ele.cd_attributo) === parseInt(args.input.cdAttributoPatologieAnziani) && !controlloPatologieAnziani) {
      arrDaEliminare.push(args.input.cdAttributoPatologieAnziani);
      controlloPatologieAnziani = true;
    }
  })

  if (arrDaEliminare.length > 0) {
    await context.db.oneOrNone(delete0016, { idUtente: args.input.idUtente, cdAttributo: arrDaEliminare, servizioRiferimento: args.input.servizioRiferimento });
  }

  if (args.input.patologieGeneriche && args.input.patologieGeneriche.length > 0) {
    await context.db.oneOrNone(insert0016(args, context, true));
  }
  if (args.input.patologieAnziani && args.input.patologieAnziani.length > 0) {
    await context.db.oneOrNone(insert0016(args, context, false));
  }

  return true
}