import React from 'react';
import Checkbox from 'components/ui2/Checkbox';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { labelCheckboxListDatiPersonali } from 'components/pages/MatchingDomandaLavoratore/labels';

const CheckBoxes = ({ selectedFilters, setPopupFilters }) => {
  const box = [
    { label: 'Patente auto', id: labelCheckboxListDatiPersonali.patente },
    { label: 'Automunito/a', id: labelCheckboxListDatiPersonali.automunito },
    { label: 'Presenza Cani', id: labelCheckboxListDatiPersonali.cani },
    { label: 'Presenza Gatti', id: labelCheckboxListDatiPersonali.gatti },
    { label: 'Lavorare in presenza animali', id: labelCheckboxListDatiPersonali.lavoratorePresenzaAnimali },
    { label: 'Disponibilità a prendersi cura degli animali', id: labelCheckboxListDatiPersonali.disponibilitaAnimali },
  ];

  return (
    <>
      <Row fluid margin="0.5em 0 0 0">
        <Text
          value="Dati generici"
          color="primary"
          size="f7"
          weight="bold"
        />
      </Row>
      <Row fluid margin="0.5em 0 0 0">
        {
          box.map((ele) => (
            <Column md="6" padding="0.1em" key={ele.id}>
              <Checkbox
                width="fit-content"
                value={selectedFilters[ele.id]}
                onChange={(value) => setPopupFilters(ele.id, value)}
                label={ele.label}
                checkcolor="primary"
              />
            </Column>
            ))
        }
      </Row>
    </>
  );
};

CheckBoxes.displayName = 'CheckBoxes';

export const CheckboxList = CheckBoxes;
