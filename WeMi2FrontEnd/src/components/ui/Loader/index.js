/** @format */

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: ${props => props.width ? props.width : '60%'};
  margin: ${props => props.margin ? props.margin : '200px auto'};
  flex-direction: column;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  >div {
    @-webkit-keyframes changeColor {0%, 100% { color: ${({ theme }) => theme.colors.primary}} 50% { color: ${({ theme }) => theme.colors.red}}}
  @keyframes changeColor { 0%, 100% { color: ${({ theme }) => theme.colors.primary}} 50% { color: ${({ theme }) => theme.colors.red}}}
  

  span {
    -webkit-animation: changeColor 1.0s infinite ease-in-out;
    animation: changeColor 1.3s infinite ease-in-out;
  }
  }
`;

const Spinner = styled.div`

    margin: 20px auto;
    width: ${props => props.size ? props.size : '140px'};
    height: ${props => props.size ? props.size : '140px'};
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

const Loader = ({size, margin, width}) => (
  <Wrapper margin={margin} width={width}>
    <Spinner size={size}>
      <div />
      <div />
    </Spinner>
    <div>
      {/* <Text weight="bold" value=" " size="f4" /> */}
    </div>
  </Wrapper>
);

Loader.displayName = 'Loader';

export default Loader;
