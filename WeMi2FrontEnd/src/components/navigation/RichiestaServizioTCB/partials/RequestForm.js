/** @format */

import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { PreventivoLightTCB } from 'redux-modules/actions/authActions';
import { ID_SERVIZIO_COLF } from 'types/tcbConstants';
import { Orario, LevelsCarousel } from './RequestFormPartial';
import { getLivelliContrattualiListLabel } from './utils/getLivelliContrattualiListLabel';

const StyledColumn = styled(Column)`
  padding: 0;
  ${media.md`
    padding: 0 3em 0 0;
  `}
`;

const RequestForm = ({
  selectedValue,
  handleLivello,
  handleOrario,
  servizioTCB,
  idServizioTCB,
  orariTCB,
  locale,
  allLivelliContrattuali,
  maxOre,
}) => {
  const textQuantitaLivelliContrattuali = getLivelliContrattualiListLabel(allLivelliContrattuali);

  const isColf = Number.parseInt(idServizioTCB, 10) === ID_SERVIZIO_COLF;

  return (
    <StyledColumn
      xs="12"
      md="8"
      padding="0"
      tagName="section"
    >
      <Text
        size="f4"
        tag="h2"
        weight="bold"
        color="black"
        margin="0 0 1.5rem 0"
        value={`Richiedi il servizio ${servizioTCB && servizioTCB.tl_valore_testuale[locale]}`}
      />
      <p style={{ margin: '0 0 1.5rem 0' }}>
        <Text
          tag="span"
          value="Il rapporto di lavoro domestico prevede"
          size="f7"
          padding="0 0.3em 0 0"
        />
        <Text
          tag="strong"
          value={`diverse tipologie di orario e ${textQuantitaLivelliContrattuali?.quantita || ''} ${textQuantitaLivelliContrattuali?.maxLength > 1 ? 'livelli' : 'livello'} di
              inquadramento ${textQuantitaLivelliContrattuali?.text || ''}`}
          size="f7"
        />
        <Text
          value=". Ogni livello prevede diverse mansioni, profili professionali e
              retribuzione."
          tag="span"
          size="f7"
        />
      </p>
      <p>
        <Text
          tag="span"
          value="Scegliendo la tipologia di orario e il livello di inquadramento di cui hai bisogno, potrai
            individuare la soluzione più adatta alle tue necessità."
          size="f7"
        />
      </p>
      <Orario
        orarioValue={selectedValue.orario}
        getOrarioValue={handleOrario}
        orariTCB={orariTCB}
        locale={locale}
        maxOre={maxOre}
      />
      {selectedValue.livelliContrattuali.length > 0 ?
        <LevelsCarousel selectedCard={selectedValue.livello} getSelectedCard={handleLivello} orarioValue={selectedValue.orario} filteredCardByOrario={selectedValue.livelliContrattuali} locale={locale} isColf={isColf} />
        : null}
    </StyledColumn>
  );
};

RequestForm.displayName = ' RequestForm';
const mapStateToProps = (state) => ({
  preventivoLightTCB: state.requestTCB.preventivoLightTCB,
});
const mapDispatchToProps = {
  PreventivoLightTCB,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestForm);
