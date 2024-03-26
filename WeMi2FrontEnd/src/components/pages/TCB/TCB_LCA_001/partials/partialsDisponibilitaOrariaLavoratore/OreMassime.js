import React from 'react';
import { Row } from 'components/ui/Grid';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import Checkbox from 'components/ui2/Checkbox';

export const OreMassime = ({
  items = [],
  oreMassime,
  handleChangeForm,
  formData,
  nameKey
}) => {

  const handleChangeOreMassime = (isChecked, id) => {

    let oreMassimeCopy = formData.oreMassime.slice();

    if (isChecked) {
      oreMassimeCopy.push(id);
    } else {
      oreMassimeCopy = oreMassimeCopy.filter(el => el !== id);
    }

    handleChangeForm(nameKey, { ...formData, oreMassime: oreMassimeCopy })

  };

  return (
    <>
      <GroupFieldTitle
        marginTop="0"
        title="PER QUANTE ORE MASSIME ALLA SETTIMANA SEI DISPONIBILE A LAVORARE?"
      />
        {
          items.map((tipologiaOrario) => (
              <Row fluid key={"tipologiaOrario" + tipologiaOrario.id}>
                <Checkbox
                  fontSize="f7"
                  width="auto"
                  checkcolor="primary"
                  label={tipologiaOrario.value}
                  value={oreMassime.includes(tipologiaOrario.id)}
                  onChange={isChecked => { handleChangeOreMassime(isChecked, tipologiaOrario.id); }}
                />
              </Row>
          ))
        }
    </>
  )
};

OreMassime.displayName = 'OreMassime';
export default React.memo(OreMassime);