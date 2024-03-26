/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import Modal from 'components/ui/Modal';
import { Row } from 'components/ui/Grid';
import { colors } from 'theme';

const ModaleRiepilogo = ({
  open,
  setOpen,
  idRequest,
  servizio,
  modalitaAssunzione,
}) => {
  return (
    <Modal
      onClick={(event) => { event.preventDefault(); event.stopPropagation(); }}
      open={open}
      openModal={setOpen.bind(this)}
      radius="0px"
      marginTop="5%"
      border={`1px ${colors.primary} solid`}
      bgcolorIcon='blue'
      iconRadius="50%"
      iconHeight="2em"
      iconWidth="2em"
      header={() => (
        <Row fluid padding="0 0 3em" >
          <Text value={`Riepilogo`}  textAlign="right" color="black" weight="bold" size="f2" margin="0 0 0 -0.5em" padding="0 0.5em 0 0" />
        </Row>
      )}
      headerHeight="8em"
      width="90%"
      responsiveWidth="1"
      iconcolor="white"
      closedMargin="-200%"
    >
      {/* {
        open && (
          <TCBRequestSummary
            setOpen={setOpen.bind(this)}
            idRequest={idRequest}
            servizio={servizio}
            modalitaAssunzione={modalitaAssunzione}
          />
        )
      } */}
    </Modal>
  );
};

ModaleRiepilogo.displayName = 'ModaleRiepilogo';

export default ModaleRiepilogo;
