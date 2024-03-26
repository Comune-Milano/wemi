/** @format */

/** @format */

import React from 'react';
import styled from 'styled-components';

const Page = styled.div`
  display: inline-block;
  float: right;
  margin: 4em;
  border-radius: 100%;
  && a:hover: not(.active) {
    background-color: #ddd;
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
      <AncoraPagination>&laquo;</AncoraPagination>
      <AncoraPagination>1</AncoraPagination>
      <AncoraPagination>2</AncoraPagination>
      <AncoraPagination>3</AncoraPagination>
      <AncoraPagination>4</AncoraPagination>
      <AncoraPagination>5</AncoraPagination>
      <AncoraPagination>6</AncoraPagination>
      <AncoraPagination>&raquo;</AncoraPagination>
    </Page>
  </div>
);
Pagination.displayName = 'Pagination';

export default Pagination;
