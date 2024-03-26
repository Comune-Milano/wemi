import React from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Checkbox from 'components/ui2/Checkbox';
import { useFormContext } from 'libs/Form/hooks/useFormContext';

const PersonePatologie = ({ tata }) => {
  const { dataset, setFormField } = useFormContext();

  return (
    <>
      <Row fluid margin="2em 0 0">
        <Text
          value={`Se sei disponibile ad accudire ${
            tata ? 'bambini ' : 'persone '}
            che presentano disabilità o patologie, 
            specifica quali fra quelle elencate`}
          weight="bold"
          padding="0 0 1em 0"
        />
        <Row fluid>
          {dataset.accudirePersoneConPatologie.map((tipoPatologia) => (
            <Row key={tipoPatologia.id.toString()} fluid>
              <Checkbox
                fontSize="f7"
                width="auto"
                checkcolor="primary"
                label={tipoPatologia.value}
                value={tipoPatologia.checked}
                onChange={isChecked => {
                  const dataCopy = dataset.accudirePersoneConPatologie.map(el => ({ ...el }));

                  const selectedCheckbox = dataCopy.find(el => el.id === tipoPatologia.id);
                  selectedCheckbox.checked = isChecked;

                  setFormField('accudirePersoneConPatologie', dataCopy);
                }}
              />
            </Row>
              ))}
        </Row>
      </Row>
    </>
  );
};

PersonePatologie.displayName = 'PersonePatologie';
export default PersonePatologie;
