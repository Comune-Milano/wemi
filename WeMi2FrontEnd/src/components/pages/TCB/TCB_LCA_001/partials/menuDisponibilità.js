/** @format */

import React from 'react';
import media from 'utils/media-queries';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';

const MenuContainer = styled(Row)`
  background-color: #ECECEC;
  position: relative;
  display: block;
  overflow-x: hidden;
  padding: 2rem 3em 3em 3em;

  // ${media.md`
  // padding: 6em 100px;
  // `};
`;

const MenuDisponibilità = ({ children }) => (
  <MenuContainer fluid>
    <Column fluid padding="0">
      {children}
    </Column>
  </MenuContainer>
  );

MenuDisponibilità.displayName = 'MenuDisponibilità';
export default MenuDisponibilità;
