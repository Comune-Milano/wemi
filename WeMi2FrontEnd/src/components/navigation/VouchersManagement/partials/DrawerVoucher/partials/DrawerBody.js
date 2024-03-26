/** @format */
import React from 'react';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import Text from 'components/ui/Text';
import { connect } from 'react-redux';
import { PAGE_LISTA_TRANSAZIONI_VOUCHER } from 'types/url';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import withAuthentication from 'hoc/withAuthentication';
import { FilterIndexAdd } from 'redux-modules/actions/entEriActions';
import { withRouter, generatePath } from 'react-router-dom';
import { annulloVoucher as annulloVoucherM, ripristinaVoucher as ripristinaVoucherM } from './VoucherGraphQL';

const StyledColumn = styled(Column)`
 p {
  text-align: left;
 }
`;

const DrawerBody = ({
  bodyValue,
  refreshList,
  history,
  setOpenErrorModal,
  setOpenSuccessModal,
}) => {
  const mutationAnnulloVoucher = useStatelessGraphQLRequest(
    annulloVoucherM, undefined, undefined, undefined, true,
  );

  const mutationRipristinaVoucher = useStatelessGraphQLRequest(
    ripristinaVoucherM, undefined, undefined, undefined, true,
  );

  const onClickAnnulloVoucher = async () => {
    try {
      await mutationAnnulloVoucher({ id: bodyValue.idVoucher });
      setOpenSuccessModal({
        open: true,
        message: 'Operazione effettuata con successo',
      });
    } catch (error) {
      setOpenErrorModal({ open: true });
    }
    refreshList();
  };

  const onClickRipristinoVoucher = async () => {
    try {
      await mutationRipristinaVoucher({ id: bodyValue.idVoucher });
      setOpenSuccessModal({
        open: true,
        message: 'Operazione effettuata con successo',
      });
    } catch (error) {
      setOpenErrorModal({ open: true });
    }
    refreshList();
  };

  const onClicDettaglioTransazioniVoucher = () => {
    return history.push(generatePath(PAGE_LISTA_TRANSAZIONI_VOUCHER, { idVoucher: bodyValue.idVoucher }));
  };

  return (
    <>
      <Row padding="3em" fluid>
        <Row fluid justifycontent="space-between" alignitems="center" display="flex">
          <StyledColumn xs="5" padding="1em 0 0">
            <Text
              tag="p"
              align="left!important"
              weight="bold"
              size="f7"
              value="Annullo del voucher"
            />
          </StyledColumn>
          {bodyValue?.state === 'Attivo' ? (
            <StyledColumn xs="6" lg="5" padding="1em 0 0">
              <Button
                fontSize="f7"
                label="Annullo Voucher"
                onClick={onClickAnnulloVoucher}
              />
            </StyledColumn>
          ) : (
            <StyledColumn xs="6" lg="5" padding="1em 0 0">
              <Button
                fontSize="f7"
                disabled
                label="Annullo Voucher"
                onClick={onClickAnnulloVoucher}
              />
            </StyledColumn>
          )}
        </Row>
        <Row fluid justifycontent="space-between" alignitems="center" display="flex">
          <StyledColumn xs="5" padding="1em 0 0">
            <Text
              tag="p"
              align="left!important"
              weight="bold"
              size="f7"
              value="Ripristino annullo del voucher"
            />
          </StyledColumn>
          {bodyValue?.state === 'Annullato' ? (
            <StyledColumn xs="6" lg="5" padding="1em 0 0">
              <Button
                fontSize="f7"
                label="Ripristino Voucher"
                onClick={onClickRipristinoVoucher}
              />
            </StyledColumn>
          ) : (
            <StyledColumn xs="6" lg="5" padding="1em 0 0">
              <Button
                fontSize="f7"
                disabled
                label="Ripristino Voucher"
                onClick={onClickRipristinoVoucher}
              />
            </StyledColumn>
          )}
        </Row>
        <Row fluid justifycontent="space-between" alignitems="center" display="flex">
          <StyledColumn xs="5" padding="1em 0 0">
            <Text
              tag="p"
              align="left!important"
              weight="bold"
              size="f7"
              value="Visualizza transazioni del voucher"
            />
          </StyledColumn>
          <StyledColumn xs="6" lg="5" padding="1em 0 0">
            <Button
              fontSize="f7"
              type="primary"
              label="Dettaglio transazioni"
              onClick={onClicDettaglioTransazioniVoucher}
            />
          </StyledColumn>
        </Row>
      </Row>
    </>
  );
};

DrawerBody.displayName = 'DrawerBody';

const mapStoreToProps = store => ({
  locale: store.locale,
  pathname: store.routing.pathname,
});
const mapDispatchToProps = ({
  graphqlRequest,
  FilterIndexAdd,
});

export default connect(mapStoreToProps, mapDispatchToProps)(withAuthentication(withRouter(DrawerBody)));
