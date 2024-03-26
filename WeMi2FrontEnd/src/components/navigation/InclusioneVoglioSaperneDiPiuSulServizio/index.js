import React from 'react';
import { useNavHeight } from 'hooks/useNavHeight';
import { Row, Column } from 'components/ui/Grid';
import ComeContattarciConsulenzaGiuridica from 'components/shared/ComeContattarciConsulenzaGiuridica';
import LeftColumnVoglioSapereDiPiu from './partials/LeftColumnVoglioSapereDiPiu';
import { RowSticky } from './partials/VoglioSaperneDiPiuSulServizio.styled';
import { comeContattarciOrari } from './partials/costants';

const InclusioneVoglioSaperneDiPiuSulServizio = () => {
  const navHeight = useNavHeight();

  return (
    <Row fluid margin="3.5em 0 4em 0">
      <Column padding="0" md="7">
        <LeftColumnVoglioSapereDiPiu />
      </Column>
      <Column padding="0" md="5">
        <RowSticky fluid sizepadding={{ md: '0 0 0 5em', lg: '0 0 0 5em', xl: '0 0 0 10em' }} top={navHeight || 0}>
          <ComeContattarciConsulenzaGiuridica
            color="green"
            timetables={comeContattarciOrari}
          />
        </RowSticky>
      </Column>
    </Row>
  );
};

InclusioneVoglioSaperneDiPiuSulServizio.displayName = 'InclusioneVoglioSaperneDiPiuSulServizioNavigation';

export default InclusioneVoglioSaperneDiPiuSulServizio;
