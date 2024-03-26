/** @format */

import React, { useState, useEffect } from 'react';
import Text from 'components/ui/Text';
import Checkbox from 'components/ui2/Checkbox';
import yup from 'libs/Form/validation/yup';
import { Form } from 'libs/Form/components/Form';
import { Row, Column } from 'components/ui/Grid';
import RadioGroup from 'components/ui2/RadioGroup';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { isNullOrUndefined } from 'util';
import FadeInWrapper from '../partials/FadeInWrapper';
import StepTitle from '../partials/StepTitle';
import GroupFieldTitle from '../partials/GroupFieldTitle';
import { getTCBServiceName } from '../utils';
import { FormTCBIRI005 } from './partials';
import Buttons from './partials/Buttons';
import { estraiMansioniAnimali as estraiMansioniAnimaliQ, estraiDatiConfigurazioneRichiesta005 as estraiDatiConfigurazioneRichiesta005Q } from './estraiDominiTcb';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';


const CuraDegliAnimali = ({
  locale,
  idRichiestaTcb,
  moveNext,
  moveBack,
  servizioTCB,
  stepDomanda,
  changeStep,
  stepCheckValidity,
  onChangeValidation,
  sendRequestTCB,
}) => {
  const [initialForm, setInitialForm] = useState();

  const [estraiDati] = useGraphQLRequest(
    undefined,
    estraiMansioniAnimaliQ,
    {},
    true
  );
  const [estraiDatiIniziali] = useGraphQLRequest(
    undefined,
    estraiDatiConfigurazioneRichiesta005Q,
    { idRichiestaTcb },
    true
  );

  const formvalidationSchema = yup.object().shape({
    vediAnimali: yup
      .object().shape({
        id: yup.number().required(),
        value: yup.string(),
      }),
    controlloAnimali: yup.boolean().when('vediAnimali[id]', {
      is: 1,
      then: yup.boolean().oneOf([true], 'Inserire un animale'),
      otherwise: yup.boolean(),
    }),
    mansioni: yup.array().nullable(),
    TextAreaAltreMansioni: yup.string().when('mansioni', (mansioni, formvalidationSchema) => {
      if (mansioni.includes(0)) {
        return yup.string().required().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message);
      }
      return yup.string().nullable().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message);
    }),

    altriAnimali: yup.boolean(),
    TextAreaAltriAnimali: yup.string('Scrivere un altro animale').when('altriAnimali', {
      is: true,
      then: yup.string('Scrivere un altro animale').required().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
    }),
  });

  const RadioItems =
    [{
      id: 1,
      label: 'Sì, ci sono degli animali.',
    },
    {
      id: 2,
      label: 'No, non ci sono degli animali.',
    }];


  useEffect(() => {
    if (!isNullOrUndefined(estraiDatiIniziali.data)) {
      const dati = estraiDatiIniziali.data.EstraiDatiConfigurazioneRichiesta005;
      setInitialForm({
        vediAnimali: dati.animaliFlag && dati.animaliFlag.flag === '1' ? {
          id: 1,
        } : dati.animaliFlag && dati.animaliFlag.flag === '0' ?
            {
              id: 2,
            }
            : {},
        nCani: dati.numeroCani && dati.numeroCani.nrVal || 0,
        nGatti: dati.numeroGatti && dati.numeroGatti.nrVal || 0,
        altriAnimali: !!(dati.altriAnimaliFlag && dati.altriAnimaliFlag.flag === '1'),
        TextAreaAltriAnimali: dati.altriAnimaliFlag && dati.altriAnimaliFlag.flag === '1' ? dati.altriAnimaliFlag.txNota : undefined,
        controlloAnimali: !!((dati.numeroCani && dati.numeroCani.nrVal > 0 || dati.numeroGatti && dati.numeroGatti.nrVal > 0) || (dati.altriAnimaliFlag && dati.altriAnimaliFlag.flag === '1' && dati.altriAnimaliFlag && dati.altriAnimaliFlag.txNota && dati.altriAnimaliFlag.txNota.length > 0)),
        controlloCheck: !!(dati.mansioni && dati.mansioni.length > 0),
        mansioni: dati && dati.mansioni && dati.mansioni.map((el) => el.cdDominioTcb) || [],
      });
    }
  }, [estraiDatiIniziali.data]);

  return (
    !isNullOrUndefined(estraiDatiIniziali.data) && (
      <FadeInWrapper fluid>
        <StepTitle
          title="Cura degli animali"
          description="In questa sezione ti chiediamo di dirci se sono presenti animali in casa tua e se necessitano di accudimento."
        />
        {!estraiDatiIniziali.pristine && !estraiDatiIniziali.isLoading && initialForm && !isNullOrUndefined(estraiDati.data) && (
          <>
            <Form
              initialDataset={initialForm}
              validateOnChange
              validationSchema={formvalidationSchema}
            >

              {({ dataset, setFormField, isFormValid, errors, touched, handleFieldBlur, isFormDirty }) => (
                <>
                  <GroupFieldTitle
                    title="Sono presenti animali in casa?"
                    marginTop="0"
                    required
                  />
                  <div>
                    <RadioGroup
                      radioItems={RadioItems}
                      onBlur={() => handleFieldBlur('vediAnimali')}
                      error={touched.vediAnimali && errors.vediAnimali}
                      selectedItem={dataset.vediAnimali}
                      onChange={(value) => { setFormField('vediAnimali', value); }}
                      fontSize="f7"
                      checkcolor="primary"
                      display="inline-grid"
                    />
                  </div>
                  {dataset.vediAnimali && dataset.vediAnimali.id && dataset.vediAnimali.id === 1 ? (
                    <FormTCBIRI005
                      servizioTCB={servizioTCB}
                      errors={errors}
                      handleFieldBlur={handleFieldBlur}
                      touched={touched}
                      dataset={dataset}
                      estraiMansioniAnimali={estraiDati.data.EstraiMansioniAnimali}
                      setFormField={setFormField}
                      inizializzareMansioni={estraiDatiIniziali.data.EstraiDatiConfigurazioneRichiesta005}
                      locale={locale}
                    />
                  )
                    : null}

                  <Buttons
                    dataset={dataset}
                    isFormDirty={isFormDirty}
                    idRichiestaTcb={idRichiestaTcb}
                    moveNext={moveNext}
                    moveBack={moveBack}
                    stepValidity={isFormValid}
                    stepDomanda={stepDomanda}
                    changeStep={changeStep}
                    stepCheckValidity={stepCheckValidity}
                    onChangeValidation={onChangeValidation}
                    sendRequestTCB={sendRequestTCB}
                  />

                </>
              )}

            </Form>

          </>
        )}
      </FadeInWrapper>
    )
  );
};

CuraDegliAnimali.displayName = 'Cura Degli Animali';

export default CuraDegliAnimali;
