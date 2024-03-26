/** @format */

import React from 'react';
import yup from 'libs/Form/validation/yup';
import { Form } from 'libs/Form/components/Form';
import { isNullOrUndefined } from 'util';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import FormComponentTata from './FormComponentTata';
import { createSelectArray } from '../../utils';


const TataFormBeneficiario = ({
  idRichiestaTcb,
  infoBen,
  setValidBeneficiario,
  formFieldValues002,
  getDatiRichiesta002,
  locale,
  onRemoveAccordion,
  onSaveAccordion,
}) => {
  const { lingueParlateFieldValues } = formFieldValues002.data;

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

  const lingueSelect = createSelectArray(lingueParlateFieldValues, locale);

  const gradoRelazione = infoBen.relazione && {
    id: infoBen.relazione.cdValAttributo,
    value: infoBen.relazione.tlValoreTestuale[locale]
  } || undefined;
  const sesso = infoBen.sesso && {
    id: infoBen.sesso.cdValAttributo,
    label: infoBen.sesso.tlValoreTestuale[locale]
  } || {};
  const altraRelazione = infoBen.altroRelazione || '';
  const anni = infoBen.eta && parseInt(infoBen.eta.nrVal, 10) || 0;
  const patologie = (infoBen.patologieBambino &&
    infoBen.patologieBambino.map(el => (
      {
        id: el.cdValAttributo,
        value: el.tlValoreTestuale[locale]
      }
    ))
  ) || [];
  const altrePatologie = (infoBen.patologieBambino &&
    infoBen.patologieBambino.find(el => el.cdValAttributo === 0) &&
    infoBen.patologieBambino.find(el => el.cdValAttributo === 0).txNota)
    || '';
  const lingueParlate = checkIfNewBen(infoBen) ? lingueSelect.filter(el => el.value.toLowerCase() === 'italiano') :
    infoBen.lingue.map(el => (
      {
        id: el.cdValAttributo,
        value: el.tlValoreTestuale[locale]
      }
    ));
  const altreInfo = infoBen.altreInfo && infoBen.altreInfo.txVal || '';
  const altreLingue = (
    infoBen.lingue && infoBen.lingue.find(el => el.cdValAttributo === 0) &&
    infoBen.lingue.find(el => el.cdValAttributo === 0).txNota) || '';

  const initialFormDataset = {
    gradoRelazione,
    altraRelazione,
    sesso,
    anni,
    patologie,
    altrePatologie,
    lingueParlate,
    altreInfo,
    altreLingue,
  };

  const formValidationSchema = yup.object().shape({
    altraRelazione: yup
      .string()
      .when('gradoRelazione[id]', {
        is: 0,
        then: yup.string().required().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
        otherwise: yup.string().nullable().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
      }),
    altreInfo: yup
      .string()
      .nullable()
      .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
    altreLingue: yup
      .string()
      .nullable()
      .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
    altrePatologie: yup
      .string()
      .nullable()
      .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
    anni: yup
      .number()
      .typeError('Formato errato')
      .required()
      .min(0)
      .integer('Inserire un numero'),
    gradoRelazione: yup
      .object()
      .shape({
        id: yup.number().required(),
        value: yup.string().required(),
      }),
    lingueParlate: yup
      .array()
      .required(),
    sesso: yup
      .object()
      .shape({
        id: yup.number().required().min(1).max(2).integer(),
        label: yup.string().required(),
      }),
  });

  return (
    <Form
      initialDataset={initialFormDataset}
      validationSchema={formValidationSchema}
      validateOnChange
    >
      <FormComponentTata
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

TataFormBeneficiario.displayName = 'TataFormBeneficiario';

export default TataFormBeneficiario;