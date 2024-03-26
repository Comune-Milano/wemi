import React, { Fragment } from 'react';
import Button from 'components/ui2/Button';
import Modal from 'components/ui2/Modal';
import { Column, Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';

const SaveDirtyModalComponent = ({
  setOpen,
  open,
  onYes,
  onNo,
}) => (
  <Fragment>
    {open ? (
      <Modal
        open={open}
        setOpenModal={setOpen}
        title="ATTENZIONE: Messaggio informativo"
        color="blue"
        mobileFullScreen
      >
        <Row>
          <Column>
            <Text
              value="Il riepilogo ignora le modifiche non ancora salvate; vuoi salvare prima di vedere il riepilogo?"
              size="f6"
              color="red"
            />
          </Column>
        </Row>
        <Row fluid flex justifycontent="space-between">
          <Column xs="12" md="4">
            <Button
              label="Salvare"
              color="blue"
              onClick={async () => {
                setOpen(false);
                await onYes();
              }}
            />
          </Column>
          <Column xs="12" md="4">
            <Button
              label="Non salvare"
              color="blue"
              onClick={async () => {
                setOpen(false);
                await onNo();
              }}
            />
          </Column>
        </Row>

      </Modal>
      )
        : null}
  </Fragment>
  );

SaveDirtyModalComponent.displayName = 'Save dirty modal institution card';


export const SaveDirtyModal = SaveDirtyModalComponent;
