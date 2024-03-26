
import React from 'react';
import styled from 'styled-components';
import { Column, Row } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import Text from 'components/ui/Text';
import { useCookies } from 'react-cookie';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { estraiContenutoPrivacy } from './graphQLRequests';
import { PrivacyContentLink } from './PrivacyContentLink';

const StyledBannerContainer = styled.div`
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1030;
  max-width: 1440px;
  margin: 0 auto;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: #0099A8;
  background-color: #fff;
`;

const cookieID = 'WEMI_COOKIE_PRIVACY_CONSENT';

export const CookieBanner = () => {
  const [cookies, setCookie] = useCookies([cookieID]);

  const [privacyContent] = useGraphQLRequest(
    undefined,
    estraiContenutoPrivacy,
    {},
    true,
  );

  const acceptCookies = () => {
    setCookie(cookieID, true, { path: '/' });
  };

  // Render nothing if the cookie is set.
  if (!privacyContent.data || (/true/i).test(cookies[cookieID])) {
    return null;
  }

  return (
    <StyledBannerContainer>
      <Row margin="1em 1.8em" padding="0" alignitems="center">
        <Column
          padding="0 0.5rem"
          xs="12"
          xsm="8"
          sm="9"
          md="10"
        >
          <Text
            size="f8"
            tag="div"
            value="Il portale utilizza cookie per migliorare la navigazione e consente l'utilizzo di cookie di terze parti."
          />
          <Text
            size="f8"
            tag="div"
            value="Chiudendo il banner o continuando la navigazione si accetta l'utilizzo dei cookie."
          />
          <Text
            margin="0.2rem 0 0 0"
            size="f8"
            tag="span"
            value="Visita la pagina "
          />
          <PrivacyContentLink
            privacyContent={privacyContent.data}
            label="Privacy policy."
          />
        </Column>
        <Column
          flex
          xs="12"
          xsm="4"
          sm="3"
          md="2"
          sizepadding={{ xs: '1rem 0.45rem 0', sm: "0 0.45rem" }}
          sizejustifycontent={{ xs: 'flex-start', sm: 'flex-end' }}
        >
          <Button
            isActive
            label="Ok"
            width="auto"
            color="red"
            padding="0.3em 1em"
            onClick={acceptCookies}
          />
        </Column>
      </Row>
    </StyledBannerContainer>
  );
};