/** @format */

import styled from 'styled-components';
import { Column } from 'components/ui/Grid';

const SearchboxHeader = styled(Column)`
  display: -webkit-box;
  justify-content: center;
  align-items: top;
  padding: 0.5em 0 0 !important;
  height: auto;
  background-color: ${({ theme }) => theme.colors.yellow};
  color: ${({ theme }) => theme.colors.darkGrey};

 
`;
SearchboxHeader.displayName = 'SearchboxHeader';

export default SearchboxHeader;
