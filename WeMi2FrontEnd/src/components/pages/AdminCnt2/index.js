import React from 'react';
import Wrapper from 'components/navigation/NavigationWrapper';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import { graphqlRequest, resetField } from 'redux-modules/actions/authActions';
import { setFilter } from 'redux-modules/actions/filterActions';
import { connect } from 'react-redux';
import withAuthentication from 'hoc/withAuthentication';
import RedirectAdmin from 'components/router/RedirectAdmin';
import checkAdmin from 'utils/functions/checkAdmin';
import { withRouter } from 'react-router-dom';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import Loader from 'components/ui2/Loader';
import { PAGE_ADMIN_CNT_01_URL } from 'types/url';
import { Title } from 'components/pages/SchedaEntePage/shared';
import Tabella2 from './Tabella2';
import { tipologiaContenutoPK as tipologiaContenutoPKQ } from './graphql/tipologiaContenuto';
import { getDominioByTipoS as getDominioByTipoSQ } from './graphql/getDominioByTipo';
import { getContenutoTy as getContenutoTyQ } from './graphql/getContenutoTy';
import Header from './Header';
import { Filters } from './Filters';
import { ContentContextProvider } from './ContentContext';

const Cont002 = ({
  userProfile,
  match,
  offset = 0,
  locale,
}) => {
  /**
   * The type of content took from the url via params
   */
  const { tyCnt } = match.params;

  const typeContenuto = parseInt(tyCnt, 10);

  /**
   * Request to get the domain of the selected type of content
   */
  const [typeStateOfContent] = useGraphQLRequest(
    undefined,
    getDominioByTipoSQ,
    {
      typeDominio: 'STATO_CONTENUTO',
    },
    true
  );
  /**
  * Request to get the contents of the selected type
  */
  const [contenutoTyData, getContenutoTyData] = useGraphQLRequest(
    undefined,
    getContenutoTyQ,
    {
      typeContenuto,
      offset,
    },
    true
  );

  /**
  * Request to get the description of the selected type of contents
  */
  const [tipologiaContenuto] = useGraphQLRequest(
    undefined,
    tipologiaContenutoPKQ,
    {
      typeContenuto,
    },
    true
  );

  const dataTypeContenuto = tipologiaContenuto.data;


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
      url: PAGE_ADMIN_CNT_01_URL,
    },
    {
      slash: dataTypeContenuto && `Gestione ${dataTypeContenuto.ty_contenuto}`,
      url: match.url,
    },
  ];

  const { datiLogin } = userProfile;

  const validitaAdmin = checkAdmin(datiLogin);

  const renderFilters = !typeStateOfContent.isLoading && !typeStateOfContent.errored && !typeStateOfContent.pristine;

  const renderTable = !contenutoTyData.isLoading && !contenutoTyData.errored && !contenutoTyData.pristine;

  if (!validitaAdmin) {
    return (<RedirectAdmin />);
  }

  const isLoading = !renderFilters && !renderTable;

  const hasErrors = contenutoTyData.errored || typeStateOfContent.errored;

  const content = dataTypeContenuto || {};
  return (
    <Wrapper>
      {/* aggiunge TUTTI al select del filtro */}
      <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
      <Title
        firstTitle="Gestione"
        secondTitle=" "
        animatedTitle={content.ty_contenuto || ''}
        isLoading={isLoading}
        hasErrors={hasErrors}
      />
      <ContentContextProvider>
        <>
          <Header
            typeContenuto={typeContenuto}
            datiLogin={datiLogin}
          />
          {renderFilters ? (
            <Filters
              typeStateOfContent={typeStateOfContent.data}
              getContenutoTyData={getContenutoTyData}
              typeContenuto={typeContenuto}
            />
          )
            : null}
          {renderTable ?
            (
              <Tabella2
                typeContenuto={typeContenuto}
                getContenutoTyData={getContenutoTyData}
                contenutoTyData={contenutoTyData}
                typeStateOfContent={typeStateOfContent}
                locale={locale}
              />
            )
            :
            (
              <Loader
                margin="3em auto 20em auto"
                size="5em"
              />
            )
          }
        </>
      </ContentContextProvider>
    </Wrapper>
  );
};

const mapDispatchToProps = {
  graphqlRequest,
  resetField,
  setFilter,
};

function mapStateToProps(state) {
  const { graphql } = state;
  const { filter, locale } = state;
  const { dominioByTipoS, contenutoTy, EstraiContenutoCompleto, tipologiaContenutoPK, statoContenutoUPD, error, loaded } = graphql;
  return {
    filtriCNT2: filter.filter,
    dominioByTipoS,
    contenutoTy,
    EstraiContenutoCompleto,
    statoContenutoUPD,
    loaded,
    tipologiaContenutoPK,
    locale,
    error,
  };
}

Cont002.displayName = 'Cont002';
const Cont002WithAuth = withAuthentication(Cont002);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withRouter(
    Cont002WithAuth
  )
);
