export const getInitialDataset = (datiCompetenzeBadante, datiEsperienzeBadante,codiciAttributo) => {

  const esperienzePatologieGeneriche = [];
    const esperienzePatologie = [];
    let altroPatologie;

    datiEsperienzeBadante.data.estraiDati0016.forEach(element => {
      if (element.cd_attributo === codiciAttributo.LS_ESPERIENZE_PREGRESSE_PATOLOGIE_GENERICHE) {
        esperienzePatologieGeneriche.push(element.cd_val_attributo);
      } else {
        esperienzePatologie.push(element.cd_val_attributo);
        if (element.cd_val_attributo === 0) {
          altroPatologie = element.tx_val;
        }
      }
    });

  return {
    candidatura: (datiCompetenzeBadante && getFlagCandidatura(datiCompetenzeBadante.flagCandidatura)) || {},
    mansioniSelezionateBadante: (datiCompetenzeBadante && datiCompetenzeBadante.mansioniBadante) || [],
    altreMansioniBadante: (datiCompetenzeBadante && datiCompetenzeBadante.altreMansioniBadante) ||  '',
    mansioniSelezionateColf: (datiCompetenzeBadante && datiCompetenzeBadante.mansioniColf) || [],
    altreMansioniColf: (datiCompetenzeBadante && datiCompetenzeBadante.altreMansioniColf) ||  '',
    faccendeDomestiche: (datiCompetenzeBadante && datiCompetenzeBadante.faccendeDomestiche) || undefined,
    esperienzePatologieGeneriche,
    esperienzePatologie,
    altroPatologie
  };
};

const getFlagCandidatura = (flagCandidatura) => {
  return {
    label: 'Vuoi candidarti come badante?',
    radioOptions: [
      { id: '1', label: 'Si, voglio candidarmi come badante', checked: flagCandidatura === '1' },
      { id: '2', label: 'No, non voglio candidarmi come badante', checked: flagCandidatura === '0' },
    ],
  };
};
