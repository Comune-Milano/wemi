/** @format */

import React, { useState, useEffect } from 'react';
import Text from 'components/ui/Text';
import FaIcon from 'components/ui2/FaIcon';
import Modal from 'components/ui2/Modal';
import AnchorLink from 'components/ui/AnchorLink';
import { Row, Column } from 'components/ui/Grid';
import { testoPerModaleInfoTCB } from 'services/TCB/testoModaleInfoTCB';

const ModaleInfo = ({
  open,
  setOpen,
  title,
  domain,
}) => {

  return (
    <Modal
      title={title}
      titleLetterSpacing="0.05em"
      open={open}
      setOpenModal={setOpen}
      color="primary"
    >
      <Row fluid padding="0 4rem" justifycontent="center">
        <Text
          align="center"
          value={testoPerModaleInfoTCB(domain)}
          size="f7"
          color="black"
          padding="0"
          margin="0 0 0 0"
        />
      </Row>
      {domain === 3 ?

        <AnchorLink
          _blank={true}
          align="center" color="primary"
          padding="3em 0 0 0"
          to="https://www.inps.it/nuovoportaleinps/default.aspx?itemdir=51098"
          value="Apporofondisci sul sito dell’INPS"
          intlFormatter size="f6" />
        : domain === 1 ?
          <Row fluid margin="3em 0 0 0" justifycontent="center">
            <FaIcon
              icon="fas fa-download"
              color="primary"
              fontSize="f6"
              padding="0.2em 1.2em 0 0"
            />
            <AnchorLink
              _blank
              align="center"
              color="primary"
              value="Scarica il Contratto Collettivo Nazionale di Lavoro"
              intlFormatter
              size="f6"
            />
          </Row>
          : null}
    </Modal>

  )
};

export default ModaleInfo;
