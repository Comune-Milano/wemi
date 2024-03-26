/** @format */

import React, { useEffect } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Checkbox from 'components/ui2/Checkbox';
import TextArea from 'components/ui2/TextArea';
import InputNumber from 'components/ui2/InputNumber';
import { connect } from 'react-redux';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import { getTCBServiceName } from '../../utils';
import GroupFieldTitle from '../../partials/GroupFieldTitle';
import FadeInWrapper from '../../partials/FadeInWrapper';


const FormTCBIRI005 = ({
  dataset,
  setFormField,
  estraiMansioniAnimali,
  inizializzareMansioni,
  locale,
  servizioTCB,
  handleFieldBlur,
  touched,
  errors,
}) => {
  const ControlloAnimali = (nome, value) => {
    if (
      ((nome === 'nCani' ? value : dataset.nCani) > 0) ||
      ((nome === 'nGatti' ? value : dataset.nGatti) > 0) ||
      ((nome === 'altriAnimali' ? value === true : dataset.altriAnimali === true) &&
        ((nome === 'TextAreaAltriAnimali' ? value.length > 0 : dataset.TextAreaAltriAnimali && dataset.TextAreaAltriAnimali.length > 0)))) {
      setFormField('controlloAnimali', true);
    } else {
      setFormField('controlloAnimali', false);
    }
  };

  useEffect(() => {
    if (inizializzareMansioni && inizializzareMansioni.mansioni && inizializzareMansioni.mansioni.length > 0) {
      inizializzareMansioni.mansioni.forEach(element => {
        if (element.cdDominioTcb === 0) {
          setFormField('TextAreaAltreMansioni', element.txNota);
        }
      });
    }
  }, []);

  const addMans = (idMans, value) => {
    const mansioni = dataset.mansioni.slice();
    if (value) {
      mansioni.push(idMans);
      return mansioni.slice();
    }
    return mansioni.slice().filter(el => el !== idMans);
  };
  return (
    <FadeInWrapper fluid>

      <GroupFieldTitle
        title="Quali e quanti animali ci sono?"
        required
      />
      <Row fluid margin="0 0 0.5em 0">
        <Text
          tag="span"
          size="f7"
          value="Ci sono"
          padding="0 1em 0 0"
          width="5em"
        />
        <InputNumber
          value={Number.parseInt(dataset.nCani,10) || 0}
          onChange={(value) => {
            setFormField('nCani', value);
            ControlloAnimali('nCani', value);
          }}
          onInputChange={(value) => {
            setFormField('nCani', value);
            ControlloAnimali('nCani', value);
          }}
          onBlur={() => handleFieldBlur('ControlloAnimali')}
          error={touched.ControlloAnimali && errors.ControlloAnimali}
          minValue={0}
          maxValue={99}
          size="f7"
          iconColor="primary"
          textColor="black"
          ariaLabel="numero cani"
        />
        <Text
          tag="span"
          size="f7"
          value="cani"
          padding="0 0 0 1.5em "
        />
      </Row>
      <Row fluid margin="0">
        <Text
          tag="span"
          size="f7"
          value="Ci sono"
          padding="0 1em 0 0"
          width="5em"
        />
        <InputNumber
          value={Number.parseInt(dataset.nGatti, 10) || 0}
          onChange={(value) => {
            setFormField('nGatti', value);
            ControlloAnimali('nGatti', value);
          }}
          onInputChange={(value) => {
            setFormField('nGatti', value);
            ControlloAnimali('nGatti', value);
          }}
          onBlur={() => handleFieldBlur('ControlloAnimali')}
          error={touched.ControlloAnimali && errors.ControlloAnimali}
          minValue={0}
          maxValue={99}
          size="f7"
          iconColor="primary"
          textColor="black"
          ariaLabel="numero gatti"
        />
        <Text
          tag="span"
          size="f7"
          value="gatti"
          padding="0 0 0 1.5em "
        />
      </Row>
      <Row fluid margin="2em 0 0 0">
        <Column xs="12" padding="0">
          <Checkbox
            value={dataset.altriAnimali}
            onChange={(value) => {
              setFormField('altriAnimali', value);
              ControlloAnimali('altriAnimali', value);
            }}
            label="Ci sono altri animali (specificare)"
            checkcolor="primary"
            width="auto"
          />
        </Column>
        {dataset.altriAnimali && (
          <Column xs="12" padding="0" margin="0">
            <TextArea
              placeholder="Scrivi qui quali e quanti altri animali ci sono"
              inputValue={dataset.TextAreaAltriAnimali}
              maxLength={STRING_MAX_VALIDATION.value}
              onBlur={() => handleFieldBlur('TextAreaAltriAnimali')}
              error={touched.TextAreaAltriAnimali && errors.TextAreaAltriAnimali}
              onChange={(value) => { setFormField('TextAreaAltriAnimali', value); ControlloAnimali('TextAreaAltriAnimali', value); }}
            />
          </Column>
        )}
      </Row>

      <GroupFieldTitle
        title={`Cosa dovrà fare il/la ${getTCBServiceName(servizioTCB, locale)}?`}
      />

      <Row fluid margin="0">
        {estraiMansioniAnimali && estraiMansioniAnimali.filter(el => el.cdDominioTcb !== 0)
          .map((ele, index) => (
            <Column xs="12" padding="0" key={ele.cdDominioTcb.toString()}>
              <Checkbox
                onBlur={() => handleFieldBlur('mansioni')}
                error={touched.mansioni && errors.mansioni}
                value={dataset.mansioni && dataset.mansioni.includes(ele.cdDominioTcb)}
                onChange={(value) => { setFormField('mansioni', addMans(ele.cdDominioTcb, value)); }}
                label={ele.txTitoloMansione[locale]}
                checkcolor="primary"
                width="auto"
              />
            </Column>
          ))
        }
      </Row>
      <Row fluid margin="2em 0 0 0">
        {estraiMansioniAnimali && estraiMansioniAnimali.filter(el => el.cdDominioTcb === 0)
          .map((ele, index) => (
            <Column xs="12" padding="0" key={ele.cdDominioTcb.toString()}>
              <Checkbox
                value={dataset.mansioni.includes(ele.cdDominioTcb)}
                onBlur={() => handleFieldBlur('mansioni')}
                error={touched.mansioni && errors.mansioni}
                onChange={(value) => { setFormField('mansioni', addMans(ele.cdDominioTcb, value)); }}
                label={ele.txTitoloMansione[locale]}
                checkcolor="primary"
                width="auto"
              />
            </Column>
))
        }
        {dataset.mansioni.includes(0) && (
          <Column xs="12" padding="0">
            <TextArea
              placeholder={`Scrivi qui le altre mansioni che vuoi che il/la ${getTCBServiceName(servizioTCB, locale)} svolga`}
              inputValue={dataset.TextAreaAltreMansioni}
              onBlur={() => handleFieldBlur('TextAreaAltreMansioni')}
              error={touched.TextAreaAltreMansioni && errors.TextAreaAltreMansioni}
              onChange={(value) => setFormField('TextAreaAltreMansioni', value)}
              maxLength={STRING_MAX_VALIDATION.value}
            />
          </Column>
        )}
      </Row>

    </FadeInWrapper>
  );
};

FormTCBIRI005.displayName = ' FormTCBIRI005';

const mapDispatchToProps = ({

});

const mapStoreToProps = store => ({

});

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(FormTCBIRI005);
