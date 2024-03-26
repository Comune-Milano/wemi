/** @format */

import { createGlobalStyle } from 'styled-components';
import media from 'utils/media-queries';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: 'Montserrat', sans-serif;
    font-size: 11px !important;
    ${media.xsm`
      font-size: 12px !important;
    `};
    ${media.sm`
      font-size: 12.5px !important;
    `};
    ${media.lg`
      font-size: 12.8px !important;
    `};
    ${media.xxl`
      font-size: 13px !important;
    `};
  }

  @supports ( -moz-appearance:none ){
    html {
      font-family: 'Montserrat', sans-serif;
      font-size: 11px !important;
      ${media.xsm`
        font-size: 12px !important;
      `};
      ${media.sm`
        font-size: 12.5px !important;
      `};
      ${media.lg`
        font-size: 12.8px !important;
      `};
      ${media.xxl`
        font-size: 13px !important;
      `};
    }
  }

  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #C0C0C0;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #888888;
  }
`;

export default GlobalStyle;
