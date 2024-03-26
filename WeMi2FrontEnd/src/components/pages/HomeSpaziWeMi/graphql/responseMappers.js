
import { getObjectValue } from "utils/extensions/objectExtensions";

export const mapSpaziWeMiResponse = res => {
  if (!Array.isArray(res)) {
    return [];
  }

  return res.map(spazioWeMi => {
    const idContenuto = getObjectValue(spazioWeMi, 'id_contenuto');
    const nome = getObjectValue(spazioWeMi, 'tl_testo_1.it', '');
    const email = getObjectValue(spazioWeMi, 'tl_testo_2.it', '');

    const municipio = getObjectValue(spazioWeMi, 'js_dati_contenuto.Municipio', {});
    const descrizione = getObjectValue(spazioWeMi, 'js_dati_contenuto.Descrizione', '');

    const specie = getObjectValue(spazioWeMi, 'js_dati_contenuto.Specie', '');
    const denominazione = getObjectValue(spazioWeMi, 'js_dati_contenuto.Denominazione', '');
    const nrCivico = getObjectValue(spazioWeMi, 'js_dati_contenuto.Civico', '');

    const indirizzo = { specie, denominazione, nrCivico };

    return {
      idContenuto,
      nome,
      email,
      indirizzo,
      municipio,
      descrizione,
    };
  });
};

export const mapListaMunicipiResponse = res => {
  if (!Array.isArray(res)) {
    return new Map();
  }

  return res.reduce((accumulator, municipio) => {
    const nome = getObjectValue(municipio, 'nmMunicipio.it');
    const id = getObjectValue(municipio, 'idMunicipio');

    accumulator.set(id, { nome, id });
    return accumulator;
  }, new Map());
};
