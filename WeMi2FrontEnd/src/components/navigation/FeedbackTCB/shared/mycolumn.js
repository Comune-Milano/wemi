import styled from 'styled-components';
import media from 'utils/media-queries';
import { Column } from 'components/ui/Grid';

export const MyColumn = styled(Column)`
margin-top: 0.5em;
justify-content: flex-start;

${media.sm`
  margin-top: 0;
  justify-content: flex-end;
`}
`;
