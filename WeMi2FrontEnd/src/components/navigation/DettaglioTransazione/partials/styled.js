import { Column } from 'components/ui/Grid';
import styled from 'styled-components';
import media from 'utils/media-queries';

export const StyledColumn = styled(Column)` 
  width: 100%;
  ${media.sm` 
    width: 50%;
  `
  }
  ${media.xl` 
  width: ${props => props.widthXl};
  `
   }
`;
