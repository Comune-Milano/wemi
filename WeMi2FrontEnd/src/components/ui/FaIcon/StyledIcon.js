import styled, { css } from 'styled-components';
import { colors } from 'theme';
import media from 'utils/media-queries';

export const StyledIcon = styled.i`

  width: ${props => props.width};
  height: ${props => props.height};
  display: flex;
  align-items: center;
  cursor: ${props => props.cursor ? props.cursor : "pointer"};
  justify-content: center;
  font-family: "Font Awesome 5 Free";
  position: relative;
  border-radius: ${props => props.radius}
  transition: all .2s linear;
  ${props => !props.disabled && css`
  &:hover {
    box-shadow: ${props => props.noShadow ? '0' : '0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15)'};
    transition: all .2s linear;
    ${props => !props.noShadow && css`
    &:after {
      content: "";
      height: 100%;
      width: 100%;
      position: absolute;
      z-index: 1;
      background-color: ${colors.white}
      opacity: 0.1;
      border-radius: ${props => props.radius}
    }
    `}
    
  }
  `}
  ${props => props.socicon && css`
    font-family: 'Socicon';
    speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  `}

  font-size: 2.5rem;
  font-style: normal;
  font-weight: 900;

  transition: all .2s linear;
  background-color: ${props => colors[props.bgColor]};
  transition: all .2s ease-in-out;
  padding: ${props => props.padding};
  &:before {
    border-radius: 15px;
    color: ${props => colors[props.color]};
    ${props =>
      props.color === 'halfrate' &&
      css`
        background: -webkit-linear-gradient(180deg, ${colors.grey} 50%, ${colors.primary} 50%);
        background: linear-gradient(270deg, ${colors.grey} 50%, ${colors.primary} 50%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      `}
    content: '${props => props.icon}';
    display: block;
    transition: all .2s ease-in-out;
  }
${props =>
  props.modalcrossbtn &&
  css`
    display: inline-block;
    line-height: 1.1em;
    position: absolute;
    vertical-align: middle;
    width: auto;
    &:hover {
      cursor: pointer;
    }
  `}

${props =>
  props.modalcirclebtn &&
  css`
    display: inline-block;
    font-size: ${props => props.fontSize} !important;
    line-height: 1.1em;
    vertical-align: middle;
    width: auto;
    &:hover {
      cursor: pointer;
    }
  `}

      ${props =>
        props.navUserIconDesktop &&
        css`
          display: none;
          border-radius: 5px;
          ${media.md`
            width: 2em;
            height: 2em;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white ;
            fill: white ;
            &:before {
              padding: ${({ theme }) => theme.spacing.p3};

            }
            &:hover {
              background-color: white;
              &:before {
              border-radius: 15px;
              color: black   ;
              opacity: 1   ;
              transition: all .2s ease-in-out;
              }
            }
            `}
        `}

${props =>
  props.navUserIcon &&
  css`
    color: white;
    fill: white;
  `}
${props =>
  props.arrow && props.arrow === true
    ? css`
        width: unset;
        &:hover {
          &:before {
          }
        }
        &:before {
        }
        transform: rotate(180deg);
        transition: all 0.2s ease-in-out;
      `
    : css`
        transform: rotate(0deg);
        transition: all 0.2s ease-in-out;
      `}

      ${props => props.absolute && css`
      position: absolute;
      right: ${props.right};
      top: ${props.top};
      left: ${props.left};
      bottom: ${props.bottom};
  
      `}
`;
