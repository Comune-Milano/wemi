/** @format */

import React from 'react';
import yup from 'libs/Form/validation/yup';
import { connect } from 'react-redux';
import { TCBConfig002 } from 'redux-modules/actions/authActions';
import { Row, Column } from 'components/ui/Grid';
import Checkbox from 'components/ui2/Checkbox';
import TextArea from 'components/ui2/TextArea';
import { Form } from 'libs/Form/components/Form';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import { Buttons } from './Buttons';

const AltrePersone = ({
  idRichiestaTcb,
  datiRichiesta002,
  hasEmptyBeneficiario,
  isStepValidToNext,
  cdServizioTCB,
  moveNext,
  servizioTCB,
  changeStep,
  stepDomanda,
  stepCheckValidity,
  onChangeValidation,
  sendRequestTCB,
}) => {
  const altriFratelli = datiRichiesta002 && datiRichiesta002.altriFratelliFlag && datiRichiesta002.altriFratelliFlag.flag === '1';
  const nonni = datiRichiesta002 && datiRichiesta002.nonniFlag && datiRichiesta002.nonniFlag.flag === '1';
  const altri = datiRichiesta002 && datiRichiesta002.altriFlag && datiRichiesta002.altriFlag.flag === '1';
  const altriValue = datiRichiesta002 && datiRichiesta002.altriFlag && datiRichiesta002.altriFlag.txNota || '';

  const initialFormDataset = {
    altriFratelli,
    nonni,
    altri,
    altriValue,
  };

  const formValidationSchema = yup.object().shape({
    altri: yup
      .boolean().nullable(),
    altriValue: yup
      .string()
      .when('altri', {
        is: true,
        then: yup.string().required().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
        otherwise: yup.string().nullable().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
      }),
    beneficiariCompleti: yup
      .boolean().nullable()
      .test('hasEmptyBeneficiario', 'beneficiari non completi', () => hasEmptyBeneficiario),
  });

  return (
    <>
      {datiRichiesta002 ? (
        <Form
          initialDataset={initialFormDataset}
          validationSchema={formValidationSchema}
          validateOnChange
        >
          {
            ({ dataset, touched, errors, setFormField, handleFieldBlur, isFormDirty }) => (
              <>
                <Row fluid margin="0 0 .5em">
                  {cdServizioTCB === 1 ? (
                    <Row>
                      <Column padding="0">
                        <Checkbox
                          value={dataset.altriFratelli}
                          checkcolor="primary"
                          label="Altri fratelli non da accudire"
                          fontSize="f7"
                          onChange={() => setFormField('altriFratelli', !dataset.altriFratelli)}
                          width="auto"
                        />
                      </Column>
                      <Column padding="0">
                        <Checkbox
                          value={dataset.nonni}
                          checkcolor="primary"
                          label="Nonni"
                          fontSize="f7"
                          onChange={() => setFormField('nonni', !dataset.nonni)}
                          width="auto"
                        />
                      </Column>
                    </Row>
                  )
                    : null}
                  <Column padding="1em 0 0 0">
                    <Checkbox
                      value={dataset.altri}
                      checkcolor="primary"
                      label={cdServizioTCB === 1 ? 'Altri (specificare)' : 'Si (specificare)'}
                      fontSize="f7"
                      onChange={() => setFormField('altri', !dataset.altri)}
                      width="auto"
                    />
                  </Column>
                </Row>
                {dataset.altri ? (
                  <Row fluid>
                    <TextArea
                      onChange={(value) => setFormField('altriValue', value)}
                      onBlur={() => handleFieldBlur('altriValue')}
                      placeholder="Scrivi qui quali altre persone sono presenti in casa"
                      error={touched.altriValue && errors.altriValue}
                      inputValue={dataset.altriValue}
                      name="Specificare altre persone"
                      maxLength={STRING_MAX_VALIDATION.value}
                      rows={3}
                    />
                  </Row>
                )
                  : null}
                <Buttons
                  moveNextValid={isStepValidToNext}
                  moveBack={null}
                  changeStep={changeStep}
                  moveNext={moveNext}
                  servizioTCB={servizioTCB}
                  isFormDirty={isFormDirty}
                  stepDomanda={stepDomanda}
                  isStepValid={isStepValidToNext}
                  idRichiestaTcb={idRichiestaTcb}
                  stepCheckValidity={stepCheckValidity}
                  onChangeValidation={onChangeValidation}
                  sendRequestTCB={sendRequestTCB}
                />
              </>
            )}
        </Form>
      )
        : null}
    </>
  );
};

AltrePersone.displayName = 'AltrePersone';

const mapDispatchToProps = ({
  TCBConfig002,
});

const mapStoreToProps = store => ({
  config002: store.requestTCB.config002,
  EstraiDati: store.graphql.EstraiDatiConfigurazioneRichiesta002,
  locale: store.locale,
});
export default connect(mapStoreToProps, mapDispatchToProps)(AltrePersone);