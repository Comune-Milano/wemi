/** @format */

import React, { useState, useEffect } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Select from 'components/ui2/Select';
import Input from 'components/ui2/Input';
import FieldTitle from '../partials/FieldTitle';
import { getTCBServiceName } from '../utils';

const Lingue = ({
  dataset,
  setFormField,
  locale,
  lingueSelect,
  estraiDatiInizializzazione,
  servizioTCB
}) => {
  const [lingueItems, setLingueItems] = useState()
  useEffect(() => {
    let arr = []
    lingueSelect.forEach(element => {
      arr.push(
        {
          id: element.cdDominioTcb,
          value: element.tlValoreTestuale[locale]
        }
      );
    });
    setLingueItems(arr);
  }, [lingueSelect])

  useEffect(() => {
    if (lingueItems) {
      const lingueParlateSelezionate = (dataset.lingueParlate || []).slice();

      estraiDatiInizializzazione.forEach(element => {
        if (element.cd_attributo === 67) {
          lingueItems.forEach((ele) => {
            if (ele.id === element.cd_val_attributo) {
              if (ele.id === 0) {
                setFormField('altreLingue', element.tx_nota)
              }

              lingueParlateSelezionate.push(ele);
            }
          });
        }
      });

      setFormField('lingueParlate', lingueParlateSelezionate);
    }
  }, [estraiDatiInizializzazione, lingueItems])

  const attivareInput = () => {
    let controllo = false;
    dataset.lingueParlate.forEach((ele) => {
      if (ele.id === 0)
        controllo = true
    })
    return controllo
  }
  return (
    <>
      {lingueItems &&
        <>
          <FieldTitle
            label={`Quali lingue desideri che il/la ${getTCBServiceName(servizioTCB, locale)} parli?`}
          />
          <Row fluid margin='0'>
            <Column padding='0' xs="12" md='5'>
              <Select
                multi
                enableSearch
                name='Ligue parlate'
                items={lingueItems}
                selectedValue={dataset.lingueParlate}
                clickedSelectedItem={(value) => {
                  const newSelectedItems = dataset['lingueParlate']
                    .slice().filter((el) => el.id !== value.id);
                  setFormField('lingueParlate', newSelectedItems);
                }}
                clickedItem={(value) => {
                  const newSelectedItems = dataset['lingueParlate'].slice().concat(value);
                  setFormField('lingueParlate', newSelectedItems);
                }}
                placeholder="Seleziona le lingue parlate"
                labelSelected="Lingue parlate"
              />
            </Column>
          </Row>
        </>
      }
      {attivareInput() &&
        <Row fluid margin='0.5em 0 0 0 '>
          <Column padding='0' xs="12" md='5'>
            <Input
              label="Altre lingue"
              onChange={(value) => { setFormField('altreLingue', value) }}
              inputValue={dataset['altreLingue']}
              required
            />
          </Column>
        </Row>}
    </>
  );
};

Lingue.displayName = 'Lingue';

export default Lingue;
