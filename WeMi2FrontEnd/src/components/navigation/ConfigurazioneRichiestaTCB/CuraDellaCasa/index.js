/** @format */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import yup from 'libs/Form/validation/yup';
import { Form } from 'libs/Form/components/Form';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { isNullOrUndefined } from 'util';
import RadioGroup from 'components/ui2/RadioGroup';
import FadeInWrapper from '../partials/FadeInWrapper';
import StepTitle from '../partials/StepTitle';
import GroupFieldTitle from '../partials/GroupFieldTitle';
import { getTCBServiceName } from '../utils';
import DatiCasa from './DatiCasa';
import Buttons from './Buttons';
import CompitiBabySitter from './CompitiBabySitter';
import {
  estraiDatiConfigurazioneRichiesta004 as estraiDatiConfigurazioneRichiesta004Q,
  estraiBase as estraiBaseQ,
} from './estraiDominiTcb';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const CuraDellaCasa = ({
  idRichiestaTcb,
  locale,
  moveNext,
  moveBack,
  servizioTCB,
  changeStep,
  steps,
  stepDomanda,
  onChangeValidation,
  stepCheckValidity,
  sendRequestTCB,
}) => {
  const [estraiDati] = useGraphQLRequest(
    undefined,
    estraiDatiConfigurazioneRichiesta004Q,
    { idRichiestaTcb },
    true
  );
  const [estraiDatiBase] = useGraphQLRequest(
    undefined,
    estraiBaseQ,
    {},
    true
  );
  const [initialFormDataSet, setInitialFormDataSet] = useState();


  const RadioItems =
    [{
      id: 1,
      label: `Sì, voglio che la il/la ${getTCBServiceName(servizioTCB, locale)} si occupi della mia casa.`,
    },
    {
      id: 2,
      label: `No, non voglio che la il/la ${getTCBServiceName(servizioTCB, locale)} si occupi della mia casa.`,
    }];

  const formvalidationSchema = yup.object().shape({
    vediCasa: yup
      .object().shape({
        id: yup.number().required(),
        value: yup.string(),
      }),
    mqCasa: yup.mixed().when('vediCasa[id]', {
      is: 1,
      then: yup.mixed().required(),
      otherwise: yup.mixed(),
    }),
    tipoCasa: yup.mixed().when('vediCasa[id]', {
      is: 1,
      then: yup.mixed().required(),
      otherwise: yup.mixed(),
    }),
    TextArea: yup.string()
    .when('mansioni', (mansioni, formvalidationSchema) => {
      if (mansioni.includes(0)) {
        return yup.string().required().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message);
      }
      return yup.string().nullable().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message);
    }),
    ascensore: yup.boolean(),
    terrazzaBalcone: yup.boolean(),
    giardino: yup.boolean(),
    fumatori: yup.boolean(),
    bagni: yup.number(),
    piano: yup.number(),
    stanze: yup.number().when('vediCasa[id]', {
      is: 1,
      then: yup.number().min(1, 'Inserire almeno una stanza'),
      otherwise: yup.number(),
    }),
    mansioni: yup.array().of(yup
      .number().integer().min(0)).when('vediCasa[id]', {
        is: 1,
        then: yup.array().of(yup.number().integer().min(0)).required(),
        otherwise: yup.array().of(yup.number().integer().min(0)),
      }).nullable(),
  });

  useEffect(() => {
    if (!isNullOrUndefined(estraiDati.data)) {
      let numeroStanze = estraiDati.data.numeroStanze &&
        estraiDati.data.numeroStanze.tlValoreTestuale &&
        estraiDati.data.numeroStanze.tlValoreTestuale[locale] || 0;
      if (isNaN(parseInt(numeroStanze, 10))) {
        numeroStanze = 7;
      }

      let numeroBagni = estraiDati.data.numeroBagni &&
        estraiDati.data.numeroBagni.tlValoreTestuale &&
        estraiDati.data.numeroBagni.tlValoreTestuale[locale] || 0;
      if (isNaN(parseInt(numeroBagni, 10))) {
        numeroBagni = 6;
      }
      setInitialFormDataSet({
        vediCasa: servizioTCB.cd_dominio_tcb === 2 ?
          {
            id: 1,
          }
          :
          estraiDati.data.flagCasa && estraiDati.data.flagCasa.flag === '1' ?
            {
              id: 1,
            }
            : estraiDati.data.flagCasa && estraiDati.data.flagCasa.flag === '0' ?
              {
                id: 2,
              }
              : {},
        mqCasa: estraiDati.data.superficieCasa && estraiDati.data.superficieCasa.cdValAttributo ?
          { id: estraiDati.data.superficieCasa && estraiDati.data.superficieCasa.cdValAttributo || '', value: estraiDati.data.superficieCasa && estraiDati.data.superficieCasa.tlValoreTestuale && estraiDati.data.superficieCasa.tlValoreTestuale[locale] || '' }
          : null,
        tipoCasa: estraiDati.data.abitazione && estraiDati.data.abitazione.cdValAttributo ?
          { id: estraiDati.data.abitazione && estraiDati.data.abitazione.cdValAttributo || '', value: estraiDati.data.abitazione && estraiDati.data.abitazione.tlValoreTestuale && estraiDati.data.abitazione.tlValoreTestuale[locale] || '' }
          : null,
        TextArea: estraiDati.data.altroValue || undefined,
        ascensore: !!(estraiDati.data.ascensoreFlag && estraiDati.data.ascensoreFlag.flag === '1'),
        terrazzaBalcone: !!(estraiDati.data.terrazzaFlag && estraiDati.data.terrazzaFlag.flag === '1'),
        giardino: !!(estraiDati.data.giardinoFlag && estraiDati.data.giardinoFlag.flag === '1'),
        fumatori: !!(estraiDati.data.fumatoriFlag && estraiDati.data.fumatoriFlag.flag === '1'),
        bagni: numeroBagni,
        piano: estraiDati.data.piano && estraiDati.data.piano.txVal && estraiDati.data.piano.txVal || 0,
        stanze: numeroStanze,
        mansioni: estraiDati.data && estraiDati.data.mansioni ? estraiDati.data.mansioni.map(el => el.cdDominioTcb) : [],
      });
    }
  }, [estraiDati.data]);


  return (
    !isNullOrUndefined(estraiDati.data) && (
      <FadeInWrapper fluid>

        <StepTitle
          title="Cura della casa"
          description={`In questa sezione ti chiediamo di descriverci le carratteristiche della casa per poter dare queste
        informazioni al/la ${getTCBServiceName(servizioTCB, locale)} che selezioneremo.`}
        />

        {!estraiDati.pristine && !estraiDati.isLoading && initialFormDataSet && !isNullOrUndefined(estraiDatiBase.data) && (
          <Form
            validateOnChange
            initialDataset={initialFormDataSet}
            validationSchema={formvalidationSchema}
          >

            {({ dataset, touched, setFormField, isFormValid, errors, handleFieldBlur, isFormDirty }) => (
              <>
                {servizioTCB.cd_dominio_tcb !== 2 && (
                  <>
                    <GroupFieldTitle
                      title={`Il/la ${getTCBServiceName(servizioTCB, locale)} deve svolgere faccende domestiche?`}
                      marginTop="0"
                      required
                    />
                    <div>
                      <RadioGroup
                        radioItems={RadioItems}
                        onBlur={() => handleFieldBlur('vediCasa')}
                        error={touched.vediCasa && errors.vediCasa}
                        selectedItem={dataset.vediCasa}
                        onChange={(value) => { setFormField('vediCasa', value); }}
                        fontSize="f7"
                        checkcolor="primary"
                        display="inline-grid"
                      />
                    </div>
                  </>
                )}

                {dataset.vediCasa && dataset.vediCasa.id && dataset.vediCasa.id === 1 ? (
                  <>
                    <DatiCasa
                      handleFieldBlur={handleFieldBlur}
                      touched={touched}
                      errors={errors}
                      formDataset={dataset}
                      setFormField={setFormField}
                      estraiSuperficieCasa={estraiDatiBase.data.EstraiSuperficieCasa}
                      estraiCaratteristicheAbitazione={estraiDatiBase.data.EstraiCaratteristicheAbitazione}
                    />
                    <CompitiBabySitter
                      handleFieldBlur={handleFieldBlur}
                      touched={touched}
                      errors={errors}
                      formDataset={dataset}
                      setFormField={setFormField}
                      estraiDati={estraiDati.data}
                      servizioTCB={servizioTCB}
                      estraiMansioniColf={estraiDatiBase.data.EstraiMansioniColf}
                    />
                  </>
                )
                  : null}
                <Buttons
                  isFormDirty={isFormDirty}
                  dataset={dataset}
                  idRichiestaTcb={idRichiestaTcb}
                  moveNext={moveNext}
                  moveBack={moveBack}
                  servizioTCB={servizioTCB}
                  stepValidity={isFormValid}
                  changeStep={changeStep}
                  steps={steps}
                  stepDomanda={stepDomanda}
                  stepCheckValidity={stepCheckValidity}
                  onChangeValidation={onChangeValidation}
                  sendRequestTCB={sendRequestTCB}
                />
              </>
            )}

          </Form>
        )}
      </FadeInWrapper>
      )
  );
};

CuraDellaCasa.displayName = 'Cura Della Casa';

const mapStoreToProps = store => ({
  locale: store.locale,
});

const mapDispatchToProps = ({

});

export default connect(mapStoreToProps, mapDispatchToProps)(CuraDellaCasa);
