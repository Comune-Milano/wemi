/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import Header from 'components/ui2/Header';
import Checkbox from 'components/ui2/Checkbox';
import TextArea from 'components/ui2/TextArea';
import { CONFERMATO } from 'types/statoRecensioneCostants';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { setTitleHeaderMansioni } from './utils/setTitleHeaderMansioni';
import Wrapper from './Wrapper';

const ValutazioniMansioni = ({ isReadOnly }) => {
  const { dataset, setFormField } = useFormContext();

  const changeValue = (value, elemento) => {
    const arr = [];
    dataset.listaMansioni.map((ele, index) => {
      if (ele.value === elemento.value) ele.checked = value;
      arr.push(ele);
    });
    setFormField('listaMansioni', arr);
  };

  const updateField = (label, field) => (
    value => {
      const newState = [...dataset.listaMansioni];
      const index = newState.findIndex(el => el.value === label);
      newState[index] = {
        ...newState[index],
        [field]: value,
      };
      setFormField('listaMansioni', newState);
    }
  );


  return (
    <Wrapper fluid>
      {!dataset.isAltroServizio ?
        <Header fontSize="f4" title={setTitleHeaderMansioni(dataset)} color="primary" width="100%" />
        : null
      }
      {dataset.listaMansioni.map((elemento, index) => {
        if (elemento.value && elemento.value !== null) {
          return (
            <>
              {elemento.testo ?
                <Text align="center" value={elemento.testo} size="f6" weight="bold" color="primary" tag="p" margin="1em 1em 2em 0" key={index.toString()} />
                : null
              }
              <Checkbox
                value={elemento.checked}
                checkcolor="primary"
                disabled={isReadOnly}
                label={elemento.value}
                onChange={(value) => { changeValue(value, elemento); }}
              />
              {
                [0, 14].indexOf(elemento.cdDominioTcb) >= 0 && elemento.checked ?
                  (
                    <div
                      style={{
                        width: '100%',
                        marginLeft: '2rem',
                      }}
                    >
                      <TextArea
                        onChange={updateField(elemento.value, 'nota')}
                        inputValue={elemento.nota}
                        disabled={dataset.statoRecensione === CONFERMATO}
                      />
                    </div>
                  )
                  : null
              }
            </>
          );
        }
      })
      }
    </Wrapper>
  );
};

ValutazioniMansioni.displayName = 'ValutazioniMansioni';

export default (ValutazioniMansioni);
