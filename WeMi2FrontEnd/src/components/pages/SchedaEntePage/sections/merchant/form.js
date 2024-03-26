import React, { Fragment, useState } from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import Table from './table';
import { MerchantModal } from './modal';

const FormMerchantComponent = ({
  dataset,
  disabled,
  setDataset,
}) => {
  const [merchant, setMerchant] = useState(false);

  const handleOpenModal = () => {
    setMerchant(true);
  };

  const handleCloseModal = () => {
    setMerchant(false);
  };

  const onSaveModal = async (modalDataset) => {
    await handleCloseModal();
    setDataset(modalDataset);
  };

  if (!dataset) {
    return (
      <Fragment>
        <Row fluid flex justifycontent="start">
          <Text
            tag="h4"
            value="Non ci sono dati per transazione economica"
            size="f7"
          />
        </Row>
        <Row fluid margin="2em 0 0 0" flex justifycontent="start">
          <Button
            autowidth
            label="Aggiungi dati transazione"
            color="blue"
            disabled={disabled}
            onClick={handleOpenModal}
          />
        </Row>
        <MerchantModal
          open={merchant}
          setOpen={setMerchant}
          disabled={disabled}
          onSave={onSaveModal}
          initialDataset={dataset}
        />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Table
        data={dataset}
        handleRowClick={handleOpenModal}
        buttonLabel={disabled ? 'Visualizza' : 'Modifica'}
      />
      <MerchantModal
        open={merchant}
        setOpen={setMerchant}
        disabled={disabled}
        onSave={onSaveModal}
        initialDataset={dataset}
      />
    </Fragment>
  );
};

FormMerchantComponent.displayName = 'Form citizen availability component';

export const FormMerchant = FormMerchantComponent;
