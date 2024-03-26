
import React from 'react';
import { Helmet } from 'react-helmet';
import { HomeSpaziWeMi } from 'components/navigation/HomeSpaziWemi';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { getSpaziWeMiQuery, getMunicipiQuery } from './graphql/graphqlRequests';
import { mapSpaziWeMiResponse, mapListaMunicipiResponse } from './graphql/responseMappers';

export const HomeSpaziWeMiPage = () => {
  const [spaziWeMi] = useGraphQLRequest(
    [],
    getSpaziWeMiQuery,
    {},
    true,
    mapSpaziWeMiResponse,
  );

  const [listaMunicipi] = useGraphQLRequest(
    new Map(),
    getMunicipiQuery,
    {},
    true,
    mapListaMunicipiResponse,
  );
  const title = 'WeMi - Home Page Spazi WeMi';
  const description = 'Spazi WeMi: incontraci negli spazi WeMi, WeMi IN CITTÀ SPAZI DISTRIBUITI IN TUTTI I MUNICIPI, scopri la nostra rete di spazi, attivare forme di Welfare condiviso e sviluppare azioni di volontariato.';
  const keywords = 'welfare, spazi wemi, welfare in città, municipi, milano, capuana, cenni, figino, loreto, ornato, pacinotti, piazzetta, rimini, rizzoli, sangottardo, stelline, trivulzio, valla, venini, voltri, XXV aprile';
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>
      <HomeSpaziWeMi
        spaziWeMi={spaziWeMi}
        listaMunicipi={listaMunicipi}
      />
    </>
  );
};

HomeSpaziWeMiPage.displayName = 'HomeSpaziWeMiPage';
