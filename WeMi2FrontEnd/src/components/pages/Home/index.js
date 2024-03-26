/** @format */

import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import debounce from 'utils/functions/debounce';
import { useNavHeight } from 'hooks/useNavHeight';
import {
  getContenutoTestoCarousel as getContenutoTestoCarouselQuery,
  getAllCategorie as getAllCategorieQuery,
  getContenutoCards as getContenutoCardsQuery,
  getDatiAccountability as getDatiAccountabilityQuery,
  getFilteredTags as getFilteredTagsQuery,
} from './GraphQLHomepage';
import {
  MainCarousel,
  Searchbox,
  SectionsCards,
  Counter,
  Contacts,
  WhatSThis,
} from './partials';

const HomePage = ({
  locale,
  preview,
  location,
}) => {
  const lastScrolledAnchor = useRef({ search: '', hash: '' });
  const [tags, setTags] = useState([]);
  const [tagsLoading, setTagsLoading] = useState(false);

  const [text, setText] = useState([]);
  const [contenutoTestoCarousel, getContenutoTestoCarousel] = useGraphQLRequest(
    undefined,
    getContenutoTestoCarouselQuery,
    {},
    false,
    response => response.map(contenuto => ({
      ...contenuto,
      iw_path_media1: encodeURI(contenuto.iw_path_media1),
    }))
  );

  const [allCategories, getAllCategories] = useGraphQLRequest(
    undefined,
    getAllCategorieQuery,
  );

  const [contenutoCards, getContenutoCards] = useGraphQLRequest(
    undefined,
    getContenutoCardsQuery,
    {},
    false,
    response => response.map(contenuto => ({
      ...contenuto,
      iw_path_media1: encodeURI(contenuto.iw_path_media1),
    }))
  );

  const [datiAccountability, getDatiAccountability] = useGraphQLRequest(
    undefined,
    getDatiAccountabilityQuery,
  );

  const abortControllerRef = React.useRef();
  const getFilteredTags = useStatelessGraphQLRequest(
    getFilteredTagsQuery,
    null,
    null,
    true,
  );

  // Data Loading
  const allCategoriesLoading = allCategories.isLoading;
  const contenutoCardsLoading = contenutoCards.isLoading;
  const contenutoTestoCarouselLoading = contenutoTestoCarousel.isLoading;
  const datiAccountabilityLoading = datiAccountability.isLoading;
  // Data Pristine
  const allCategoriesPristine = allCategories.pristine;
  const contenutoCardsPristine = contenutoCards.pristine;
  const contenutoTestoCarouselPristine = contenutoTestoCarousel.pristine;
  const datiAccountabilityPristine = datiAccountability.pristine;
  // Check if Data is Loading || Pristine
  const dataIsLoading = allCategoriesLoading || contenutoCardsLoading || contenutoTestoCarouselLoading || datiAccountabilityLoading;
  const dataIsPristine = allCategoriesPristine || contenutoCardsPristine || contenutoTestoCarouselPristine || datiAccountabilityPristine;

  const navbarHeight = useNavHeight();

  // Triggers the fetching of home page data.
  useEffect(() => {
    let stt;
    if (preview) {
      stt = {
        ty1: preview === 1,
        ty3: preview === 3,
        ty4: preview === 4,
        ty7: preview === 7,
        ty8: preview === 8,
        ty9: preview === 9,
        ty10: preview === 10,
        ty11: preview === 11,
        ty12: preview === 12,
      };
    }
    const variables = {
      sttCarouselFlag: !!(stt && stt.ty12),
      sttCategorieNumber: stt ? stt.ty3 ? 3 : stt.ty4 ? 4 : 0 : 0,
      sttSchedaIntrodFlag: !!(stt && stt.ty9),
      sttCardsFlag: !!(stt && stt.ty8),
      sttContenutoSpazioSingoloFlag: !!(stt && stt.ty7),
    };
    getContenutoTestoCarousel({ flag: variables.sttCarouselFlag });
    getAllCategories({ number: variables.sttCategorieNumber });
    getContenutoCards({ flag: variables.sttCardsFlag });
    getDatiAccountability();
  }, [preview]);

  const abortTagsRequest = React.useCallback(
    () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    },
    []
  );

  const debouncedGetTags = React.useCallback(
    debounce(async (string) => {
      abortTagsRequest();
      setTagsLoading(true);

      const [getTagsRequest, abortGetTagsController] = getFilteredTags({ string });
      abortControllerRef.current = abortGetTagsController;
      getTagsRequest
        .then(result => setTags(result || []))
        .finally(() => setTagsLoading(false));
    }, 500),
    []
  );

  const onSearchInputChange = React.useCallback(
    value => {
      debouncedGetTags(value);
      setText(value);
    },
    []
  );

  const resetTags = React.useCallback(
    (value) => {
      abortTagsRequest();
      setText(value);
      setTags([]);
    },
    []
  );

  const [hasRenderedSections, setHasRenderedSections] = React.useState(false);


  useEffect(() => {
    const { hash, search } = location;

    if (
      !hash ||
      (lastScrolledAnchor.current.hash === hash && lastScrolledAnchor.current.search === search) ||
      dataIsLoading ||
      dataIsPristine ||
      !hasRenderedSections
    ) {
      return;
    }
    const element = document.querySelector(hash);
    if (element) {
      const elPosition = element.offsetTop;
      window.scrollTo({
        top: elPosition - navbarHeight,
        behavior: 'smooth',
      });
      lastScrolledAnchor.current = { hash, search };
    }
  }, [location.hash, location.search, dataIsLoading, dataIsPristine, navbarHeight, hasRenderedSections]);
  const title = 'WeMi - Home Page';
  const description = 'WeMi, IL SISTEMA DI WELFARE DELLA CITTÀ DI MILANO CONDIVISO E PARTECIPATO: DI TUTTI E PER TUTTI, Home Page: scopri i servizi, candidati per offrire un servizio tcb, acquista un servizio, acquista un servizio tcb, acquista un servizio erogato da un ente';
  const keywords = 'welfare, milano, lavoratore, curriculum, cittadino, servizi, spazi wemi, scopri i servizi, tcb, come funziona, baby-sitter, tata, colf, badante, ente, acquisto, spazi wemi, sostegno alla famiglia, benessere della persona, gestione delle attività domestiche';
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>
      <MainCarousel
        loading={contenutoTestoCarouselLoading || contenutoTestoCarouselPristine}
        data={contenutoTestoCarousel.data}
      />
      <Searchbox
        input={text}
        onInputChange={onSearchInputChange}
        onInputReset={resetTags}
        data={tags}
        dataLoading={tagsLoading}
        locale={locale}
      />
      <WhatSThis />
      <SectionsCards onSectionsRender={() => setHasRenderedSections(true)} />
      <Counter
        loading={datiAccountabilityLoading || datiAccountabilityPristine}
        data={datiAccountability.data}
      />
      <Contacts />
    </>
  );
};

HomePage.displayName = 'HomePage';

const mapStoreToProps = store => ({
  locale: store.locale,
});

export default connect(
  mapStoreToProps
)(HomePage);
