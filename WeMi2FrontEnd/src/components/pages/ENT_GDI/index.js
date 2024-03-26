/** @format */

import React from 'react';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { connect } from 'react-redux';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Wrapper from 'components/navigation/NavigationWrapper';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import GestioneEnte from './gestioneEnte';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import RedirectAdmin from 'components/router/RedirectAdmin';


const GestioneEntePage = ({ userProfile }) => {

  const BreadcrumbPath = [
    {
      slash: 'Home',
      url: ''
    },
    {
      slash: 'Area personale',
      url: 'areaPersonale'
    },
    {
      slash: 'Gestione Enti',
      url: 'gestioneEnti'
    },
  ];
  // const strDatiLogin = sessionStorage.getItem('DatiLogin');
  // const datiLogin = strDatiLogin && JSON.parse(strDatiLogin);
  const { datiLogin } = userProfile;
  const validitaAdmin = checkAdmin(datiLogin);
  return (
        <Wrapper>
          {!validitaAdmin ?
        <RedirectAdmin />
        : 
      <>
          <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
          <Row fluid padding="20px">
            <Text size="f3" value="Gestione " color="darkGrey" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
            <Text size="f3" value="Enti" color="darkGrey" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
          </Row>

          <Row>
            <GestioneEnte />
          </Row>
          </>}
        </Wrapper>
      )
    
};

GestioneEntePage.displayName = 'GestioneEntePage';

const GestioneEnteWithAuth = withAuthentication(GestioneEntePage);

const mapDispatchToProps = {
  graphqlRequest
};

function mapStateToProps(state) {
  const { graphql } = state;
  const { enteAddTx, StatoGestEntePK, dominioByTipoS, error } = graphql;
  // const { datiLogin } = state;
  return {
    datiLogin: state.datiLogin,
    enteAddTx,
    StatoGestEntePK,
    dominioByTipoS,
    error,
  };
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuthentication(GestioneEnteWithAuth));
