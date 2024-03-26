/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import Checkbox from 'components/ui2/Checkbox';
import TextArea from 'components/ui2/TextArea';
import Text from 'components/ui/Text';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import styled from 'styled-components';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const DivCategories = styled.div`
  div ~ div:last-child{
    margin:0 0 0.5em 0;
  }
`;

const ASSISTENZA = 'assistenza';
const CURA_IGIENE = 'cura e igiene';
const ALIMENTAZIONE = 'alimentazione';
const CURE_MEDICHE = 'cure mediche';
const DISABILITA = 'disabilità';
const ACCOMPAGNAMENTO = 'ACCOMPAGNAMENTO IN VACANZA';
const ALTRO = 'altre competenze';

const BadanteForm = ({
  mansioniBadante,
  locale,
}) => {
  const { dataset, setFormField, errors, isFormValid, touched, handleFieldBlur, isFormDirty } = useFormContext();

  const handleChange = (id) => {
    let newArr = dataset.mansioniSelezionateBadante.length ? dataset.mansioniSelezionateBadante.slice() : [];
    if (newArr.includes(id)) {
      return newArr.filter(el => el !== id);
    }
    return newArr = newArr.concat(id);
  };

  const categorieMansioniBadante = () => {
    const categoriaMansione = {
      [ASSISTENZA]: [],
      [CURA_IGIENE]: [],
      [ALIMENTAZIONE]: [],
      [CURE_MEDICHE]: [],
      [DISABILITA]: [],
      [ACCOMPAGNAMENTO]: [],
      [ALTRO]: [],
    };
    mansioniBadante.map(el => {
      let arrayCopy;
      if (el.cdDominioTcb !== 0) {
        switch (el.pgVisualizzazione) {
          case 1:
            arrayCopy = [...categoriaMansione[ASSISTENZA]];
            arrayCopy.push(el);
            categoriaMansione[ASSISTENZA] = arrayCopy;
            break;
          case 2:
            arrayCopy = [...categoriaMansione[CURA_IGIENE]];
            arrayCopy.push(el);
            categoriaMansione[CURA_IGIENE] = arrayCopy;
            break;
          case 3:
            arrayCopy = [...categoriaMansione[ALIMENTAZIONE]];
            arrayCopy.push(el);
            categoriaMansione[ALIMENTAZIONE] = arrayCopy;
            break;
          case 4:
            arrayCopy = [...categoriaMansione[CURE_MEDICHE]];
            arrayCopy.push(el);
            categoriaMansione[CURE_MEDICHE] = arrayCopy;
            break;
          case 5:
            arrayCopy = [...categoriaMansione[DISABILITA]];
            arrayCopy.push(el);
            categoriaMansione[DISABILITA] = arrayCopy;
            break;
          case 6:
            arrayCopy = [...categoriaMansione[ACCOMPAGNAMENTO]];
            arrayCopy.push(el);
            categoriaMansione[ACCOMPAGNAMENTO] = arrayCopy;
            break;
          case 7:
            arrayCopy = [...categoriaMansione[ALTRO]];
            arrayCopy.push(el);
            categoriaMansione[ALTRO] = arrayCopy;
            break;
          default:
            break;
        }
      }
    });
    return categoriaMansione;
  };


  const categoriaMansione = categorieMansioniBadante();
  const categories = (
    <DivCategories>
      {Object.keys(categoriaMansione).map((key, index) => (
        <Row key={key + index} fluid margin="0 0 1.5em 0">
          <Text
            weight="bold"
            value={key}
            transform="uppercase"
            letterSpacing="0.05em"
            padding="0 0 1em 0"
          />
          <Row fluid>
            {
              categoriaMansione[key].map(mans => (
                <Column md="7" padding="0" key={mans.cdDominioTcb}>
                  <Row fluid>
                    <Checkbox
                      checkcolor="primary"
                      width="fit-content"
                      label={mans.txTitoloMansione[locale]}
                      value={dataset.mansioniSelezionateBadante.length && dataset.mansioniSelezionateBadante.includes(mans.cdDominioTcb)}
                      onChange={() => {
                        setFormField('mansioniSelezionateBadante', handleChange(mans.cdDominioTcb));
                      }}
                    />
                  </Row>
                </Column>
              ))
            }
          </Row>
        </Row>
      ))}
    </DivCategories>
);

  return (
    <>
      <Row fluid justifycontent="space-between">
        <GroupFieldTitle
          title="INDICA LE COMPETENZE ACQUISITE NELLE PRECEDENTI ESPERIENZE LAVORATIVE"
          marginTop="3em"
        />
      </Row>

      {categories}

      <Row fluid margin="0 0 2em">
        <Checkbox
          checkcolor="primary"
          width="fit-content"
          label={mansioniBadante.find(el => el.cdDominioTcb === 0).txTitoloMansione[locale]}
          value={dataset.mansioniSelezionateBadante.length && dataset.mansioniSelezionateBadante.includes(0)}
          onChange={() => {
            setFormField('mansioniSelezionateBadante', handleChange(0));
          }}
        />
        {dataset.mansioniSelezionateBadante.length && dataset.mansioniSelezionateBadante.includes(0) ? (
          <Row fluid margin="0">
            <TextArea
              onChange={(value) => setFormField('altreMansioniBadante', value)}
              onBlur={() => handleFieldBlur('altreMansioniBadante')}
              placeholder="Scrivi qui eventuali altre mansioni..."
              inputValue={dataset.altreMansioniBadante}
              maxLength={STRING_MAX_VALIDATION.value}
              name="altreMansioniBadante"
              rows="3"
              width="30%"
              error={touched.altreMansioniBadante && errors.altreMansioniBadante}
            />
          </Row>
        )
          : null
        }
      </Row>
    </>
  );
};

BadanteForm.displayName = 'BadanteForm';

export default BadanteForm;
