
import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Checkbox from 'components/ui2/Checkbox';
import RadioGroup from 'components/ui2/RadioGroup';
import { GroupFieldTitle, StepTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';

const DatiGenerici = ({
  dataset,
  setFormField,
  handleFieldBlur,
}) => {
  const radioOptsPatente = [
    { label: 'Si', id: 'patenteSi' },
    { label: 'No', id: 'patenteNo' },
  ];

  const checkOptsPatente = [
    { label: 'Sono disponibile a guidare per il lavoro', id: 'disponibilitaAguidare' },
    { label: 'Posso utilizzare la mia auto', id: 'automunita' },
  ];

  return (
    <>
      <Row fluid >
      <GroupFieldTitle
          title="patente"
        />
      </Row>
      <Row fluid>
        <RadioGroup
          radioItems={radioOptsPatente}
          onBlur={() => handleFieldBlur('patente')}
          selectedItem={radioOptsPatente.find(el =>
            dataset.patente ? el.id === 'patenteSi' : el.id === 'patenteNo')}
          onChange={value => {
            if (value.id) {
              setFormField('patente', value.id === 'patenteSi');

              if (value.id === 'patenteNo') {
                setFormField('disponibilitaAguidare', null);
                setFormField('automunita', null);
              }
            }
          }}
          fontSize="f7"
          checkcolor="primary"
          display="inline-grid"
        />
      </Row>
      {dataset.patente ? (
        <Row fluid margin="1.5rem 0 1rem 0">
          {checkOptsPatente.map(el => (
            <Row fluid>
              <Checkbox
                value={dataset[el.id]}
                onChange={value => {
                  setFormField(el.id, value);
                }}
                label={el.label}
                checkcolor="primary"
                width="fit-content"
              />
              </Row>
            ))}
        </Row>
      ) : null}
    </>
  );
};

DatiGenerici.displayName = 'DatiGenerici';

export default (DatiGenerici);
