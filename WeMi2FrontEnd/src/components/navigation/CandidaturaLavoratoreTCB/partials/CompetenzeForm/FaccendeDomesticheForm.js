/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import RadioGroup from 'components/ui2/RadioGroup';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import Checkbox from 'components/ui2/Checkbox';
import TextArea from 'components/ui2/TextArea';
import ColumnsContainer from 'components/ui2/ColumnsContainer';
import styled from 'styled-components';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const RadioItems = [
  {
    id: 1,
    label: 'Si, sono disponibile',
  },
  {
    id: 2,
    label: 'No, non sono disponibile',
  },
];

const CheckboxRowContainer = styled(Row)`
  width: 100%;
`;

export const FaccendeDomesticheForm = ({
  faccendeDomesticheFlag,
  title,
  mansioniColf,
  locale,
  isColf,
  required,
}) => {
  const { dataset, setFormField, errors, touched, handleFieldBlur } = useFormContext();

  const handleChange = (id) => {
    const newArr = dataset.mansioniSelezionateColf.length ? dataset.mansioniSelezionateColf : [];
    if (newArr.includes(id)) {
      return newArr.filter(el => el !== id);
    }
    return newArr.concat(id);
  };

  const mansioniColfFiltrate = mansioniColf.filter(el => el.cdDominioTcb !== 0);

  return (
    <Row fluid>
      <Row fluid justifycontent="space-between" margin=" 0 0 0.5em 0">
        <GroupFieldTitle
          title={title}
          required={required}
          marginTop="4em"
        />
        {faccendeDomesticheFlag ?
          (
            <Row fluid>
              <RadioGroup
                radioItems={RadioItems}
                onBlur={() => handleFieldBlur('faccendeDomestiche')}
                error={touched.faccendeDomestiche && errors.faccendeDomestiche}
                selectedItem={RadioItems.find(el => el.id === dataset.faccendeDomestiche)}
                onChange={(value) => {
                  setFormField('faccendeDomestiche', value.id);
                }}
                fontSize="f7"
                checkcolor="primary"
                display="inline-grid"
              />
            </Row>
          )
          : null}
      </Row>
      {dataset.faccendeDomestiche === 1 ?
        (
          <>
            { !isColf ? (
              <Row fluid margin="0 0 1em 0">
                <GroupFieldTitle title="Indica le competenze acquisite per lo svolgimento di faccende domestiche" />
              </Row>
          )
            : null}
            <CheckboxRowContainer>
              <ColumnsContainer xsCount={1} smCount={2}>
                {mansioniColfFiltrate.filter(el => el.cdDominioTcb !== 0).map((mans) => (
                  <Column xs="12" padding="0" key={mans.cdDominioTcb}>
                    <Checkbox
                      key={mans.cdDominioTcb}
                      checkcolor="primary"
                      style={{ width: 'auto' }}
                      label={mans.txTitoloMansione[locale]}
                      value={dataset.mansioniSelezionateColf.length && dataset.mansioniSelezionateColf.includes(mans.cdDominioTcb)}
                      onChange={() => {
                        setFormField('mansioniSelezionateColf', handleChange(mans.cdDominioTcb));
                      }}
                    />
                  </Column>
                ))}
              </ColumnsContainer>
            </CheckboxRowContainer>
            <Row fluid>
              <Row fluid margin="1em 0 0 0">
                <Checkbox
                  checkcolor="primary"
                  label={mansioniColf.find(el => el.cdDominioTcb === 0).txTitoloMansione[locale]}
                  value={dataset.mansioniSelezionateColf.length && dataset.mansioniSelezionateColf.includes(0)}
                  onChange={() => {
                    setFormField('mansioniSelezionateColf', handleChange(0));
                  }}
                  width="fit-content"
                />
              </Row>
              {dataset.mansioniSelezionateColf.length && dataset.mansioniSelezionateColf.includes(0) ?
                (
                  <Row fluid margin="0">
                    <Column xs="12" padding="0">
                      <TextArea
                        onChange={(value) => setFormField('altreMansioniColf', value)}
                        onBlur={() => handleFieldBlur('altreMansioniColf')}
                        placeholder="Scrivi qui..."
                        inputValue={dataset.altreMansioniColf}
                        name="altreMansioniColf"
                        rows="3"
                        width="30%"
                        error={touched.altreMansioniColf && errors.altreMansioniColf}
                        maxLength={STRING_MAX_VALIDATION.value}
                      />
                    </Column>
                  </Row>
                )
                : null
              }
            </Row>
          </>
        )
        : null}
    </Row>
  );
};

FaccendeDomesticheForm.displayName = 'FaccendeDomesticheForm';
