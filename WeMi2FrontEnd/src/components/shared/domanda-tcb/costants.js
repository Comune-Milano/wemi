import { isNumber } from 'utils/functions/typeCheckers';

export const idEtaBambini = {
  idMinoreDiSei: 0,
  idMaggioreDiSei: 1
};

export const labelCheckboxEtaBambini = [
  { label: "Da 0 a 5 anni", id: idEtaBambini.idMinoreDiSei, checked: false },
  { label: "Più di 6 anni (compiuti)", id: idEtaBambini.idMaggioreDiSei, checked: false }
];

const etaCheckboxOption = 6;

// funzione con la quale si inizializza lo stato (state) per il componete EtaBambini
export const getCheckboxOptionsEtaBambini = (etaBeneficiari) => {
  if (!etaBeneficiari) {
    return labelCheckboxEtaBambini.slice();
  }

  let minoreSei = false;
  let maggioreSei = false;

  etaBeneficiari.forEach(el => {
    const eta = el?.nrVal;
    if (isNumber(eta)) {
      if (eta < etaCheckboxOption) {
        minoreSei = true;
      } else {
        maggioreSei = true;
      }
    }
  });

  const labelCheckbox = [
    { ...labelCheckboxEtaBambini[0], checked: minoreSei },
    { ...labelCheckboxEtaBambini[1], checked: maggioreSei },
  ]
  return labelCheckbox;
};

export const idPersoneAutoSufficienti = {
  una: 0,
  piuDiUna: 1
};

export const radioItemsPersoneAutoSufficienti = [
  { id: idPersoneAutoSufficienti.una, label: "Una" },
  { id: idPersoneAutoSufficienti.piuDiUna, label: "Più di una" },
];