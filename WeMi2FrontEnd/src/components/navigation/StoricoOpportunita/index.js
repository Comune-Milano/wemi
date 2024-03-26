/** @format */

import React from 'react';
import { Row } from 'components/ui/Grid';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { connect } from 'react-redux';
import Wrapper from './partials/Wrapper';
import SezioneLavoratoreFiltri from './partials/SezioneLavoratoreFiltri';
import OpportunitaTablePagination from './partials/OpportunitaTablePagination';

const StoricoOpportunita = ({ dati, datistorico, setFilters, filters, loaded, locale }) => {
  return (
    <Row fluid>
      <Wrapper>
        <SezioneLavoratoreFiltri
          setFilters={setFilters}
          filters={filters}
        />
        <OpportunitaTablePagination
          dati={dati}
          datistorico={datistorico}
          locale={locale}
        />
      </Wrapper>
    </Row>
  );
};

const mapStoreToProps = store => ({
  locale: store.locale,
  loaded: store.graphql.loaded,
});
const mapDispatchToProps = ({
  graphqlRequest,
});

StoricoOpportunita.displayName = 'StoricoOpportunita';
export default connect(mapStoreToProps, mapDispatchToProps)(StoricoOpportunita);
