import media from 'utils/media-queries';
import styled from 'styled-components';
import { Row } from 'components/ui/Grid';

export const SmallWrapper = styled(Row)`
  margin-left: 2.8rem;
  margin-right: 2.8rem;
  margin-top: 3rem;
  margin-bottom: 3rem;

  ${media.md`
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;
    margin-left: 100px;
    margin-right: 100px;
  `};
`;
