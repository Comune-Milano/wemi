
/**
 * The type of default navigation steps.
 */
export const NAVIGATION_STEPS_TYPE_CODE = {
  anagrafica: 'anagrafica',
  statoOccupazionale: 'stato_occup',
  istruzione: 'istruzione',
  esperienzeLavoratore: 'esp_lav',
  informazioniPersonali: 'dati_pers',
  // candidatura: 'candidatura',
  // candidaturaTata: 'cand_tata',
  competenzeTata: 'comp_tata',
  disponibilitaTata: 'disp_tata',
  // candidaturaColf: 'cand_colf',
  competenzeColf: 'comp_colf',
  disponibilitaColf: 'disp_colf',
  // candidaturaBadante: 'cand_badante',
  competenzeBadante: 'comp_badante',
  disponibilitaBadante: 'disp_badante',
};

export const NAVIGATION_STEPS_TYPE_DATI_GENERALI = [
  NAVIGATION_STEPS_TYPE_CODE.anagrafica,
  NAVIGATION_STEPS_TYPE_CODE.statoOccupazionale,
  NAVIGATION_STEPS_TYPE_CODE.istruzione,
  NAVIGATION_STEPS_TYPE_CODE.esperienzeLavoratore,
  NAVIGATION_STEPS_TYPE_CODE.informazioniPersonali,
];

export const NAVIGATION_STEPS_TYPE_TATA = [
  NAVIGATION_STEPS_TYPE_CODE.competenzeTata,
  NAVIGATION_STEPS_TYPE_CODE.disponibilitaTata,
];

export const NAVIGATION_STEPS_TYPE_COLF = [
  NAVIGATION_STEPS_TYPE_CODE.competenzeColf,
  NAVIGATION_STEPS_TYPE_CODE.disponibilitaColf,
];

export const NAVIGATION_STEPS_TYPE_BADANTE = [
  NAVIGATION_STEPS_TYPE_CODE.competenzeBadante,
  NAVIGATION_STEPS_TYPE_CODE.disponibilitaBadante,
];

/**
* The set of default navigation steps.
*/
export const DEFAULT_NAVIGATION_STEPS = [
  {
    code: NAVIGATION_STEPS_TYPE_CODE.anagrafica,
    title: 'Dati anagrafici',
    valid: false,
    visited: false,
    active: true,
    hide: false,
    disabled: false,
  },
  {
    code: NAVIGATION_STEPS_TYPE_CODE.statoOccupazionale,
    title: 'Stato occupazionale',
    valid: false,
    visited: false,
    active: false,
    hide: false,
    disabled: false,
  },
  {
    code: NAVIGATION_STEPS_TYPE_CODE.istruzione,
    title: 'Istruzione e formazione',
    valid: false,
    visited: false,
    active: false,
    hide: false,
    disabled: false,
  },
  {
    code: NAVIGATION_STEPS_TYPE_CODE.esperienzeLavoratore,
    title: 'Esperienze lavorative',
    valid: false,
    visited: false,
    active: false,
    hide: false,
    disabled: false,
  },
  {
    code: NAVIGATION_STEPS_TYPE_CODE.informazioniPersonali,
    title: 'Informazioni personali',
    valid: false,
    visited: false,
    active: false,
    hide: false,
    disabled: false,
  },
  // {
  //   code: NAVIGATION_STEPS_TYPE_CODE.candidatura,
  //   title: 'Candidatura',
  //   valid: false,
  //   visited: false,
  //   active: false,
  //   hide: false,
  // },
  // {
  //   code: NAVIGATION_STEPS_TYPE_CODE.candidaturaTata,
  //   title: 'Candidatura come baby-sitter',
  //   valid: false,
  //   visited: false,
  //   active: false,
  //   hide: false,
  //   skipOnBackwardDescendant: true,
  //   visitedDeps: ['comp_tata', 'disp_tata'],
  //   validDeps: ['comp_tata', 'disp_tata'],
  // },
  {
    code: NAVIGATION_STEPS_TYPE_CODE.competenzeTata,
    title: 'Competenze baby-sitter',
    valid: false,
    visited: false,
    active: false,
    hide: true,
    disabled: false,
    visibleDeps: ['disp_tata'],
  },
  {
    code: NAVIGATION_STEPS_TYPE_CODE.disponibilitaTata,
    title: 'Disponibilità baby-sitter',
    valid: false,
    visited: false,
    active: false,
    hide: true,
    disabled: false,
    visibleDeps: ['comp_tata'],
  },
  // {
  //   code: NAVIGATION_STEPS_TYPE_CODE.candidaturaColf,
  //   title: 'Candidatura come colf',
  //   valid: false,
  //   visited: false,
  //   active: false,
  //   hide: true,
  //   disabled: false,
  //   skipOnBackwardDescendant: true,
  //   visitedDeps: ['comp_colf', 'disp_colf'],
  //   validDeps: ['comp_colf', 'disp_colf'],
  // },
  {
    code: NAVIGATION_STEPS_TYPE_CODE.competenzeColf,
    title: 'Competenze colf',
    valid: false,
    visited: false,
    active: false,
    hide: true,
    disabled: false,
    visibleDeps: ['disp_colf'],
  },
  {
    code: NAVIGATION_STEPS_TYPE_CODE.disponibilitaColf,
    title: 'Disponibilità colf',
    valid: false,
    visited: false,
    active: false,
    hide: true,
    disabled: false,
    visibleDeps: ['comp_colf'],
  },
  // {
  //   code: NAVIGATION_STEPS_TYPE_CODE.candidaturaBadante,
  //   title: 'Candidatura come badante',
  //   valid: false,
  //   visited: false,
  //   active: false,
  //   hide: true,
  //   disabled: false,
  //   skipOnBackwardDescendant: true,
  //   visitedDeps: ['comp_badante', 'disp_badante'],
  //   validDeps: ['comp_badante', 'disp_badante'],
  // },
  {
    code: NAVIGATION_STEPS_TYPE_CODE.competenzeBadante,
    title: 'Competenze badante',
    valid: false,
    visited: false,
    active: false,
    hide: true,
    disabled: false,
    visibleDeps: ['disp_badante', 'esp_badante'],
  },
  {
    code: NAVIGATION_STEPS_TYPE_CODE.disponibilitaBadante,
    title: 'Disponibilità badante',
    valid: false,
    visited: false,
    active: false,
    hide: true,
    disabled: false,
    visibleDeps: ['comp_badante', 'esp_badante'],
  },
];

export const stepVisibilityFlagMapping = {
  cand_tata: 'tata',
  cand_colf: 'colf',
  cand_badante: 'badante',
};

export const stepRedirectMapping = {
  cand_tata: 'comp_tata',
  cand_colf: 'comp_colf',
  cand_badante: 'comp_badante',
};
