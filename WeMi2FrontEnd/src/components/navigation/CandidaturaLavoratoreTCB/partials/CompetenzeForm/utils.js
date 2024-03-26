import { codiciAttributo } from '../../constants/CodiciAttributo';

export const isFlagCandidaturaChecked = (radioOptions) => radioOptions.some(el => el.id === '1' && el.checked);
export const NotFlagCandidaturaChecked = (radioOptions) => radioOptions.some (el => el.id === '2' && el.checked);

export const enableDisableSteps = (flagCandidaturaChecked, navigationTabs, setNavigationTabs) => {
  const dataCopy = [...navigationTabs];
  let visibleDeps;
  dataCopy.forEach(el => {
    if (el.active) {
      visibleDeps = el.visibleDeps;
    }

    if (visibleDeps && visibleDeps.includes(el.code)) {
      el.disabled = !flagCandidaturaChecked;
    }
  });
  setNavigationTabs(dataCopy);
};

export function createArrayConfig(values, touched, idServizioRif) {
  let arr = [];

  if (values.mansioniSelezionateTata) {
    arr = arr.concat(
      values.mansioniSelezionateTata.length ?
        values.mansioniSelezionateTata.map(mansTata => ({
          cd_attributo: codiciAttributo.FASCE_ETA_MANSIONI_TATA,
          cd_val_attributo: mansTata.idMans,
          cd_attributo_2: codiciAttributo.LS_FASCIA_ETA_BAMBINI,
          cd_val_attributo_2: mansTata.fasceEtaSelezionate,
          tx_val: mansTata.idMans === 14 ? values.terapieSpecificate : mansTata.idMans === 0 ? values.altreMansioniTata : null,
        })) : {
          cd_attributo: codiciAttributo.FASCE_ETA_MANSIONI_TATA,
          cd_val_attributo: -1,
          cd_attributo_2: codiciAttributo.LS_FASCIA_ETA_BAMBINI,
        }
    );
  }

  if (idServizioRif !== 999998) {
    arr = arr.concat({
      cd_attributo: codiciAttributo.FG_DISP_MANSIONI_COLF,
      cd_val_attributo: values.faccendeDomestiche ? 1 : -1,
      fg_val: values.faccendeDomestiche === 1 ? '1' : '0',
    });
  }

  if (values.mansioniSelezionateColf) {
    arr = arr.concat(
      values.mansioniSelezionateColf.length ?
        values.mansioniSelezionateColf.map(mansColfId => ({
          cd_attributo: codiciAttributo.LS_MANSIONI_COLF,
          cd_val_attributo: values.faccendeDomestiche === 1 ? mansColfId : -1,
          tx_val: mansColfId === 0 ? values.altreMansioniColf : null,
        })) : {
          cd_attributo: codiciAttributo.LS_MANSIONI_COLF,
          cd_val_attributo: -1,
          tx_val: null,
        }
    );
  }

  if (values.mansioniSelezionateBadante) {
    arr = arr.concat(
      values.mansioniSelezionateBadante.length ?
        values.mansioniSelezionateBadante.map(mansBadanteId => ({
          cd_attributo: codiciAttributo.LS_MANSIONI_BADANTE,
          cd_val_attributo: mansBadanteId,
          tx_val: mansBadanteId === 0 ? values.altreMansioniBadante : null,
        })) : {
          cd_attributo: codiciAttributo.LS_MANSIONI_BADANTE,
          cd_val_attributo: -1,
        }
    );
  }

  return arr;
}
