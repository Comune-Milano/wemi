import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { useNavHeight } from 'hooks/useNavHeight';
import Raggiungimi from './partials/Raggiungimi';
import CosaOffre from './partials/CosaOffre';
import AChiERivolto from './partials/AChiERivolto';
import ConChiCollabora from './partials/ConChiCollabora';
import ButtonRicongiungermi from './partials/ButtonRicongiungermi';
import ComeContattarci from './partials/ComeContattarci';
import { orariSettimanali } from './partials/constants';
import { RowSticky } from './partials/ComeFunziona.styled';

const InclusioneComeFunziona = () => {
  const navHeight = useNavHeight();

  return (
    <Row fluid margin="3.5em 0 4em 0">
      {/* left */}
      <Column padding="0" lg="7" md="7">
        <Raggiungimi />
        <Column padding="0" margin="3.2em 0 0 0">
          <CosaOffre />
        </Column>
        <Column padding="0" margin="3.2em 0 0 0">
          <AChiERivolto />
        </Column>
        <Column padding="0" margin="3.2em 0 0 0">
          <ConChiCollabora />
        </Column>
        <div style={{ margin: '3.2em 0 0 0' }}>
          <ButtonRicongiungermi />
        </div>
      </Column>
      <Column padding="0" lg="5" md="5">
        {/* right */}
        <RowSticky fluid sizepadding={{ md: '0 0 0 5em', lg: '0 0 0 5em', xl: '0 0 0 10em' }} top={navHeight || 0}>
          <ComeContattarci
            color="red"
            orariSettimanali={orariSettimanali}
          />
        </RowSticky>
      </Column>
    </Row>
  );
};

InclusioneComeFunziona.displayName = 'InclusioneComeFunzionaPage';

export default InclusioneComeFunziona;
