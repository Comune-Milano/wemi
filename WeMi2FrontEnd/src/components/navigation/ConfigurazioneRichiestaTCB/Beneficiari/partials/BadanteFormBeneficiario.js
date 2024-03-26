/** @format */

import React, { useState, useEffect } from 'react';
import yup from 'libs/Form/validation/yup';
import { Form } from 'libs/Form/components/Form';
import { isNullOrUndefined } from 'util';
import FormComponentBadante from './FormComponentBadante';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const BadanteFormBeneficiario = ({
  idRichiestaTcb,
  infoBen,
  setValidBeneficiario,
  formFieldValues002,
  getDatiRichiesta002,
  locale,
  onRemoveAccordion,
  onSaveAccordion,
}) => {
  const checkIfNewBen = (ben) => {
    if (isNullOrUndefined(ben[
      'eta',
      'sesso',
      'relazione'])
    ) {
      return true;
    }
    return false;
  };

  const cognome = infoBen.cognomeBen && infoBen.cognomeBen.txVal || '';
  const gradoRelazione = infoBen.relazione && {
    id: infoBen.relazione.cdValAttributo,
    value: infoBen.relazione.tlValoreTestuale[locale],
  } || undefined;
  const sesso = infoBen.sesso && {
    id: infoBen.sesso.cdValAttributo,
    label: infoBen.sesso.tlValoreTestuale[locale],
  } || {};
  const altraRelazione = infoBen.altroRelazione || '';
  const anni = infoBen.eta && parseInt(infoBen.eta.nrVal, 10) || 0;
  const patologie = infoBen.patologieAnziano &&
    infoBen.patologieAnziano.map(el => (
      {
        id: el.cdValAttributo,
        value: el.tlValoreTestuale[locale],
      }
    )) || [];
  const altrePatologie = infoBen.patologieAnziano &&
    infoBen.patologieAnziano.find(el => el.cdValAttributo === 0) &&
    infoBen.patologieAnziano.find(el => el.cdValAttributo === 0).txNota || '';
  const altreInfoPatologie = infoBen.altreInfoPatologie && infoBen.altreInfoPatologie.txVal || '';
  const deambulazione = infoBen.deambulazione && {
    id: infoBen.deambulazione.cdValAttributo,
    value: infoBen.deambulazione.tlValoreTestuale[locale],
  } || undefined;
  const altroDeambulazione = infoBen.altroDeambulazione || '';
  const altezza = infoBen.altezza && {
    id: infoBen.altezza.cdValAttributo,
    value: infoBen.altezza.tlValoreTestuale[locale],
  } || undefined;
  const corporatura = infoBen.corporatura && {
    id: infoBen.corporatura.cdValAttributo,
    value: infoBen.corporatura.tlValoreTestuale[locale],
  } || undefined;
  const altreInfo = infoBen.altreInfo && infoBen.altreInfo.txVal || '';

  const initialFormDataset = {
    cognome,
    gradoRelazione,
    altraRelazione,
    sesso,
    anni,
    patologie,
    altrePatologie,
    altreInfoPatologie,
    deambulazione,
    altroDeambulazione,
    altezza,
    corporatura,
    altreInfo,
  };

  const formValidationSchema = yup.object().shape({
    altezza: yup
      .object().shape({
        id: yup.number().required(),
        value: yup.string().required(),
      }),
    altraRelazione: yup
      .string()
      .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message)
      .when('gradoRelazione[id]', {
        is: 0,
        then: yup.string().required(),
        otherwise: yup.string(),
      }),
    altreInfo: yup
      .string()
      .nullable()
      .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
    altreInfoPatologie: yup
      .string()
      .nullable()
      .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
    altrePatologie: yup
      .string()
      .nullable()
      .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
    altroDeambulazione: yup
      .string()
      .nullable()
      .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message)
      .when('deambulazione[id]', {
        is: 0,
        then: yup.string().required(),
        otherwise: yup.string(),
      }),
    anni: yup
      .number()
      .typeError('Formato errato')
      .required()
      .min(0)
      .integer('Inserire un numero'),
    cognome: yup
      .string().required(),
    corporatura: yup
      .object().shape({
        id: yup.number().required(),
        value: yup.string().required(),
      }),
    deambulazione: yup
      .object().shape({
        id: yup.number().required(),
        value: yup.string().required(),
      }),
    gradoRelazione: yup
      .object().shape({
        id: yup.number().required(),
        value: yup.string().required(),
      }),
    sesso: yup
      .object().shape({
        id: yup.number().required().min(1).max(2).integer(),
        label: yup.string().required(),
      }),
  });

  const [benValidity, setBenValidity] = useState(false);

  if (!checkIfNewBen(infoBen) && !benValidity) {
    setBenValidity(true);
  }

  useEffect(() => {
    setValidBeneficiario(benValidity);
  }, [benValidity]);


  return (
    <Form
      initialDataset={initialFormDataset}
      validationSchema={formValidationSchema}
      validateOnChange
    >
      <FormComponentBadante
        idRichiestaTcb={idRichiestaTcb}
        infoBen={infoBen}
        setValidBeneficiario={setValidBeneficiario}
        formFieldValues002={formFieldValues002}
        getDatiRichiesta002={getDatiRichiesta002}
        locale={locale}
        onRemoveAccordion={onRemoveAccordion}
        onSaveAccordion={onSaveAccordion}

      />
    </Form>
  );
};

BadanteFormBeneficiario.displayName = 'BadanteFormBeneficiario';

export default BadanteFormBeneficiario;
