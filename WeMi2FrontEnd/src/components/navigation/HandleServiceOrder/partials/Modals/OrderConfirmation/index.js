
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { withRouter, generatePath } from 'react-router-dom';
import * as moment from 'moment';
import { PAGE_REQUESTSINDEX_URL } from 'types/url';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import Modal from 'components/ui2/Modal';
import Button from 'components/ui2/Button';
import { Row, Column } from 'components/ui/Grid';
import ConfirmationModalRow from './ConfirmationModalRow';
import { FREE } from 'types/requestType';
import { requestTypeChecker } from 'components/navigation/HandleServiceOrder/utils/requestTypeChecker';
import { moneyFormat } from 'utils/formatters/moneyFormat';

/**
 * The confirmation modal to show when the payment completes
 * with success.
 */
const OrderConfirmationModal = ({
  open,
  setOpenModal,
  infoRichiestaEnte,
  history,
  locale,
  transactionIdentifier,
}) => {
  // Formats a date.
  const formatDate = date => moment(date).format('DD/MM/YY');

  /**
   * Changes the visibility of the modal.
   * @param {*} visible
   */
  const changeModalVisibility = visible => {
    setOpenModal(visible);
    if (!visible) {
      history.push(generatePath(PAGE_REQUESTSINDEX_URL, { locale }));
    }
  };

  /**
   * Verify the type of the request free or payment
   */
  const requestType = requestTypeChecker(infoRichiestaEnte);
  
  const type = requestType === FREE;

  /** INNER COMPONENTS */

  const modalBody = (
    <Row>
      <Column
        xs={12}
        padding="0 0 0.4rem 0"
        flex
        justifycontent="center"
      >
        <table>
          <tbody>
            <ConfirmationModalRow
              label="Richiesta"
              text={`Richiesta ${transactionIdentifier} del ${moment().format('DD/MM/YYYY')}`}
            />
            <ConfirmationModalRow
              label="Ente"
              text={infoRichiestaEnte.nomeEnteCompleto}
            />
            <ConfirmationModalRow
              label="Servizio"
              text={getObjectValue(infoRichiestaEnte, `nomeServizioEnte.${locale}`)}
            />            
            <ConfirmationModalRow
              label="Costo"
              text={!type ? moneyFormat( infoRichiestaEnte.costoTotaleEnte ? infoRichiestaEnte.costoTotaleEnte : infoRichiestaEnte.costoTotaleCalcolato, true) : 'Gratuito'}
            />
            <ConfirmationModalRow
              label="Periodo"
              text={`Dal ${infoRichiestaEnte.periodoPropostoDal || "-"} al ${infoRichiestaEnte.periodoPropostoAl || "-"}`}
            />
          </tbody>
        </table>
      </Column>
      <Column xs={12} flex justifycontent="center" padding="2em 0">
        <Button
          label="Vai allo storico delle richieste"
          name="storico-richieste"
          fontSize="f7"
          color="primary"
          autowidth
          onClick={() =>
            history.push(generatePath(PAGE_REQUESTSINDEX_URL, { locale }))
          }
        />
      </Column>
    </Row>
  );

  /** end of INNER COMPONENTS */

  return (
    <>
      <Modal
        open={open}
        setOpenModal={changeModalVisibility}
        title={!type? "Il tuo pagamento é stato effettuato con successo" : "L'ACQUISTO É STATO EFFETTUATO CON SUCCESSO"}
        color="primary"
        fontSize="f6"
      >
        {modalBody}
      </Modal>
    </>
  );
};

OrderConfirmationModal.displayName = 'OrderConfirmationModal';

const mapStoreToProps = store => ({
  locale: store.locale,
});

export default connect(
  mapStoreToProps
)(
  withRouter(
    memo(OrderConfirmationModal)
  )
);
