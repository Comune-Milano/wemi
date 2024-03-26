import styled from 'styled-components';
import media from 'utils/media-queries';
import { Row } from 'components/ui/Grid';

export const StyledWrapperRaw = styled(Row)`
  margin-top: 6em;

  ${media.md`
    margin-top: 0;
  `};
`;
