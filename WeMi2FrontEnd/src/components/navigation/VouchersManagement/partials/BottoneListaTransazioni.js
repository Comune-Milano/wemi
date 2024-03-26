/** @format */
import React from 'react';
import { connect } from 'react-redux';
import { PAGE_LISTA_TRANSAZIONI } from 'types/url';
import Button from 'components/ui2/Button';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import withAuthentication from 'hoc/withAuthentication';
import { FilterIndexAdd } from 'redux-modules/actions/entEriActions';
import { withRouter, generatePath } from 'react-router-dom';

const BottoneListaTransazioni = ({
  history,
  active,
}) => {
  const onClickTransactionsList = () => {
    return history.push(generatePath(PAGE_LISTA_TRANSAZIONI));
  };

  return (
    <>
      <Button
        type="button"
        disabled={!active}
        width="100%"
        label="Lista Transazioni Voucher"
        color="primary"
        size="f7"
        onClick={() => onClickTransactionsList()}
        padding="0.4em 1em"
        margin="0em 0em 0.4em 0em"
      />
    </>
  );
};

BottoneListaTransazioni.displayName = 'BottoneListaTransazioni';

const mapStoreToProps = store => ({
  locale: store.locale,
  pathname: store.routing.pathname,
});
const mapDispatchToProps = ({
  graphqlRequest,
  FilterIndexAdd,
});

export default connect(mapStoreToProps, mapDispatchToProps)(withAuthentication(withRouter(BottoneListaTransazioni)));
