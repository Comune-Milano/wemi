/** @format */

import styled from 'styled-components';
import media from 'utils/media-queries';

const Wrapper = styled.ul`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 1.5em;
  ${media.md`
  right: 2.5em;
  `}
`;
Wrapper.displayName = 'WrapperSwitchLocale';

export default Wrapper;
