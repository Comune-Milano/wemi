import { Row } from 'components/ui/Grid';
import styled from 'styled-components';
import media from 'utils/media-queries';

export const RowContainer = styled(Row)`
  justify-content: start;
  ${media.md`
    justify-content: flex-end;
  `}
`;
