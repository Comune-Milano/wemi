import styled from 'styled-components';
import media from 'utils/media-queries';
import FondoAsiloMigrazioneEIntegrazione from 'components/shared/FondoAsiloMigrazioneEIntegrazione';

export const ListObiettivi = styled.ul`
line-height: 175%;

list-style-type: '-   ';
box-sizing: border-box;
outline: none;
-webkit-margin-before: 0;
-webkit-margin-after: 0;
-webkit-margin-start: 1em;
-webkit-margin-end: 0;
-webkit-padding-start: 0;
`;

export const ElementListObiettivi = styled.li`
  line-height: 175%;
`;

export const ColumnSx = styled.span`
  width: 2%;
`;

export const ColumnDx = styled.span`
  width: 98%;
`;

export const FondoAsiloMigrazioneEIntegrazioneConoscereIntegrarsi = styled(FondoAsiloMigrazioneEIntegrazione)`
  img {
    width: 80%;
    height: 80%;
    ${media.lg`
      width: 100%;
      height: 100%;
    `}
  }
`;
