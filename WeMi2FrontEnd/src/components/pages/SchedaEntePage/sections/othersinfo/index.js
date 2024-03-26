import React, { useEffect } from 'react';
import { useLogger } from 'services/Logger';
import { Row } from 'components/ui/Grid';
import TextArea from 'components/ui2/TextArea';
import {
  AccordionCard,
} from 'components/pages/SchedaEntePage/shared';
import { FormOthersInfo } from './form';

const OthersInfoSectionComponent = ({
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

  const setOthersInfoField = (key, value) => {
    const form = {
      ...dataset.othersInfo,
      [key]: value,
    };
    setFormField('othersInfo', form);
  };


  return (
    <AccordionCard
      title="Altro"
    >
      <FormOthersInfo
        dataset={dataset.othersInfo}
        errors={errors.othersInfo}
        setDataset={setOthersInfoField}
        keySection={`${keySection}.othersInfo`}
        disabled={disabled.section}
        handleFieldBlur={handleFieldBlur}
        touched={touched.othersInfo}
      />
      {dataset.note9 || isAdmin ? (
        <Row fluid margin="2em 0 0 0">
          <TextArea
            label="Indicazioni della redazione WeMi"
            inputValue={dataset.note9}
            onChange={(newValue) => {
              setFormField('note9', newValue);
            }}
            disabled={disabled.notes}
            bgColor="lightYellow"
          />
        </Row>
      ) : null}
    </AccordionCard>
  );
};

OthersInfoSectionComponent.displayName = 'Others information section';

export const OthersInfoSection = React.memo(OthersInfoSectionComponent);
