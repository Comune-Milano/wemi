/** @format */

import React from 'react';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { useDepChange } from 'hooks/useDepChange';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { useBusSubscribe } from 'hooks/eventBus/useBusSubscribe';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import {
  FormDatiAnagrafici,
  FormCartaIdentita,
  FormPassaporto,
  FormPermessoSoggiorno,
  FormDomicilio,
  FormResidenza,
  FormContatti,
} from './formPartials';
import {
  estraiDatiAnagraficiFormFieldsValues as estraiDatiAnagraficiFormFieldsValuesQ,
  inserisciModificaAttributoUtente as inserisciModificaAttributoUtenteM,
} from '../AnagraficaGraphql';
import { createArrayConfig } from './utils/createArrayConfig';
import ButtonsNavigation from '../../partials/ButtonsNavigation';

const FormAnagrafica = ({
  idOperatore,
  userInfo,
  changeStep,
  moveToNextStep,
  locale,
  stepCandidate,
}) => {
  const { dataset, setFormField, errors, validateForm, touched, handleFieldBlur, isFormDirty } = useFormContext();

  /** Estraggo i dati per valorizzare le options delle Select */
  const [formFieldValues] = useGraphQLRequest(
    undefined,
    estraiDatiAnagraficiFormFieldsValuesQ,
    {},
    true
  );

  const inserisciAttributi = useStatelessGraphQLRequest(
    inserisciModificaAttributoUtenteM,
  );
  /**
   * Gets the callback trigger the saving of step-related data.
   */
  const getSaveDataCallback = () => {
    if (!isFormDirty) {
      return () => Promise.resolve();
    }
    return () => inserisciAttributi({
      input: {
        idUtente: Number.parseInt(userInfo.idLavoratore, 10),
        arrayConfig: createArrayConfig(dataset, touched),
      },
    });
  };

  /**
   * A callback to run when a step candidate mutation is detected.
   * @param {*} step
   */
  const onStepCandidateChange = step => {
    changeStep(step, validateForm, getSaveDataCallback());
  };

  // React to any change to the step candidate.
  useDepChange(onStepCandidateChange, stepCandidate);

  useBusSubscribe(
    'SALVA_ADMIN',
    getSaveDataCallback(),
    isNullOrUndefined(idOperatore)
  );

  const loaded = !formFieldValues.pristine && !formFieldValues.isLoading;

  if (!loaded) {
    return null;
  }

  return (
    <>
      <FormDatiAnagrafici
        userInfo={userInfo}
        dataset={dataset.datiAnagrafici}
        contatti={dataset.contatti}
        setFormField={setFormField}
        sessoFieldsValues={
          formFieldValues.data.sessoFieldValues.map(el => ({
            id: el.cdDominioTcb,
            value: el.tlValoreTestuale[locale],
          }))
        }
        statoNascitaFieldsValues={
          formFieldValues.data.statoNascitaFieldValues.map(el => ({
            id: el.cdDominioTcb,
            value: el.tlValoreTestuale[locale],
          }))
        }
        errors={errors}
        touched={touched}
        handleFieldBlur={handleFieldBlur}
      />
      <FormCartaIdentita
        dataset={dataset.cartaIdentita}
        setFormField={setFormField}
        errors={errors}
        touched={touched}
        handleFieldBlur={handleFieldBlur}
      />
      <FormPassaporto
        dataset={dataset.passaporto}
        setFormField={setFormField}
        errors={errors}
        touched={touched}
        handleFieldBlur={handleFieldBlur}
      />
      <FormPermessoSoggiorno
        dataset={dataset.permessoSoggiorno}
        setFormField={setFormField}
        errors={errors}
        touched={touched}
        handleFieldBlur={handleFieldBlur}
      />
      <FormDomicilio
        dataset={dataset.domicilio}
        residenza={dataset.residenza}
        setFormField={setFormField}
        errors={errors}
        touched={touched}
        handleFieldBlur={handleFieldBlur}
      />
      <FormResidenza
        dataset={dataset.residenza}
        domicilio={dataset.domicilio}
        setFormField={setFormField}
        errors={errors}
        touched={touched}
        handleFieldBlur={handleFieldBlur}
      />
      <FormContatti
        dataset={dataset.contatti}
        setFormField={setFormField}
        errors={errors}
        touched={touched}
        handleFieldBlur={handleFieldBlur}
      />
      <ButtonsNavigation
        onMoveNext={() => moveToNextStep(validateForm, getSaveDataCallback())}
      />
    </>
  );
};

FormAnagrafica.displayName = ' FormAnagrafica';
export default FormAnagrafica;
