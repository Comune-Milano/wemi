/** @format */
import { PageContainer } from 'components/navigation/HomePageDomiciliarita/components.styled';
import InfoButtonComponent from 'components/shared/ButtonInfo';
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { HowItWorks, Services, OtherServices, IntroductionSlider } from './partials';

export const StyledPadding = styled.div`
  padding: 0 3rem;

  ${media.md`
    padding: 0 8rem;
`};
`;

export const HomePage018 = () => {
  const title = 'WeMi - Home Page 0-18';
  const description = 'WeMi, IL SISTEMA DI WELFARE DELLA CITTÀ DI MILANO CONDIVISO E PARTECIPATO: DI TUTTI E PER TUTTI, Home Page: scopri i servizi, candidati per offrire un servizio tcb, acquista un servizio, acquista un servizio tcb, acquista un servizio erogato da un ente';
  const keywords = 'welfare, milano, lavoratore, curriculum, cittadino, servizi, spazi wemi, scopri i servizi, tcb, come funziona, baby-sitter, tata, colf, badante, ente, acquisto, spazi wemi, sostegno alla famiglia, benessere della persona, gestione delle attività domestiche';
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>
      <IntroductionSlider />
      <InfoButtonComponent />
      <PageContainer>
        <HowItWorks />
        <Services />
        <OtherServices />
      </PageContainer>
    </>
  );
};

HomePage018.displayName = 'HomePage 0-18';
