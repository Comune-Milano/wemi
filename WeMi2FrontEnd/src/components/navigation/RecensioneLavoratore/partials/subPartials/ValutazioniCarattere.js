/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Checkbox from 'components/ui2/Checkbox';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { setCheckBoxCarattere } from '../utils/setCheckBoxCarattere';

const ValutazioneCarattere = ({
    locale,
    datiCarattere,
    isReadOnly,
}) => {
  const { dataset, setFormField } = useFormContext();

  return (
    <>
      <Row fluid margin="1em 0 0 0">
        <Text
          intlFormatter
          value="carattere"
          transform="uppercase"
          letterSpacing="0.05em"
          weight="bold"
          color="primary"
          size="f6"
          padding="0 0.2rem 0 0"
        />
      </Row>
      <Row fluid margin="2em 0 0 0">
        {datiCarattere.map((ele, index) => {
          if (ele.cdDominioTcb !== 0) {
            return (
              <Column xs="6" md="4" padding="0 1em 0 0" key={index.toString()}>
                <Checkbox
                  value={dataset.carattere.includes(ele.cdDominioTcb)}
                  onChange={value => {
                    setFormField('carattere', setCheckBoxCarattere(ele.cdDominioTcb, dataset.carattere));
                  }}
                  label={ele.tlValoreTestuale[locale]}
                  checkcolor="primary"
                  disabled={isReadOnly}
                />
              </Column>
            );
          }
        })}
      </Row>
    </>
  );
};

ValutazioneCarattere.displayName = 'ValutazioniServizio';
export default (ValutazioneCarattere);
