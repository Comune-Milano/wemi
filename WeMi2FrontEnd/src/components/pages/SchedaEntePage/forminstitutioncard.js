import React from 'react';
import { Form } from 'libs/Form/components/Form';
import Loader from 'components/ui2/Loader';
import { InstitutionCard } from './institutioncard';

const FormInstitutionCardComponent = ({
  initialDataset,
  validationSchema: creationSchema,
  isAdmin,
  datiLogin,
  institutionId,
  isLoading,
  hasErrors,
  getInstitutionCard,
}) => {
  if (hasErrors) {
    return null;
  }

  return (
    isLoading ? (
      <Loader />
    )
      :
      (
        <Form
          initialDataset={initialDataset}
          validationSchema={creationSchema(initialDataset)}
          validateOnBlur
          validateOnMount
        >
          <InstitutionCard
            isAdmin={isAdmin}
            datiLogin={datiLogin}
            institutionId={institutionId}
            getInstitutionCard={getInstitutionCard}
          />
        </Form>
      )
  );
};

FormInstitutionCardComponent.displayName = 'Form institution card';

export const FormInstitutionCard = FormInstitutionCardComponent;
