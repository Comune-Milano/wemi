/** @format */

import React, { useEffect } from 'react';
import Checkbox from 'components/ui2/Checkbox';
import TextArea from 'components/ui2/TextArea';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import GroupFieldTitle from '../partials/GroupFieldTitle';
import { getTCBServiceName } from '../utils';

const AltrePreferenze = ({
    dataset,
    setFormField,
    estraiDatiInizializzazione,
    servizioTCB,
    locale,
    touched,
    handleFieldBlur,
    errors,
}) => {
  useEffect(() => {
    estraiDatiInizializzazione.forEach(element => {
      if (element.cd_attributo === 33 && element.fg_val === '1') {
        setFormField('altreEsperienzeFg', true);
      }
      if (element.cd_attributo === 93) {
        setFormField('TextAreaAltro', element.tx_val);
      }
      if (element.cd_attributo === 76) {
        setFormField('checkTextArea', element.tx_val);
      }
    });
  }, []);

  return (
    <>
      <GroupFieldTitle
        title="Altre preferenze"
      />
      <TextArea
        placeholder="Scrivi qui eventuali altre preferenze"
        inputValue={dataset.TextAreaAltro}
        onChange={(value) => {
          setFormField('TextAreaAltro', value);
        }}
        onBlur={() => { handleFieldBlur('TextAreaAltro'); }}
        error={touched.TextAreaAltro && errors.TextAreaAltro}
        maxLength={STRING_MAX_VALIDATION.value}
      />
      <Checkbox
        spacing="2em 0 0 0"
        value={dataset.altreEsperienzeFg}
        onChange={(value) => { setFormField('altreEsperienzeFg', value); }}
        label={`Ho avuto già esperienze con ${getTCBServiceName(servizioTCB, locale)}`}
        checkcolor="primary"
        width="auto"
      />
      {dataset.altreEsperienzeFg && (
      <TextArea
        placeholder="Scrivi qui della tua esperienza"
        inputValue={dataset.checkTextArea}
        onChange={(value) => {
          setFormField('checkTextArea', value);
        }}
        onBlur={() => { handleFieldBlur('checkTextArea'); }}
        error={touched.checkTextArea && errors.checkTextArea}
        maxLength={STRING_MAX_VALIDATION.value}
      />
              )}
    </>
  );
};

AltrePreferenze.displayName = 'AltrePreferenze';


export default (AltrePreferenze);
