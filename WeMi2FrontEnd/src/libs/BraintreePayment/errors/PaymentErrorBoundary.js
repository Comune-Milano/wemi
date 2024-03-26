
import React from 'react';
import Modal from 'components/ui2/Modal';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import Text from 'components/ui/Text';
import { isFunction } from 'util';

/**
 * Catches unexpected errors within the payment flow.
 */
export class PaymentErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      modalVisible: false,
    };
  }

  /**
   * @inheritdoc
   */
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, modalVisible: true };
  }

  /**
   * Changes the visibility of the modal.
   */
  changeModalVisibility(visible) {
    const { onErrorModalClose } = this.props;

    if (!visible && isFunction(onErrorModalClose)) {
      onErrorModalClose();
    }
    this.setState({ modalVisible: visible });
  }

  /**
   * @inheritdoc
   */
  render() {
    const { hasError, modalVisible } = this.state;
    if (hasError) {
      const modalBody = (
        <Row fluid justifycontent="center" padding="0">
          <Column
            xs="12"
            justifycontent="center"
            padding="1rem 0"
          >
            <Text
              tag="p"
              size="f7"
              align="center"
              value="Si è verificato un errore inatteso."
            />
            <Text
              tag="p"
              size="f7"
              align="center"
              value="Prova a ripetere la procedura d'acquisto."
            />
          </Column>
          <Column
            flex
            xs="12"
            justifycontent="center"
            padding="1rem 0"
          >
            <Button
              autowidth
              label="Chiudi"
              color="red"
              onClick={() => this.changeModalVisibility(false)}
            />
          </Column>
        </Row>
      );

      return (
        <Modal
          open={modalVisible}
          setOpenModal={visible => this.changeModalVisibility(visible)}
          title="Errore inatteso"
          color="red"
          fontSize="f6"
          minHeight="auto"
        >
          {modalBody}
        </Modal>
      );
    }

    const { children } = this.props;
    return children;
  }
}

PaymentErrorBoundary.displayName = 'PaymentErrorBoundary';
