import styled from 'styled-components';
import { colors } from 'theme';
import media from 'utils/media-queries';

export const TextContainer = styled.div`
  background-color: ${colors.greyCardInclusione};
  padding: 1em;
  width: 100%;
  ${media.md`
    width:50%;
  `}
`;
