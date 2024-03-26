import React, { useEffect } from 'react';
import { useLogger } from 'services/Logger';
import { Row } from 'components/ui/Grid';
import TextArea from 'components/ui2/TextArea';
import {
  AccordionCard,
} from 'components/pages/SchedaEntePage/shared';
import { FormPayment } from './form';

const PaymentSectionComponent = ({
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

  const setPaymentInfoField = (key, value) => {
    const form = {
      ...dataset.paymentInfo,
      [key]: value,
    };
    setFormField('paymentInfo', form);
  };

  return (
    <AccordionCard title="Dati per pagamenti">
      <FormPayment
        dataset={dataset.paymentInfo}
        errors={errors.paymentInfo}
        setDataset={setPaymentInfoField}
        keySection={`${keySection}.paymentInfo`}
        disabled={disabled.section}
        handleFieldBlur={handleFieldBlur}
        touched={touched.paymentInfo}
      />
      {dataset.note11 || isAdmin ? (
        <Row fluid margin="2em 0 0 0">
          <TextArea
            label="Indicazioni della redazione WeMi"
            inputValue={dataset.note11}
            onChange={(newValue) => {
              setFormField('note11', newValue);
            }}
            disabled={disabled.notes}
            bgColor="lightYellow"
          />
        </Row>
      ) : null}
    </AccordionCard>
  );
};

PaymentSectionComponent.displayName = 'PaymentSection';

export const PaymentSection = React.memo(PaymentSectionComponent);
