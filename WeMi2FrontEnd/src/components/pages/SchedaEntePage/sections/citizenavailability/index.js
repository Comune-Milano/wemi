import React, { useEffect } from 'react';
import { useLogger } from 'services/Logger';
import { Row } from 'components/ui/Grid';
import TextArea from 'components/ui2/TextArea';
import {
  AccordionCard,
} from 'components/pages/SchedaEntePage/shared';
import { FormCitizenAvailability } from './form';

const CitizenAvailabilitySectionComponent = ({
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

  const setCitizenAvailabilityField = (key, value) => {
    const form = {
      ...dataset.citizenAvailability,
      [key]: value,
    };
    setFormField('citizenAvailability', form);
  };


  return (
    <AccordionCard
      title="Reperibilità per cittadini"
      description="I dati qui inseriti appariranno sulla scheda dell'ente e saranno ripresi in ogni scheda servizio."
      subtitle="Inserire il principale contatto che i cittadini potranno utilizzare per chiedere informazioni generali sui servizi."
    >
      <FormCitizenAvailability
        dataset={dataset.citizenAvailability}
        errors={errors.citizenAvailability}
        setDataset={setCitizenAvailabilityField}
        keySection={`${keySection}.citizenAvailability`}
        disabled={disabled.section}
        handleFieldBlur={handleFieldBlur}
        touched={touched.citizenAvailability}
      />
      {dataset.note8 || isAdmin ? (
        <Row fluid margin="2em 0 0 0">
          <TextArea
            label="Indicazioni della redazione WeMi"
            inputValue={dataset.note8}
            onChange={(newValue) => {
              setFormField('note8', newValue);
            }}
            disabled={disabled.notes}
            bgColor="lightYellow"
          />
        </Row>
      ) : null}
    </AccordionCard>
  );
};

CitizenAvailabilitySectionComponent.displayName = 'Citizen availability section';

export const CitizenAvailabilitySection = React.memo(CitizenAvailabilitySectionComponent);
