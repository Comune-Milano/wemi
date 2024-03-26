/** @format */

import React from 'react';
import { Row } from 'components/ui/Grid';
import MunicipalityLinksList from './FooterLists/MunicipalityLinksList';

const UsefulLinks = ({links}) => (
  <Row>
    <MunicipalityLinksList links={links} />
  </Row>
);

UsefulLinks.displayName = 'UsefulLinks';

export default UsefulLinks;
