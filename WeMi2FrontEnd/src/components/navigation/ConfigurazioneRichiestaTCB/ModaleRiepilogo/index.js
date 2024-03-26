/** @format */

import React, { useState } from 'react';
import Modal from 'components/ui2/Modal';
import { Row, Column } from 'components/ui/Grid';
import Body from './Body';

const ModaleRiepilogo = ({
  open,
  setOpen,
  idRichiestaTcb,
  servizioTCB,
  locale,
  userProfile,
  navigationTabs,
  moveToStep,
  livelliContrattuali,
  attributes,
  price
}) => {
  return (
    <Modal
      open={open}
      setOpenModal={setOpen}
      customModal={true}
      header={() => (<div style={{ width: "100%", height: "5rem" }} />)}
      color="primary"
      width="90%"
      marginTop="3rem"
      mobileFullScreen={true}
    >
      {
        open ?
          <Body
            open={open}
            setOpen={setOpen}
            idRichiestaTcb={idRichiestaTcb}
            locale={locale}
            userProfile={userProfile}
            servizioTCB={servizioTCB}
            navigationTabs={navigationTabs}
            moveToStep={moveToStep}
            livelliContrattuali={livelliContrattuali}
            attributes={attributes}
            price={price}
          />
          : null
      }
    </Modal>
  );
};

ModaleRiepilogo.displayName = 'ModaleRiepilogo';

export default ModaleRiepilogo;
