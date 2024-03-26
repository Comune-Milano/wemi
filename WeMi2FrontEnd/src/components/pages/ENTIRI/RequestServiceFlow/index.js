
import React, { useEffect, useState } from 'react';
import { PAGE_REQUESTSERVICE_URL, PAGE_ENTI_SERVICES_SEARCH_URL, PAGE_QUERY_SERVICES } from 'types/url';
import {
  Route,
  generatePath,
  Redirect,
} from 'react-router-dom';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import RequestServicePage from 'components/pages/ENTIRI/ENTIRI002_RichiestaServizio';
import Wrapper from 'components/navigation/NavigationWrapper';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { useExtRedirectTaskSchedule } from 'hooks/externalRedirect/useExtRedirectTaskSchedule';
import { useLogger } from 'services/Logger';
import Loader from 'components/ui2/Loader';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { useFormApi } from 'libs/Form/hooks/useFormApi';
import { FormContextProvider } from 'libs/Form/context/FormContext';
import moment from 'moment';
import { breadcrumbFromSez } from 'utils/functions/functionsCodSezione';
import withAuthentication from 'hoc/withAuthentication';
import { SEZIONI } from 'types/sezioni';
import RicercaServizio from '../ENTIRI001_RicercaServizio';
import { matchReqServiceFlowSubroutes } from './utils/routesMatcher';
import {
  getCategory as getCategoryQuery,
  verifyTokenService,
  getTokenService,
} from './graphql';
import {
  getMinPersoneQuantita,
  getFilters as getFiltersQ,
  getServices,
} from '../ENTIRI001_RicercaServizio/SearchGraphQL';
import {
  SERVICES_TOKEN_STORAGE_KEY,
  requestServiceFormInitialDataset,
  requestServiceFormValidationSchema,
} from './constants';
import ErrorModal from './modal';

