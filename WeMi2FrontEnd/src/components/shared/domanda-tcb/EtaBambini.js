import React from 'react';
import TitleModalInfo from '../SimulatoreCosto/partials/TitleModalInfo';
import { GroupContainer } from '../SimulatoreCosto/partials/Common.Styled';
import Checkbox from 'components/ui2/Checkbox';
import { BodyModalInfo } from '../SimulatoreCosto/utils';

const EtaBambini = ({
  handleState,
  state,
  required,
  disabled,
  colorTitle = "black",
  marginTitle
}) => {

  const onChangeValue = (value, id) => {
    const arr = state.etaBambini?.map(el => el.id === id ? { ...el, checked: value } : el);
    handleState("etaBambini", arr);
  };

  return (
    <GroupContainer>
      <TitleModalInfo
        label="età dei bambini da accudire"
        modalTitle="Indennità per assistenza di bambini sotto i sei anni"
        modalBody={BodyModalInfo["etaBambini"]}
        required={required}
        color={colorTitle}
        margin={marginTitle}
      />
      {
        state.etaBambini?.map((el) => (
          <div>
            <Checkbox
              label={el.label}
              value={el.checked}
              onChange={(value) => { onChangeValue(value, el.id) }}
              width="auto"
              checkcolor="primary"
              disabled={disabled}
            />
          </div>
        ))
      }
    </GroupContainer>
  );
};

EtaBambini.displayName = 'EtaBambini';

export default EtaBambini;