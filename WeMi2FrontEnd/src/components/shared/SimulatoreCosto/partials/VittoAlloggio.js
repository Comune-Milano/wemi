import React from 'react';
import InputNumber from 'components/ui2/InputNumber';
import Text from 'components/ui/Text';
import { Row } from 'components/ui/Grid';
import TitleModalInfo from './TitleModalInfo';
import { GroupContainer } from './Common.Styled';
import { BodyModalInfo } from '../utils';

const VittoAlloggio = ({
  nonConviventi,
  weekend,
  convivenzaRidotta,
  handleFiltri,
  filtri,
}) => {
  const maxValueTuttiOrari = 6;
  const maxValueToWeekend = 2;
  const maxValue = weekend ? maxValueToWeekend : maxValueTuttiOrari;

  return (
    <GroupContainer>
      <TitleModalInfo
        label="INDENNITÀ DI VITTO E ALLOGGIO SPETTANTI NELLA SETTIMANA"
        modalTitle="INDENNITÀ DI VITTO E ALLOGGIO"
        modalBody={BodyModalInfo.indennitaVittoAlloggio}
      />
      <Row fluid>
        <InputNumber
          value={Number.parseInt(filtri.pranzo, 10) || 0}
          onChange={(value) => handleFiltri('pranzo', value)}
          onInputChange={(value) => handleFiltri('pranzo', value)}
          minValue={0}
          maxValue={maxValue}
          size="f7"
          iconColor="primary"
          textColor="black"
        />
        <Text
          value="Pranzo/Colazione (2,03 €)"
          margin="0 0 0 0.5em"
          size="f7"
          color="black"
        />
      </Row>
      <Row fluid>
        <InputNumber
          value={Number.parseInt(filtri.cena, 10) || 0}
          onChange={(value) => handleFiltri('cena', value)}
          onInputChange={(value) => handleFiltri('cena', value)}
          minValue={0}
          maxValue={maxValue}
          size="f7"
          iconColor="primary"
          textColor="black"
        />
        <Text
          value="Cena (2,03 €)"
          margin="0 0 0 0.5em"
          size="f7"
          color="black"
        />
      </Row>
      {!nonConviventi ? (
        <Row fluid>
          <InputNumber
            value={Number.parseInt(filtri.alloggio, 10) || 0}
            onChange={(value) => handleFiltri('alloggio', value)}
            onInputChange={(value) => handleFiltri('alloggio', value)}
            minValue={0}
            maxValue={maxValue}
            size="f7"
            iconColor="primary"
            textColor="black"
          />
          <Text
            value="Alloggio (1,75 €)"
            margin="0 0 0 0.5em"
            size="f7"
            color="black"
          />
        </Row>
      )
        : null
      }
    </GroupContainer>
  );
};

VittoAlloggio.displayName = 'VittoAlloggio';

export default VittoAlloggio;
