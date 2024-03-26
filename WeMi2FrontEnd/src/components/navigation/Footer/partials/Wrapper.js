/** @format */

import styled, { css } from 'styled-components';
import media from 'utils/media-queries';
import { spacing } from 'theme';

const FooterWrapper = styled.div`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.greyFooter};
  color: ${({ theme }) => theme.colors.darkBlack};
  width: ${props => props.preview ? '' : '100%'};
  display: block;
  text-align: justify;
  height: auto;
  @keyframes openFooter {
    0% {
      max-height: 0;
      transition: max-height 2s linear;
    }
    100% {
      max-height: 500vh;
    }
  }
  animation-name: openFooter;
  animation-duration: 2s;
  animation-fill-mode: forwards;
  padding: 3em 2rem;
  transition: max-height 2s linear;
  ${media.md`
  padding: 3em 100px;
  `};
  ${media.lg`
  padding: 3em 100px;
  ` };
  ${media.xxxxl`
  padding: 3em 100px;
  `};
`;
FooterWrapper.displayName = 'FooterWrapper';

export default FooterWrapper;
