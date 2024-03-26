
import React from 'react';
import Select from 'components/ui2/Select';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';

const StatoOccupazionale = (
  {
    dominio,
    locale,
    dataset,
    setFormField,
    handleFieldBlur,
    touched,
    errors,
  }) => {
  const items = dominio ? dominio.map(stato => {
    return {
      id: stato.cdDominioTcb,
      value: stato.tlValoreTestuale[locale]
    };
  }) : [];

  return (
    <>
      <Row fluid >
      <GroupFieldTitle
          title="Qual è il tuo stato occupazionale?"
          marginTop="0"
        />
      </Row>
      <Row fluid>
        <Column lg="6" md="6" xs="7" padding="0">
          <Select
            items={items}
            label="Stato occupazionale"
            onBlur={() => handleFieldBlur('stato')}
            error={touched.stato && errors.stato}
            required
            selectedValue={dataset['stato']}
            clickedSelectedItem={(value) => { setFormField('stato', undefined); }}
            clickedItem={(value) => { setFormField('stato', value); }}
            placeholder="Seleziona lo stato occupazionale"
          />
        </Column>
      </Row>
    </>
  );
};

StatoOccupazionale.displayName = 'StatoOccupazionale';


export default (StatoOccupazionale);