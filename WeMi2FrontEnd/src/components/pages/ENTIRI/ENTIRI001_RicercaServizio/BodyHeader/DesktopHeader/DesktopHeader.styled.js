import styled from 'styled-components';
import media from 'utils/media-queries';
import { colors } from 'theme';
import { Row } from 'components/ui/Grid';

export const SectionTitle = styled(Row)`
  min-height: 3em;
  border-bottom: 2px solid ${colors.darkGrey};
  margin-bottom: 1.1rem;
  padding-bottom: 1.1rem;
  position: sticky;
  z-index: 1;
  padding-top: 1rem;
  background-color: ${colors.white};
  top: ${({ top }) => top}px;

  a {
    margin-top: 1em;
    display: block;
  }
  ${media.md`
    a {
      margin: 0;
    display: inline;
    }
  `}
`;