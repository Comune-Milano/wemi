/** @format */

import React from 'react';
import { HandleScrollDown } from 'components/ui/HandleScroll';
import { Wrapper, Searchbar } from './partials';

const Searchbox = ({ contenuto }) => {
  const scrollDown = HandleScrollDown();
  return (
    <Wrapper justifycontent="center" scrollDown={scrollDown}>
      {/* <SearchLabelDesktop /> */}
      <Searchbar contenuto={contenuto} />
    </Wrapper>
  );
};

Searchbox.displayName = 'Searchbox';

export default Searchbox;
