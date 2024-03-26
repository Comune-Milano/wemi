import styled from 'styled-components';
import media from 'utils/media-queries';
import { Row } from 'components/ui/Grid';

export const RowSticky = styled(Row)`
  position: sticky;
  top: ${({ navHeight }) => navHeight || 0}px;
`;
