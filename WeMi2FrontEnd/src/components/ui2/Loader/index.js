/** @format */

import React from 'react';
import styled, { css } from 'styled-components';
import { fonts } from 'theme';

const Wrapper = styled.div`
  width: ${props => props.width ? props.width : 'auto'};
  margin: ${props => props.margin ? props.margin : 'auto'};
  flex-direction: column;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props => props.overlay &&
    css`
      position: fixed;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: ${({ zIndex }) => zIndex || 50};
      top: 0;
      left: 0;
      overflow: auto;
      width: 100%;
      height: 100%;
    `}
`;

const Spinner = styled.div`

    margin: 20px auto;
    width: ${props => props.size ? props.size : '3.5rem'};
    height: ${props => props.size ? props.size : '3.5rem'};
    position: relative;
    text-align: center;
    -webkit-animation: sk-rotate 1s infinite linear;
    animation: sk-rotate 1s inf1inite linear;
  
  div {
    width: 55%;
    height: 55%;
    display: inline-block;
    position: absolute;
    top: 0;
    border-radius: 100%;
    -webkit-animation: sk-bounce 2s infinite ease-in-out;
    animation: sk-bounce 2s infinite ease-in-out;
    &:first-child {
       background-color: ${({ theme }) => theme.colors.primary};
       top: -6%;
       bottom: auto;
    };
    &:nth-child(2) {
        background-color: ${({ theme }) => theme.colors.red};
        top: auto;
        bottom: -6%;
        right: 0;
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
    },

  }

  @-webkit-keyframes sk-rotate { 100% { -webkit-transform: rotate(360deg) }}
  @keyframes sk-rotate { 100% { transform: rotate(360deg); -webkit-transform: rotate(360deg) }}
  
  @-webkit-keyframes sk-bounce {
    0%, 100% { -webkit-transform: scale(0.0) }
    50% { -webkit-transform: scale(1.0) }
    25% { -webkit-transform: scale(2.0) }
  }
  
  @keyframes sk-bounce {
    0%, 100% { 
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 50% { 
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    } 20% { 
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
  }
  
 `;

const SpinnerLabel = styled.div`
  @keyframes blink {
    0% {
      opacity: .2;
    }

    20% {
      opacity: 1;
    }

    100% {
      opacity: .2;
    }
  }

  span {
    animation-name: blink;
    animation-duration: 1.4s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }

  span:nth-child(2) {
    animation-delay: .2s;
  }

  span:nth-child(3) {
    animation-delay: .4s;
  }

  color: ${({ theme }) => theme.colors.white};
  font-size: ${fonts.size.f5};
`;

const Loader = ({
  size,
  margin,
  width,
  overlay,
  label,
  zIndex,
}) => (
  <Wrapper
    margin={margin}
    width={width}
    overlay={overlay}
    zIndex={zIndex}
  >
    <Spinner
      size={size}
      aria-label={label || 'Caricamento...'}
      aria-busy="true"
      aria-live={!overlay ? 'polite' : null}
      role={overlay ? 'alert' : null}
    >
      <div />
      <div />
    </Spinner>
    { label ? (
      <SpinnerLabel>
        { label }
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </SpinnerLabel>
    ) : null }
  </Wrapper>
);

Loader.displayName = 'Loader';

export default Loader;
