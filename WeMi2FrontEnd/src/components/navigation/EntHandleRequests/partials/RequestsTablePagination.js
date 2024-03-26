/** @format */

import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { graphqlRequest, currentRequest } from 'redux-modules/actions/authActions';
import { Row } from 'components/ui/Grid';
import withAuthentication from 'hoc/withAuthentication';
import Pagination from 'components/ui2/Pagination';
import { calcolaStatiRichiestaEnte } from 'utils/functions/calcolaStatiRichiestaEnte';
import moment from 'moment';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { RequestsTable } from '.';
import DrawerVisualizza from './DrawerVisualizza';
import { findNumeroElementi } from '../utils/numeroelementi';

const RequestsTablePagination = ({
  numberitem,
  currentPage,
  setCurrentPage,
  richiesteEnte,
  scrollDown,
  isEnte,
  isFeedback,
  tableColumns,
  getRichiesteEnte,
}) => {
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState({});
  const currentItems = richiesteEnte.result.slice();
  const { dataset } = useFormContext();
  const getElementi = async (pageNumber) => {
    const elementi = findNumeroElementi(pageNumber);
    await getRichiesteEnte(dataset, elementi, true);
  };

  return (
    <Fragment>
      <RequestsTable
        tableColumns={tableColumns}
        richiesteEnte={currentItems}
        open={open}
        isEnte={isEnte}
        setOpen={setOpen}
        setRowData={setRowData}
        isFeedback={isFeedback}
      />
      <Row fluid justifycontent="center">
        <Pagination
          json={[]}
          callback={(numero) => getElementi(numero)}
          count={getObjectValue(richiesteEnte, 'count', 0)}
          currentPage={currentPage}
          numberitem={numberitem}
          setCurrentPage={setCurrentPage}
          navNumber={numberitem}
        />
      </Row>

      <DrawerVisualizza
        open={open}
        setOpen={setOpen}
        drawerType={!isEnte ? 'operatore' : 'ente'}
        bodyValue={rowData}
        isFeedback={isFeedback}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        headerValue={{
          text: calcolaStatiRichiestaEnte(rowData),
          date: moment(rowData.timestampCreazione).format('DD/MM/YYYY'),
        }}
        scrollDown={scrollDown}
        getElementi={getElementi}
      />
    </Fragment>
  );
};
RequestsTablePagination.displayName = 'RequestsTablePagination';

const mapStoreToProps = (store) => ({
  RichiestaServizioDrawer: store.graphql.RichiestaServizioDrawer,
  locale: store.locale,
  filtri: store.entEri,
});
const mapDispatchToProps = {
  graphqlRequest,
  currentRequest,
};
export default connect(mapStoreToProps, mapDispatchToProps)(withAuthentication(RequestsTablePagination));
