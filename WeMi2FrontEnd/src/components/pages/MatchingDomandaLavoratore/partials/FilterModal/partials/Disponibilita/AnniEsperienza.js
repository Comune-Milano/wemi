import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import RadioGroup from 'components/ui2/RadioGroup';
import { CD_TIPOLOGICA_TATA, CD_TIPOLOGICA_BADANTE, CD_TIPOLOGICA_COLF } from 'types/tcbConstants';
import InputNumber from 'components/ui2/InputNumber';
import Text from 'components/ui/Text';
import { labelAnniEsperienza, labelAltriValori } from 'components/pages/MatchingDomandaLavoratore/labels';
import { noop } from 'utils/functions/noop';

const AnniEsperienzaList = ({
  selectedFilters,
  setPopupFilters,
}) => {
  const workerType = [
    { label: 'Tata', id: CD_TIPOLOGICA_TATA },
    { label: 'Badante', id: CD_TIPOLOGICA_BADANTE },
    { label: 'Colf', id: CD_TIPOLOGICA_COLF },
  ];

  return (
    <>
      <Row fluid margin="0.5em 0 0 0">
        <Text
          value="Anni Esperienza"
          color="primary"
          size="f7"
          weight="bold"
        />
      </Row>
      <Row fluid margin="0.5em 0 0 0" display="flex" alignitems="center">
        <Column padding="0" lg="3" md="3" sm="3" xs="12">
          <InputNumber
            onChange={(value) => setPopupFilters(labelAnniEsperienza.anniEsperienza, parseInt(value,10))}
            onInputChange={(value) => setPopupFilters(labelAnniEsperienza.anniEsperienza, parseInt(value,10))}
            value={Number.parseInt(selectedFilters[labelAnniEsperienza.anniEsperienza], 10) || 0}
            minValue={selectedFilters[labelAnniEsperienza.workerType] ? 0 : 1}
            size="f7"
            iconColor="primary"
            textColor="black"
          />
        </Column>

        <Column padding="0" lg="9" md="9" sm="9" xs="12">
          <RadioGroup
            radioItems={workerType}
            selectedItem={selectedFilters[labelAnniEsperienza.workerType]}
            onChange={selectedFilters[labelAnniEsperienza.workerType]? noop : (value) => setPopupFilters(labelAnniEsperienza.workerType, value)}
            disabled={selectedFilters[labelAnniEsperienza.workerType]}
            fontSize="f7"
            checkcolor="primary"
            display="inline-flex"
            spacing="0 1em"
          />
        </Column>
      </Row>
      <Row fluid margin="0.5em 0 0 0" justifycontent="space-around" display="flex" alignitems="center">
        <Column padding="0" xs="12" flex>
          <Text
            value="Voto operatore: "
            size="f7"
            color="black"
            margin="0 0.5em 0 0"
          />
          <InputNumber
            onChange={(value) => setPopupFilters(labelAltriValori.votoOperatore, parseInt(value, 10))}
            onInputChange={(value) => setPopupFilters(labelAltriValori.votoOperatore, parseInt(value, 10))}
            value={Number.parseInt(selectedFilters[labelAltriValori.votoOperatore], 10) || 0}
            minValue={0}
            maxValue={5}
            size="f7"
            iconColor="primary"
            textColor="black"
          />
        </Column>
      </Row>
    </>
  );
};


AnniEsperienzaList.displayName = 'AnniEsperienzaList';

export const AnniEsperienza = AnniEsperienzaList;