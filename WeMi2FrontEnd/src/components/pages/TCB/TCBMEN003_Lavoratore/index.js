import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Row, Column } from 'components/ui/Grid';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Modal from 'components/ui2/Modal';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { colors } from 'theme';
import { ComeContattarci, DomandeFrequenti, Wrapper } from '../partials';
import { domandeFrequentiLavoratore } from './faq';
import { ComeDiventareAssistente, LavoraComeAssistente } from './partials';
import { arrText } from './partials/texts/arrText';
import Left from '../partials/Left';
import { BodyModal } from './partials/BodyModal';
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
const MenuLavoratore = () => {
  const [openModal, setOpenModal] = useState(false);

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
      slash: 'LAVORA COME ASSISTENTE FAMILIARE',
      url: 'menutcb/lavoratore',
    },
  ];

  const titolo = 'UTILIZZANDO IL PORTALE WeMi,\r\nAVRAI A DISPOSIZIONE ANCHE:';

  const title = 'WeMi - Home Page TCB Lavoratore';
  const description = 'Home Page TCB Lavoratore: LAVORA COME ASSISTENTE FAMILIARE, INVIACI LA TUA CANDIDATURA, COME DIVENTARE UN ASSISTENTE FAMILIARE WeMi, INCONTRACI WeMi Center in via Statuto 15';
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
      <LavoraComeAssistente
        color="green"
        sottoTitolo="WeMi Tate Colf Badanti aiuta gli assistenti familiari a incontrare famiglie che cercano assistenza per la cura della casa o dei propri cari."
        setOpenModal={setOpenModal}
      />
      <Wrapper>
        <Row fluid>
          <ComeDiventareAssistente />
        </Row>
        <Row fluid margin="7em 0 0 0">
          <Column lg="8" md="8" padding="0" sizepadding={{ xs: '0', md: '0 13em 0 0' }}>
            <Left
              titolo={titolo}
              arrText={arrText}
              color="green"
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
          <DomandeFrequenti domandeFrequenti={domandeFrequentiLavoratore} color="green" />
        </Row>
        <Modal
          open={openModal}
          width="50%"
          setOpenModal={setOpenModal}
          color="primary"
          children={BodyModal}
        >
        </Modal>
      </Wrapper>
    </>
  );
};

MenuLavoratore.displayName = 'MenuLavoratore';

export default MenuLavoratore;
