/** @format */

import React from 'react';
import styled from 'styled-components';

const Page = styled.div`
  display: inline-block;
  float: right;
  margin: 1em 0em;
  border-radius: 100%;
  && a:hover: not(.active) {
    background-color: #0099ab;
    border-radius: 100%;
  }
  && a:hover: active {
    background-color: #0099ab;
    color: white;
    border-radius: 100%;
  }
`;

const AncoraPagination = styled.a`
  color: black;
  padding: 0.6em 1em;
`;
const Pagination = () => (
  <div>
    <Page>
      <AncoraPagination href="#">&laquo;</AncoraPagination>
      <AncoraPagination href="#">1</AncoraPagination>
      <AncoraPagination href="#">2</AncoraPagination>
      <AncoraPagination href="#">3</AncoraPagination>
      <AncoraPagination href="#">4</AncoraPagination>
      <AncoraPagination href="#">5</AncoraPagination>
      <AncoraPagination href="#">&raquo;</AncoraPagination>
    </Page>
  </div>
);
Pagination.displayName = 'Pagination';

export default Pagination;
