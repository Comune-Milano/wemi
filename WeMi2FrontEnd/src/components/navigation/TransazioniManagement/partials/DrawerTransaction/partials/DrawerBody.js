/** @format */
import React from 'react';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import Text from 'components/ui/Text';
import { connect } from 'react-redux';
import { PAGE_DETTAGLIO_TRANSAZIONE } from 'types/url';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import withAuthentication from 'hoc/withAuthentication';
import { FilterIndexAdd } from 'redux-modules/actions/entEriActions';
import { withRouter, generatePath } from 'react-router-dom';
import { stornoTransazione as stornoTransazioneM, contabilizzaTransazione as contabilizzaTransazioneM } from '../../../graphql/graphql';

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
  const mutationStornoTransazione = useStatelessGraphQLRequest(
    stornoTransazioneM, undefined, undefined, undefined, true,
  );

  const mutationContabilizzaTransazione = useStatelessGraphQLRequest(
    contabilizzaTransazioneM, undefined, undefined, undefined, true,
  );

  const onClickStornoTransazione = async () => {
    try {
      await mutationStornoTransazione({ id: [bodyValue.idTransazioneVoucher] });
      setOpenSuccessModal({
        open: true,
        message: 'Operazione effettuata con successo',
      });
    } catch (error) {
      setOpenErrorModal({ open: true });
    }
    refreshList();
  };

  const onClickContabilizzaTransazione = async () => {
    try {
      await mutationContabilizzaTransazione({ id: [bodyValue.idTransazioneVoucher] });
      setOpenSuccessModal({
        open: true,
        message: 'Operazione effettuata con successo',
      });
    } catch (error) {
      setOpenErrorModal({ open: true });
    }
    refreshList();
  };

  const onClicDettaglioTransazione = () => {
    return history.push(generatePath(PAGE_DETTAGLIO_TRANSAZIONE, { idTransazione: bodyValue.idTransazioneVoucher }));
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
              value="Storno transazione"
            />
          </StyledColumn>
          <StyledColumn xs="6" lg="5" padding="1em 0 0">
            <Button
              fontSize="f7"
              disabled={bodyValue?.state !== 'Registrata'}
              label="Storno transazione"
              onClick={onClickStornoTransazione}
            />
          </StyledColumn>
        </Row>
        <Row fluid justifycontent="space-between" alignitems="center" display="flex">
          <StyledColumn xs="5" padding="1em 0 0">
            <Text
              tag="p"
              align="left!important"
              weight="bold"
              size="f7"
              value="Contabilizza la transazione"
            />
          </StyledColumn>
          <StyledColumn xs="6" lg="5" padding="1em 0 0">
            <Button
              fontSize="f7"
              disabled={bodyValue?.state !== 'Registrata'}
              label="Contabilizza transazione"
              onClick={onClickContabilizzaTransazione}
            />
          </StyledColumn>
        </Row>
        <Row fluid justifycontent="space-between" alignitems="center" display="flex">
          <StyledColumn xs="5" padding="1em 0 0">
            <Text
              tag="p"
              align="left!important"
              weight="bold"
              size="f7"
              value="Consulta il dettaglio della transazione"
            />
          </StyledColumn>
          <StyledColumn xs="6" lg="5" padding="1em 0 0">
            <Button
              fontSize="f7"
              type="primary"
              label="Consulta transazione"
              onClick={onClicDettaglioTransazione}
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
