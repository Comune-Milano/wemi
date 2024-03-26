/** @format */

import React from 'react';
import Modal from 'components/ui2/Modal';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';

const ModaleConfermaOperazione = ({
  open,
  setOpenModal,
}) => {
  
  const title = "OPERAZIONE AVVENUTA CON SUCCESSO";
  const children = (
    <div style={{ textAlign: "center" }}>
        <>
          <Text
            intlFormatter
            value="Associazione del lavoratore alla domanda eseguita."
            size="f7"
            padding="0 0.2rem 0 0"
            tag="p"
          />
          <Button
            autowidth
            name="OK"
            label="OK"
            onClick={() => setOpenModal(false)}
            fontSize='f7'
            color="primary"
            margin='2.5rem 0 0 0'
          />
        </>
    </div>
  );

  return (
    <>
      <Modal
        open={open}
        setOpenModal={setOpenModal}
        title={title}
        children={children}
        color="primary"
        fontSize="f6"
      />
    </>
  );
}


export default ModaleConfermaOperazione;
