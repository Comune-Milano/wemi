/** @format */

import React from 'react';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { FooterJson } from 'mocks/FooterJson';
import media from 'utils/media-queries';
// import MunicipalityLinksList from './FooterLists/MunicipalityLinksList';
import NavigationLinksList from './FooterLists/NavigationLinksList';
import UsefulLinks from './UsefulLinks';

const FooterLeftColumn = styled(Column)`
padding: 0;
text-align: left;
${media.md`
    text-align: left;
    padding: 0 3em 0 0;
`}

`;

const FooterLeft = ({ links, navigationLinks }) => (
  <FooterLeftColumn xs={12} md={6}>
    <Row>
      {navigationLinks ? (
        <NavigationLinksList
          navigationLinks={navigationLinks}
          links={links}
        />
      ) : null}
    </Row>
  </FooterLeftColumn>
);
FooterLeft.displayName = 'FooterLeft';
export default FooterLeft;
