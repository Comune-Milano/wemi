import React, { useEffect } from 'react';
import { useLogger } from 'services/Logger';
import { Row, Column } from 'components/ui/Grid';
import TextArea from 'components/ui2/TextArea';
import {
  AccordionCard,
} from 'components/pages/SchedaEntePage/shared';
import Button from 'components/ui2/Button';
import Input from 'components/ui2/Input';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { CardFormOffice } from './cardformoffice';
import { addOffice, modifyOffice, removeOffice } from './utils';
import { checkDeleteSecondaryOffice } from './graphql';

const SecondaryOfficesSectionComponent = ({
  dataset = {},
  errors = {},
  setDataset,
  keySection,
  disabled = {},
  handleFieldBlur,
  touched = {},
  isAdmin,
  institutionId,
}) => {
  const logger = useLogger();

  const checkSecondaryOffice = useStatelessGraphQLRequest(checkDeleteSecondaryOffice);

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

  const setValues = (values = {}) => {
    const form = {
      ...dataset,
      ...values,
    };
    setDataset(keySection, form);
  };

  const addNewOffice = () => {
    const newOfficesArray = addOffice(dataset.name, locations);
    setValues({
      secondaryLocations: newOfficesArray,
      name: '',
    });
  };

  const handleChangeOnOffice = (field) => {
    const newOffices = modifyOffice({
      name: field.name,
      key: field.key,
      value: field.value,
      ...field,
    }, locations);
    setFormField('secondaryLocations', newOffices);
  };

  const removeOldOffice = async (location) => {
    const newOffices = removeOffice(location.name, locations);
    const result = await checkSecondaryOffice({
      offices: [{ ...location }],
      institutionId: isAdmin ? institutionId : undefined,
    });
    if (result) {
      setFormField('secondaryLocations', newOffices);
    }
  };


  const locationsDataset = dataset.secondaryLocations || [];

  const locations = locationsDataset.slice();
  /**
   * Verify if the field name sede is touched and errored
   * if there is an administrative block of the button
   * and if the field is empty.
   * Then disable the button aggiungi
   */
  const isTouched = !!(touched.name && errors.name);
  const isAdminDisabled = disabled.section;
  const isEmpty = !(dataset.name);
  const isDisabled = isTouched || isAdminDisabled || isEmpty;
  return (
    <AccordionCard title="Altre sedi oltre a quella legale">
      <Row fluid>
        <Column xs="12" md="9" padding="0" sizepadding={{ xs: '0 0 2em 0', md: '0 2em 0 0' }}>
          <Input
            label="Altra sede"
            inputValue={dataset.name}
            // placeholder="inserisci nome sede"
            onChange={(newValue) => {
              setFormField('name', newValue);
            }}
            disabled={disabled.section}
            error={touched.name && errors.name ? errors.name : ''}
            onBlur={() => handleFieldBlur(`${keySection}.name`)}
          />
        </Column>
        <Column
          flex
          alignitems="flex-end"
          xs="12"
          md="3"
          padding="0"
          sizepadding={{ xs: '0 0 2em 0', md: '0 2em 0 0' }}
        >
          <Button
            label="aggiungi"
            color="blue"
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              addNewOffice();
            }}
            disabled={isDisabled}
          />
        </Column>
      </Row>
      <Row fluid margin="2em 0 0 0">
        {locations.map((location, index) => (
          <Column
            key={`secondary_office_${location.name}`}
            xs="12"
            md="6"
            padding="0"
            sizepadding={{ xs: '0 0 2em 0', md: '2em 2em 0 0' }}
          >
            <CardFormOffice
              setDataset={(key, value) => {
                handleChangeOnOffice({
                  key,
                  value,
                  name: location.name,
                  id: location.id,
                });
              }}
              dataset={location}
              errors={errors[`secondaryLocations[${index}]`]}
              touched={touched[`secondaryLocations[${index}]`]}
              handleFieldBlur={handleFieldBlur}
              disabled={disabled.section}
              keySection={`${keySection}.secondaryLocations[${index}]`}
              onRemove={(name) => {
                removeOldOffice({ name, id: location.id });
              }}
            />
          </Column>
        ))}
      </Row>
      {dataset.note6 || isAdmin ? (
        <Row fluid margin="2em 0 0 0">
          <TextArea
            label="Indicazioni della redazione WeMi"
            inputValue={dataset.note6}
            onChange={(newValue) => {
              setFormField('note6', newValue);
            }}
            disabled={disabled.notes}
            bgColor="lightYellow"
          />
        </Row>
      ) : null}
    </AccordionCard>
  );
};

SecondaryOfficesSectionComponent.displayName = 'Secondary offices section';

export const SecondaryOfficesSection = React.memo(SecondaryOfficesSectionComponent);
