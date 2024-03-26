
import styled from 'styled-components';
import media from 'utils/media-queries';
import { Column } from 'components/ui/Grid';


export const ColonnaEnte = styled(Column)`
  ${media.xl`
    width: 50%;
  `}
  &:nth-child(odd) {
    padding: 0 0 2em 0;
    ${media.xl` 
      padding: 0 2em 2em 0;
    `}
  };
  &:nth-child(even) {
    padding: 0 0 2em 0;
    ${media.xl` 
      padding: 0 0 2em 2em;
    `}
  }
`;
