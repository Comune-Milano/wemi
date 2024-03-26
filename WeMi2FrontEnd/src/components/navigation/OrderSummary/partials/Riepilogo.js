/** @format */

import React from 'react';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { PagamentoButtons } from './PagamentoPartials';
import { connect } from 'react-redux';
import { graphqlRequest } from 'redux-modules/actions/authActions';

const WrapperColumn = styled(Column)`
  position: relative;
  height: max-content;
  justify-content: flex-end;
`;

const Riepilogo = ({dati}) => {
if(dati && dati.txNome){
  return (
    <WrapperColumn xs="12" md="8">
      <Row fluid justifycontent="center" flex>
        <Column xs="12" md="6" padding="0 20px 0 0">
          <Text value="Importo:" color="darkGrey" size="f6" tag="h1" weight="light" />
          <Text value="€15,00" color="primary" weight="light" size="f5" tag="h5" />
          <Text value="Modalità di pagamento: " color="darkGrey" size="f6" tag="p" weight="light" />
          <Text value={`${dati.modalitaPagamento && dati.modalitaPagamento.value}`} color="darkGrey" weight="bold" size="f6" tag="p" />
        </Column>

        <Column xs="12" md="6" padding="0">
          <Text value="Dati fatturazione" color="darkGrey" size="f6" tag="h1" weight="light" />
          <Row padding="5px 0">
            <Text value="Intestato a: " color="darkGrey" size="f8" padding="0 0.2rem 0 0" />
            <Text value={`${dati && dati.txNome} ${dati && dati.txCognome}`} color="darkGrey" size="f8" weight="bold" />
          </Row>
          <Row padding="5px 0">
            <Text value="Residente in: " color="darkGrey" size="f8" padding="0 0.2rem 0 0" />
            <Text
              value={`${dati && dati.txIndirizzo} - ${dati && dati.txComune} - ${dati && dati.txCap}`}
              color="darkGrey"
              size="f8"
              weight="bold"
            />
          </Row>
          <Row padding="5px 0">
            <Text
              value="Codice Fiscale/P.IVA: "
              color="darkGrey"
              size="f8"
              padding="0 0.2rem 0 0"
            />
            <Text value={`${dati && dati.txCodiceFiscaleoPIva}`} color="darkGrey" size="f8" weight="bold" />
          </Row>
          <Row padding="5px 0">
            <Text value="Telefono: " color="darkGrey" size="f8" padding="0 0.2rem 0 0" />
            <Text
              value={`${dati && dati.txTelefonoFisso}`}
              color="darkGrey"
              size="f8"
              weight="bold"
              padding="0 0.2rem 0 0"
            />
            <Text value="/Mobile: " color="darkGrey" size="f8" padding="0 0.2rem 0 0" />
            <Text value={`${dati && dati.txTelefonoMobile}`} color="darkGrey" size="f8" weight="bold" />
          </Row>
          <Row padding="10px 0">
            <Text
              value="Note in fattura: "
              color="darkGrey"
              tag="h6"
              size="f8"
              weight="bold"
              padding="0 0.2rem 0 0"
            />
            <Text
              value={`${dati && dati.txNote}`}
              color="darkGrey"
              tag="p"
              size="f8"
            />
          </Row>
        </Column>

        <PagamentoButtons />
      </Row>
    </WrapperColumn>
  )}
  else{
    return(
    window.location.href = `${window.location.pathname.split('/cart')[0]}`
  )}
};

Riepilogo.displayName = 'Riepilogo';

const mapStoreToProps = store =>({
  dati: store.datiFattura
})

const mapDispatchToProps = ({
  graphqlRequest,
});
export default connect(mapStoreToProps,mapDispatchToProps)(Riepilogo);
