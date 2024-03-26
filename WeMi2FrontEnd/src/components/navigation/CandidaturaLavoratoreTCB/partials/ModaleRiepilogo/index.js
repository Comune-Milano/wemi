/** @format */

import React from 'react';
import Modal from 'components/ui2/Modal';
import Body from './Body';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';

const ModaleRiepilogo = ({
  open,
  setOpen,
  locale,
  idLavoratore,
  onPatchStep,
  userProfile,
  isModifica
}) => {

  const { datiLogin } = userProfile;
  const isAdminWemi = checkAdmin(datiLogin);

  return (
    <Modal
      open={open}
      setOpenModal={setOpen}
      customModal
      header={() => (<div style={{ width: '100%', height: '5rem' }} />)}
      color="primary"
      width="90%"
      marginTop="3rem"
      mobileFullScreen
    >
      {
        open ?
          (
            <Body
              idLavoratore={idLavoratore}
              locale={locale}
              onPatchStep={onPatchStep}
              isAdminWemi={isAdminWemi}
              isModifica={isModifica}
            />
          )
          : null
      }
    </Modal>
  );
};

ModaleRiepilogo.displayName = 'ModaleRiepilogo';

export default withAuthentication(ModaleRiepilogo);
