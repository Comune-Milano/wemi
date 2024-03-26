/** @format */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import InputNumber from 'components/ui2/InputNumber';
import FadeInWrapper from '../partials/FadeInWrapper';
import GroupFieldTitle from '../partials/GroupFieldTitle';
import FieldTitle from '../partials/FieldTitle';
import { getTCBServiceName } from '../utils';


const AnniEsperienza = ({
    dataset,
    setFormField,
    estraiDatiInizializzazione,
    servizioTCB,
    locale,
}) => {
  useEffect(() => {
    estraiDatiInizializzazione.forEach(element => {
      if (element.cd_attributo === 70) {
        setFormField('anni', element.nr_val);
      }
    });
  }, []);


  return (
    <>
      <FieldTitle
        label={`Quanti anni di esperienza desideri che il/la ${getTCBServiceName(servizioTCB, locale)} abbia?`}
      />
      <Row fluid margin="0 0 2em 0">
        <InputNumber
          value={Number.parseInt(dataset.anni, 10) || 0}
          onChange={(value) => setFormField('anni', value)}
          onInputChange={(value) => setFormField('anni', value)}
          minValue={0}
          maxValue={99}
          size="f7"
          iconColor="primary"
          textColor="black"
          ariaLabel="anni di esperienza"
        />
        <Text
          tag="span"
          size="f7"
          padding="0 0 0 1.5em"
          value="anni di esperienza"
        />
      </Row>
    </>
  );
};

AnniEsperienza.displayName = 'AnniEsperienza';

const mapDispatchToProps = ({

});

const mapStoreToProps = store => ({

});

export default connect(mapStoreToProps, mapDispatchToProps)(AnniEsperienza);
