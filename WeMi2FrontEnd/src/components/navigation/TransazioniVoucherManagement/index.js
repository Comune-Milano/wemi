import React, { useMemo, useState } from 'react';
import { Row } from 'components/ui/Grid';
import Loader from 'components/ui2/Loader';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { getVoucherTransaction as getVoucherTransactionListQ } from './graphql/graphql';
import DatiVoucher from './partials/DatiVoucher';
import TransactionVoucherTablePagination from './partials/PaginatedTable/TransactionVoucherTablePagination';
import { ErrorModal } from './partials/CommunicationModal/ErrorModal';
import { SuccessModal } from './partials/CommunicationModal/SuccessModal';
import { NUMBER_ITEMS_TABLE } from './costants';
import { dataMapperTransactionVoucherList } from './graphql/dataMappers';
import { estraiVoucher } from '../VouchersManagement/partials/DrawerVoucher/partials/VoucherGraphQL';


const TransazioniVoucherManagement = ({
  idVoucher,
}) => {
  // filter and order base
  const inputTransactionsVoucherList = React.useRef({
    idVoucher,
    elementsPerPage: NUMBER_ITEMS_TABLE,
    page: 1,
  });

  const [transactionsVoucherList, callTransactionsVoucherList] = useGraphQLRequest(
    undefined,
    getVoucherTransactionListQ,
    {
      idVoucher: inputTransactionsVoucherList.current.idVoucher,
      page: inputTransactionsVoucherList.current.page,
      elementsPerPage: NUMBER_ITEMS_TABLE,
    },
    true,
    // create JSON with totalRows and list
    dataMapperTransactionVoucherList
  );

  const [voucher] = useGraphQLRequest(
    undefined,
    estraiVoucher,
    { idVoucher },
    true,
    rs => {
      return {
        title: `Voucher ${rs.state}`,
        voucher: rs,
      };
    }
  );

  const [openErrorModal, setOpenErrorModal] = useState({ open: false, message: '' });

  const [openSuccessModal, setOpenSuccessModal] = useState({ open: false, message: '' });

  const { open: errorOpen, message: errorMessage } = openErrorModal;

  const { open: successOpen, message: successMessage } = openSuccessModal;


  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const elementsToShow = NUMBER_ITEMS_TABLE;
  useMemo(() => {
    inputTransactionsVoucherList.current.page = currentPage;
    callTransactionsVoucherList(
      {
        idVoucher: inputTransactionsVoucherList.current.idVoucher,
        page: inputTransactionsVoucherList.current.page,
        elementsPerPage: inputTransactionsVoucherList.current.elementsPerPage,
      }
    );
  }, [currentPage]);

  return (
    <>
      {
        // loading VoucherList:
        transactionsVoucherList.isLoading || transactionsVoucherList.pristine || voucher.isLoading || voucher.pristine ?
          <Loader size="4em" margin="auto" overlay />
          : null
      }
      <ErrorModal
        open={errorOpen}
        setOpenErrorModal={setOpenErrorModal}
        message={errorMessage}
      />
      <SuccessModal
        open={successOpen}
        setOpenSuccessModal={setOpenSuccessModal}
        message={successMessage}
      />
      <Row padding="0 0 2em 1em" fluid>
        <DatiVoucher datiVoucher={voucher.data} />
      </Row>
      {transactionsVoucherList.data?.totalRows > 0 ? (
        <Row fluid justifycontent="center">
          <TransactionVoucherTablePagination
            currentPage={currentPage}
            numberitem={elementsToShow}
            setCurrentPage={setCurrentPage}
            transactionsVoucherList={transactionsVoucherList}
            getTransactionVoucherList={callTransactionsVoucherList}
            setOpenErrorModal={setOpenErrorModal}
            setOpenSuccessModal={setOpenSuccessModal}
          />
        </Row>
      ) : null}
    </>
  );
};

TransazioniVoucherManagement.displayName = 'TransazioniVoucherNavigation';

export default TransazioniVoucherManagement;
