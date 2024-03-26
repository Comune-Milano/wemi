import React from 'react';
import TitleModalInfo from '../SimulatoreCosto/partials/TitleModalInfo';
import { GroupContainer } from '../SimulatoreCosto/partials/Common.Styled';
import { BodyModalInfo } from '../SimulatoreCosto/utils';
import RadioGroup from 'components/ui2/RadioGroup';
import { radioItemsPersoneAutoSufficienti } from './costants';

const PersoneAutoSufficienti = ({
  handleState,
  state,
  colorTitle = "black",
  marginTitle
}) => {

  return (
    <GroupContainer>
      <TitleModalInfo
        label="Persone non autosufficienti da assistere"
        modalTitle="Indennità per l’assistenza di più di una persona non autosufficiente "
        modalBody={BodyModalInfo["personeAutoSufficienti"]}
        required
        color={colorTitle}
        margin={marginTitle}
      />
      <RadioGroup
        radioItems={radioItemsPersoneAutoSufficienti}
        selectedItem={state.personeAutoSufficienti}
        onChange={(value) => {
          handleState('personeAutoSufficienti', value);
        }}
        checkcolor="primary"
        display="inline-grid"
      />
    </GroupContainer>
  );
};

PersoneAutoSufficienti.displayName = 'PersoneAutoSufficienti';

export default PersoneAutoSufficienti;