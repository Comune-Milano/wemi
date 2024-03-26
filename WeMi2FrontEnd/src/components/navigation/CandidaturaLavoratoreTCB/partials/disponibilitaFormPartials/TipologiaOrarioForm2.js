/** @format */

import React from 'react';
import styled from 'styled-components';
import { Row } from 'components/ui/Grid';
import { colors } from 'theme';
import {
  StipendioMinimo,
  TipoSistemazione,
  OreSettimanali,
  MezzaGiornataRiposo,
  FasceOrarieSettimanali,
} from './tipoOrarioFormPartials';

const Wrapper = styled(Row)`
    background-color: ${colors.greyInput};
    padding: 1em 2em
`;

const TipologiaOrarioForm = ({
  tipoOrario,
  handleChangeMultiSelect,
  handleChangeSelect,
}) => {
  const getNomeTipoOrario = () => {
    switch (tipoOrario.id) {
      case 1:
        return 'convivenza';
      case 2:
        return 'convivenzaRidotta';
      case 3:
        return 'fullTimePartTimeAdOre';
      case 4:
        return 'presenzaNotturna';
      case 5:
        return 'weekend';
      case 6:
        return 'assistenzaNotturna';
      default:
    }
  };

  const nomeTipoOrario = getNomeTipoOrario();

  return (
    <Wrapper justifycontent="space-between">
      {tipoOrario.id === 1 ?
        (
          <MezzaGiornataRiposo
            handleChangeMultiSelect={handleChangeMultiSelect}
          />
        )
        : null}
      {tipoOrario.id === 3 ?
        <OreSettimanali />
        : null}
      <StipendioMinimo
        nomeTipoOrario={nomeTipoOrario}
        handleChangeSelect={handleChangeSelect}
      />
      {tipoOrario.id === 1 || tipoOrario.id === 2 ?
        (
          <TipoSistemazione
            nomeTipoOrario={nomeTipoOrario}
          />
        )
        : null}
      {tipoOrario.id !== 1 ?
        (
          <FasceOrarieSettimanali
            nomeTipoOrario={nomeTipoOrario}
          />
        )
        : null}
    </Wrapper>
  );
};

TipologiaOrarioForm.displayName = 'TipologiaOrarioForm';

export default TipologiaOrarioForm;