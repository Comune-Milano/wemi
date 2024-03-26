import React from 'react';
import { Helmet } from 'react-helmet';
import { Row, Column } from 'components/ui/Grid';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import styled from 'styled-components';
import media from 'utils/media-queries';
import HeaderBox from 'components/shared/HeaderBox';
import { colors } from 'theme';
import ComeAccedere from './partials/ComeAccedere';
import Left from '../partials/Left';
import Children from './partials/Children';
import { pdf } from './partials/texts/pdf';
import { domandeFrequentiCittadino } from './faq';
import { ComeContattarci, DomandeFrequenti, Wrapper } from '../partials';
import { serviziTCB } from './partials/texts/serviziTCB';

const SmallWrapper = styled.div`
  position: relative;
  display: block;
  padding: 3em 2.8rem;
  background-color: ${colors.white};

  ${media.md`
    padding: 2.5em 60px 2.5em 100px;
  `};

  ${media.lg`
    padding: 2em 8rem 1em 8rem;
  `};
`;

const MenuTCB = () => {
  const BreadcrumbPath = [
    {
      slash: 'Home',
      url: '',
    },
    {
      slash: 'Tate Colf Badanti',
      url: 'menutcb',
    },
    {
      slash: 'TROVA UN ASSISTENTE FAMILIARE',
      url: 'menutcb/cittadino',
    },
  ];

  const titolo = 'TROVA UN ASSISTENTE FAMILIARE';
  const sottoTitolo = 'WeMi Tate Colf Badanti aiuta le famiglie a trovare assistenti familiari affidabili e professionali.';

  const leftTitle = 'UTILIZZANDO IL PORTALE WeMi,\r\nAVRAI A DISPOSIZIONE ANCHE:';

  const title = 'WeMi - Home Page TCB Cittadino';
  const description = 'Home Page TCB Cittadino: Richiedi il servizio baby-sitter, Richiedi il servizio colf, Richiedi il servizio badante, trova un assistente familiare, WeMi Center in via Statuto 15, incontraci negli spazi WeMi';
  const keywords = 'welfare, milano, cittadino, servizi, servizio, ente, enti, tcb, tata, baby-sitter, colf, badante, assistente, familiare, richiedi, assunzione, diretta, simula costi, tipologia, orario, livello, inquadramento';
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>
      <SmallWrapper>
        <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
      </SmallWrapper>
      <HeaderBox
        titolo={titolo}
        sottoTitolo={sottoTitolo}
        color="primary"
        paddingMd="6em 100px"
      >
        <Children />
      </HeaderBox>
      <Wrapper>
        <Row fluid>
          <ComeAccedere />
        </Row>
        <Row fluid margin="6em 0 0 0">
          <Column lg="8" md="8" padding="0" sizepadding={{ xs: '0', md: '0 13em 0 0' }}>
            <Left
              titolo={leftTitle}
              pdf={pdf}
              color="primary"
              texts={serviziTCB}
            />
          </Column>
          <Column md="4" lg="4" padding="0">
            <Row fluid>
              <ComeContattarci color="blue" />
            </Row>
          </Column>
        </Row>
        <Row fluid margin="6em 0 0 0">
          <DomandeFrequenti domandeFrequenti={domandeFrequentiCittadino} color="primary" />
        </Row>
      </Wrapper>
    </>
  );
};
MenuTCB.displayName = 'Menu cittadino';
export default (MenuTCB);
