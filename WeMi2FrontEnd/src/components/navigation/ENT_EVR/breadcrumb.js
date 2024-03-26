/** @format */

import React from 'react';
import styled from 'styled-components';

const BreadcrumbsGestDati = styled.ul`
  padding: 10px 16px;
  list-style: none;
  margin: 1em 49em 1em 0em;
`;
const ElencoBreadcrumbs = styled.li`
  display: inline;
  font-size: 18px;
  && a {
    color: #707070;
    text-decoration: none;
  }
  && a:hover {
    color: #0275d8;
    text-decoration: underline;
  }
  && ::after {
    padding: 8px;
    color: black;
    content: '/\00a0';
  }
`;

const Breadcrumbs = () => (
  <div>
    <BreadcrumbsGestDati>
      <ElencoBreadcrumbs>
        <a href="#">Area privata Ente</a>
      </ElencoBreadcrumbs>
      <ElencoBreadcrumbs>
        <a href="#">Visualizzo richiesta</a>
      </ElencoBreadcrumbs>
    </BreadcrumbsGestDati>
  </div>
);

Breadcrumbs.displayName = 'Breadcrumbs';

export default Breadcrumbs;
