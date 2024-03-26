import React, { useEffect } from 'react';
import styled from 'styled-components';
import Wrapper from 'components/navigation/NavigationWrapper';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Text from 'components/ui/Text';
import Loader from 'components/ui/Loader';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { connect } from 'react-redux';
import { setFilter } from 'redux-modules/actions/filterActions';
import NavLink from 'components/router/NavLink';
import { colors } from 'theme';
import RedirectAdmin from 'components/router/RedirectAdmin';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import { PAGE_CONTENT_SECTION_LIST, PAGE_CONTENUTO_SLIDER_0_18, PAGE_CONTENT_AREA_LIST, PAGE_CONTENT_SLIDER_FINANCIAL_EDUCATION_LIST, PAGE_CONTENT_SERVICE_LIST } from 'types/url';
import { SECTIONS, SLIDER_018, CATEGORIE_LIVELLO_1, SLIDER_EDUCAZIONE_FINANZIARIA, SERVIZI } from 'types/contenuti/typeContenuto';
import { tipologiaContenutoAll as tipologiaContenutoAllQ } from './adminGraphQL1';
import { Row, Column } from '../../ui/Grid';

const DivCard = styled.div`
width: 80%;
text-align:left;
position: relative;
display: flex;
align-items: center;
border-top: 0 solid #f0f0f0;
border-bottom: 0.2em solid #f0f0f0;
padding: 1.2em 1.2em 1em;
height: 100%;
overflow: hidden;
transition: all 0.2s linear, max-height 0.2s ease-out ;
:hover{
  border-top: 0.1em solid ${colors.grey};
  border-bottom: 0.2em  solid ${colors.blue};
  padding: 1.1em 1.2em 1em;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.18), 0 12px 6px -6px rgba(0, 0, 0, 0.15);
  transition: all 0.2s linear, box-shadow 0.3s ease-in-out;
}

span {
  font-weight: 100;
  transition: all 0.5s linear;
  &:hover {
    color: ${colors.darkBlue}!important;
    transition: all .2s ease-in-out;
  }
}
`;


const Cont001 = ({ userProfile, tipologiaContenutoAll, graphqlRequest, setFilter, loaded }) => {
  const BreadcrumbPath = [
    {
      slash: 'Home',
      url: '',
    },
    {
      slash: 'Area personale',
      url: 'areaPersonale',
    },
    {
      slash: 'Gestione Contenuti',
      url: `admin/${window.location.pathname.split('admin/')[1].split('/cnt')[0]}/cnt`,
    },
  ];
  const { datiLogin } = userProfile;
  const validitaAdmin = checkAdmin(datiLogin);

  useEffect(() => {
    if (validitaAdmin) {
      graphqlRequest(tipologiaContenutoAllQ());
      setFilter('');
    }
  }, [graphqlRequest, validitaAdmin]);

  const handleTypeContenuto = event => {
    sessionStorage.setItem('tyCont', event.target.id);
  };

  const getUrl = (element) => {
    if (element.id === SECTIONS) {
      return PAGE_CONTENT_SECTION_LIST;
    }
    if (element.id === SERVIZI) {
      return PAGE_CONTENT_SERVICE_LIST;
    }
    if (element.id === SLIDER_018) {
      return PAGE_CONTENUTO_SLIDER_0_18;
    }
    if (element.id === CATEGORIE_LIVELLO_1) {
      return PAGE_CONTENT_AREA_LIST;
    }
    if (element.id === SLIDER_EDUCAZIONE_FINANZIARIA) {
      return PAGE_CONTENT_SLIDER_FINANCIAL_EDUCATION_LIST;
    }
    return `/admin/${window.location.pathname.split('admin/')[1].split('/cnt')[0]}/cnt/${element.id}`;
  };

  return (
    <Wrapper>
      {!validitaAdmin ?
        <RedirectAdmin />
        : (
          <>
            <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
            <Row fluid padding="20px">
              <Text
                size="f3"
                value="Gestione"
                color="darkGrey"
                transform="uppercase"
                letterSpacing="0.05em"
                padding="0 0.5em 0 0"
              />
              <Text
                size="f3"
                value="Contenuti"
                color="darkGrey"
                transform="uppercase"
                letterSpacing="0.05em"
                weight="bold"
                padding="0 0.5em 0 0"
              />
            </Row>
            {loaded === 1 && <Loader size="2em" margin="0 20px" width="fit-content" />}

            <Row fluid justifycontent="flex-start">
              {
              tipologiaContenutoAll && tipologiaContenutoAll.sort((a, b) => {
                if (a.id < b.id) {
                  return -1;
                }
                return null;
              }).map((k, index) => (
                <Column key={index.toString()} xs="7" onClick={handleTypeContenuto} margin="0" padding="0 2em" justifycontent="flex-start">
                  <NavLink to={getUrl(k)} id={k.id} align="left" width="100%">
                    <DivCard>
                      <Text
                        color="blue"
                        transform="uppercase"
                        letterSpacing="0.05em"
                        align="center"
                        value={`${k.id} -`}
                        padding="0 0.5em 0 0"
                        size="f7"
                      />
                      <Text
                        color="blue"
                        transform="uppercase"
                        letterSpacing="0.05em"
                        align="center"
                        value={` ${k.ty_contenuto}`}
                        size="f7"
                        letterSpacing="0.05em"
                      />
                    </DivCard>
                  </NavLink>
                </Column>
                ))
            }
            </Row>
          </>
      )}

    </Wrapper>
  );
};

const mapDispatchToProps = {
  graphqlRequest,
  setFilter,
};

function mapStateToProps(state) {
  const { graphql } = state;
  const { tipologiaContenutoAll, error, loaded } = graphql;
  return {
    tipologiaContenutoAll,
    loaded,
    error,
  };
}

Cont001.displayName = 'Cont001';
const Cont001WithAuth = withAuthentication(Cont001);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cont001WithAuth);
