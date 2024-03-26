/** @format */

import styled, {css} from 'styled-components';
import media from 'utils/media-queries';


const WrapperSearchbox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0;
  height: 100%;
  transition: all .2s linear;
  background-color: ${({ theme }) => theme.colors.yellow};
  ${props => props.scrollDown === 0 ? css`
  min-height: none;
  ${media.md`
  min-height: 18vh;
  `}
  `: css`
  min-height: none;
  ${media.md`
  min-height: 12vh;
  `}
  `}
`;
WrapperSearchbox.displayName = 'WrapperSearchbox';

export default WrapperSearchbox;
