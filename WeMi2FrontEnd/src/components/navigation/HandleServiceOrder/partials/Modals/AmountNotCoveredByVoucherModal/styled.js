import styled from 'styled-components';
import media from 'utils/media-queries';
import Button from 'components/ui2/Button';


export const ModalButton = styled(Button)`
  margin: 0;
  color: green;
  ${media.sm`
    margin: 0 6em;
  `}
  ${media.lg`
    margin: 0;
  `}
  ${media.xl`
    margin: 0 6em;
  `}
`;
