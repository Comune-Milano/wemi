
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { moneyFormat } from 'utils/formatters/moneyFormat';

/**
 * The info about the service the user is going to purchase.
 */
const ServiceInfo = ({
  infoRichiestaEnte,
  dataset,
  otherPaymentSelected,
  locale,
  creditCardOrPaypalSelected,
}) => {
  const methodToCoverResidualAmount = () => {
    if (otherPaymentSelected) {
      return "(Altra modalità concordata con l'ente)";
    } if (creditCardOrPaypalSelected) {
      return '(Carta di credito o Paypal)';
    } return null;
  };

  return (
    <>
      <Row padding="0 0 1em 0">
        <Column xs={12} padding="0 0 0.1em 0">
          <Text
            value="Servizio"
            size="f7"
            weight="bold"
            transform="uppercase"
            letterSpacing="0.05em"
            color="darkGrey"
          />
        </Column>
        <Column xs={12} padding="0">
          <Text
            value={getObjectValue(infoRichiestaEnte, `nomeServizioEnte.${locale}`, null)}
            size="f6"
            weight="bold"
            transform="uppercase"
            letterSpacing="0.05em"
            color="black"
          />
        </Column>
      </Row>

      <Row padding="0">
        <Column xs={12} padding="0 0 0.1em 0">
          <Text
            value="Rilasciato da"
            size="f7"
            weight="bold"
            transform="uppercase"
            letterSpacing="0.05em"
            color="darkGrey"
          />
        </Column>
        <Column xs={12} padding="0">
          <Text
            value={infoRichiestaEnte.nomeEnteCompleto}
            size="f6"
            weight="bold"
            transform="uppercase"
            letterSpacing="0.05em"
            color="black"
          />
        </Column>
      </Row>

      <Row padding="2em 0">
        <Column xs={12} padding="0">
          <img
            src={infoRichiestaEnte.logoEnte}
            style={{ height: '6.9em', width: 'auto' }}
            width="60%"
            alt="Logo servizio"
          />
        </Column>
      </Row>

      <Row padding="0">
        <Column xs={12} sm={8} lg={12} padding="0">
          {infoRichiestaEnte.costoTotaleEnte === 0 ? (
            <>
              <Row padding="0">
                <Column xs={4} padding="0 1em 0 0">
                  <Text
                    tag="div"
                    value="Importo"
                    transform="uppercase"
                    letterSpacing="0.05em"
                    size="f7"
                    weight="bold"
                    color="darkGrey"
                  />

                  <Text
                    tag="div"
                    value="Gratuito"
                    size="f7"
                    weight="bold"
                    transform="uppercase"
                    letterSpacing="0.05em"
                    color="black"
                  />
                </Column>
                <Column xs={8} padding="0">
                  <Text
                    tag="div"
                    value="Periodo"
                    transform="uppercase"
                    letterSpacing="0.05em"
                    size="f7"
                    weight="bold"
                    color="darkGrey"
                  />
                  <Text
                    tag="div"
                    value={`Dal ${infoRichiestaEnte.periodoPropostoDal || '-'} al ${infoRichiestaEnte.periodoPropostoAl || '-'}`}
                    size="f6"
                    weight="bold"
                    transform="uppercase"
                    letterSpacing="0.05em"
                    color="black"
                  />
                </Column>
              </Row>
            </>
      ) : (
        <>
          <Row fluid padding="0" margin="0 0 2.5em 0">
            <Column xs={5} padding="0">
              <Text
                tag="div"
                value={`+  ${moneyFormat(infoRichiestaEnte.costoTotaleEnte, true)}`}
                transform="uppercase"
                letterSpacing="0.05em"
                size="f5"
                weight="bold"
                color="black"
              />
            </Column>
            <Column xs={7} padding="0" alignself="center">
              <Text
                tag="div"
                value="importo totale"
                transform="uppercase"
                letterSpacing="0.05em"
                size="f7"
                weight="bold"
                color="black"
              />
            </Column>
          </Row>
          {dataset.totalVoucherImport > 0 ? (
            <>
              <Row fluid padding="0" margin="0 0 2.5em 0">
                <Column xs={5} padding="0">
                  <Text
                    tag="div"
                    value={`-  ${moneyFormat(dataset.totalVoucherImport, true)}`}
                    transform="uppercase"
                    letterSpacing="0.05em"
                    size="f5"
                    weight="bold"
                    color="primary"
                  />
                </Column>
                <Column xs={7} padding="0" alignself="center">
                  <Text
                    tag="div"
                    value="quota voucher"
                    transform="uppercase"
                    letterSpacing="0.05em"
                    size="f7"
                    weight="bold"
                    color="black"
                  />
                </Column>
              </Row>
              <Row fluid padding="0" margin="0 0 2.5em 0">
                <Column xs={5} padding="0">
                  <Text
                    tag="div"
                    value={`+ ${moneyFormat((infoRichiestaEnte.costoTotaleEnte - dataset.totalVoucherImport), true)}`}
                    transform="uppercase"
                    letterSpacing="0.05em"
                    size="f5"
                    weight="bold"
                    color="green"
                  />
                </Column>
                <Column xs={7} padding="0" alignself="center">
                  <Text
                    tag="div"
                    value="quota residua "
                    transform="uppercase"
                    letterSpacing="0.05em"
                    size="f7"
                    weight="bold"
                    color="black"
                  />
                  <Row fluid>
                    <Text
                      tag="div"
                      size="f7"
                      color="black"
                      value={methodToCoverResidualAmount()}
                    />
                  </Row>
                </Column>
              </Row>
            </>
        )
          : null }
          <Column xs={12} padding="0">
            <Text
              tag="div"
              value="Periodo"
              transform="uppercase"
              letterSpacing="0.05em"
              size="f7"
              weight="bold"
              color="darkGrey"
            />
            <Text
              tag="div"
              value={`Dal ${infoRichiestaEnte.periodoPropostoDal || '-'} al ${infoRichiestaEnte.periodoPropostoAl || '-'}`}
              size="f6"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              color="black"
            />
          </Column>
        </>
      )}
        </Column>
      </Row>
    </>
  );
};

ServiceInfo.displayName = 'ServiceInfo';

const mapStoreToProps = store => ({
  locale: store.locale,
});

export default connect(
  mapStoreToProps
)(
  memo(ServiceInfo)
);
