/** @format */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Select from 'components/ui2/Select';
import InputNumber from 'components/ui2/InputNumber';
import OptionNumber from 'components/ui2/OptionNumber';
import Checkbox from 'components/ui2/Checkbox';
import { getTCBServiceName } from '../utils';
import FieldTitle from '../partials/FieldTitle';
import GroupFieldTitle from '../partials/GroupFieldTitle';
import FadeInWrapper from '../partials/FadeInWrapper';


const DatiCasa = ({
  formDataset,
  setFormField,
  estraiSuperficieCasa,
  estraiCaratteristicheAbitazione,
  locale,
  handleFieldBlur,
  touched,
  errors,
}) => {
  const [itemsMisure, setItemsMisure] = useState([]);
  const [itemsTipo, setItemsTipo] = useState([]);
  const mansioni = [
    {
      label: 'Dispone di un ascensore',
      key: 'ascensore',
    },
    {
      label: 'Dispone di una terrazza / un balcone',
      key: 'terrazzaBalcone',
    },
    {
      label: 'Dispone di un giardino',
      key: 'giardino',
    },
  ];

  const creaItems = (arr) => {
    const ris = [];

    arr && arr.forEach(element => {
      ris.push({ id: element.cdDominioTcb, value: element.tlValoreTestuale[locale] });
    });

    return ris;
  };

  useEffect(() => {
    setItemsMisure(creaItems(estraiSuperficieCasa));
    setItemsTipo(creaItems(estraiCaratteristicheAbitazione));
  }, []);

  return (
    <FadeInWrapper fluid>
      <GroupFieldTitle
        title={'Com\'è la tua casa?'}
      />
      <Row fluid margin="0">
        <Column xs="12" md="6" padding="0 0 .5em 0" sizepadding={{ md: '0 1em 0 0' }}>
          <FieldTitle
            label="Quanto misura la superficie della casa?"
            required
          />
          <Select
            items={itemsMisure}
            onBlur={() => handleFieldBlur('mqCasa')}
            error={touched.mqCasa && errors.mqCasa}
            selectedValue={formDataset.mqCasa}
            clickedSelectedItem={(value) => { setFormField('mqCasa', undefined); }}
            clickedItem={(value) => { setFormField('mqCasa', value); }}
            placeholder="Seleziona la superficie della casa"
            name="Seleziona la superficie della casa"
            labelSelected="superficie della casa"
          />
        </Column>
        <Column xs="12" md="6" padding=".5em 0 0 0" sizepadding={{ md: '0 0 0 1em' }}>
          <FieldTitle
            label="Che tipo di abitazione è?"
            required
          />
          <Select
            items={itemsTipo}
            onBlur={() => handleFieldBlur('tipoCasa')}
            error={touched.tipoCasa && errors.tipoCasa}
            selectedValue={formDataset.tipoCasa}
            clickedSelectedItem={() => { setFormField('tipoCasa', null); }}
            clickedItem={(value) => { setFormField('tipoCasa', value); }}
            placeholder="Seleziona il tipo di abitazione"
            name="Seleziona il tipo di abitazione"
            labelSelected="tipo di abitazione"
          />
        </Column>
      </Row>
      <Row fluid margin="2em 0 0.5em 0">
        <Text
          tag="span"
          size="f7"
          value="La casa ha"
          padding="0 1em 0 0"
          width="7em"
        />
        <OptionNumber
          ariaLabel="Numero di stanze"
          value={formDataset.stanze}
          onChange={(value) => {
            if (value > 6) {
              return setFormField('stanze', 7);
            }
            return setFormField('stanze', value);
          }}
          onBlur={() => handleFieldBlur('stanze')}
          error={touched.stanze && errors.stanze}
          minValue={0}
          maxValue={6}
          size="f7"
          iconColor="primary"
          textColor="black"
          afterLabel="> 6"
          ariaAfterLabel="maggiore di 6"
        />
        <Text
          tag="span"
          size="f7"
          value="stanze"
          padding="0 0 0 1.5em "
        />
        <Text
          tag="span"
          value="*"
          weight="normal"
          color="red"
        />
      </Row>
      <Row fluid margin="0 0 0.5em 0">
        <Text
          tag="span"
          size="f7"
          value="La casa ha"
          padding="0 1em 0 0"
          width="7em"
        />
        <OptionNumber
          ariaLabel="Numero di bagni"
          value={formDataset.bagni}
          onChange={(value) => { setFormField('bagni', value); }}
          minValue={0}
          maxValue={5}
          afterLabel="> 5"
          ariaAfterLabel= "maggiore di 5"
          size="f7"
          iconColor="primary"
          textColor="black"
        />
        <Text
          tag="span"
          size="f7"
          value="bagni"
          padding="0 0 0 1.5em "
        />
      </Row>
      <Row fluid margin="0 0 2em 0">
        <Text
          tag="span"
          size="f7"
          value="La casa è al"
          padding="0 1em 0 0"
          width="7em"
        />
        <InputNumber
          ariaLabel="Piano a cui si trova la casa"
          value={Number.parseInt(formDataset.piano, 10) || 0}
          onChange={(value) => setFormField('piano', value)}
          onInputChange={(value) => setFormField('piano', value)}
          minValue={0}
          maxValue={99}
          size="f7"
          iconColor="primary"
          textColor="black"
        />
        <Text
          tag="span"
          size="f7"
          value="piano"
          padding="0 0 0 1.5em "
        />
      </Row>

      {mansioni.map((ele, index) => (
        <Row fluid margin="0" key={index}>
          <Checkbox
            value={formDataset[ele.key] || false}
            onChange={(value) => { setFormField(ele.key, value); }}
            label={ele.label}
            checkcolor="primary"
            width="auto"
          />
        </Row>
        ))
      }
      <Row fluid margin="2em 0 0 0">
        <Checkbox
          value={formDataset.fumatori || false}
          onChange={(value) => { setFormField('fumatori', value); }}
          label="Sono presenti fumatori"
          checkcolor="primary"
          width="auto"
        />
      </Row>
    </FadeInWrapper>
  );
};

DatiCasa.displayName = 'DatiCasa';

const mapStoreToProps = store => ({

  locale: store.locale,
});

const mapDispatchToProps = ({

});

export default connect(mapStoreToProps, mapDispatchToProps)(DatiCasa);
