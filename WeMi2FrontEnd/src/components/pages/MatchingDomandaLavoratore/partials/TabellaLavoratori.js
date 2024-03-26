import React from 'react';
import colors from 'theme/colors';
import Pagination from 'components/ui2/Pagination';
import Loader from 'components/ui/Loader';
import Text from 'components/ui/Text';
import connectContext from 'hoc/connectContext';
import { Row } from 'components/ui/Grid';
import { convertObjectToBin } from 'components/ui2/WeekCalendarTimePicker/utils/converter';
import { mapRows } from '../utils/mapRows';
import { MatchingLavoratoreContext } from '../utils/MatchingLavoratoreContext';
import { StyledTable } from './styledtable';
import { mapLabelToProps, mapFiltersTableToProps } from '../utils/mapLabelToProps';
import { labelCalendario } from '../labels';
import { findNumeroElementi, MAX_PAGINATION_ITEMS } from '../constants/pagination';

const colonneTabella = [
  'ID Lavoratore',
  'Tipologia servizio',
  'Cognome',
  'Nome',
  'Stato occupazionale',
  'Stato candidatura',
  'Stato associazione',
  'Data cambio stato',
  'Ultimo operatore',
  'Azioni',
];


const TabellaLavoratori = ({ contextState, lavoratori, dataReadyLavoratori, currentPage, setContextState, ricercaLavoratori }) => {
  const dataFormatted = mapRows(lavoratori);

  if (!dataReadyLavoratori) {
    return <Loader label="Loading" size="2em" margin="0" width="inherit" />;
  }

  if (dataFormatted.length === 0) {
    return <Text value="Nessun Risultato" />;
  }
  /**
   * Recuperare informazioni generica candidatura
   */
  return (
    <>
      <Row fluid justifycontent="center" alignitems="center" margin="0 0 .5em 0">
        <Text size="f7" value="Sono state trovate" tag="p" />
        <Text size="f7" value={`${lavoratori[0].count} candidature`} tag="p" weight="bold" padding="0 .25em" />
        <Text size="f7" value="che rispettano i filtri di ricerca impostati" tag="p" />
      </Row>
      <div>
        <StyledTable
          size="f8"
          thWidth="10em"
          thHeight="3em"
          thBorder={`5px solid ${colors.darkBlue}`}
          tdBorder="none!important"
          thColor="white"
          tdHeight="3em"
          tdColor="darkGrey"
          headerBgColor="blue"
          tableWidth="100%"
          Colonne={colonneTabella}
          Righe={dataFormatted}
        />
      </div>
      <Row fluid justifycontent="center">
        <Pagination
          json={lavoratori}
          count={lavoratori[0].count}
          currentPage={currentPage}
          setCurrentPage={async (pageNumber) => {
            const { popupFilters, filtersTable, idRichiestaTcb, calendario } = contextState;
            setContextState({ ...contextState, lavoratori: null, dataReadyLavoratore: false });
            const flagCalendario = calendario;

            const parameters = {
              ...mapLabelToProps(popupFilters),
              ...mapFiltersTableToProps(filtersTable),
              calendario: flagCalendario ? convertObjectToBin(popupFilters[labelCalendario]) : undefined,
            };
            const ricerca = await ricercaLavoratori({
              offset: findNumeroElementi(pageNumber),
              parameters,
              idRichiesta: idRichiestaTcb,
            });
            setContextState({ ...contextState, lavoratori: ricerca, dataReadyLavoratore: true, currentPage: pageNumber });
          }}
          initialPage={1}
          numberitem={MAX_PAGINATION_ITEMS}
          ariatitle="Elenco lavoratori"
          navNumber={4}
          scrollToTop
        />
      </Row>
    </>
  );
};

TabellaLavoratori.displayName = 'Tabella lavoratori da associare';

const mapContextToProps = (context) => ({
  lavoratori: context.contextState.lavoratori,
  dataReadyLavoratori: context.contextState.dataReadyLavoratore,
  currentPage: context.contextState.currentPage,
  setContextState: context.setContextState,
  contextState: context.contextState,
  ricercaLavoratori: context.ricercaLavoratori,
});


export default connectContext(MatchingLavoratoreContext, mapContextToProps)(TabellaLavoratori);
