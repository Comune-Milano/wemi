import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { useNavHeight } from 'hooks/useNavHeight';
import { ComeContattarciRow } from './components.style';
import ComeContattarci from '../InclusioneCorsoItaliano/partials/ComeContattarci';
import ComeFunzionaApprendimento from './partials/comefunzionapprendimento';

const VoglioSapereDiPiuLingua = () => {
  const navHeight = useNavHeight();
  return (
    <Row fluid margin="3.5em 0 4em 0">
      <Column padding="0" md="7">
        <ComeFunzionaApprendimento />
      </Column>
      <Column padding="0" md="5">
        <ComeContattarciRow fluid sizepadding={{ md: '0 0 0 5em', lg: '0 0 0 5em', xl: '0 0 0 10em' }} top={navHeight || 0}>
          <ComeContattarci
            color="blue"
          />
        </ComeContattarciRow>
      </Column>
    </Row>
  );
};

VoglioSapereDiPiuLingua.displayName = 'VoglioSapereDiPiuLingua';
export default VoglioSapereDiPiuLingua;
