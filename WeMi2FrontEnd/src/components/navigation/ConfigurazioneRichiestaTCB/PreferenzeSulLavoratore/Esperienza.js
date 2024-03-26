/** @format */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import Checkbox from 'components/ui2/Checkbox';
import TextArea from 'components/ui2/TextArea';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import FadeInWrapper from '../partials/FadeInWrapper';
import GroupFieldTitle from '../partials/GroupFieldTitle';
import FieldTitle from '../partials/FieldTitle';
import { getTCBServiceName } from '../utils';


const Esperienza = ({
    dataset,
    setFormField,
    locale,
    esperienze,
    estraiDatiInizializzazione,
    errors,
    servizioTCB,
    touched,
    handleFieldBlur,
}) => {
  useEffect(() => {
    estraiDatiInizializzazione.forEach(element => {
      if (element.cd_attributo === 18 && element.cd_val_attributo === 0) {
        setFormField(`esperienza_${element.cd_val_attributo}`, true);
        setFormField('TextAreaAltroEsperienza', element.tx_nota);
      } else if (element.cd_attributo === 18) {
        setFormField(`esperienza_${element.cd_val_attributo}`, true);
      }
    });
  }, []);


  return (
    <>
      <GroupFieldTitle
        title="Istruzione, formazione ed esperienza"
      />
      <FieldTitle
        label={`Quale titolo di studio desideri che il/la ${getTCBServiceName(servizioTCB, locale)} abbia?`}
      />
      <Row fluid margin="0">
        {esperienze && esperienze.filter(el => el.cdDominioTcb !== 0)
                    .map((ele, index) => (
                      <Column xs="12" md="6" padding="0 1em 0 0" key={`esperienza_${ele.cdDominioTcb}`}>
                        <Checkbox
                          value={dataset[`esperienza_${ele.cdDominioTcb}`]}
                          onChange={(value) => { setFormField(`esperienza_${ele.cdDominioTcb}`, value); }}
                          label={ele.tlValoreTestuale[locale]}
                          checkcolor="primary"
                          width="auto"
                        />
                      </Column>
))
                }
      </Row>
      <Row fluid margin="2em 0 2em 0">
        {esperienze && esperienze.filter(el => el.cdDominioTcb === 0)
                    .map((ele, index) => (
                      <Column xs="12" padding="0" key={`esperienza_${ele.cdDominioTcb}`}>
                        <Checkbox
                          value={dataset[`esperienza_${ele.cdDominioTcb}`]}
                          onChange={(value) => { setFormField(`esperienza_${ele.cdDominioTcb}`, value); }}
                          label={ele.tlValoreTestuale[locale]}
                          checkcolor="primary"
                          width="auto"
                        />
                      </Column>
))
                }
        {dataset.esperienza_0 && (
          <Column xs="12" padding="0">
            <TextArea
              placeholder="Scrivi qui eventuali altre preferenze sui titolo di studio"
              inputValue={dataset.TextAreaAltroEsperienza}
              onChange={(value) => {
                setFormField('TextAreaAltroEsperienza', value);
              }}
              onBlur={() => { handleFieldBlur('TextAreaAltroEsperienza'); }}
              error={touched.TextAreaAltroEsperienza && errors.TextAreaAltroEsperienza}
              maxLength={STRING_MAX_VALIDATION.value}
            />
          </Column>
                  )}
      </Row>
    </>
  );
};

Esperienza.displayName = 'Esperienza';

const mapDispatchToProps = ({

});

const mapStoreToProps = store => ({
});

export default connect(mapStoreToProps, mapDispatchToProps)(Esperienza);
