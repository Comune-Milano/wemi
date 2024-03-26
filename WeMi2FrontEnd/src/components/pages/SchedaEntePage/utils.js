import { PAGE_HOME_URL, PAGE_AREAPERSONALE_URL, PAGE_GESTIONEENTE_URL } from 'types/url';
import { isString } from 'utils/functions/typeCheckers';
import { SCHEDA_ENTE_STATE } from 'types/statischedaente';
import { keysSection } from './constants';

export const calculateBreadCrumbPathEnte = (url) => {
  const breadCrumbPath = [
    {
      slash: 'Home',
      url: PAGE_HOME_URL,
    },
    {
      slash: 'Area personale',
      url: PAGE_AREAPERSONALE_URL,
    },
    {
      slash: 'Scheda Ente',
      url,
    },
  ];
  return breadCrumbPath;
};

export const calculateBreadCrumbPathAdmin = (url) => {
  const breadCrumbPath = [
    {
      slash: 'Home',
      url: PAGE_HOME_URL,
    },
    {
      slash: 'Area personale',
      url: PAGE_AREAPERSONALE_URL,
    },
    {
      slash: 'Gestione enti',
      url: PAGE_GESTIONEENTE_URL,
    },
    {
      slash: 'Scheda Ente',
      url,
    },
  ];
  return breadCrumbPath;
};

export const createPath = (obj, path, value = null) => {
  if (!isString(path)) {
    return obj;
  }
  let pathSplit = path.split('.')[1] ? path.split('.') : path;
  let current = obj;
  while (pathSplit.length > 1) {
    const [head, ...tail] = pathSplit;
    pathSplit = tail;
    if (current[head] === undefined) {
      current[head] = {};
    }
    current = current[head];
  }
  current[pathSplit[0]] = value;
  return obj;
};

export const errorsToObject = (errors) => {
  const errorsToSplitKeys = Object.keys(errors);
  let resultErrors = {};
  errorsToSplitKeys.forEach(errorKey => {
    const valueError = errors[errorKey];
    const [, secondElement] = errorKey.split('.');
    if (secondElement) {
      const pathResult = createPath(resultErrors, errorKey, valueError);
      resultErrors = {
        ...resultErrors,
        ...pathResult,
      };
    } else {
      resultErrors = { ...resultErrors, [errorKey]: errors[errorKey] };
    }
  });
  return resultErrors;
};

const calculateDisabledAdmin = (code) => {
  let disabledSection = {
    section: true,
    notes: true,
  };
  if (code === SCHEDA_ENTE_STATE.BOZZA) {
    disabledSection = {
      section: true,
      notes: true,
    };
  }
  if (code === SCHEDA_ENTE_STATE.ACCREDITATO) {
    disabledSection = {
      section: true,
      notes: true,
    };
  }
  if (code === SCHEDA_ENTE_STATE.DISATTIVATA) {
    disabledSection = {
      section: false,
      notes: false,
    };
  }
  if (code === SCHEDA_ENTE_STATE.IN_COMPILAZIONE) {
    disabledSection = {
      section: true,
      notes: true,
    };
  }
  if (code === SCHEDA_ENTE_STATE.COMPILATA) {
    disabledSection = {
      section: false,
      notes: false,
    };
  }
  if (code === SCHEDA_ENTE_STATE.DA_CORREGGERE) {
    disabledSection = {
      section: true,
      notes: true,
    };
  }
  if (code === SCHEDA_ENTE_STATE.VALIDATA) {
    disabledSection = {
      section: false,
      notes: false,
    };
  }
  return disabledSection;
};

const calculateDisabledInstitution = (code) => {
  let disabledSection = {
    section: true,
    notes: true,
  };

  if (code === SCHEDA_ENTE_STATE.BOZZA) {
    disabledSection = {
      section: true,
      notes: true,
    };
  }
  if (code === SCHEDA_ENTE_STATE.ACCREDITATO) {
    disabledSection = {
      section: false,
      notes: true,
    };
  }
  if (code === SCHEDA_ENTE_STATE.DISATTIVATA) {
    disabledSection = {
      section: true,
      notes: true,
    };
  }
  if (code === SCHEDA_ENTE_STATE.IN_COMPILAZIONE) {
    disabledSection = {
      section: false,
      notes: true,
    };
  }
  if (code === SCHEDA_ENTE_STATE.COMPILATA) {
    disabledSection = {
      section: true,
      notes: true,
    };
  }
  if (code === SCHEDA_ENTE_STATE.DA_CORREGGERE) {
    disabledSection = {
      section: false,
      notes: true,
    };
  }
  if (code === SCHEDA_ENTE_STATE.VALIDATA) {
    disabledSection = {
      section: true,
      notes: true,
    };
  }
  return disabledSection;
};

export const calculateDisabledSections = (code, isAdmin) => {
  const defaultSections = {
    ...keysSection,
  };

  const valuesSection = Object.values(defaultSections);

  const resultSections = {

  };
  // Filling default with all disabled sections
  valuesSection.forEach(section => {
    resultSections[section] = true;
  });

  let sectionsVisibility = {
    section: true,
    notes: true,
  };

  if (!isAdmin) {
    sectionsVisibility = calculateDisabledInstitution(code);
  } else {
    sectionsVisibility = calculateDisabledAdmin(code);
  }

  valuesSection.forEach(section => {
    resultSections[section] = sectionsVisibility;
  });

  return resultSections;
};
