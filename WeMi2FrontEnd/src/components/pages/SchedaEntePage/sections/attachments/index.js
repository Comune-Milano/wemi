import React, { useEffect } from 'react';
import { useLogger } from 'services/Logger';
import { Row } from 'components/ui/Grid';
import TextArea from 'components/ui2/TextArea';
import {
  AccordionCard,
} from 'components/pages/SchedaEntePage/shared';
import { ListAttachment } from './listattachment';
import { Socials } from './socials';

const AttachmentsSectionComponent = ({
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

  const setFormFieldAttachments = (key, value) => {
    const form = {
      ...dataset,
      [key]: value,
    };
    setDataset(keySection, form);
  };

  return (
    <AccordionCard title="Logo, allegati e web">
      <ListAttachment
        dataset={dataset}
        disabled={disabled.section}
        setFormFieldAttachments={setFormFieldAttachments}
        errors={errors}
        touched={touched}
        handleFieldBlur={handleFieldBlur}
        keySection={keySection}
      />
      <Socials
        dataset={dataset}
        disabled={disabled.section}
        setFormFieldAttachments={setFormFieldAttachments}
        errors={errors}
        touched={touched}
        handleFieldBlur={handleFieldBlur}
        keySection={keySection}
      />
      {dataset.note4 || isAdmin ? (
        <Row fluid margin="2em 0 0 0">
          <TextArea
            label="Indicazioni della redazione WeMi"
            inputValue={dataset.note4}
            onChange={(newValue) => {
              setFormFieldAttachments('note4', newValue);
            }}
            disabled={disabled.notes}
            bgColor="lightYellow"
          />
        </Row>
      ) : null}
    </AccordionCard>
  );
};

AttachmentsSectionComponent.displayName = 'Description section';

export const AttachmentsSection = React.memo(AttachmentsSectionComponent);
