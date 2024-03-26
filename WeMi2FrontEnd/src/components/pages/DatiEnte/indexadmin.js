/** @format */

import React from 'react';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { connect } from 'react-redux';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Wrapper from 'components/navigation/NavigationWrapper';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import RedirectAdmin from 'components/router/RedirectAdmin';
import DatiEnte from './form';

const DatiIdentificativiEnteAdmin = ({ userProfile }) => {
  const BreadcrumbPath = [
    {
      slash: 'Home',
      url: '',
    },
    {
      slash: 'Area personale',
      url: 'AreaPersonale',
    },
    {
      slash: 'gestione ente',
      url: 'gestioneEnti',
    },
    {
      slash: 'Dati identificativi ente',
      url: `/admin/gestioneEnte/${-1}/SchedaServiziEnte/DatiEnte`,
    },
  ];
  const { datiLogin } = userProfile;
  const validitaAdmin = checkAdmin(datiLogin);
  return (
    <Wrapper>
      {!validitaAdmin ? <RedirectAdmin /> : (
        <>
          <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
          <Row fluid padding="20px">
            <Text size="f3" value="Dati " color="darkGrey" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
            <Text size="f3" value="identificativi " color="darkGrey" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
            <Text size="f3" value="Ente" color="darkGrey" transform="uppercase" letterSpacing="0.05em" weight="bold" padding="0 0.5em 0 0" />
          </Row>
          <DatiEnte />
        </>
      )}
    </Wrapper>
  );
};

const mapDispatchToProps = {
  graphqlRequest,
};

function mapStateToProps(state) {
  const { graphql } = state;
  const { enteAddTx, dominioByTipoS, error } = graphql;
  return {
    enteAddTx,
    dominioByTipoS,
    error,
  };
}

DatiIdentificativiEnteAdmin.displayName = 'DatiIdentificativiEnteAdmin';
const DatiIdentificativiEnteWithAuth = withAuthentication(DatiIdentificativiEnteAdmin);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatiIdentificativiEnteWithAuth);
