/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Checkbox from 'components/ui2/Checkbox';
import TextArea from 'components/ui2/TextArea';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import GroupFieldTitle from '../../partials/GroupFieldTitle';
import { getTCBServiceName } from '../../utils';

const SpaziPrevisti = ({
  spaziPrevisti,
  setFormField,
  sistemazione,
  altroSistemazione,
  handleFieldBlur,
  servizioTCB,
  locale,
  errors,
  touched,
}) => {
  const handleCheck = (arr, value) => {
    let newArr = arr.slice();
    if (newArr.includes(value)) {
      newArr = newArr.filter(el => el !== value);
      if (!newArr.length) {
        return [-1];
      }
      return newArr;
    }
    if (newArr.includes(-1)) {
      return [value];
    }
    return arr.concat(value);
  };


  return (
    <>
      <GroupFieldTitle
        title={`Quali sono gli spazi previsti per il/la ${getTCBServiceName(servizioTCB, locale)}?`}
        required
      />
      <Row fluid margin="0">
        {spaziPrevisti && spaziPrevisti.filter(el => el.cd_dominio_tcb !== 0)
          .map((el) => (
            <Column xs="12" md="6" padding="0 1em 0 0" key={el.cd_dominio_tcb.toString()}>
              <Checkbox
                label={el.tl_valore_testuale[locale]}
                value={sistemazione.includes(el.cd_dominio_tcb)}
                checkcolor="primary"
                width="auto"
                onChange={() => { setFormField('sistemazione', handleCheck(sistemazione, el.cd_dominio_tcb)); }}
              />
            </Column>
))
        }
      </Row>
      <Row fluid margin="2em 0 0 0">
        {spaziPrevisti && spaziPrevisti.filter(el => el.cd_dominio_tcb === 0)
          .map((el) => (
            <Column xs="12" padding="0" key={el.cd_dominio_tcb.toString()}>
              <Checkbox
                label={el.tl_valore_testuale[locale]}
                value={sistemazione.includes(el.cd_dominio_tcb)}
                checkcolor="primary"
                width="auto"
                onChange={() => { setFormField('sistemazione', handleCheck(sistemazione, el.cd_dominio_tcb)); }}
              />
            </Column>
))
        }
        {sistemazione.includes(0) && (
          <Column xs="12" padding="0">
            <TextArea
              onChange={(value) => setFormField('altroSistemazione', value)}
              error={touched.altroSistemazione && errors.altroSistemazione}
              maxLength={STRING_MAX_VALIDATION.value}
              onBlur={() => handleFieldBlur('altroSistemazione')}
              placeholder={`Scrivi qui gli altri spazi previsti per il/la ${getTCBServiceName(servizioTCB, locale)}`}
              inputValue={altroSistemazione}
              name="altroSistemazione"
              rows={2}
            />
          </Column>
        )}
      </Row>
    </>
  );
};

SpaziPrevisti.displayName = 'SpaziPrevisti';

export default SpaziPrevisti;
