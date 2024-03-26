import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { useNavHeight } from 'hooks/useNavHeight';
import ComeContattarciConsulenzaGiuridica from 'components/shared/ComeContattarciConsulenzaGiuridica';
import LeftColumn from './partials/leftcolumn';
import { comeContattarciOrari } from '../InclusioneVoglioSaperneDiPiuSulServizio/partials/costants';
import { ComeContattarciRow } from '../InfoApprendimentoLingua/components.style';

const ComeFunzionaConsulenza = () => {
  const navHeight = useNavHeight();
  return (
    <Row fluid margin="3.5em 0 4em 0">
      <Column md="7" padding="0">
        <LeftColumn />
      </Column>
      <Column md="5" padding="0">
        <ComeContattarciRow sizepadding={{ md: '0 0 0 5em', lg: '0 0 0 5em', xl: '0 0 0 10em' }} fluid top={navHeight || 0}>
          <ComeContattarciConsulenzaGiuridica
            color="green"
            timetables={comeContattarciOrari}
          />
        </ComeContattarciRow>
      </Column>
    </Row>
  );
};

ComeFunzionaConsulenza.displayName = 'ComeFunzionaConsulenzaNavigation';
export default ComeFunzionaConsulenza;
