
import React, { memo } from 'react';
import Modal from 'components/ui2/Modal';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Text from 'components/ui/Text';
import { Row } from 'components/ui/Grid';
import { ModalButton } from './styled';

const AmountNotCoveredByVoucherModal = ({
  openModalVouchers,
  setModalVouchersVisible,
}) => (
  <>
    <Modal
      open={openModalVouchers}
      setOpenModal={setModalVouchersVisible}
      color="green"
      fontSize="f6"
      padding="6em 3em 3.5em 3em"
    >
      <Row fluid justifycontent="center">
        <Text
          value="Il voucher non copre l'intera cifra dell'acquisto."
          weight="bold"
          align="center"
          size="f6"
        />
      </Row>
      <Row fluid justifycontent="center" margin="2em 0 0 0" sizemargin={{ xs: '2em 0 0 0', md: '6em 0 0 0', lg: '6em 0 0 0', xl: '6em 0 0 0' }}>
        <ModalButton
          label="seleziona la modalità di pagamento per la quota residua"
          onClick={() => { setModalVouchersVisible(false); }}
          color="green"
        />
      </Row>
    </Modal>
  </>
  );

AmountNotCoveredByVoucherModal.displayName = 'AmountNotCoveredByVoucherModal';

const mapStoreToProps = store => ({
  locale: store.locale,
});

export default connect(
  mapStoreToProps
)(
  withRouter(
    memo(AmountNotCoveredByVoucherModal)
  )
);
