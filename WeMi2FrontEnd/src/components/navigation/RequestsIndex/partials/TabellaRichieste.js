/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import styled from 'styled-components';
import RiepilogoRichiestaPagination from './RiepilogoRichiestaPagination';

const TabellaOverflow = styled(Row)`
  overflow: auto;
  min-height: 40em;
  @keyframes PagefadeIn {
    0% {opacity: 0}
    100% {opacity: 1}
  }
  animation-name: PagefadeIn;
  animation-duration: 3s;
`;

const Filtri = ({ serviziByUtente, setCurrentPage, currentPage, loaded }) => (
  <TabellaOverflow fluid justifycontent="flex-end" margin="1em 0 0">
    <Column xs="12" padding="0">
      <RiepilogoRichiestaPagination serviziByUtente={serviziByUtente} pagenumber={1} numberitem={5} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </Column>
  </TabellaOverflow>
);

Filtri.displayName = 'Filtri';
export default Filtri;
