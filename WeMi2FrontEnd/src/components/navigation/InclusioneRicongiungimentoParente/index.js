import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { useNavHeight } from 'hooks/useNavHeight';
import ComeFunzionaRicongiungimento from './comefunzionaricongiungimento';
import { ORARI_SETTIMANALI } from './constants';
import { ComeContattarciRow } from './partials';
import ComeContattarci from '../InclusioneComeFunziona/partials/ComeContattarci';

const RicongiungimentoParenteNavigation = () => {
  const navHeight = useNavHeight();
  return (
    <Row fluid margin="3.5em 0 4em 0">
      <Column padding="0" md="7">
        <ComeFunzionaRicongiungimento />
      </Column>
      <Column padding="0" md="5">
        <ComeContattarciRow fluid sizepadding={{ md: '0 0 0 5em', lg: '0 0 0 5em', xl: '0 0 0 10em' }} top={navHeight || 0}>
          <ComeContattarci orariSettimanali={ORARI_SETTIMANALI} color="red" />
        </ComeContattarciRow>
      </Column>
    </Row>
  );
};

RicongiungimentoParenteNavigation.displayName = 'RicongiungimentoParenteNavigation';
export default RicongiungimentoParenteNavigation;
