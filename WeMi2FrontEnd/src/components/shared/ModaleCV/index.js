import React from 'react';
import Modal from 'components/ui2/Modal';
import Body from './partials/Body';

const ModaleCV = ({
  open,
  setOpen,
  idUtente,
  title,
  label,
  titleButton,
  anonymous = false,
  idServizio,
  savePdfCallback,
}) => {
  return (
    <Modal
      open={open}
      setOpenModal={setOpen}
      color="green"
      width="50%"
      marginTop="15%"
      paddingTopTitle="5em"
      desktopBodyPadding="2em"
      fontSize="f6"
      title={title}
    >
      {
        open ?
          (
            <Body
              idUtente={idUtente}
              setOpen={setOpen}
              label={label}
              titleButton={titleButton}
              anonymous={anonymous}
              idServizio={idServizio}
              savePdfCallback={savePdfCallback}
            />
          )
          : null
      }
    </Modal>
  );
};

ModaleCV.displayName = 'ModaleCV';

export default ModaleCV;
