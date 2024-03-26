import styled from 'styled-components';
import { Column } from 'components/ui/Grid';
import media from 'utils/media-queries';

export const WrapperButtonR = styled(Column)`
  ${media.xs`
    display: revert;
    justify-content: flex-start;
  `}
  ${media.sm`
    display: flex;
    justify-content: flex-end;
  `}
  ${media.md`
    display: revert;
    justify-content: flex-start;
  `}
`;

export const WrapperButtonL = styled(Column)`
  ${media.xs`
    display: revert;
    justify-content: flex-start;
  `}
  ${media.sm`
    display: flex;
    justify-content: flex-start
  `}
  ${media.md`
    display: revert;
    justify-content: flex-start;
  `}
`;

export const WrapperText = styled.span`
  line-height: 175% !important;
`;
