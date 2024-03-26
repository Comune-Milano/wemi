import React from 'react';
import RadioGroup from 'components/ui2/RadioGroup';
import { GroupContainer } from './Common.Styled';
import TitleModalInfo from './TitleModalInfo';
import { BodyModalInfo } from '../utils';

const TiologiaOrariaRadioGroup = ({
  orari,
  livelliInquadramento,
  maxOre,
  filtri,
  handleFiltri,
  openRadioGroup,
  textToModal
}) => {

  return (
    <>
      {
        openRadioGroup ?
          (
            <React.Fragment>
              <GroupContainer>
                <TitleModalInfo
                  label="tipologia orario"
                  modalTitle="tipologia orario"
                  modalBody={BodyModalInfo["tipologiaOrario"](maxOre)}
                  required
                />
                <RadioGroup
                  radioItems={orari}
                  selectedItem={filtri.tipologiaOrario}
                  onChange={(value) => {
                    handleFiltri('tipologiaOrario', value);
                  }}
                  checkcolor="primary"
                  display="inline-grid"
                />
              </GroupContainer>
              <GroupContainer>
                <TitleModalInfo
                  label="Livello inquadramento"
                  modalTitle="Livello inquadramento"
                  modalBody={textToModal}
                  required
                />
                <RadioGroup
                  selectedItem={filtri.livelloContrattuale}
                  onChange={(value) => {
                    handleFiltri("livelloContrattuale", value)
                  }}
                  radioItems={livelliInquadramento}
                  checkcolor="primary"
                  display="inline-grid"
                />
              </GroupContainer>
            </React.Fragment>
          )
          :
          null
      }
    </>
  );
};

TiologiaOrariaRadioGroup.displayName = 'TiologiaOrariaRadioGroup';

export default TiologiaOrariaRadioGroup;