const RequestServiceFlow = ({
  match,
  userProfile,
  location,
}) => {
  const param = new URLSearchParams(location.search);
  const codSezione = param.get('codSezione');
  const is0_18 = codSezione === SEZIONI.ANNI_0_18;

  const { idCategoria, idServizio: stringifiedIdServizio } = match.params;
  const idServizio = Number.parseInt(stringifiedIdServizio, 10);
  const [isVisibleErrorModal, setVisibleErrorModal] = useState(false);
  const [error, setError] = useState();
  const logger = useLogger();
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [entiSelezionati, setEntiSelezionati] = useState([]);
  const addressInputRef = React.useRef();
  const [minNumeroPersone, setMinNumeroPersone] = useState(1);
  const [maxNumeroPersone, setMaxNumeroPersone] = useState();
  const [prezzoMaxMin, setPrezzoMaxMin] = useState();
  const [indirizzo, setIndirizzo] = useState('');

  const [modalData, setModalData] = useState({
    open: false,
    title: '',
    children: null,
    focusTarget: null,
  });
  const [filterSection] = useGraphQLRequest(
    undefined,
    getFiltersQ,
    { idServizioRiferimento: idServizio },
    true,
  );

  const { datiLogin } = userProfile;

  const formContextApi = useFormApi({
    initialDataset: requestServiceFormInitialDataset(datiLogin?.isYoung),
    validationSchema: requestServiceFormValidationSchema,
    validateOnChange: true,
  });

  const verifyToken = useStatelessGraphQLRequest(verifyTokenService);
  const getServicesToken = useStatelessGraphQLRequest(getTokenService);

  const getMinPersoneQuantitaRequest = useStatelessGraphQLRequest(
    getMinPersoneQuantita,
    { idServizio }
  );

  const [services, fetchServices] = useGraphQLRequest(
    undefined,
    getServices,
    {
      idServizio,
      page: 1,
      itemsPerPage: 6,
      is0_18,
      filters: {
        mansioni: [],
        destinatari: [],
        fasceOrarie: [],
        orderBy: 1, // 1 prezzo crescente, 2 prezzo decrescente, 3 recensione decrescente
      },
    },
    false
  );

  const [filtri, setFiltri] = useState({
    quantitaPersone: 0,
    quantitaUnita: 0,
    gratuito: false,
    mansioni: [],
    destinatari: [],
    fasceOrarie: [],
    cdStatoServizi: [],
    orderBy: null,
    municipio: null,
  });

  const [categoria, getCategory] = useGraphQLRequest(
    undefined,
    getCategoryQuery,
  );

  const [breadcrumbPath, setBreadcrumbPath] = useState();

  useEffect(() => {
    const parsedIdCategoria = idCategoria && Number.parseInt(idCategoria, 10);
    getCategory({ idCategoria: parsedIdCategoria });
  }, [idCategoria]);

  const stepBefore = React.useMemo(() => breadcrumbFromSez(codSezione, location), [codSezione, location]);

  useEffect(() => {
    if (breadcrumbPath || categoria.isLoading || categoria.pristine) {
      return;
    }

    const newBreadcrumbPath = [
      {
        slash: 'Home',
        url: '',
      },
    ];

    if (stepBefore) {
      newBreadcrumbPath.push({
        slash: stepBefore.slash,
        url: stepBefore.url,
      });
    }

    if (idCategoria && categoria.data) {
      newBreadcrumbPath.push({
        slash: categoria.data.name,
        url: `${PAGE_QUERY_SERVICES}`,
        search: `idCategoria=${idCategoria}&codSezione=${codSezione}`,
        state: {
          isOnly018: location.state?.service018 ? location.state.service018 === true : false,
        },
      });
    }

    setBreadcrumbPath(newBreadcrumbPath);
  }, [categoria, idCategoria, breadcrumbPath]);

  let minPersoneQuantitaData;

  useEffect(() => {
    (async() => {
      minPersoneQuantitaData = await getMinPersoneQuantitaRequest();
      const filtriMinPersoneQuantita = getObjectValue(
      minPersoneQuantitaData,
      'filtriMinPersoneQuantita'
    );
      const numeroMinimoPersone = getObjectValue(filtriMinPersoneQuantita, 'numeroMinimoPersone', 1);
      const limiteMassimoPersoneAssoluto = getObjectValue(filtriMinPersoneQuantita, 'limiteMassimoPersoneAssoluto', undefined);
      const numeroMinimoUnita = getObjectValue(filtriMinPersoneQuantita, 'numeroMinimoUnita', 1);
      setMinNumeroPersone(numeroMinimoPersone);
      setMaxNumeroPersone(limiteMassimoPersoneAssoluto);
      const newFiltersQuantitaState = {
        quantitaPersone: numeroMinimoPersone,
        quantitaUnita: numeroMinimoUnita,
      };

      const token = localStorage.getItem(SERVICES_TOKEN_STORAGE_KEY);
      let tokenStoredFilters = {};
      let tokenStoredPage = 1;
      try {
        const data = await (token ? verifyToken({ token }) : Promise.resolve());
        if (data?.idService === idServizio) {
          const {
          filters = {},
          services: servicesToken = [],
          page,
          fromDay,
          toDay,
          messaggioAgliEnti,
          infoDisp,
        } = data;

          setEntiSelezionati(servicesToken);
          setIndirizzo(filters.indirizzo);

          formContextApi.setFormFields({
            ...(fromDay ? { fromDay: moment(fromDay).toDate() } : {}),
            ...(toDay ? { toDay: moment(toDay).toDate() } : {}),
            ...(messaggioAgliEnti ? { messaggioAgliEnti } : {}),
            ...(infoDisp ? { infoDisp } : {}),
          });

          tokenStoredPage = page;
          tokenStoredFilters = filters;
        }
      } catch (errorRequest) {
        localStorage.removeItem(SERVICES_TOKEN_STORAGE_KEY);
        setVisibleErrorModal(true);
        setError(errorRequest);
      }

      setFiltri(oldFilterState => {
        const newFiltersState = {
          ...oldFilterState,
          ...newFiltersQuantitaState,
          ...tokenStoredFilters,
        };

        fetchServices(
          {
            idServizio,
            page: tokenStoredPage,
            itemsPerPage: services.data?.RicercaServizi.itemPerPage,
            filters: newFiltersState,
          }
      );

        return newFiltersState;
      });
    })();
  }, []);

  useExtRedirectTaskSchedule(async () => {
    logger.info('(Request service flow) Get services token...');
    setLoaderVisible(true);

    const filterSectionData = filterSection.data;

    const destinatariSelezionati = filtri.destinatari.map(
      idDestinatario => filterSectionData.filtriDestinatari.find(
        filter => filter.id === idDestinatario
      )?.id
    );
    const mansioniSelezionate = filtri.mansioni.map(
      idMansione => filterSectionData.filtriMansioni.find(
        filter => filter.id === idMansione
      )?.id
    );
    const fasceOrarieSelezionate = filtri.fasceOrarie.map(
      idFascia => filterSectionData.filtriFasceOrarie.find(
        filter => filter.id === idFascia
      )?.id
    );
    const { page = 1 } = services.data.RicercaServizi;

    try {
      const servicesToken = await getServicesToken({
        input: {
          idService: idServizio,
          services: entiSelezionati,
          page,
          fromDay: formContextApi.dataset.fromDay || requestServiceFormInitialDataset(datiLogin?.isYoung).fromDay,
          toDay: formContextApi.dataset.toDay || requestServiceFormInitialDataset(datiLogin?.isYoung).toDay,
          messaggioAgliEnti: formContextApi.dataset.messaggioAgliEnti || requestServiceFormInitialDataset(datiLogin?.isYoung).messaggioAgliEnti,
          infoDisp: formContextApi.dataset.infoDisp || requestServiceFormInitialDataset(datiLogin?.isYoung).infoDisp,
          filters: {
            mansioni: mansioniSelezionate,
            quantitaPersone: filtri.quantitaPersone,
            quantitaUnita: filtri.quantitaUnita,
            destinatari: destinatariSelezionati,
            gratuito: filtri.gratuito,
            orderBy: filtri.orderBy,
            municipio: filtri.municipio,
            fasceOrarie: fasceOrarieSelezionate,
            cdStatoServizi: filtri.cdStatoServizi,
            indirizzo,
            prezzo: filtri.prezzo,
          },
        },
      });

      if (servicesToken) {
        logger.info('(Request service flow) Save services token to local storage.', servicesToken);
        localStorage.setItem(SERVICES_TOKEN_STORAGE_KEY, servicesToken);
      }
      setLoaderVisible(false);
    } catch (errorRequest) {
      setLoaderVisible(false);
    }
  });

  useEffect(
    () => () => {
      localStorage.removeItem(SERVICES_TOKEN_STORAGE_KEY);
    },
    []
  );

  const shouldRedirect = !matchReqServiceFlowSubroutes(location.pathname);
  const removeEnte = (idServizioEnte) => {
    setEntiSelezionati(oldState => {
      const index = entiSelezionati.findIndex(el => el.idServizioEnte === idServizioEnte);
      const newState = [...oldState];
      newState.splice(index, 1);
      return newState;
    });
  };

  return (
    <Wrapper>
      {loaderVisible ? <Loader overlay zIndex="5000" /> : null}
      {error ? (
        <ErrorModal
          error={error}
          setModalVisible={setVisibleErrorModal}
          modalVisible={isVisibleErrorModal}
        />
      ) : null}
      {
        shouldRedirect ?
          (
            <Redirect
              to={`${generatePath(PAGE_ENTI_SERVICES_SEARCH_URL, {
                idCategoria,
                idServizio,
              })}?codSezione=${codSezione}`}
            />
          ) :
          null
      }
      <Route
        exact
        path={PAGE_ENTI_SERVICES_SEARCH_URL}
        render={props => (
          <RicercaServizio
            {...props}
            minNumeroPersone={minNumeroPersone}
            maxNumeroPersone={maxNumeroPersone}
            prezzoMaxMin={prezzoMaxMin}
            setPrezzoMaxMin={setPrezzoMaxMin}
            baseBreadcrumbPath={breadcrumbPath}
            addressInputRef={addressInputRef}
            entiSelezionati={entiSelezionati}
            setEntiSelezionati={setEntiSelezionati}
            indirizzo={indirizzo}
            setIndirizzo={setIndirizzo}
            modalData={modalData}
            setModalData={setModalData}
            filterSection={filterSection}
            services={services}
            fetchServices={fetchServices}
            filtri={filtri}
            setFiltri={setFiltri}
            removeEnte={removeEnte}
          />
        )}
      />
      <Route
        exact
        path={PAGE_REQUESTSERVICE_URL}
        render={props => (
          <FormContextProvider value={formContextApi}>
            <RequestServicePage
              {...props}
              baseBreadcrumbPath={breadcrumbPath}
              entiSelezionati={entiSelezionati}
              destinatariDisponibili={filterSection.data?.filtriDestinatari || []}
              mansioniDisponibili={filterSection.data?.filtriMansioni || []}
              fasceOrarieDisponibili={filterSection.data?.filtriFasceOrarie || []}
              indirizzo={indirizzo}
              filtri={filtri}
              removeEnte={removeEnte}
            />
          </FormContextProvider>
        )}
      />
    </Wrapper>
  );
};

RequestServiceFlow.displayName = 'RequestServiceFlow';

export default withAuthentication(RequestServiceFlow);
