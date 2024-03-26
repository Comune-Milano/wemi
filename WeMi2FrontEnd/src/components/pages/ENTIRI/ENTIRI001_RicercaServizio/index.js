/** @format */

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Stepper from 'components/ui2/Header/Stepper';
import Loader from 'components/ui2/Loader';
import {
  PAGE_REQUESTSERVICE_URL,
} from 'types/url';
import { generatePath } from 'react-router-dom';
import Modal from 'components/ui2/Modal';
import useWindowSize from 'hooks/useWindowSize';
import Pagination from 'components/ui2/Pagination';
import { Row, Column } from 'components/ui/Grid';
import { SEZIONI } from 'types/sezioni';
import InfoButtonComponent from 'components/shared/ButtonInfo';
import { Wrapper } from './RicercaServizio.styled';
import Filtri from './Filtri';
import GrigliaEnti from './GrigliaEnti';
import BodyHeader from './BodyHeader';

const RicercaServizio = ({
  match,
  location,
  baseBreadcrumbPath,
  history,
  minNumeroPersone,
  maxNumeroPersone,
  prezzoMaxMin,
  setPrezzoMaxMin,
  addressInputRef,
  entiSelezionati,
  setEntiSelezionati,
  services,
  setFiltri,
  fetchServices,
  filterSection,
  filtri,
  indirizzo,
  setIndirizzo,
  setModalData,
  modalData,
  removeEnte,
}) => {
  const windowSize = useWindowSize();
  const param = new URLSearchParams(location.search);
  const codSezione = param.get('codSezione');
  const is0_18 = codSezione === SEZIONI.ANNI_0_18;

  useEffect(() => {
    if (services.data?.filtriPrezzoMaxMin) {
      setPrezzoMaxMin(services.data.filtriPrezzoMaxMin);
    }
  }, [services.data]);

  const [breadcrumbPath, setBreadcrumbPath] = useState();

  useEffect(() => {
    if (filterSection.data?.serviceData && baseBreadcrumbPath && !breadcrumbPath) {
      const { url } = match;

      const objBreadcrumb = {
        slash: filterSection.data.serviceData.serviceName,
        url,
      };

      setBreadcrumbPath([...baseBreadcrumbPath, objBreadcrumb]);
    }
  }, [filterSection.data, baseBreadcrumbPath, breadcrumbPath]);

  const steps = [
    {
      title: 'Scegli il servizio',
      color: 'primary',
      link: null,
      active: false,
      onClickStepHandler: () => null,
    },
    {
      title: 'Seleziona gli enti',
      color: 'orange',
      link: null,
      active: true,
      onClickStepHandler: () => null,
    },
    {
      title: 'Richiedi il servizio',
      color: 'green',
      link: null,
      active: false,
      onClickStepHandler: () => null,
    },
  ];

  const handleSingleFilter = React.useCallback(
    (name, value, withoutPriceRange) => {
      setFiltri(oldState => {
        const newState = {
          ...oldState,
          prezzo: undefined,
          [name]: value,
        };
        setEntiSelezionati([]);
        fetchServices(
          {
            idServizio: parseInt(match.params.idServizio, 10),
            page: 1,
            itemsPerPage: services.data.RicercaServizi.itemPerPage,
            filters: newState,
            withoutPriceRange,
            is0_18,
          }
        );
        return newState;
      });
    }, [match.params, services]
);

  const handleCheckboxes = (name, value) => {
    setFiltri(oldFilterState => {
      const selectedCheckboxes = [...oldFilterState[name]];
      if (selectedCheckboxes.includes(value)) {
        const index = selectedCheckboxes.indexOf(value);
        selectedCheckboxes.splice(index, 1);
      } else {
        selectedCheckboxes.push(value);
      }
      const newState = {
        ...oldFilterState,
        prezzo: undefined,
        [name]: selectedCheckboxes,
      };
      setEntiSelezionati([]);
      fetchServices(
        {
          idServizio: parseInt(match.params.idServizio, 10),
          page: 1,
          itemsPerPage: services.data.RicercaServizi.itemPerPage,
          filters: newState,
          is0_18,
        }
      );
      return newState;
    });
  };

  const componenteFiltri = React.useMemo(
    () => (
      <Filtri
        numeroMinimoPersone={minNumeroPersone}
        numeroMassimoPersone={maxNumeroPersone}
        prezzoMax={prezzoMaxMin ? prezzoMaxMin.prezzoMax : 0}
        prezzoMin={prezzoMaxMin ? prezzoMaxMin.prezzoMin : 0}
        filtri={filtri}
        data={filterSection.data}
        handleCheckboxes={handleCheckboxes}
        handleSingleFilter={handleSingleFilter}
        addressInputRef={addressInputRef}
        indirizzo={indirizzo}
        setIndirizzo={setIndirizzo}
      />
    ), [filtri, filterSection, prezzoMaxMin, minNumeroPersone, maxNumeroPersone]
  );

  const toggleEnte = (ente) => {
    setEntiSelezionati(oldState => {
      const index = entiSelezionati.findIndex(el => el.idServizioEnte === ente.idServizioEnte);
      if (index >= 0) {
        const newState = [...oldState];
        newState.splice(index, 1);
        return newState;
      }
      return [...oldState, ente];
    });
  };

  const handleForward = React.useCallback(
    () => {
      const reqServiceUrlParams = {
        idServizio: match.params.idServizio,
        ...(match.params.idCategoria ? { idCategoria: match.params.idCategoria } : {}),
      };
      const generatedPath = `${generatePath(
        PAGE_REQUESTSERVICE_URL,
        reqServiceUrlParams,
      )}?codSezione=${codSezione}`;
      setModalData({
        open: false,
      });
      history.push(generatedPath, {
        service018: location.state?.service018 ? location.state.service018 === true : false,
      });
    },
    [match.params, history, entiSelezionati]
  );
  const title = 'WeMi - Ricerca servizio erogato';
  const description = 'Ricerca servizio erogato: ricerca e filtra i servizi erogati, seleziona gli enti, personalizza la richiesta, richiedi informazioni e disponibilità';
  const keywords = 'welfare, milano, servizi, servizio, ente, enti, tcb, baby-sitter, colf, badante, PERSONALIZZA LA RICHIESTA, municipio, indirizzo, persone, ore, momento giornata, destinatari, mansioni, scheda, ente, recensioni, richiedi informazioni, RICHIEDI IL SERVIZIO, completa la tua richiesta, richiesta,  richiedi disponibilità, seleziona gli enti';
  return (
    <Wrapper>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>
      {
        filterSection.pristine || filterSection.isLoading
        || services.pristine || services.isLoading ?
          <Loader size="4em" margin="auto" overlay /> :
          null
      }
      {
        filterSection.data && services.data ? (
          <>
            <Breadcrumbs value="Breadcrumb.page" pathSlashes={breadcrumbPath} />
            <Stepper steps={steps} />
            <Wrapper fluid justifycontent="space-between" margin="0">
              {
                ['xs', 'sm'].indexOf(windowSize) < 0 ?
                (
                  <Column xs="12" md="4" padding="0 3em 0 0" tagName="aside">
                    { componenteFiltri }
                  </Column>
                )
                : null
              }
              <Column xs="12" md="8" padding="0">
                <Row direction="column">
                  <GrigliaEnti
                    header={(
                      <BodyHeader
                        addressInputRef={addressInputRef}
                        numeroEntiSelezionati={entiSelezionati.length}
                        filtriComponente={componenteFiltri}
                        handleSingleFilter={handleSingleFilter}
                        filtriHeader={filtri}
                        indirizzo={indirizzo}
                        setIndirizzo={setIndirizzo}
                        setModalData={setModalData}
                        handleForward={handleForward}
                      />
                    )}
                    entiSelezionati={entiSelezionati}
                    toggleEnte={toggleEnte}
                    removeEnte={removeEnte}
                    enti={services.data.RicercaServizi.data}
                    filtri={filtri}
                  />
                </Row>
                <Row fluid flex justifycontent="center">
                  <Pagination
                    scrollToTop
                    margin="2.5em 0 0 0"
                    navNumber={10}
                    count={services.data.RicercaServizi.totalItems}
                    json={[]}
                    currentPage={services.data.RicercaServizi.page}
                    numberitem={services.data.RicercaServizi.itemsPerPage}
                    setCurrentPage={(page) => {
                      fetchServices(
                        {
                          idServizio: parseInt(match.params.idServizio, 10),
                          page,
                          itemsPerPage: services.data.RicercaServizi.itemPerPage,
                          filters: filtri,
                          withoutPriceRange: true,
                          is0_18,
                        }
                      );
                    }}
                    initialPage={1}
                    ariatitle="Elenco enti"
                  />
                </Row>
                {location.state?.service018 &&
                <InfoButtonComponent />
}
              </Column>
            </Wrapper>
            <Modal
              title={modalData.title}
              fontSize="f6"
              open={modalData.open}
              focusTarget={modalData.focusTarget}
              setOpenModal={() => {
                setModalData({
                  title: '',
                  open: false,
                  children: null,
                });
              }}
              color="primary"
            >
              {modalData.children}
            </Modal>
          </>
        ) : null
      }
    </Wrapper>

  );
};

RicercaServizio.displayName = 'RicercaServizio';
export default withRouter(React.memo(RicercaServizio));
