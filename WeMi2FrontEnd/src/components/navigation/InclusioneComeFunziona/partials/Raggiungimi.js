import React from 'react';
import Text from 'components/ui/Text';
import styled from 'styled-components';
import { PAGE_INCLUSIONE_LAB_IMPACT } from 'types/url';
import { NavLink } from 'react-router-dom';
import TextBox from './TextBox';

const WrapperText = styled.div`
  line-height: 175%;
  margin-top: 1.8em;
`;

const Raggiungimi = () => (
  <TextBox title="RAGGIUNGIMI">
    <WrapperText>
      Il servizio del comune di Milano che informa, orienta e supporta persone e famiglie nel
      percorso del ricongiungimento familiare.
      <br />
      Il Servizio è finanziato nell&apos;ambito del
      progetto
      {' '}
      <NavLink
        to={PAGE_INCLUSIONE_LAB_IMPACT}
        align="left"
        display="inline-block"
      >
        <Text
          value="Lab'Impact"
          decoration="underline"
          fontStyle="italic"
          color="blueIcon"
          lineHeight="175%"
        />
      </NavLink>
      {' '}
      con capofila Regione Lombardia.
    </WrapperText>
  </TextBox>
);

Raggiungimi.displayName = 'RaggiungimiPage';

export default Raggiungimi;
