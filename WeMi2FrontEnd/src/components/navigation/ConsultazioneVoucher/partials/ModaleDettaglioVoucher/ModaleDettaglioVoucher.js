/** @format */

import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Modal from 'components/ui2/Modal';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Accordion from 'components/ui/Accordion';
import Pagination from 'components/ui2/Pagination';
import Loader from 'components/ui2/Loader';
import styled from 'styled-components';
import Button from 'components/ui2/Button';
import { colors } from 'theme';
import VoucherSection from './VoucherSection';
import TransactionSection from './TransactionSection';

export const HeaderRow = styled(Row)`
  background-color: ${colors.greyInput};
  border-bottom: 2px solid ${colors.greyInput};
  `;
export const StyledAccordion = styled(Accordion)`
  background-color: ${colors.white}
  border-bottom: 1px solid ${colors.primary}
  border-radius: 0 !important
  padding: 1em 0 0 0
`;
const ModaleCaricamentoVoucher = ({
  voucher,
  openVoucherModal,
  setOpenVoucherModal,
  getVoucher,
  currentPageTransaction,
  setCurrentPageTransaction,
  numberitem,
  resetPagination,
}) => {
  const bando = 'Voucher ' + voucher?.data?.voucherInfo.bando + ' - ' + voucher?.data?.voucherInfo.code;
  const idVoucher = voucher?.data?.voucherInfo.code;

  const [keepOpen, setKeepOpen] = useState(false);

  const paginationCallback = () => {
    setKeepOpen(true);
    getVoucher();
  };

  const closeModal = (action) => {
    setKeepOpen(action);
    setOpenVoucherModal(action);
    resetPagination();
  };

  const Header = () =>
  (
    <HeaderRow>
      <Column md="12" sm="12" padding="2em">
        <Row>
          <Text
            padding="0"
            tag="strong"
            size="f4"
            weight="bold"
            color="blac"
            transform="uppercase"
            letterSpacing="0.05em"
            value={bando}
          />
        </Row>
      </Column>
    </HeaderRow>
  );
  Header.displayName = 'Header';
  return (
    <>
      <Modal
        padding="1em"
        customModal
        header={Header}
        open={openVoucherModal}
        setOpenModal={closeModal}
        color="primary"
        title={idVoucher}
        fontSize="f6"
        width="80%"
      >
        {
          voucher?.isLoading || voucher?.pristine ?
            <Loader size="4em" margin="auto" overlay />
            : (
              <>
                <StyledAccordion
                  headerPadding="0 !important"
                  padding="0 !important"
                  aperto
                  arrowSize="f5"
                  arrowOpenColor="primary"
                  arrowClosedColor="primary"
                  AccordionHeader={() => (
                    <Text
                      padding="0 !important"
                      margin="0 !important"
                      tag="strong"
                      size="f6"
                      weight="bold"
                      color="primary"
                      transform="uppercase"
                      letterSpacing="0.05em"
                      value="dettaglio voucher"
                    />
                  )}
                >
                  <VoucherSection voucherDetails={voucher?.data?.voucherInfo} />
                </StyledAccordion>
                {voucher?.data?.totalRows && voucher?.data?.totalRows > 0 ?
                  (
                    <StyledAccordion
                      headerPadding="0 !important"
                      aperto={keepOpen}
                      arrowSize="f5"
                      arrowOpenColor="primary"
                      arrowClosedColor="primary"
                      AccordionHeader={() => (
                        <Text
                          padding="0 !important"
                          margin="0 !important"
                          tag="strong"
                          size="f6"
                          weight="bold"
                          color="primary"
                          transform="uppercase"
                          letterSpacing="0.05em"
                          value="dettaglio transazioni"
                        />
                      )}
                    >
                      <TransactionSection transactionDetails={voucher?.data?.list} />
                      <Row fluid justifycontent="center">
                        <Pagination
                          json={[]}
                          callback={() => paginationCallback()}
                          count={voucher?.data?.totalRows ? voucher.data.totalRows : 0}
                          currentPage={currentPageTransaction}
                          numberitem={numberitem}
                          setCurrentPage={setCurrentPageTransaction}
                          navNumber={numberitem}
                        />
                      </Row>
                    </StyledAccordion>
                  )
                  : null}
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '3rem 0 0 0' }}>
                  <Button
                    autowidth
                    label="TORNA ALL'ELENCO VOUCHER"
                    onClick={() => closeModal(false)}
                    fontSize="f7"
                    color="primary"
                    margin="0 0.5rem 0 0"
                  />
                </div>
              </>
            )
        }
      </Modal>
    </>
  );
};

ModaleCaricamentoVoucher.displayName = 'ModaleCaricamentoVoucher';

export default withRouter(ModaleCaricamentoVoucher);
