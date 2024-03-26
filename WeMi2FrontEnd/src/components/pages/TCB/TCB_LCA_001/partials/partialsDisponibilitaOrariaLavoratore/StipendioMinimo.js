import React from 'react';
import Select from 'components/ui2/Select';
import { Row, Column } from 'components/ui/Grid';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';

export const StipendioMinimo = ({
  items=[],
  stipendioMinimo,
  handleChangeForm,
  formData,
  nameKey
}) => {

  const handleChangeStipendioMinimo = (event) => {

    const stipendioMinimo = {...event};
    handleChangeForm(nameKey, { ...formData, stipendioMinimo });

  };

  return (
    <>
    <GroupFieldTitle
        marginTop="0"
        title="Qual è lo stipendio minimo che sei disponibile ad accettare?"
      />
      <Row fluid>
        <Column lg="5" md="5" sm="5" sx="5" padding="0">
          <Select
            material
            name="stipendioMinimo"
            placeholder="Seleziona un elemento dalla lista"
            clickedItem={handleChangeStipendioMinimo}
            clickedSelectedItem={()=>handleChangeStipendioMinimo()}
            items={items}
            selectedValue={stipendioMinimo}
            intlFormatter
          />
        </Column>
      </Row>
    </>
  )
};

StipendioMinimo.displayName = 'StipendioMinimo';
export default React.memo(StipendioMinimo);