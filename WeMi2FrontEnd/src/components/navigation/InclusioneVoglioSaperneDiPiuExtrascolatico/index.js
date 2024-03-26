import React from 'react';
import { useNavHeight } from 'hooks/useNavHeight';
import { Row, Column } from 'components/ui/Grid';
import { RowSticky } from './partials/VoglioSaperneDiPiuExtrascolatico.styled';
import LeftColumn from './partials/LeftColumn';
import ComeContattarci from '../ComeFunzionaOrientamentoScolastico/partials/comecontattarci';

const InclusioneVoglioSaperneDiPiuExtrascolatico = () => {
  const navHeight = useNavHeight();

  return (
    <Row fluid margin="3.5em 0 4em 0">
      <Column padding="0" md="7">
        {/* left */}
        <LeftColumn />
      </Column>
      <Column padding="0" md="5">
        {/* right */}
        <RowSticky fluid sizemargin={{ md: '0 0 0 5em', lg: '0 0 0 5em', xl: '0 0 0 10em' }} top={navHeight || 0}>
          <Column padding="0" md="10">
            <ComeContattarci
              color="purple"
            />
          </Column>
        </RowSticky>
      </Column>
    </Row>
  );
};

InclusioneVoglioSaperneDiPiuExtrascolatico.displayName = 'InclusioneVoglioSaperneDiPiuExtrascolaticoNavigation';

export default InclusioneVoglioSaperneDiPiuExtrascolatico;
