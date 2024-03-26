import React, { useMemo, useState } from 'react';
import { Row } from 'components/ui/Grid';
import Loader from 'components/ui2/Loader';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { getVoucherList as getVoucherListQ, getVoucherDetail as getVoucherdetailQ } from './graphql/graphql';
import VouchersTablePagination from './partials/PaginatedTable/VoucherTablePagination';
import ModaleDettaglioVoucher from './partials/ModaleDettaglioVoucher/ModaleDettaglioVoucher';
import { NUMBER_ITEMS_TABLE } from './costants';
import { dataMapperVoucherList, dataMapperVoucherDetail } from './graphql/dataMappers';


const ConsultazioneVoucher = () => {
  // filter and order base
  const filterVoucherList = React.useRef({
    elementsPerPage: NUMBER_ITEMS_TABLE,
    page: 1,
  });

  const filterVoucher = React.useRef({
    idVoucher: 0,
    elementsPerPage: NUMBER_ITEMS_TABLE,
    page: 1,
  });

  const [voucherList, callVoucherList] = useGraphQLRequest(
    undefined,
    getVoucherListQ,
    { page: filterVoucherList.current.page, elementsPerPage: filterVoucherList.current.elementsPerPage },
    true,
    // create JSON with totalRows and list
    dataMapperVoucherList
  );

  const [voucher, eVoucher] = useGraphQLRequest(
    undefined,
    getVoucherdetailQ,
    { idVoucher: filterVoucher.current.idVoucher, page: filterVoucher.current.page, elementsPerPage: filterVoucher.current.elementsPerPage },
    false,
    dataMapperVoucherDetail
  );

  const [openVoucherModal, setOpenVoucherModal] = useState(false);
  const findVoucher = (idVoucher, page) => {
    filterVoucher.current.idVoucher = idVoucher;
    filterVoucher.current.page = page;
    eVoucher({ idVoucher: filterVoucher.current.idVoucher, page: filterVoucher.current.page, elementsPerPage: filterVoucher.current.elementsPerPage });
  };

  // Pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const [currentPageTransaction, setCurrentPageTransaction] = React.useState(1);
  const elementsToShow = NUMBER_ITEMS_TABLE;
  useMemo(() => {
    filterVoucherList.current.page = currentPage;
    callVoucherList(
      { page: filterVoucherList.current.page, elementsPerPage: filterVoucherList.current.elementsPerPage }
    );
  }, [currentPage]);
  useMemo(() => {
    filterVoucher.current.page = currentPageTransaction;
    eVoucher({ idVoucher: filterVoucher.current.idVoucher, page: filterVoucher.current.page, elementsPerPage: filterVoucher.current.elementsPerPage });
  }, [currentPageTransaction]);

  const resetPagination = () => {
    setCurrentPageTransaction(1);
  };

  return (
    <>
      {
        // loading VoucherList:
        voucherList.isLoading || voucherList.pristine ?
          <Loader size="4em" margin="auto" overlay />
          : null
      }
      <ModaleDettaglioVoucher
        voucher={voucher}
        openVoucherModal={openVoucherModal}
        setOpenVoucherModal={setOpenVoucherModal}
        getVoucher={eVoucher}
        currentPageTransaction={currentPageTransaction}
        setCurrentPageTransaction={setCurrentPageTransaction}
        numberitem={elementsToShow}
        resetPagination={resetPagination}
      />
      {voucherList.data?.totalRows > 0 ? (
        <Row fluid justifycontent="center">
          <VouchersTablePagination
            currentPage={currentPage}
            numberitem={elementsToShow}
            setCurrentPage={setCurrentPage}
            voucherList={voucherList}
            getVoucherList={callVoucherList}
            findVoucher={findVoucher}
            setOpenVoucherModal={setOpenVoucherModal}
          />
        </Row>
      ) : null}
    </>
  );
};

ConsultazioneVoucher.displayName = 'ConsultazioneVoucherNavigation';

export default ConsultazioneVoucher;
