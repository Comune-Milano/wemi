/** @format */

import styled, { css } from 'styled-components';
import media from 'utils/media-queries';

const WrapperNavbar = styled.nav`
  position: ${props => props.preview ? 'static' : 'fixed'};
  box-sizing: border-box;
  top: 0;
  z-index: 100;
  width: 100%;
  max-width: 1440px;
  display: flex;
  justify-content: space-between;
  padding: 0;
  flex-direction: column;
  transition: all .2s linear;

  > div {
    background: ${({ theme }) => theme.colors.red};
  }
`;
WrapperNavbar.displayName = 'WrapperNavbar';

export default WrapperNavbar;
