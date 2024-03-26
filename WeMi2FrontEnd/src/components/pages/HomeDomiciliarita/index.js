import DomiciliaritaNavigation from 'components/navigation/HomePageDomiciliarita';
import React from 'react';
import { Helmet } from 'react-helmet';

const DomiciliaritaPageContent = () => {
  const title = 'WeMi - Home Page Domiciliarità';
  const description = 'WeMi, IL SISTEMA DI WELFARE DELLA CITTÀ DI MILANO CONDIVISO E PARTECIPATO: DI TUTTI E PER TUTTI, Home Page: scopri i servizi, candidati per offrire un servizio tcb, acquista un servizio, acquista un servizio tcb, acquista un servizio erogato da un ente';
  const keywords = 'welfare, milano, domiciliarità, 0-18 anni, 0-18, lavoratore, curriculum, cittadino, servizi, spazi wemi, scopri i servizi, tcb, come funziona, baby-sitter, tata, colf, badante, ente, acquisto, spazi wemi, sostegno alla famiglia, benessere della persona, gestione delle attività domestiche';
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>
      <DomiciliaritaNavigation />
    </>
  );
};

DomiciliaritaPageContent.displayName = 'DomiciliaritaPageContent';
export default DomiciliaritaPageContent;
