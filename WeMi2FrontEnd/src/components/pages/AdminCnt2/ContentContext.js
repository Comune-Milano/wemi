import React, { createContext, useState } from 'react';

export const contentContext = createContext({
  currentPage: 1,
  setCurrentPage: () => { },
  filters: { ricerca: '', statoCnt: { id: 0, value: 'Tutti gli stati' } },
  setFilters: () => { },
  popupInformativo: false,
  setPopupInformativo: () => { },
  indice: 0,
  setIndice: () => { },
});


export const ContentContextProvider = ({ children }) => {
  /**
   * States for modal space wemi (TO verify if needed)
   */
  const [popupInformativo, setPopupInformativo] = useState(false);
  const [indice, setIndice] = useState(0);

   /**
   * The state for the filters
   */
  const [filters, setFilters] = useState({ ricerca: '', statoCnt: { id: 0, value: 'Tutti gli stati' } });

  /**
   * The state for the pagination
   */
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <contentContext.Provider value={{ filters, setFilters, currentPage, setCurrentPage, popupInformativo, setPopupInformativo, indice, setIndice }}>
      {children}
    </contentContext.Provider>
  );
};

ContentContextProvider.displayName = 'Search content context provider';
