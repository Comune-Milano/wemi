import { colors } from 'theme';
import styled, { css } from 'styled-components';
import media from 'utils/media-queries';
import { Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';

export const WrapperCard = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.greyCardInclusione};
  padding: 1.5rem;
  ${media.xs`
    padding: 3rem 1.5rem 3rem 1.5rem;
  `}
  ${media.md`
    padding: 2.5rem;
  `}
  ${media.lg`
    padding: 3rem;
  `}
`;

export const WrapperButton = styled(Column)`
  ${media.xs`
    justify-content: center;
  `}
  display: flex;
  ${media.sm`
    justify-content: flex-start;
  `}
`;

export const WrapperDescription = styled.span`
  ${props => props.lineClamp ? css`
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;  
      overflow: hidden;
      ` : ''
  }
`;

export const TextExpand = styled(Text)`
  cursor: pointer;
`;
