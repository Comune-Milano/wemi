/** @format */
import React from 'react';
import styled, { css } from 'styled-components';
import media from 'utils/media-queries';
import { fonts } from 'theme';
import { injectIntl } from 'react-intl';

const StyledButton = styled.button`
  position:  ${props => props.children ? 'relative' : 'static'};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  height: ${props => props.height};
  border: none;
  font-size:  ${props => fonts.size[props.fontSize]};
  padding: ${({ theme }) => theme.spacing.p2} ${({ theme }) => theme.spacing.p3};
  border-radius: 0;
  outline: none!important;
  box-sizing: border-box;
  cursor: pointer;
  margin: ${props => props.mauto ? 'auto' : '0'};
  width: ${props => props.autowidth ? 'auto' : '100%'};
  display: flex;
  justify-content: ${props => props.justifycontent ? 'justifycontent' : 'center'};
  align-items: center;
  min-width: 6rem;
  text-transform: ${props => props.transform ? props.transform : 'uppercase'};
  font-weight: ${props => props.weight ? props.weight : 'normal'};
  white-space: nowrap;
  text-overflow: ellipsis;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border: 0.5px solid ${({ theme }) => theme.colors.primary};
  transition: all .2s linear;
  &:hover {
    background-color: ${({ theme }) => theme.colors.darkPrimary};
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
     transition: all .2s linear;
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.white};
   color: ${({ theme }) => theme.colors.primary};
   border: 0.5px solid ${({ theme }) => theme.colors.primary};
   transition: all .2s linear;
  }
  ${props =>
    props.textareabtn &&
    css`
  width: calc(300px * 0.6);
  margin-top:.2rem;
    ${media.sm`
     width: calc(300px * 0.7);
     margin-top:.2rem;
    `}
    ${media.md`
    margin-top:.4rem;
     width: calc(300px * 0.8);
    `}
    ${media.lg`
    margin-top:.5rem;
     width: 315px;
    `}
  `}

  ${props =>
    props.stile === 'primary' &&
    css`
      background-color: ${({ theme }) => theme.colors.blue};
      border: 0.5px solid ${({ theme }) => theme.colors.blue};
      color: ${({ theme }) => theme.colors.white};
      border: 0.5px solid ${({ theme }) => theme.colors.blue};
      &:hover {
        background-color: ${({ theme }) => theme.colors.darkBlue};
        color: ${({ theme }) => theme.colors.white};
      }
      &:active {
        background-color: ${({ theme }) => theme.colors.white};
        color: ${({ theme }) => theme.colors.blue};
        border: 0.5px solid ${({ theme }) => theme.colors.blue};
      }
    `} 
 
  ${props =>
    props.stile === 'secondary' &&
    css`
      background-color: ${({ theme }) => theme.colors.purple};
      color: ${({ theme }) => theme.colors.white};
      border: 0.5px solid ${({ theme }) => theme.colors.purple};
      &:hover {
        background-color: ${({ theme }) => theme.colors.darkPurple};
        color: ${({ theme }) => theme.colors.white};
      }
      &:active {
        background-color: ${({ theme }) => theme.colors.white};
        color: ${({ theme }) => theme.colors.purple};
        border: 0.5px solid ${({ theme }) => theme.colors.purple};
      }
    `} 

 
 ${props =>
    props.stile === 'link' &&
    css`
     background-color: ${({ theme }) => theme.colors.yellow};
     color: ${({ theme }) => theme.colors.black};
     border: 0.5px solid ${({ theme }) => theme.colors.yellow};
     &:hover {
       background-color: ${({ theme }) => theme.colors.darkYellow};
       color: ${({ theme }) => theme.colors.inherit};
     }
     &:active {
       background-color: ${({ theme }) => theme.colors.inherit};
       color: ${({ theme }) => theme.colors.black};
       border: 0.5px solid ${({ theme }) => theme.colors.yellow};
     }
   `} 


   ${props =>
    props.stile === 'accept' &&
    css`
       background-color: ${({ theme }) => theme.colors.green};
       border: 0.5px solid ${({ theme }) => theme.colors.green};
       color: ${({ theme }) => theme.colors.white};
       &:hover {
         background-color: ${({ theme }) => theme.colors.darkGreen};
         color: ${({ theme }) => theme.colors.white};
       }
       &:active {
         background-color: ${({ theme }) => theme.colors.white};
         color: ${({ theme }) => theme.colors.green};
         border: 0.5px solid ${({ theme }) => theme.colors.green};
       }
     `} 

   ${props =>
    props.stile == 'cancel' &&
    css`
       background-color: ${({ theme }) => theme.colors.red};
       border: 0.5px solid ${({ theme }) => theme.colors.red};
       color: ${({ theme }) => theme.colors.white};
       &:hover {
         background-color: ${({ theme }) => theme.colors.red};
         color: ${({ theme }) => theme.colors.white};
       }
       &:active {
         background-color: ${({ theme }) => theme.colors.white};
         color: ${({ theme }) => theme.colors.red};
         border: 0.5px solid ${({ theme }) => theme.colors.red};
       }
     `} 

${props =>
    props.stile == 'disabled' &&
    css`
    border: 0.5px solid ${({ theme }) => theme.colors.grey};
    background-color: #c4c4c4;
    box-shadow: none;
    color: ${({ theme }) => theme.colors.white};
    cursor: default;

    &:hover {
      border: 0.5px solid ${({ theme }) => theme.colors.grey};
      opacity: 1;
      box-shadow: none;
      background-color: #c4c4c4;
      color: ${({ theme }) => theme.colors.white};
    }

    &:active {
      border: 0.5px solid ${({ theme }) => theme.colors.grey};
      opacity: 1;
      box-shadow: none;
      background-color: #c4c4c4;
      color: ${({ theme }) => theme.colors.white};
    }
  `} 


 
  }
`;
StyledButton.displayName = 'StyledButton';
StyledButton.defaultProps = {
  default: true,
};

const Button = ({ intl, intlLabel, activeIntl, stile, submit, reset, value, type, fontSize, autowidth, children, child, ...rest }) => {
  const label = activeIntl ? intlLabel ? intl.formatMessage({ id: value }) : value : value;
  return (
    <StyledButton
      children={children}
      aria-label={`Tasto ${label}`}
      stile={type}
      name={label}
      type={submit ? 'submit' : reset ? 'reset' : 'button'}
      disabled={stile === 'disabled'}
      fontSize={fontSize}
      autowidth={autowidth}
      {...rest}
    >
      {child === "1" && children}
      {label}
      {child === "2" && children}
    </StyledButton>
  );
};
Button.displayName = 'Button';
Button.defaultProps = {
  default: true,
};
// Button.propTypes = ButtonPropTypes;

export default injectIntl(Button);
