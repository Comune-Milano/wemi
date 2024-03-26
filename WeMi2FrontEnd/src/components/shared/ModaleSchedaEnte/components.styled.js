import styled from 'styled-components';
import media from 'utils/media-queries';
import { colors } from 'theme';

export const StyledHeader = styled.div`
  background-color: ${colors.greyInput};
  color: ${colors.black};
  box-sizing: border-box;
  padding: 3.33rem 1.66rem;
  margin: 0;
  width: 100%;

  ${media.md`
    padding: 3.12rem 4.68rem;
  `}
`;
