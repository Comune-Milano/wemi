/** @format */

import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { graphqlRequest, currentRequest } from 'redux-modules/actions/authActions';
import { Row } from 'components/ui/Grid';
import withAuthentication from 'hoc/withAuthentication';
import Pagination from 'components/ui2/Pagination';
import TabellaEsitiNegativiCaricamento from './TabellaEsitiNegativiCaricamento';


const EsitiNegativiCaricamentoTablePagination = ({
  listaMotivi,
}) => {
  const currentItems = listaMotivi;

  const [paginatedList, setPaginatedList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const numberItems = 5;

  useEffect(() => {
    const newList = currentItems.slice(0, 5);
    setPaginatedList(newList);
  }, []);

  const impagination = (numero) => {
    const start = (numero - 1) * 5;
    const end = numero * 5;
    const newList = currentItems.slice(start, end);
    setPaginatedList(newList);
  };

  return (
    <Fragment>
      <TabellaEsitiNegativiCaricamento listaMotivi={paginatedList} />
      <Row fluid justifycontent="center">
        <Pagination
          json={[]}
          callback={(numero) => impagination(numero)}
          count={currentItems ? currentItems.length : 0}
          currentPage={currentPage}
          numberitem={numberItems}
          setCurrentPage={setCurrentPage}
          navNumber={numberItems}
        />
      </Row>
    </Fragment>
  );
};
EsitiNegativiCaricamentoTablePagination.displayName = 'EsitiNegativiCaricamentoTablePagination';

const mapStoreToProps = (store) => ({
  locale: store.locale,
});
const mapDispatchToProps = {
  graphqlRequest,
  currentRequest,
};
export default connect(mapStoreToProps, mapDispatchToProps)(withAuthentication(EsitiNegativiCaricamentoTablePagination));
