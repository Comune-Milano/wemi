import React, { createContext, useState, useEffect } from 'react';
import { getDetailsDomandaTCB as getDetailsDomandaTCBQ, getFilters, getLavoratori, getTableFilters } from '../graphql';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { labelCalendario, labelAnniEsperienza, labelTipologiaOrario, labelMadrelingua } from '../labels';
import { isObject } from 'utils/functions/typeCheckers';
import { convertBinToObject } from 'components/ui2/WeekCalendarTimePicker/utils/converter';

export const MatchingLavoratoreContext = createContext({
  dataReady: false,
  dataDomandaTCB: { data: undefined },
});

export const MatchingLavoratoreContextProvider = ({ children, idRichiestaTcb }) => {

  /**
   * The state for the pagination
   */

  const [currentPage, setCurrentPage] = useState(1);

  /**
   * The state for the filters of the table
   */
  const [filtersTable, setFiltersTable] = useState({
    tipologiaServizio: { id: null, value: 'Tutte le tipologie' },
    statoCandidatura: { id: null, value: 'Tutti gli stati' }
   });

/**
   * The state for the filters of the table
   */
  const [errors, setError] = useState(false);

  /**
   * 
   * @param {String} nomeFiltro 
   * Callback to the set the filter
   * 
   */
  const handleFiltersTable = (nomeFiltro, value) => {
    setFiltersTable({
      ...filtersTable,
      [nomeFiltro]: value,
    });
  };

  const [calendario, setCalendario] = useState(false);

  /**
  * The state to open/close the popup
  */
  const [openPopup, setOpenPopup] = useState(false);

  /**
   * The initial state of the filter popups
   */
  const initialDataset = {

  };

  /**
   * The state of the filter's popup
   */

  const [popupFilters, setPopupFilters] = useState(initialDataset);

  const handleFilterPopup = (key, value) => {
    
    setError(false);

    if (!value || value.length === 0 || (isObject(value) && Object.keys(value).length === 0)) {
     
      const { [key]: propToDelete, ...restObj} = popupFilters;
      
      return setPopupFilters({ ...restObj });
    }

    const notVisibleFilter = [labelCalendario, labelAnniEsperienza.workerType, labelTipologiaOrario, labelMadrelingua];

    const selectedKeysFilters = Object.keys(popupFilters).filter( element => !notVisibleFilter.includes(element)  );

    const isCalendario = selectedKeysFilters.find( element => element === labelCalendario )? true : false;


    if(selectedKeysFilters.length === 5 && !isCalendario){
      
      return setError(true);

    }

    else if(selectedKeysFilters.length === 6 && isCalendario){

      return setError(true);

    }

    setPopupFilters({ ...popupFilters, [key]: value });
  };

  /**
   * The graphql request to get the table data
   */

  const [lavoratori, ricercaLavoratori] = useGraphQLRequest(
    undefined,
    getLavoratori,
    {
      offset: 0, 
      parameters: {}
    },
    false
  );




  const dataReadyLavoratori = !lavoratori.isLoading && !lavoratori.errored && !lavoratori.pristine;

  const dataLavoratori = lavoratori.data;

  /**
   * The graphql request to get the filters for the popup from the db
   */
  const [filterListDbData] = useGraphQLRequest(
    undefined,
    getFilters,
    {},
    true
  );

  const dataReadyFilterList = !filterListDbData.isLoading && !filterListDbData.errored && !filterListDbData.pristine;

  const filterListData = filterListDbData.data;

  /**
   *  The graphql request to get the details of the domanda TCB from the db
   */
  const [domandaTCBData] = useGraphQLRequest(
    undefined,
    getDetailsDomandaTCBQ,
    {
      idRichiestaTcb
    },
    true
  );

  const dataReadyDomandaTCB = !domandaTCBData.isLoading && !domandaTCBData.errored && !domandaTCBData.pristine;

  const dataDomandaTCB = domandaTCBData.data;


  useEffect(() => {
    if (dataReadyDomandaTCB) {

      const baseIdServizio = 999996;

      const idServizio = dataDomandaTCB.idServizio + baseIdServizio;
      
      const tipologiaOrario = { id: dataDomandaTCB.idTipologiaOrario, value: '' };

      const calendarValues = convertBinToObject(dataDomandaTCB.calendario);
        
      setPopupFilters({...popupFilters, [labelTipologiaOrario]: tipologiaOrario,
         [labelCalendario]: calendarValues,
          [labelAnniEsperienza.workerType]: { id: dataDomandaTCB.idServizio }} );

      handleFiltersTable("tipologiaServizioDomanda", idServizio);

      ricercaLavoratori({
        offset: 0, 
        parameters: {
          idServizio
        },
        idRichiesta: idRichiestaTcb
      })

      // setCalendario(true);
    }

  }, [dataReadyDomandaTCB]);



  const [dataFiltersTable] = useGraphQLRequest(
    undefined,
    getTableFilters,
    {

    },
    true
  );

  const dataReadyFiltersTable = !dataFiltersTable.isLoading && !dataFiltersTable.errored && !dataFiltersTable.pristine;

  const dataFilter = dataFiltersTable.data;

  /**
   * The objects of the context
   */
  const value = {
    idRichiestaTcb,
    errors,
    currentPage,
    setCurrentPage,
    dataReadyFiltersTable,
    dataFiltersTable: dataFilter,
    calendario,
    setCalendario,
    dataReadyDomandaTCB,
    dataDomandaTCB,
    filtersTable,
    handleFiltersTable,
    handleFilterPopup,
    popupFilters,
    openPopup,
    setOpenPopup,
    filterListDbData: filterListData,
    dataReadyFilterList,
    lavoratori: dataLavoratori,
    ricercaLavoratori,
    dataReadyLavoratori
  };


  return (
    <MatchingLavoratoreContext.Provider value={value}>
      {dataReadyDomandaTCB ?
        children :
        null}
    </MatchingLavoratoreContext.Provider>);
};