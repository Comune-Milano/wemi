/** @format */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import { Wrapper, Filtri, Risultati, MobileFilters } from './partials';
import media from 'utils/media-queries';
import useWindowSize from 'hooks/useWindowSize';
import { colors } from 'theme';


const SearchService = ({ pathname, entiFiltrati, enti, loaded, match }) => {

  return (
    <Wrapper fluid justifycontent="space-between" margin="0">

      <>
        {
          ['xs', 'sm'].indexOf(useWindowSize()) === -1 ?
            <Column xs="12" md="4" padding="0 3em 0 0" tagName="aside">
              {entiFiltrati ? <Filtri entiFiltrati={entiFiltrati} enti={enti} /> : null}
            </Column>
            : null}
        <>
          <Risultati
            loaded={loaded}
            entiFiltrati={entiFiltrati} enti={enti} pathname={match.url} />
        </>

      </>
    </Wrapper>
  );
}

SearchService.displayName = 'Search';


export default SearchService;
