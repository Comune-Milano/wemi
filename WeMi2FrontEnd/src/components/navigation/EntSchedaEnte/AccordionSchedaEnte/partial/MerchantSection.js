import React, { useState } from 'react';
import isEqual from 'react-fast-compare';

import Text from 'components/ui/Text';
import { Row } from 'components/ui/Grid';
import TextArea from 'components/ui/TextArea';

import SectionWrapper from './SectionWrapper';
import Button from 'components/ui2/Button';
import Modal, { StyledHeader } from 'components/ui2/Modal';
import ModalBody from './MerchantModalBody';
import Table from './MerchantSection.table';

const MerchantSection = ({
  data,
  setData,
  disableModify,
  note,
  handleNotes,
  disableNotes,
}) => {
  const [modalData, setModalData] = useState({
    open: false,
    transaction: null,
  });

  const handleSave = (credentials) => {
    if (!isEqual(data, credentials)) {
      setData(credentials);
    }
    handleCloseModal();
  };

  const handleModify = (credentials) => {
    handleSave(credentials);
  }

  const handleOpenModal = (transaction) => {
    if (transaction) {
      setModalData({
        open: true,
        transaction: { ...transaction }
      });
    } else {
      setModalData({
        open: true,
        transaction: null,
      });
    }
  };

  const handleCloseModal = () => {
    setModalData({
      open: false,
      transaction: null,
    });
  };

  return (
    <SectionWrapper title="Dati per transazione economica">
      {
        !data ?
        (
          <>
            <Row fluid flex justifycontent="start">
              <Text
                tag="h4"
                value="Non ci sono dati per transazione economica"
                size="f7"
              />
            </Row>
            {
              disableModify ?
              null
              :
              (
                <Row fluid margin="2em 0 0 0" flex justifycontent="start">
                  <Button 
                    autowidth
                    label="Aggiungi dati transazione"
                    color="blue"
                    onClick={() => handleOpenModal()}
                  />
                </Row>
              )
            }
          </>
        )
        :
          <Table
            data={data}
            handleRowClick={handleOpenModal}
            buttonLabel={disableModify ? 'Visualizza' : 'Modifica'}
          />
      }
      {
        note || !disableNotes ?
          (
            <Row fluid margin="1em 0">
              <TextArea material
                width="100%"
                readOnly={disableNotes ? 'true' : 'false' }
                preserveLineBreaks
                backgroundColor="yellow"
                disabledBackgroundColor="yellow"
                id='note10'
                name="Indicazioni della redazione WeMi"
                initialValue={note}
                getValue={handleNotes}
              ></TextArea>
            </Row>
          )
          : null
      }
      <Modal
        open={modalData.open}
        setOpenModal={handleCloseModal}
        customModal
        color="blue"
        header={() => (
          <StyledHeader>
            <Text
              tag="h2"
              value="Dati per transazione economica"
              size="f4"
              color="blue"
            />
          </StyledHeader>
        )}
        fontSize="f6"
      >
        {
          modalData.open ?
            (
              <ModalBody
                data={modalData.transaction}
                saveCredentials={handleSave}
                modifyCredentials={handleModify}
                disableModify={disableModify}
              />
            )
            : null
        }
      </Modal>
    </SectionWrapper>
  );
};

MerchantSection.displayName = 'Sezione merchant';

export default MerchantSection;
