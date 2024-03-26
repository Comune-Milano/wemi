import { numberLabels } from 'types/numberLabels';

const cdLivelloContrattualeUnico = 0;

const getQuantitaLivelliContrattualiLabel = (maxLength) => {
  return numberLabels[maxLength] || "zero";
};

const canAddLivelloContrattuale = (codiciLivelliContrattuali, element) => {
  let elementIncludes = false;
  let controlLivelloContrattuale = false;
  let isDifferentLivelloUnico = false;

  const categoriaContrattualeTrim = element.cd_categoria_contrattuale.trim();
  if (
    element.cd_categoria_contrattuale !== undefined &&
    !codiciLivelliContrattuali.includes(categoriaContrattualeTrim)
  ) {
    elementIncludes = true;
  }
  if (
    element.LivelloContrattuale !== undefined &&
    element.LivelloContrattuale.cdLivelloContrattuale !== undefined
  ) {
    controlLivelloContrattuale = true;
  }
  if (element.LivelloContrattuale?.cdLivelloContrattuale !== cdLivelloContrattualeUnico) {
    isDifferentLivelloUnico = true;
  }
  return elementIncludes && controlLivelloContrattuale && isDifferentLivelloUnico;
};

export const getLivelliContrattualiListLabel = (allLivelliContrattuali) => {

  const codiciLivelliContrattuali = [];

  allLivelliContrattuali.forEach(element => {
    if (canAddLivelloContrattuale(codiciLivelliContrattuali, element)) {
      // per evitare duplicati e non inserire il livello UNICO con cdLivelloContrattuale = 0
      codiciLivelliContrattuali.push(element.cd_categoria_contrattuale.trim());
    }
  });

  const maxLength = codiciLivelliContrattuali.length;

  let text = "";

  if (maxLength === 1) {
    text = `(${codiciLivelliContrattuali[0]})`;
  } else {
    const lastElement = codiciLivelliContrattuali.pop();
    text = `(${codiciLivelliContrattuali.join(', ') + ((lastElement ? (" e " + lastElement) : ""))})`
  }

  const res = {
    text,
    quantita: getQuantitaLivelliContrattualiLabel(maxLength),
    maxLength
  }
  return res;
};