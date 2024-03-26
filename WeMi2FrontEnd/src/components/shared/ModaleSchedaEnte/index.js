/** @format */

import React from 'react';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import Text from 'components/ui/Text';
import Modal from 'components/ui2/Modal';
import SchedaEnte from 'components/navigation/SchedaEnte';
import Loader from 'components/ui2/Loader';
import { Row, Column } from 'components/ui/Grid';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import styled from 'styled-components';
import AnchorLink from 'components/ui/AnchorLink';
import instagramImg from 'images2/social/Instagram.svg';
import facebookImg from 'images2/social/Facebook.svg';
import twitterImg from 'images2/social/Twitter.svg';
import youtubeImg from 'images2/social/Youtube.svg';
import { getEnteData } from './ModaleSchedaEnteGraphQL';
import { StyledHeader } from './components.styled';

const StyledRow = styled(Row)`
  img {
      display: inline-block;
      height: 7em;
      width: auto;
      margin-right: 1.5em;
  }
  h2 {
    display: inline-block;
  }
`;

const ImgSocial = styled.img`
  margin-top: 0.8rem;
  width: ${props => props.width || '75%'}!important;
  height: ${props => props.height || '75%'}!important;
`;

const SchedaEnteModal = ({
  open,
  setOpen,
  idEnte,
  locale = 'it',
}) => {
  const [modalData, fetchModalData] = useGraphQLRequest(
    undefined,
    getEnteData,
  );

  React.useEffect(() => {
    if (idEnte) {
      fetchModalData({
        idEnte,
      });
    }
  }, [idEnte]);

  const oj_media = getObjectValue(modalData.data, 'entePK.datiEnte.media.oj_media', '');
  const nm_ente = getObjectValue(modalData.data, 'entePK.nm_ente', '');
  const txTelefono = getObjectValue(modalData.data, 'entePK.datiEnte.js_primo_contatto.txTelefono', '');
  const sedeEnte = getObjectValue(modalData.data, 'entePK.datiEnte.sedeEnte', []);
  const txFacebook = getObjectValue(modalData.data, 'entePK.datiEnte.js_altre_info.txFacebook', '');
  const txYoutube = getObjectValue(modalData.data, 'entePK.datiEnte.js_altre_info.txYoutube', '');
  const txInstagram = getObjectValue(modalData.data, 'entePK.datiEnte.js_altre_info.txInstagram', '');
  const txTwitter = getObjectValue(modalData.data, 'entePK.datiEnte.js_altre_info.txTwitter', '');
  // viene presa la prima posizione (nell'indirizzo) perchè c'è un ordinamento che mette per primo la sede principale
  const indirizzo = sedeEnte.length ?
    `${getObjectValue(sedeEnte[0], 'js_sede.indirizzo.txIndirizzo', '')} – ${ // js_sede.indirizzo.indirizzo
    getObjectValue(sedeEnte[0], 'js_sede.indirizzo.txCitta', '')}` : ''; // js_sede.indirizzo.citta

  let txWeb = getObjectValue(modalData.data, 'entePK.datiEnte.js_altre_info.txWeb', '');

  if (txWeb.substring(0, 7) === 'http://') {
    txWeb = txWeb.split('http://')[1];
  } else if (txWeb.substring(0, 8) === 'https://') {
    txWeb = txWeb.split('https://')[1];
  }


  const Header = () =>
  (
    <StyledHeader>
      <StyledRow justifycontent="space-between" alignitems="center">
        <Column md="7" lg="8" padding="0">
          <Text
            tag="h2"
            value={nm_ente}
            size="f4"
            weight="bold"
            color="black"
          />
        </Column>
        <Column md="5" lg="4" padding="1em 0 0 0" sizepadding={{ md: '0 0 0 3em' }}>
          <Text
            tag="span"
            value={indirizzo}
            size="f6"
            weight="bold"
            color="black"
          />
          <br />
          <Text
            tag="span"
            value="TEL. "
            size="f6"
            weight="normal"
            color="black"
          />
          <Text
            tag="span"
            value={txTelefono}
            size="f6"
            weight="bold"
            color="black"
          />
          <br />
          <AnchorLink
            to={`http://${txWeb}/`}
            role="link"
            _blank
            width="auto"
            display="contents"
          >
            <Text
              tag="span"
              value={txWeb}
              size="f6"
              weight="bold"
              color="black"
            />
          </AnchorLink>
          <br />
          <Row fluid>
            {
              txFacebook && txFacebook.length > 0 ?
                (
                  <AnchorLink
                    to={txFacebook}
                    aria-label={`link facebook ${txFacebook}`}
                    role="menuitem"
                    _blank
                    align="left"
                  >
                    <ImgSocial
                      src={facebookImg}
                      height="70%"
                      width="70%"
                    />
                  </AnchorLink>
                )
                : null
            }
            {
              txInstagram && txInstagram.length > 0 ?
                (
                  <AnchorLink
                    aria-label={`link instagram ${txInstagram}`}
                    to={txInstagram}
                    role="menuitem"
                    _blank
                    align="left"
                  >
                    <ImgSocial
                      src={instagramImg}
                    />
                  </AnchorLink>
                )
                : null
            }
            {
              txTwitter && txTwitter.length > 0 ?
                (
                  <AnchorLink
                    to={txTwitter}
                    aria-label={`link twitter ${txTwitter}`}
                    role="menuitem"
                    _blank
                    align="left"
                  >
                    <ImgSocial
                      src={twitterImg}
                    />
                  </AnchorLink>
                )
                : null
            }
            {
              txYoutube && txYoutube.length > 0 ?
                (
                  <AnchorLink
                    to={txYoutube}
                    aria-label={`link youtube ${txYoutube}`}
                    role="menuitem"
                    _blank
                    align="left"
                  >
                    <ImgSocial
                      src={youtubeImg}
                    />
                  </AnchorLink>
                )
                : null
            }
          </Row>
        </Column>
      </StyledRow>
    </StyledHeader>
  );

  Header.displayName = 'Header modal scheda ente';

  const isLoading = (modalData.pristine || modalData.isLoading) || !open;

  return (
    <Modal
      customModal
      header={Header}
      open={open}
      setOpenModal={setOpen}
      desktopBodyPadding="3.9rem 4.68rem 7.81rem 4.68rem"
      padding="3.33rem 1.66rem"
      color="primary"
      width="90%"
      mobileFullScreen="true"
    >
      {
        !isLoading ?
          (
            <SchedaEnte
              ente={modalData.data.entePK}
              locale={locale}
              estraiAllegati={modalData.data.EstraiAllegatiEnte}
              logoEnte={oj_media}
            />
          )
          : <Loader margin="6em auto" />
      }
    </Modal>
  );
};

SchedaEnteModal.displayName = 'Modale scheda ente';
export default SchedaEnteModal;
