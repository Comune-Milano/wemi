/** @format */

import React from 'react';
import Modal, { StyledHeader } from 'components/ui2/Modal';
import Text from 'components/ui/Text';
import Simulatore from 'components/shared/SimulatoreCosto';
import { getNomeServizioTCB } from 'types/tcbConstants';

const ModaleSimulatoreCosti = ({
  open,
  setOpen,
  idServizio,
  tipologiaOrario,
  livelloInquadramento,
  callback,
  tipologiaContratto = {},
  userProfile,
  servizioTCB,
  locale,
  retribuzioneProposta,
  oreSettimanali,
  etaBeneficiari,
  personeAutoSufficienti,
}) => {
  const Header = () =>
  (
    <StyledHeader
      mobileFullScreen
    >
      <Text
        tag="h2"
        value={`Simula i costi | ${getNomeServizioTCB(idServizio)}`}
        size="f4"
        weight="bold"
        color="black"
      />
    </StyledHeader>
  );
  Header.displayName = 'Header';
  return (
    <Modal
      customModal
      header={Header}
      open={open}
      setOpenModal={setOpen}
      color="primary"
      width="90%"
      marginTop="3rem"
      mobileFullScreen
    >
      {
        open ? (
          <Simulatore
            idServizio={idServizio}
            idLivelloDiInquadramento={livelloInquadramento?.id}
            idTipologiaOrario={tipologiaOrario?.id}
            idTipologiaContratto={tipologiaContratto?.id}
            callback={callback}
            userProfile={userProfile}
            servizioTCB={servizioTCB}
            locale={locale}
            retribuzioneProposta={retribuzioneProposta}
            oreSettimanali={oreSettimanali}
            etaBeneficiari={etaBeneficiari}
            personeAutoSufficienti={personeAutoSufficienti}
          />
      )
        : null
      }
    </Modal>

  );
};

ModaleSimulatoreCosti.displayName = 'Modale simulatore costo';

export default ModaleSimulatoreCosti;
