import React from 'react';
import { Helmet } from 'react-helmet';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import {
  PAGE_HOME_URL,
} from 'types/url';
import Stepper from 'components/ui2/Header/Stepper';
import Wrapper from 'components/navigation/NavigationWrapper';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import { breadcrumbFromSez } from 'utils/functions/functionsCodSezione';
import { SEZIONI } from 'types/sezioni';
import { steps } from './utils';
import { getCategories, getServices as getServicesQuery } from './SearcServicesGraphQL';
import { SERVICES_TOKEN_STORAGE_KEY } from '../ENTIRI/RequestServiceFlow/constants';
import ServicesBody from './servicesBody';

const SearchServices = ({
  location,
  history,
}) => {
  const [services, getServices] = useGraphQLRequest(
    [],
    getServicesQuery,
  );

  const param = new URLSearchParams(location.search);
  const tag = param.get('tag');
  const categoria = param.get('idCategoria');
  const idCategoria = Number.isNaN(categoria) ? null : parseInt(categoria, 10);
  const codSezione = param.get('codSezione');
  const mdServices = services.data.category ? 8 : 12;

  const [serviceSection, getServiceSection] = useGraphQLRequest(
    [],
    getCategories,
    { tag: tag || '' },
);
  React.useEffect(
    () => {
      localStorage.removeItem(SERVICES_TOKEN_STORAGE_KEY);

      if (!tag && !idCategoria) {
        history.push(PAGE_HOME_URL);
      } else if (location.state && location.state.isFromHomeSearch) {
        getServiceSection();
      } else {
        getServices({
          tag,
          idCategoria,
          is0_18: codSezione === SEZIONI.ANNI_0_18,
        });
      }
    },
    []
  );

  let pathName = '...';
  if (services.data.category) {
    pathName = services.data.category.name;
  } else if (tag) {
    pathName = tag;
  }

  const stepBefore = React.useMemo(() => breadcrumbFromSez(codSezione, location), [codSezione, location]);
  const breadcrumbPath = React.useMemo(() => {
    const breadcrumb = [
      {
        slash: 'Home',
        url: '',
      },
    ];
    if (stepBefore) {
      breadcrumb.push({
        slash: stepBefore.slash,
        url: stepBefore.url,
      });
    }
    breadcrumb.push({
      slash: pathName,
      url: window.location.href,
    });
    return breadcrumb;
  }, [stepBefore, pathName]);


  const title = 'WeMi - Categoria servizi';
  const description = 'Categoria servizi: scegli il servizio di welfare.';
  const keywords = 'welfare, milano, servizio, servizi, ente, servizi di welfare, ricerca, acquisto servizi';

  const isFromHomeSearch = location.state && location.state.isFromHomeSearch;

  return (
    <Wrapper>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>
      <Breadcrumbs
        value="Breadcrumb.page"
        pathSlashes={breadcrumbPath}
      />
      <Stepper steps={steps} />
      <ServicesBody
        isFromHomeSearch={isFromHomeSearch}
        services={services}
        serviceSection={serviceSection}
        mdServices={mdServices}
        codSezione={codSezione}
      />
    </Wrapper>
  );
};

SearchServices.displayName = 'Pagina ricerca servizi';

export default SearchServices;
