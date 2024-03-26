

const getSpaziWeMiQueryName = 'estraiSpaziWeMiPubblicati';
export const getSpaziWeMiQuery = [
  '',
  `query {
    ${getSpaziWeMiQueryName} {
      id_contenuto
      tl_testo_1
      tl_testo_2
      tl_testo_3
      js_dati_contenuto
    }
  }`,
  getSpaziWeMiQueryName,
];

const getMunicipiQueryName = 'municipioAll';
export const getMunicipiQuery = [
  '',
  `query ${getMunicipiQueryName}{
    ${getMunicipiQueryName}{
      idMunicipio
      nmMunicipio
    }
  }`,
  getMunicipiQueryName,
];
