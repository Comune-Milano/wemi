/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import { FooterJson } from 'mocks/FooterJson';
import { StyledList, StyledListItem } from './StyledList';
import { Row, Column } from 'components/ui/Grid';


const UsefulLinksList = () => (
  <StyledList>
    <Row fluid justifycontent="flex-end">
      <Column xs="12" md="6" padding="0">
    {FooterJson.columnRight.links.map(link => (
      <StyledListItem clickable>
        <Text 
          value={link} 
          intlFormatter 
          transform="normal" 
          size="f7" 
          letterSpacing="0.05em"
        />
      </StyledListItem>
    ))}
      </Column>
  </Row>
</StyledList>
);

UsefulLinksList.displayName = 'UsefulLinksList';

export default UsefulLinksList;
