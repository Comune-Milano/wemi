import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import ColumnsContainer from 'components/ui2/ColumnsContainer';
import Checkbox from 'components/ui2/Checkbox';
import TextArea from 'components/ui2/TextArea';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

export const TipoSistemazione = ({
  items = [],
  tipoSistemazione,
  handleChangeForm,
  formData,
  nameKey,
}) => {
  const handleChangeTipoSistemazione = (isChecked, id) => {
    let tipoSistemazione = formData.tipoSistemazione.slice();

    if (isChecked) {
      tipoSistemazione.push(id);
    } else {
      tipoSistemazione = tipoSistemazione.filter(el => el !== id);
    }

    handleChangeForm(nameKey, { ...formData, tipoSistemazione });
  };

  const handleChangeTestoAltro = (value) => {
    handleChangeForm(nameKey, { ...formData, testoAltro: value });
  };

  const idAltro = 0;

  return (
    <>
      <GroupFieldTitle
        marginTop="0"
        title="Quale tipo di sistemazione sei disponibile ad accettare?"
      />
      <ColumnsContainer xsCount={1} mdCount={2}>
        {
          items.filter(el => el.id !== idAltro).map((tipoSpazio) => (
            <Column key={`tipoSpazio${tipoSpazio.id}`} xs="12" padding="0">
              <Row fluid>
                <Checkbox
                  fontSize="f7"
                  width="auto"
                  checkcolor="primary"
                  label={tipoSpazio.value}
                  value={tipoSistemazione.includes(tipoSpazio.id)}
                  onChange={isChecked => { handleChangeTipoSistemazione(isChecked, tipoSpazio.id); }}
                />
              </Row>
            </Column>
          ))
        }
      </ColumnsContainer>
      <Row fluid>
        {
          items.filter(el => el.id === idAltro).map((tipoSpazio) => (
            <Column key={`tipoSpazio${tipoSpazio.id}`} xs="12" padding="0">
              <Row fluid>
                <Checkbox
                  fontSize="f7"
                  width="auto"
                  checkcolor="primary"
                  label={tipoSpazio.value}
                  value={tipoSistemazione.includes(tipoSpazio.id)}
                  onChange={isChecked => { handleChangeTipoSistemazione(isChecked, tipoSpazio.id); }}
                />
              </Row>
            </Column>
          ))
        }
      </Row>
      {
        tipoSistemazione.includes(idAltro) ? (
          <Row fluid margin="0">
            <Column xs="12" md="6" padding="0">
              <TextArea
                onChange={value => handleChangeTestoAltro(value || null)}
                placeholder="Specificare altro spazio accettabile qui..."
                inputValue={formData.testoAltro}
                name="testoAltro"
                rows="2"
                maxLength={STRING_MAX_VALIDATION.value}
              />
            </Column>
          </Row>
        )
          : null
      }
    </>
  );
};

TipoSistemazione.displayName = 'TipoSistemazione';
export default React.memo(TipoSistemazione);
