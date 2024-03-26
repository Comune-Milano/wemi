import React, { useEffect } from 'react';
import { useLogger } from 'services/Logger';
import { Row } from 'components/ui/Grid';
import TextArea from 'components/ui2/TextArea';
import {
  AccordionCard,
} from 'components/pages/SchedaEntePage/shared';
import { FormMerchant } from './form';

const MerchantSectionComponent = ({
  dataset = {},
  errors = {},
  setDataset,
  keySection,
  disabled = {},
  handleFieldBlur,
  touched = {},
  isAdmin,
}) => {
  const logger = useLogger();

  useEffect(() => {
    logger.log(keySection, dataset);
  }, [dataset]);

  const setFormField = (key, value) => {
    const form = {
      ...dataset,
      [key]: value,
    };
    setDataset(keySection, form);
  };

  const setMerchantValues = (values = {}) => {
    const form = {
      ...dataset.merchant,
      ...values,
    };

    setFormField('merchant', form);
  };

  return (
    <AccordionCard
      title="Dati per transazione economica"
    >
      <FormMerchant
        dataset={dataset.merchant}
        errors={errors.merchant}
        setDataset={setMerchantValues}
        keySection={`${keySection}.merchant`}
        disabled={disabled.section}
        handleFieldBlur={handleFieldBlur}
        touched={touched.merchant}
      />
      {dataset.note10 || isAdmin ? (
        <Row fluid margin="2em 0 0 0">
          <TextArea
            label="Indicazioni della redazione WeMi"
            inputValue={dataset.note10}
            onChange={(newValue) => {
              setFormField('note10', newValue);
            }}
            disabled={disabled.notes}
            bgColor="lightYellow"
          />
        </Row>
      ) : null}
    </AccordionCard>
  );
};

MerchantSectionComponent.displayName = 'Merchant section';

export const MerchantSection = React.memo(MerchantSectionComponent);
