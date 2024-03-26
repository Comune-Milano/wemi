/** @format */

import styled from 'styled-components';
import media from 'utils/media-queries';
import { spacing, colors } from 'theme';

const Wrapper = styled.div`
  position: relative;
  display: block;
  padding: 1.25em 2rem;
  background-color: ${colors.white};
  
  ${media.md`
    padding: 2.5em 2.7rem;
  `};

  ${media.lg`
    padding: 2em 8rem;
  `};
`;

Wrapper.displayName = 'Wrapper';
export default Wrapper;
