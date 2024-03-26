import React, { useEffect } from 'react';
import { useLogger } from 'services/Logger';
import {
  FormOffice,
} from 'components/pages/SchedaEntePage/shared';
import { Row } from 'components/ui/Grid';
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';
import {
  OfficeDiv,
  P,
} from './style';


const CardFormOfficeComponent = ({
  dataset = {},
  errors = {},
  setDataset,
  keySection,
  disabled = {},
  handleFieldBlur,
  touched = {},
  onRemove,
}) => {
  const logger = useLogger();

  useEffect(() => {
    logger.log(keySection, dataset);
  }, [dataset]);

  const setFormFieldOffice = (key, value) => {
    const form = {
      ...dataset.address,
      [key]: value,
    };
    setDataset('address', form);
  };

  return (
    <OfficeDiv tabIndex="0" disabled={disabled} aria-label={`Scheda ${dataset.name}`}>
      <Row fluid justifycontent="space-between">
        <P>
          {dataset.name || 'Nome sede 1'}
        </P>
        <ButtonIcon
          icon="times"
          size="f5"
          color="blue"
          noBorder
          disabled={disabled}
          aria-label={`Rimuovi ${dataset.name}`}
          onClick={() => {
            onRemove(dataset.name);
          }}
        />
      </Row>
      <Row fluid margin="0.5em 0">
        <FormOffice
          column="12"
          sizepadding={{ xs: '0 0 2em 0', md: '0 0 2em 0' }}
          tabIndex="0"
          setDataset={setFormFieldOffice}
          required
          dataset={dataset.address}
          errors={errors.address}
          touched={touched.address}
          handleFieldBlur={handleFieldBlur}
          disabled={disabled}
          keySection={`${keySection}.address`}
        />
      </Row>
    </OfficeDiv>

  );
};

CardFormOfficeComponent.displayName = 'Card form office section';

export const CardFormOffice = React.memo(CardFormOfficeComponent);
