
import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import RadioGroup from 'components/ui2/RadioGroup';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';

const Fumatore = ({
  dataset,
  setFormField,
  handleFieldBlur
}) => {
  const radioOptsFumatore = [
    { label: 'Si, fumo', id: 'fumoSi' },
    { label: 'No, non fumo', id: 'fumoNo' },
  ];

  return (
    <>
      <Row fluid >
      <GroupFieldTitle
          title="sei un fumatore o una fumatrice?"
          marginTop="2em"
        />
      </Row>
      <Row fluid>
        <RadioGroup
          radioItems={radioOptsFumatore}
          onBlur={() => handleFieldBlur('fumatore')}
          selectedItem={radioOptsFumatore.find(el =>
            dataset.fumatore ? el.id === 'fumoSi' : el.id === 'fumoNo')}
          onChange={value => {
            if (value.id) {
              setFormField('fumatore', value.id === 'fumoSi');
            }
          }}
          fontSize="f7"
          checkcolor="primary"
          display="inline-grid"
          style={{ width: 'fit-content' }}
        />
      </Row>
    </>
  );
};

Fumatore.displayName = 'Fumatore';

export default (Fumatore);
