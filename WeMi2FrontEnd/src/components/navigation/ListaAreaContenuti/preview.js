import Button from 'components/ui2/Button';
import Modal from 'components/ui2/Modal';
import React, { useState } from 'react';
import NavBar from 'components/navigation/Navbar';
import Footer from 'components/navigation/Footer';
import styled from 'styled-components';
import media from 'utils/media-queries';
import Home from 'components/pages/Home';
import { CATEGORIE_LIVELLO_1 } from 'types/contenuti/typeContenuto';

const PreviewWrapper = styled.div`
    margin: auto;
    position: relative;
    max-height: 75rem;
    overflow-y: scroll;
    overflow-x: hidden;
    zoom: 75%;
    margin-top: 5rem;
    ${media.md`
      margin-top: 2rem;
    `}
`;

const StyledNavbar = styled(NavBar)`
  max-width: none;
  ul {
    li{
      z-index: 20;
    }
  }
`;

const ContentPreviewArea = () => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <Button
        fontSize="f7"
        onClick={() => { setModal(true); }}
        type="default"
        label="Visualizza Preview"
      />
      <Modal
        open={modal}
        setOpenModal={setModal}
        mobileFullScreen
        width="90%"
      >
        <PreviewWrapper>
          <StyledNavbar preview previewN={CATEGORIE_LIVELLO_1} />
          <Home preview={CATEGORIE_LIVELLO_1} location={{}} />
          <Footer preview={CATEGORIE_LIVELLO_1} />
        </PreviewWrapper>

      </Modal>
    </>
  );
};


ContentPreviewArea.displayName = 'Content Preview Area Navigation Component';

export default ContentPreviewArea;
