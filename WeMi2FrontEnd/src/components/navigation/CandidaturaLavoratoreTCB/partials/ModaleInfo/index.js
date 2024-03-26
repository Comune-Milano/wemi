import React from "react";
import Text from "components/ui/Text";
import Modal from "components/ui2/Modal";
import Button from "components/ui2/Button";
import { Row } from "components/ui/Grid";

const ModaleInfo = ({ open, setOpen, title, message }) => {
  return (
    <Modal title={title} open={open} setOpenModal={setOpen} color="primary">
      <Text align="center" value={message} size="f7" color="black" padding="0" margin="0 0 3em 0" />
      <Row fluid justifycontent="center">
        <Button
          autowidth
          margin="3em 0 0 0"
          color="primary"
          label="Chiudi"
          value="Chiudi"
          fontSize="f6"
          onClick={() => setOpen(false)}
        />
      </Row>
      
    </Modal>
  );
};

ModaleInfo.displayName = "ModaleInfo";
export default ModaleInfo;
