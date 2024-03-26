/** @format */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Column } from 'components/ui/Grid';
import Checkbox from 'components/ui2/Checkbox';
import TextArea from 'components/ui2/TextArea';
import ColumnsContainer from 'components/ui2/ColumnsContainer';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import { getTCBServiceName } from '../utils';
import GroupFieldTitle from '../partials/GroupFieldTitle';
import FadeInWrapper from '../partials/FadeInWrapper';

const CompitiBabySitter = ({
  formDataset,
  setFormField,
  locale,
  estraiDati,
  estraiMansioniColf,
  servizioTCB,
  handleFieldBlur,
  touched,
  errors,

}) => {
  useEffect(() => {
    if (estraiDati && estraiDati.mansioni && estraiDati.mansioni.length > 0) {
      estraiDati.mansioni.forEach((el) => {
        setFormField(el.cdDominioTcb, true);
      });
    }
  }, [estraiDati]);

  const addMans = (idMans, value) => {
    if (value) {
      const copiaMansioni = formDataset.mansioni.slice();
      copiaMansioni.push(idMans);

      return copiaMansioni;
    }
    return formDataset.mansioni.filter(el => el !== idMans);
  };

  return (
    <FadeInWrapper fluid>
      <GroupFieldTitle
        title={`Cosa dovrà fare il/la ${getTCBServiceName(servizioTCB, locale)}?`}
        required
      />
      <Row fluid margin="0">
        <ColumnsContainer xsCount={1} mdCount={2} width="100%">
          {estraiMansioniColf?.filter(el => el.cdDominioTcb !== 0)
            .map((ele, index) => (
              <Column padding="0" key={ele.cdDominioTcb.toString()}>
                <Checkbox
                  value={formDataset.mansioni.includes(ele.cdDominioTcb)}
                  onChange={(value) => { setFormField('mansioni', addMans(ele.cdDominioTcb, value)); }}
                  label={ele.txTitoloMansione[locale]}
                  checkcolor="primary"
                  width="auto"
                />
              </Column>
))
          }
        </ColumnsContainer>
      </Row>
      <Row fluid margin="2em 0 0 0">
        {estraiMansioniColf && estraiMansioniColf.filter(el => el.cdDominioTcb === 0)
          .map((ele, index) => (
            <Column xs="12" padding="0" key={ele.cdDominioTcb.toString()}>
              <Checkbox
                // onBlur={() => handleFieldBlur('mansioni')}
                // error={touched.mansioni && errors.mansioni}
                value={formDataset.mansioni.includes(ele.cdDominioTcb)}
                onChange={(value) => { setFormField('mansioni', addMans(ele.cdDominioTcb, value)); }}
                label={ele.txTitoloMansione[locale]}
                checkcolor="primary"
                width="auto"
              />
            </Column>
))
        }
        {formDataset.mansioni.includes(0) && (
          <Column xs="12" padding="0">
            <TextArea
              onBlur={() => handleFieldBlur('TextArea')}
              error={touched.TextArea && errors.TextArea}
              placeholder={`Scrivi qui le altre mansioni che vuoi che il/la ${getTCBServiceName(servizioTCB, locale)} svolga`}
              inputValue={formDataset.TextArea}
              onChange={(value) => setFormField('TextArea', value)}
              maxLength={STRING_MAX_VALIDATION.value}
            />
          </Column>
        )}
      </Row>

    </FadeInWrapper>
  );
};

CompitiBabySitter.displayName = 'CompitiBabySitter';

const mapStoreToProps = store => ({
  locale: store.locale,

});

const mapDispatchToProps = ({

});

export default connect(mapStoreToProps, mapDispatchToProps)(CompitiBabySitter);
