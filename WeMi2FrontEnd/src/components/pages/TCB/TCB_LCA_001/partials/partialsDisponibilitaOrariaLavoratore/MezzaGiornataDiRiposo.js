import React from 'react';
import Select from 'components/ui2/Select';
import { Row, Column } from 'components/ui/Grid';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';

export const MezzaGiornataDiRiposo = ({
  items=[],
  mezzaGiornataDiRiposo,
  handleChangeForm,
  formData,
  nameKey
}) => {

  const handleChangeMezzaGiornataDiRiposo = (event) => {

    let mezzaGiornataDiRiposo = [...formData.mezzaGiornataDiRiposo];
    const optExist = mezzaGiornataDiRiposo.some(el => el.id === event.id);
    if (optExist) {
      mezzaGiornataDiRiposo = mezzaGiornataDiRiposo.filter((el) => el.id !== event.id);
    } else {
      mezzaGiornataDiRiposo.push(event);
    }

    handleChangeForm([nameKey], { ...formData, mezzaGiornataDiRiposo })

  };

  return (
    <>
    <GroupFieldTitle
        marginTop="0"
        title="Hai delle preferenze sulla mezza giornata di riposo?"
      />
      <Row fluid>
        <Column lg="5" md="5" sm="5" sx="5" padding="0">
          <Select
            material
            multi
            name="mezzaGiornataDiRiposo"
            placeholder="Seleziona un elemento dalla lista"
            clickedItem={handleChangeMezzaGiornataDiRiposo}
            clickedSelectedItem={handleChangeMezzaGiornataDiRiposo}
            items={items}
            selectedValue={mezzaGiornataDiRiposo}
            intlFormatter
          />
        </Column>
      </Row>
    </>
  )
};

MezzaGiornataDiRiposo.displayName = 'MezzaGiornataDiRiposo';
export default React.memo(MezzaGiornataDiRiposo);