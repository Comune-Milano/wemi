import React, { useEffect } from 'react';
import { useLogger } from 'services/Logger';
import { Row } from 'components/ui/Grid';
import TextArea from 'components/ui2/TextArea';
import { AccordionCard } from 'components/pages/SchedaEntePage/shared';

const DescriptionSectionComponent = ({
  dataset = {},
  errors = {},
  setDataset,
  keySection,
  disabled = {},
  touched = {},
  handleFieldBlur,
  isAdmin,
}) => {
  const logger = useLogger();

  useEffect(() => {
    logger.log(keySection, dataset);
  }, [dataset]);

  const setFormFieldDescription = (key, value) => {
    const form = {
      ...dataset,
      [key]: value,
    };
    setDataset(keySection, form);
  };

  return (
    <AccordionCard title="Descrizione">
      <Row fluid>
        <TextArea
          label="Descrizione"
          required
          // placeholder="descrizione ente"
          inputValue={dataset.description}
          onChange={(newValue) => {
            setFormFieldDescription('description', newValue);
          }}
          error={touched.description && errors.description ? errors.description : ''}
          onBlur={() => handleFieldBlur(`${keySection}.description`)}
          height="100px"
          disabled={disabled.section}
        />
      </Row>
      {dataset.note3 || isAdmin ? (
        <Row fluid margin="2em 0 0 0">
          <TextArea
            label="Indicazioni della redazione WeMi"
            inputValue={dataset.note3}
            onChange={(newValue) => {
              setFormFieldDescription('note3', newValue);
            }}
            disabled={disabled.notes}
            bgColor="lightYellow"
          />
        </Row>
      ) : null}
    </AccordionCard>
  );
};

DescriptionSectionComponent.displayName = 'Description section';

export const DescriptionSection = React.memo(DescriptionSectionComponent);
