import React, { useEffect } from 'react';
import { useLogger } from 'services/Logger';
import { Row } from 'components/ui/Grid';
import TextArea from 'components/ui2/TextArea';
import {
  AccordionCard,
  FormOffice,
} from 'components/pages/SchedaEntePage/shared';

const PrimaryOfficeSectionComponent = ({
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

  const setFormFieldOffice = (key, value) => {
    const form = {
      ...dataset.address,
      [key]: value,
    };
    setFormField('address', form);
  };


  return (
    <AccordionCard
      title="Sede legale"
      description="Per sede legale si intende l'indirizzo della sede a cui intestare le fatture."
    >
      <FormOffice
        required
        setDataset={setFormFieldOffice}
        dataset={dataset.address}
        errors={errors.address}
        touched={touched.address}
        handleFieldBlur={handleFieldBlur}
        disabled={disabled.section}
        keySection={`${keySection}.address`}
      />
      {dataset.note5 || isAdmin ? (
        <Row fluid margin="2em 0 0 0">
          <TextArea
            label="Indicazioni della redazione WeMi"
            inputValue={dataset.note5}
            onChange={(newValue) => {
              setFormField('note5', newValue);
            }}
            disabled={disabled.notes}
            bgColor="lightYellow"
          />
        </Row>
      ) : null}
    </AccordionCard>
  );
};

PrimaryOfficeSectionComponent.displayName = 'Primary office section';

export const PrimaryOfficeSection = React.memo(PrimaryOfficeSectionComponent);
