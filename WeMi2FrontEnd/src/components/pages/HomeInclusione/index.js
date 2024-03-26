import React from 'react';
import HomeInclusioneNavigation from 'components/navigation/HomeInclusione';
import { Helmet } from 'react-helmet';

const HomeInclusionePage = () => {
  const title = 'WeMi - Home inclusione';
  const description = 'Home inclusione nella quale è possibile consultare diversi servizi';
  const keywords = 'welfare, milano, servizi, servizio, ente, enti, ORIENTAMENTO SCOLASTICO ED EXTRASCOLASTICO, RICONGIUNGIMENTO FAMILIARE, APPRENDIMENTO DELLA LINGUA ITALIANA, CONSULENZA SOCIALE E GIURIDICA';

  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>
      <HomeInclusioneNavigation />
    </React.Fragment>
  );
};

HomeInclusionePage.displayName = 'HomeInclusioneComponentPage';
export default HomeInclusionePage;
