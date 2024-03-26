import React, { Fragment, useCallback, useLayoutEffect } from 'react';
import { Row } from 'components/ui/Grid';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { useEventCallback } from 'hooks/useEventCallback';
import { ButtonsInstitution, ButtonsAdministrator } from './buttons';
import {
  InstitutionSection,
  OperatorsSection,
  DescriptionSection,
  AttachmentsSection,
  PrimaryOfficeSection,
  SecondaryOfficesSection,
  ContactPersonSection,
  CitizenAvailabilitySection,
  OthersInfoSection,
  MerchantSection,
  PaymentSection,
} from './sections';
import { keysSection } from './constants';
import { errorsToObject, calculateDisabledSections } from './utils';

const InstitutionCardComponent = ({
  isAdmin,
  datiLogin,
  institutionId,
  getInstitutionCard,
}) => {
  const { dataset, errors, setFormField, handleFieldBlur, touched } = useFormContext();

  const splitErrorsKeys = useCallback(() => errorsToObject(errors), [errors]);

  const splitTouchedKeys = useCallback(() => errorsToObject(touched), [touched]);

  const errorsFormatted = splitErrorsKeys();

  const touchedFormatted = splitTouchedKeys();

  const calculateDisabledSectionsNew = useEventCallback(() => {
    const { stateCode } = dataset;
    return calculateDisabledSections(stateCode, isAdmin);
  }, [dataset]);

  const disabledSections = calculateDisabledSectionsNew();

  useLayoutEffect(() => window.scrollTo(0, 0), []);

  return (
    <Fragment>
      <Row fluid>
        <InstitutionSection
          isAdmin={isAdmin}
          dataset={dataset.institutionSection}
          setDataset={setFormField}
          keySection={keysSection.institutionSection}
          disabled={disabledSections.institutionSection}
          handleFieldBlur={handleFieldBlur}
        />
      </Row>
      <Row fluid margin="2em 0 0 0">
        <OperatorsSection
          institutionId={institutionId}
          isAdmin={isAdmin}
          dataset={dataset.operatorsSection}
          errors={errorsFormatted.operatorsSection}
          setDataset={setFormField}
          keySection={keysSection.operatorsSection}
          disabled={disabledSections.operatorsSection}
          handleFieldBlur={handleFieldBlur}
          touched={touchedFormatted.operatorsSection}
        />
      </Row>
      <Row fluid margin="2em 0 0 0">
        <DescriptionSection
          isAdmin={isAdmin}
          dataset={dataset.descriptionSection}
          errors={errorsFormatted.descriptionSection}
          setDataset={setFormField}
          keySection={keysSection.descriptionSection}
          disabled={disabledSections.descriptionSection}
          handleFieldBlur={handleFieldBlur}
          touched={touchedFormatted.descriptionSection}
        />
      </Row>
      <Row fluid margin="2em 0 0 0">
        <AttachmentsSection
          isAdmin={isAdmin}
          dataset={dataset.attachmentsSection}
          errors={errorsFormatted.attachmentsSection}
          setDataset={setFormField}
          keySection={keysSection.attachmentsSection}
          disabled={disabledSections.attachmentsSection}
          handleFieldBlur={handleFieldBlur}
          touched={touchedFormatted.attachmentsSection}
        />
      </Row>
      <Row fluid margin="2em 0 0 0">
        <PrimaryOfficeSection
          isAdmin={isAdmin}
          dataset={dataset.primaryOfficeSection}
          errors={errorsFormatted.primaryOfficeSection}
          setDataset={setFormField}
          keySection={keysSection.primaryOfficeSection}
          disabled={disabledSections.primaryOfficeSection}
          handleFieldBlur={handleFieldBlur}
          touched={touchedFormatted.primaryOfficeSection}
        />
      </Row>
      <Row fluid margin="2em 0 0 0">
        <SecondaryOfficesSection
          isAdmin={isAdmin}
          institutionId={institutionId}
          dataset={dataset.secondaryOfficesSection}
          errors={errorsFormatted.secondaryOfficesSection}
          setDataset={setFormField}
          keySection={keysSection.secondaryOfficesSection}
          disabled={disabledSections.secondaryOfficesSection}
          handleFieldBlur={handleFieldBlur}
          touched={touchedFormatted.secondaryOfficesSection}
        />
      </Row>
      <Row fluid margin="2em 0 0 0">
        <ContactPersonSection
          isAdmin={isAdmin}
          dataset={dataset.contactPersonSection}
          errors={errorsFormatted.contactPersonSection}
          setDataset={setFormField}
          keySection={keysSection.contactPersonSection}
          disabled={disabledSections.contactPersonSection}
          handleFieldBlur={handleFieldBlur}
          touched={touchedFormatted.contactPersonSection}
        />
      </Row>
      <Row fluid margin="2em 0 0 0">
        <CitizenAvailabilitySection
          isAdmin={isAdmin}
          dataset={dataset.citizenAvailabilitySection}
          errors={errorsFormatted.citizenAvailabilitySection}
          setDataset={setFormField}
          keySection={keysSection.citizenAvailabilitySection}
          disabled={disabledSections.citizenAvailabilitySection}
          handleFieldBlur={handleFieldBlur}
          touched={touchedFormatted.citizenAvailabilitySection}
        />
      </Row>
      <Row fluid margin="2em 0 0 0">
        <OthersInfoSection
          isAdmin={isAdmin}
          dataset={dataset.othersInfoSection}
          errors={errorsFormatted.othersInfoSection}
          setDataset={setFormField}
          keySection={keysSection.othersInfoSection}
          disabled={disabledSections.othersInfoSection}
          handleFieldBlur={handleFieldBlur}
          touched={touchedFormatted.othersInfoSection}
        />
      </Row>
      <Row fluid margin="2em 0 0 0">
        <MerchantSection
          isAdmin={isAdmin}
          dataset={dataset.merchantSection}
          errors={errorsFormatted.merchantSection}
          setDataset={setFormField}
          keySection={keysSection.merchantSection}
          disabled={disabledSections.merchantSection}
          handleFieldBlur={handleFieldBlur}
          touched={touchedFormatted.merchantSection}
        />
      </Row>
      <Row fluid margin="2em 0 0 0">
        <PaymentSection
          isAdmin={isAdmin}
          dataset={dataset.paymentInfoSection}
          errors={errorsFormatted.paymentInfoSection}
          setDataset={setFormField}
          keySection={keysSection.paymentInfoSection}
          disabled={disabledSections.paymentInfoSection}
          handleFieldBlur={handleFieldBlur}
          touched={touchedFormatted.paymentInfoSection}
        />
      </Row>
      <Row fluid margin="2em 0 0 0">
        {isAdmin ? (
          <ButtonsAdministrator
            datiLogin={datiLogin}
            institutionId={institutionId}
            getInstitutionCard={getInstitutionCard}
          />
        )
          : (
            <ButtonsInstitution
              datiLogin={datiLogin}
              getInstitutionCard={getInstitutionCard}
            />
        )}
      </Row>
    </Fragment>
  );
};
InstitutionCardComponent.displayName = 'Institution card';

export const InstitutionCard = InstitutionCardComponent;
