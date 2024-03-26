import { ApolloError } from 'apollo-server';
import { DisponibilitaLavoratoreCandidaturaDAO } from 'dao/disponibilitaCandidaturaLavoratore/disponibilitaCandidaturaLavoratoreDAO';
import { NOT_CANDIDATE_USER } from 'errors/candidatura/index';
import { aggiornaUltimaModifica } from 'sql/candidaturaTCB/aggiornaUltimaModifica';

export const inserisciModificaDisponibilitaCandidaturaLavoratore = async (parent, args, context, info) => {

  const disponibilitaLavoratoreCandidaturaDAO = new DisponibilitaLavoratoreCandidaturaDAO(context, args);
  const tipologieOrarioUnchecked = args.input.checkboxesTipologieOrario.filter(el => !el.checked).map(el => el.id);
  const tipologieOrarioChecked = args.input.checkboxesTipologieOrario.filter(el => el.checked).map(el => el.id);
  let tipologieOrarioCheckedExist;

  let result = false;

  const verificaCompetenza = await disponibilitaLavoratoreCandidaturaDAO.verificaCompetenzeTata();

  if(!verificaCompetenza){
    throw new ApolloError(NOT_CANDIDATE_USER, NOT_CANDIDATE_USER.code);
  }

  if (tipologieOrarioUnchecked.length > 0) {
    const tipologieOrarioUncheckedExist = await disponibilitaLavoratoreCandidaturaDAO.verificaTipologieOrarioLavoratore(tipologieOrarioUnchecked);

    if (tipologieOrarioUncheckedExist) {
      await disponibilitaLavoratoreCandidaturaDAO
        .eliminaDatiCandidaturaByTipologiaOrario(tipologieOrarioUncheckedExist)
        .then(() => (result = true));
    }
  }

  if (tipologieOrarioChecked.length > 0) {
    tipologieOrarioCheckedExist = await disponibilitaLavoratoreCandidaturaDAO.verificaTipologieOrarioLavoratore(tipologieOrarioChecked);
  }

  await disponibilitaLavoratoreCandidaturaDAO.inserisciAggiornaCandidaturaByTipologiaOrario(
    tipologieOrarioChecked,
    tipologieOrarioCheckedExist
  ).then(() => (result = true));

  await context.db.none(aggiornaUltimaModifica, { id_lavoratore: args.input.idLavoratore, id_utente_mod: context.user.idUtente });

  return result;
};