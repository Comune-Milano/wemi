/** @format */

import styled from 'styled-components';
import { Row } from 'components/ui/Grid';
import media from 'utils/media-queries';

const SearchboxHeaderRow = styled(Row)`
  display: none ${media.md`
  display: flex;
  position: absolute;
  height: 3em;
  align-items: center;
  top: -3em;
  width: 100%;
  background-color: none!important;
  z-index: 4;
  > div {
    height: 100%!important
  }
`};
`;
SearchboxHeaderRow.displayName = 'SearchboxHeaderRow';

export default SearchboxHeaderRow;
