/** @format */

import React, { useState } from 'react';
import { Row, Column } from 'components/ui/Grid'
import Pagination from 'components/ui2/Pagination';
import OpportunitaTable from './OpportunitaTable';

const OpportunitaTablePagination = ({ dati, datistorico, locale }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const elementsToShow = 10;

  return (
    <>
      <OpportunitaTable
        dati={dati}
        datistorico={datistorico}
        locale={locale}
      />
      <Row fluid justifycontent="center">
        <Pagination
          json={datistorico.StoricoLavoratoreFiltro}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numberitem={elementsToShow}
          initialPage={1}
          ariatitle="Elenco di richieste"
          navNumber={1}
        />
      </Row>
    </>
  )
};

OpportunitaTablePagination.displayName = 'OpportunitaTablePagination';
export default OpportunitaTablePagination;
