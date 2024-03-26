/** @format */

import styled, { css } from 'styled-components';
import media from 'utils/media-queries';
import { colors } from 'theme';


const Icon = styled.img`
  src: url(${props => props.src});
  width: ${props => props.width};
  height: ${props => props.height};
  color: ${props => props.color};
  ${props =>
    props.navbarLogo &&
    css`
          transition: all .2s ease-in-out;
          &:focus {
            outline-color: ${colors.white};
            outline-style: auto
          };
          &:hover, &:focus, &:focus-within {
            /* opacity: 0.9; */
          }
          ${props => props.scrollDown === 0 ? css`
          height: 4.5em;
          ${media.md`
            height: 7em;
          `};
          `: css`
            height: 4.5em;
          ${media.md`
            height: 5em;
          `};
          `}
    `}
`;
Icon.displayName = 'Icon';
export default Icon;
