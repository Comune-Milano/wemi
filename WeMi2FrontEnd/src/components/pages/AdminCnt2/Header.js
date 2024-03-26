import React, { useState } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';
import Text from 'components/ui/Text';
import NavBar from 'components/navigation/Navbar';
import Footer from 'components/navigation/Footer';
import styled from 'styled-components';
import { graphqlRequest, resetField } from 'redux-modules/actions/authActions';
import { setFilter } from 'redux-modules/actions/filterActions';
import { connect } from 'react-redux';
import Modal from 'components/ui2/Modal';
import { withRouter, generatePath } from 'react-router';
import { PAGE_ADMIN_CNT_03_URL } from 'types/url';
import media from 'utils/media-queries';
import Home from '../Home';
import { checkPreview } from './utils/checkPreview';

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

const Header = ({
  resetField,
  typeContenuto,
  location,
  history,
  datiLogin,
}) => {
  const createNew = async () => {
    await resetField('EstraiContenutoCompleto');
    history.push(generatePath(PAGE_ADMIN_CNT_03_URL, {
      tyCnt: typeContenuto,
      idCnt: ':new',
      idOp: datiLogin.idCittadino,
    }));
  };

  const [modal, setModal] = useState(false);


  return (
    <>
      <Row flex alignitems="center" fluid>
        <Column xs="12" md="6">
          <ButtonIcon
            icon="plus"
            onClick={createNew}
          />
          <Text
            value="Aggiungi nuova voce"
            size="f7"
            padding="0 0 0 1.2em"
            onClick={createNew}
          />
        </Column>
        <Column xs="12" md="3" mdShift="3">
          {
            checkPreview(typeContenuto) ? (
              <Button
                fontSize="f7"
                onClick={() => { setModal(true); }}
                type="default"
                label="Visualizza Preview"
              />
            )
              : null
          }
        </Column>
      </Row>
      {modal ? (
        <Modal
          open={modal}
          setOpenModal={setModal}
          mobileFullScreen
          width="90%"
        >
          <PreviewWrapper>
            <StyledNavbar preview previewN={typeContenuto} />
            <Home preview={typeContenuto} location={location} />
            <Footer preview={typeContenuto} />
          </PreviewWrapper>

        </Modal>
      ) : null}
    </>
  );
};
const mapDispatchToProps = {
  graphqlRequest,
  resetField,
  setFilter,
};
Header.displayName = 'Header cnt2';

export default connect(null, mapDispatchToProps)(withRouter(Header));
