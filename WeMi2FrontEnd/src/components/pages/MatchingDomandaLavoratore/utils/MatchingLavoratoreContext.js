import React, { createContext, useState, useEffect, useMemo } from 'react';
import { convertBinToObject } from 'components/ui2/WeekCalendarTimePicker/utils/converter';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import {
  getDetailsDomandaTCB as getDetailsDomandaTCBQ,
  getFilters as getFiltersQ,
  getLavoratori as getLavoratoriQ,
  getTableFilters as getTableFiltersQ,
} from '../graphql';
import { countFilter } from './counterFilter';
import {
  labelAccudimento,
  labelAltriValori,
  labelAnniEsperienza,
  labelCompetenzeBadante,
  labelCalendario,
  labelCarattere,
  labelCheckboxListDatiPersonali,
  labelCheckboxListDisponibilita,
  labelCompetenzeColf,
  labelCorsiBadante,
  labelCorsiTata,
  labelMadrelingua,
  labelSpaziLavoratore,
  labelStipendioProposto,
  labelCompetenzeTata,
  labelTipologiaOrario,
  labelFasceEta,
} from '../labels';
import { MAX_FILTERS, MAX_FILTERS_WITH_CALENDAR } from '../constants/maxfilters';
import { checkElement } from './checkelement';

const initialState = {
  calendario: false,
  currentPage: 1,
  dataDomandaTCB: null,
  dataFiltersTable: null,
  dataReadyLavoratore: false,
  dataReadyFiltersTable: false,
  dataReadyDomandaTCB: false,
  filterListDbData: null,
  filtersTable: {
    tipologiaServizio: { id: null, value: 'Tutti gli stati' },
    statoCandidatura: { id: null, value: 'Tutti gli stati' },
  },
  errors: false,
  idRichiestaTcb: null,
  lavoratori: null,
  openPopup: false,
  popupFilters: {},
};

export const MatchingLavoratoreContext = createContext(initialState);

const MatchingLavoratoreContextProviderComponent = ({ children, idRichiestaTcb }) => {
  /**
   * The graphql request to get the table data
   */
  const searchWorkers = useStatelessGraphQLRequest(getLavoratoriQ);

  /**
  * The graphql request to get the table data
  */
  const getDetailsDomandaTCB = useStatelessGraphQLRequest(getDetailsDomandaTCBQ);

  /**
  * The graphql request to get the table data
  */
  const getFilters = useStatelessGraphQLRequest(getFiltersQ);

  /**
  * The graphql request to get the table data
  */
  const getTableFilters = useStatelessGraphQLRequest(getTableFiltersQ);


  const [contextState, setContextState] = useState(initialState);

  const handleContextState = (key, value) => {
    const newContextState = { ...contextState, [key]: value };
    setContextState(newContextState);
  };

  const handleFiltersTable = async (nomeFiltro, value) => {
    const { filtersTable: filtersTableOld } = contextState;
    const newFiltersTable = { ...filtersTableOld, [nomeFiltro]: value };

    await setContextState({
      ...contextState,
      filtersTable: newFiltersTable,
    });
  };

  const handleFilterPopup = (key, value) => {
    const { popupFilters, calendario } = contextState;

    const newFiltersPopup = { ...popupFilters, [key]: value };

    const labelsToCount = {
      labelAccudimento,
      ...labelAltriValori,
      labelAnniEsperienza: labelAnniEsperienza.anniEsperienza,
      labelCompetenzeBadante,
      // labelCalendario,
      labelCarattere,
      ...labelCheckboxListDatiPersonali,
      ...labelCheckboxListDisponibilita,
      labelCompetenzeColf,
      labelCorsiBadante,
      labelCorsiTata,
      ...labelMadrelingua,
      labelSpaziLavoratore,
      labelStipendioProposto,
      labelCompetenzeTata,
      labelFasceEta,
    };

    const contaFiltri = countFilter(labelsToCount, contextState);
    const isPresentFilter = Object.keys(popupFilters).find(element => {
      const valore = popupFilters[element];
      if (element === key) {
        return checkElement(valore);
      }
      return false;
    });

    if (!isPresentFilter) {
      if (contaFiltri >= MAX_FILTERS) {
        return setContextState({
          ...contextState,
          errors: true,
        });
      }

      // if (contaFiltri >= MAX_FILTERS_WITH_CALENDAR && calendario) {
      //   return setContextState({
      //     ...contextState,
      //     errors: true,
      //   });
      // }
    }


    return setContextState({
      ...contextState,
      popupFilters: newFiltersPopup,
      errors: false,
    });
  };

  const setCurrentPage = (pageNumber) => {
    setContextState({ ...contextState, currentPage: pageNumber });
  };

  const memoizedFunctions = useMemo(
    () => ({ setCurrentPage, handleContextState, handleFilterPopup, handleFiltersTable, setContextState }),
    [setCurrentPage, handleContextState, handleFilterPopup, handleFiltersTable, setContextState],
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      const tableFilters = await getTableFilters();

      const detailsDomandaTCB = await getDetailsDomandaTCB({
        idRichiestaTcb,
      });
      if (detailsDomandaTCB) {
        const { idServizio: idServizioRiferimento, calendario, idTipologiaOrario } = detailsDomandaTCB;


        const tipologiaOrario = { id: idTipologiaOrario, value: '' };

        const calendarValues = convertBinToObject(calendario);

        const workers = await searchWorkers({
          offset: 0,
          parameters: {
            idServizio: idServizioRiferimento + 999996,
            tipologiaOrario: idTipologiaOrario,
            tipoLavoratore: idServizioRiferimento,
          },
          idRichiesta: idRichiestaTcb,
        });

        const contextValues = {
          dataReadyLavoratore: true,
          dataReadyFiltersTable: true,
          dataReadyDomandaTCB: true,
          dataDomandaTCB: detailsDomandaTCB,
          dataFiltersTable: tableFilters,
          idRichiestaTcb,
          lavoratori: workers,
          popupFilters: {
            [labelCalendario]: calendarValues,
            [labelTipologiaOrario]: tipologiaOrario,
            [labelAnniEsperienza.workerType]: { id: idServizioRiferimento },
          },

        };

        setContextState({ ...contextState, ...contextValues });
      }
    };
    fetchInitialData();
  }, []);

  return (
    <MatchingLavoratoreContext.Provider
      value={{
        contextState,
        ...memoizedFunctions,
        getFilters,
        ricercaLavoratori: searchWorkers,
      }}
    >

      {children}
    </MatchingLavoratoreContext.Provider>
  );
};

MatchingLavoratoreContextProviderComponent.displayName = 'Context for matching';

export const MatchingLavoratoreContextProvider = MatchingLavoratoreContextProviderComponent;
