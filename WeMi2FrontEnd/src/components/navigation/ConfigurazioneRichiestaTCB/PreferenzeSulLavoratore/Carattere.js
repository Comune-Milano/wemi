/** @format */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Column } from 'components/ui/Grid';
import Checkbox from 'components/ui2/Checkbox';
import TextArea from 'components/ui2/TextArea';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import GroupFieldTitle from '../partials/GroupFieldTitle';

const Carattere = ({
  dataset,
  setFormField,
  errors,
  locale,
  carattere,
  estraiDatiInizializzazione,
  touched,
  handleFieldBlur,
}) => {
  useEffect(() => {
    estraiDatiInizializzazione.forEach(element => {
      if (element.cd_attributo === 68 && element.cd_val_attributo === 0) {
        setFormField(`carattere_${element.cd_val_attributo}`, true);
        setFormField('TextAreaAltroCarattere', element.tx_nota);
      } else if (element.cd_attributo === 68) {
        setFormField(`carattere_${element.cd_val_attributo}`, true);
      }
    });
  }, []);

  return (
    <>
      <GroupFieldTitle
        title="Carattere"
      />
      <Row fluid margin="0">
        {carattere && carattere.filter(el => el.cdDominioTcb !== 0)
          .map((ele) => (
            <Column xs="6" md="4" padding="0 1em 0 0" key={`carattere_${ele.cdDominioTcb}`}>
              <Checkbox
                value={dataset[`carattere_${ele.cdDominioTcb}`]}
                onChange={(value) => { setFormField(`carattere_${ele.cdDominioTcb}`, value); }}
                label={ele.tlValoreTestuale[locale]}
                checkcolor="primary"
                width="auto"
              />
            </Column>
))
        }
      </Row>
      <Row fluid margin="2em 0 0 0">
        {carattere && carattere.filter(el => el.cdDominioTcb === 0)
          .map((ele) => (
            <Column xs="12" padding="0" key={`carattere_${ele.cdDominioTcb}`}>
              <Checkbox
                value={dataset[`carattere_${ele.cdDominioTcb}`]}
                onChange={(value) => { setFormField(`carattere_${ele.cdDominioTcb}`, value); }}
                label={ele.tlValoreTestuale[locale]}
                checkcolor="primary"
                width="auto"
              />
            </Column>
))
        }
        {dataset.carattere_0 && (
          <Column xs="12" padding="0">
            <TextArea
              placeholder="Scrivi qui eventuali altre preferenze sul carattere"
              inputValue={dataset.TextAreaAltroCarattere}
              onChange={(value) => {
                setFormField('TextAreaAltroCarattere', value);
              }}
              onBlur={() => { handleFieldBlur('TextAreaAltroCarattere'); }}
              error={touched.TextAreaAltroCarattere && errors.TextAreaAltroCarattere}
              maxLength={STRING_MAX_VALIDATION.value}

            />
          </Column>
        )}
      </Row>
    </>
  );
};

Carattere.displayName = 'Carattere';

const mapDispatchToProps = ({

});

const mapStoreToProps = () => ({

});

export default connect(mapStoreToProps, mapDispatchToProps)(Carattere);
