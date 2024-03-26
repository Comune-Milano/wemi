import React, { Fragment } from 'react';
import Modal from 'components/ui2/Modal';
import { FormProvider } from 'libs/Form/components/FormProvider';
import { MerchantModalBody } from './body';
import { HeaderMerchant } from './header';
import { validationSchema } from './validationschema';

const MerchantModalComponent = ({
  open,
  setOpen,
  onSave,
  disabled,
  initialDataset = {},
}) => (
  <Fragment>
    <Modal
      open={open}
      setOpenModal={setOpen}
      customModal
      color="blue"
      header={HeaderMerchant}
      fontSize="f6"
    >
      {
          open ?
            (
              <FormProvider
                initialDataset={initialDataset || {}}
                validationSchema={validationSchema}
                validateOnBlur
              >
                <MerchantModalBody
                  onSave={onSave}
                  disabled={disabled}
                />
              </FormProvider>
            )
            : null
        }
    </Modal>
  </Fragment>
  );

MerchantModalComponent.displayName = 'Merchant modal component';

export const MerchantModal = MerchantModalComponent;
