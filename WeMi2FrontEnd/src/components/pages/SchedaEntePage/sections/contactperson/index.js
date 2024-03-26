import React, { useEffect } from 'react';
import { useLogger } from 'services/Logger';
import { Row } from 'components/ui/Grid';
import TextArea from 'components/ui2/TextArea';
import {
  AccordionCard,
} from 'components/pages/SchedaEntePage/shared';
import { FormContactPerson } from './form';

const ContactPersonSectionComponent = ({
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

  const setContactPersonField = (key, value) => {
    const form = {
      ...dataset.contactPerson,
      [key]: value,
    };
    setFormField('contactPerson', form);
  };


  return (
    <AccordionCard title="Contatti del referente dell'ente per il portale WeMi">
      <FormContactPerson
        dataset={dataset.contactPerson}
        errors={errors.contactPerson}
        setDataset={setContactPersonField}
        keySection={`${keySection}.contactPerson`}
        disabled={disabled.section}
        handleFieldBlur={handleFieldBlur}
        touched={touched.contactPerson}
      />
      {dataset.note7 || isAdmin ? (
        <Row fluid margin="2em 0 0 0">
          <TextArea
            label="Indicazioni della redazione WeMi"
            inputValue={dataset.note7}
            onChange={(newValue) => {
              setFormField('note7', newValue);
            }}
            disabled={disabled.notes}
            bgColor="lightYellow"
          />
        </Row>
      ) : null}
    </AccordionCard>
  );
};

ContactPersonSectionComponent.displayName = 'Contact person section';

export const ContactPersonSection = React.memo(ContactPersonSectionComponent);
