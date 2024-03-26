/** @format */
import React, { useState } from 'react';
import styled from 'styled-components';
import {Row} from 'components/ui/Grid';
import media from 'utils/media-queries';

const Wrapper = styled(Row)`
  margin-bottom: 5rem;
  margin-left: 2.8rem;
  margin-right: 2.8rem;
  margin-top: 3rem;

  ${media.md`
    margin-top: 3rem;
    margin-bottom: 5rem;
    margin-left: 100px;
    margin-right: 100px;
  `};
`;

export default Wrapper;
