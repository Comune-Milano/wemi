import React from 'react';
import moment from 'moment';
import styled, { css } from 'styled-components';
import media from 'utils/media-queries';
import { colors, fonts } from 'theme';
import { Row, Column } from 'components/ui/Grid';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import {
  getConfiguration as loadConfigurationsQuery,
  getContributo as getContributoQuery,
} from './SimulatoreCostoGraphQL';
import { FilterSection, BodySection } from './partials2.0';
import Loader from 'components/ui2/Loader';
import { simulatoreDefault, calcola } from './utils';
import { getObjectValue } from 'utils/extensions/objectExtensions';

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
}) => {
  const [simulatore, setSimulatore] = React.useState(simulatoreDefault);
  const [activeSim, setActiveSim] = React.useState(false);
  const getContributo = useStatelessGraphQLRequest(
    getContributoQuery,
  );
  const [configurations, _] = useGraphQLRequest(
    {
      livelliContrattuali: [],
      orari: [],
      indennita: {},
    },
    loadConfigurationsQuery,
    { idServizio, annoRiferimento: moment().year() },
    true,
  );
  const [filterState, setFilterState] = React.useState({
    tipologiaOrario: { id: idTipologiaOrario },
    livelloContrattuale: { id: idLivelloDiInquadramento },
    retribuzione: retribuzioneProposta,
    oreSettimanali: oreSettimanali || 0,
    tariffaBase: 0,
    indennitaAlloggio: false,
    indennitaCena: false,
    indennitaPranzo: false,
  });

  const orari = configurations.data.orari.map(orario => ({
    id: orario.cd_dominio_tcb,
    label: orario.tl_valore_testuale["it"],
  }));
  const livelliInquadramento = configurations.data.livelliContrattuali
    .filter((el) => (
      filterState.tipologiaOrario.id === el.cd_tipo_orario_lavoro
    ))
    .map((el) => ({
      id: el.LivelloContrattuale.cdLivelloContrattuale,
      label: `Livello ${el.cd_categoria_contrattuale}`,
    }));
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
    };
  });

  const simulaCosti = async () => {
    let indennitaPranzo = 0;
    let indennitaCena = 0;
    let indennitaAlloggio = 0;
    const indennita = configurations.data.indennita;
    if ([1, 2].indexOf(filterState.tipologiaOrario.id) >= 0) {
      ({ indennitaAlloggio, indennitaCena, indennitaPranzo } = indennita);
    } else if ([4, 6].indexOf(filterState.tipologiaOrario.id)) {
      ({ indennitaAlloggio, indennitaPranzo } = indennita);
    } else {
      indennitaAlloggio = filterState.indennitaAlloggio ? indennita.indennitaAlloggio : 0;
      indennitaPranzo = filterState.indennitaPranzo ? indennita.indennitaPranzo : 0;
      indennitaCena = filterState.indennitaCena ? indennita.indennitaCena : 0;
    }
    const queryResult = await getContributo({
      tariffa: filterState.tariffaBase,
      oreSettimanali: parseInt(filterState.oreSettimanali),
    });
    const result = calcola(
      filterState.tipologiaOrario.id,
      filterState.tariffaBase,
      filterState.retribuzione,
      filterState.oreSettimanali,
      indennitaPranzo,
      indennitaCena,
      indennitaAlloggio,
      getObjectValue(queryResult, 'data.contributoSicuaf', 1),
    );
    setSimulatore({ ...result });
    setActiveSim(true);
  }
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
                  orari={orari}
                  livelliInquadramento={livelliInquadramento}
                  importiMinimi={importiMinimi}
                  indennita={configurations.data.indennita}
                  filtri={filterState}
                  setFiltri={setFilterState}
                  onClick={simulaCosti}
                />
              </LeftColumn>
              <RightColumn xs="12" md="8" padding="0"
                tagName="section">
                <BodySection
                  simulatore={simulatore}
                  active={activeSim}
                  filtri={filterState}
                  callback={callback}
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
