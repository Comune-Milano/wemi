/** @format */

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { colors } from 'theme';

import Modal, {StyledHeader} from 'components/ui2/Modal';
import Text from 'components/ui/Text';
import Simulatore from 'components/navigation/SimulatoreCostoTCB/SimulatoreCosto';

const ModaleSimulatoreCosti = ({
  open,
  setOpen,
  idServizio,
  tipologiaOrario,
  livelloInquadramento,
  callback,
}) => {
  const Header = (props) =>
  (
      <StyledHeader
        mobileFullScreen={true}>
          <Text
              tag="h2"
              value="Simula i costi"
              size="f4"
              weight="bold"
              color="black"
          />
      </StyledHeader>
  );
  return (
    <Modal
      customModal={true}
      header={Header}
      open={open}
      setOpenModal={setOpen}
      color="primary"
      width="90%"
      marginTop="3rem"
      mobileFullScreen={true}
    >
      {
        open ?
        <Simulatore 
          idServizio={idServizio}
          idLivelloDiInquadramento={livelloInquadramento.id}
          idTipologiaOrario={tipologiaOrario.id}
          callback={callback}
        />
        : null
      }
  </Modal>

  )
};

const mapStoreToProps = store => ({
  tipologiaOrario: store.requestTCB.preventivoLightTCB.orario,
  livelloInquadramento: store.requestTCB.preventivoLightTCB.contract,
});

ModaleSimulatoreCosti.displayName = 'Modale simulatore costo';

export default connect(mapStoreToProps)(ModaleSimulatoreCosti);
