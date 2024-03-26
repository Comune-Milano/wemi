import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { colors } from 'theme';
import { Row, Column } from 'components/ui/Grid';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import {
  getConfiguration as loadConfigurationsQuery,
  getContributi as getContributiQuery,
} from './SimulatoreCostoGraphQL';
import { FilterSection, BodySection } from './partials';
import Loader from 'components/ui2/Loader';
import { simulatoreDefault, calcola } from './utils';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { textToModalLivelloContrattuale } from './utils';
import * as tipologiaOrarioCostanti from 'types/tipologiaOrario';
import { labelCheckboxEtaBambini, getCheckboxOptionsEtaBambini, idEtaBambini, idPersoneAutoSufficienti } from 'components/shared/domanda-tcb/costants';
import { idLivelloContrattuale } from 'types/idLivelloContrattuale';

const LeftColumn = styled(Column)`
  padding: 0 0 3em 0;
  border-bottom: 2px solid ${colors.grey};
  
  ${media.md`
    border-bottom: none;
    border-right: 2px solid ${colors.grey};
    padding: 0 3em 0 0;
  `}
`;
const RightColumn = styled(Column)`
  padding: 3em 0 0 0;
    
  ${media.md`
    padding: 0 0 0 3em;
  `}
`;

const SimulatoreCosto = ({
  idServizio,
  idTipologiaOrario,
  idLivelloDiInquadramento,
  retribuzioneProposta,
  oreSettimanali,
  callback,
  userProfile,
  locale,
  idTipologiaContratto,
  etaBeneficiari,
  personeAutoSufficienti,
}) => {

  const [simulatore, setSimulatore] = React.useState(simulatoreDefault);
  const [activeSim, setActiveSim] = React.useState(false);
  const getContributi = useStatelessGraphQLRequest(
    getContributiQuery,
  );
  const [configurations, _] = useGraphQLRequest(
    {
      livelliContrattuali: [],
      orari: [],
      indennita: {},
      tipologiaContratto: [],
      maxOre: [],
    },
    loadConfigurationsQuery,
    { idServizio, annoRiferimento: moment().year() },
    true,
  );

  const [filterState, setFilterState] = React.useState({
    tipologiaOrario: { id: idTipologiaOrario, label: "" },
    livelloContrattuale: { id: idLivelloDiInquadramento, label: "" },
    tipologiaContratto: { id: idTipologiaContratto, label: "" },
    retribuzione: retribuzioneProposta,
    oreSettimanali: oreSettimanali || 0,
    tariffaBase: 0,
    indennitaAlloggio: false,
    indennitaCena: false,
    indennitaPranzo: false,
    etaBambini: getCheckboxOptionsEtaBambini(etaBeneficiari),
    personeAutoSufficienti: personeAutoSufficienti || {},
  });

  const isMinoreDiSeiAnni = filterState.etaBambini?.filter(el => el.id === idEtaBambini.idMinoreDiSei && el.checked).length;
  const isPiuDiUnaPersonaNonAutosufficiente = filterState.personeAutoSufficienti?.id === idPersoneAutoSufficienti.piuDiUna;

  const orari = configurations.data.orari.map(orario => ({
    id: orario.cd_dominio_tcb,
    label: getObjectValue(orario, 'tl_valore_testuale.' + locale, ''),
  }));

  const tipologiaContratto = configurations.data.tipologiaContratto.map(tipologia => ({
    id: tipologia.cd_dominio_tcb,
    label: getObjectValue(tipologia, 'tl_valore_testuale.' + locale, ''),
  }));

  const livelliInquadramento = configurations.data.livelliContrattuali
    .filter((el) => (
      filterState.tipologiaOrario.id === el.cd_tipo_orario_lavoro
    ))
    .map((el) => ({
      id: el.LivelloContrattuale.cdLivelloContrattuale,
      label: `Livello ${el.cd_categoria_contrattuale}`,
    }));

  const textToModal = textToModalLivelloContrattuale(configurations.data.livelliContrattuali
    .filter((el) => (
      filterState.tipologiaOrario.id === el.cd_tipo_orario_lavoro
    ))
    .map((el) => ({
      title: "Livello " + el.cd_categoria_contrattuale,
      value: el.LivelloContrattuale.txLivelloLungo[locale]
    })));

  const handleFiltri = (nomeCampo, value) => {
    const oldState = {
      ...filterState
    };
    const modifiedValue = {
      [nomeCampo]: value,
    };
    if (nomeCampo === 'tipologiaOrario') {

      if (
        oldState.livelloContrattuale?.id !== idLivelloContrattuale.livelloDs ||
        oldState.livelloContrattuale?.id !== idLivelloContrattuale.livelloCs
      ) {
        modifiedValue.personeAutoSufficienti = {};
      }

      const livelliInquadramento = configurations.data.livelliContrattuali
        .filter((el) => (
          value.id === el.cd_tipo_orario_lavoro
        ))
        .map((el) => ({
          id: el.LivelloContrattuale.cdLivelloContrattuale,
          label: `Livello ${el.cd_categoria_contrattuale}`,
        }));

      if (livelliInquadramento.length > 0) {
        const preselected = livelliInquadramento[0];
        modifiedValue.livelloContrattuale = {
          id: preselected.id,
          label: preselected.label,
        };
        modifiedValue.cena = 0;
        modifiedValue.pranzo = 0;
        modifiedValue.alloggio = 0;
        modifiedValue.oreSettimanali = 0;
        modifiedValue.retribuzione = 0;

        if (value.id === tipologiaOrarioCostanti.PRESENZA_NOTTURNA) {
          modifiedValue.etaBambini = labelCheckboxEtaBambini.map(el => ({ ...el, checked: false }));
        }
      }
    }
    if (nomeCampo === 'livelloContrattuale') {
      if (value.id !== idLivelloContrattuale.livelloDs || value.id !== idLivelloContrattuale.livelloCs) {
        modifiedValue.personeAutoSufficienti = {};
      }
    }

    if (activeSim) {
      //se è stato calcolato il costo e se si modificano i filtri i dati vanno azzerati
      setSimulatore(simulatoreDefault);
      setActiveSim(false);
    };
    setFilterState({
      ...oldState,
      ...modifiedValue,
    });
  };

  let orarioName = orari.filter(el => el.id === filterState.tipologiaOrario.id);
  let livelloName = livelliInquadramento.filter(el => el.id === filterState.livelloContrattuale.id);
  orarioName = orarioName.length > 0 ? orarioName[0].label : '';
  livelloName = livelloName.length > 0 ? livelloName[0].label : '';

  const annoRif = configurations.data && configurations.data.livelliContrattuali[0] && configurations.data.livelliContrattuali[0].nr_anno_rif;

  /*
    l'importo minimo sarà un json accessibile 
    con chiavi [tipo orario di lavoro].[categoria contrattuale]
    es data[1]['1']
  */

  const importiMinimi = {};

  configurations.data.livelliContrattuali.forEach(el => {

    importiMinimi[el.cd_tipo_orario_lavoro] = {
      ...importiMinimi[el.cd_tipo_orario_lavoro],
      [el.LivelloContrattuale.cdLivelloContrattuale]: el.paga_minima_contrattuale,
      imImportoIndennitaTata: el.im_importo_indennita_tata,
      imImportoIndennitaBadante: el.im_importo_indennita_badante
    };
  });

  const getImportoIndennita = () => {
    if (isMinoreDiSeiAnni) {
      return filterState.imImportoIndennitaTata;
    }
    if (isPiuDiUnaPersonaNonAutosufficiente) {
      return filterState.imImportoIndennitaBadante;
    }
    return null;
  };

  const simulaCosti = () => {

    const pranzo = parseInt(filterState.pranzo) || 0;
    const cena = parseInt(filterState.cena) || 0;
    const alloggio = parseInt(filterState.alloggio) || 0;

    const indennitaTataBadante = getImportoIndennita();

    const result = calcola(
      filterState.tipologiaOrario.id,
      filterState.tariffaBase,
      filterState.retribuzione,
      filterState.oreSettimanali,
      pranzo,
      cena,
      alloggio,
      configurations.data.indennita,
      getContributi,
      filterState.tipologiaContratto,
      indennitaTataBadante
    );
    result.then(res => {
      setSimulatore({ ...res });
    })

    setActiveSim(true);
  };

  return (
    <Row fluid>
      {
        configurations.pristine || configurations.isLoading ?
          <Loader margin="6em auto" />
          :
          (
            <React.Fragment>
              <LeftColumn xs="12" md="4" padding="0"
                tagName="aside">
                <FilterSection
                  isMinoreDiSeiAnni={isMinoreDiSeiAnni}
                  isPiuDiUnaPersonaNonAutosufficiente={isPiuDiUnaPersonaNonAutosufficiente}
                  orari={orari}
                  annoRif={annoRif}
                  tipologiaContratto={tipologiaContratto}
                  orarioName={orarioName}
                  livelliInquadramento={livelliInquadramento}
                  textToModal={textToModal}
                  livelloName={livelloName}
                  importiMinimi={importiMinimi}
                  indennita={configurations.data.indennita}
                  filtri={filterState}
                  handleFiltri={handleFiltri}
                  onClick={simulaCosti}
                  idServizio={idServizio}
                  maxOre={configurations.data.maxOre}
                />
              </LeftColumn>
              <RightColumn xs="12" md="8" padding="0"
                tagName="section">
                <BodySection
                  orarioName={orarioName}
                  isMinoreDiSeiAnni={isMinoreDiSeiAnni}
                  isPiuDiUnaPersonaNonAutosufficiente={isPiuDiUnaPersonaNonAutosufficiente}
                  livelloName={livelloName}
                  simulatore={simulatore}
                  active={activeSim}
                  filtri={filterState}
                  callback={callback}
                  userProfile={userProfile}
                  idServizio={idServizio}
                  locale={locale}
                  tipologiaContratto={tipologiaContratto}
                />
              </RightColumn>
            </React.Fragment>
          )
      }
    </Row>
  );
};

SimulatoreCosto.displayName = 'SimulatoreCosto';

export default SimulatoreCosto;