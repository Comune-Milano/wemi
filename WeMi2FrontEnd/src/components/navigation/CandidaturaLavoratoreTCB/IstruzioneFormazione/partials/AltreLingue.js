
import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Select from 'components/ui2/Select';
import styled from 'styled-components';
import { colors } from 'theme';
import Input from 'components/ui2/Input';
import LinguaSelezionata from './LinguaSelezionata';

const StyledPlusIcon = styled.div`
  height: 24px;
  width: 24px;
  display: inline-block;
  color: ${props => colors[props.color]};
  font-size: 32px;
  line-height: 24px;
  text-align: center;
  position: relative;
  top: 6px;

  &::before {
    content: "+";
  }
`;

const AltreLingue = ({
  dataset,
  setFormFields,
  lingue,
  locale,
  idLavoratore,
  setFormField,
}) => {
  const controllo = () => {
    if (dataset.altraLingua && dataset.altraLingua.id === 71) {
      return false;
    }

    if ((!dataset.altraLingua || dataset.altraLingua?.id === undefined)) {
      return false;
    }

    if (!dataset.arrayLingue) {
      return true;
    }

    let check = false;
    dataset.arrayLingue.forEach((ele) => {
      if (ele.cdDominio === dataset.altraLingua.id) {
        check = true;
      }
    });

    return !check;
  };

  const aggiungi = (cdDominio) => {
    const arr = dataset.arrayLingue || [];
    const { altro } = dataset;
    arr.push({ cdDominio, nome: altro || dataset.altraLingua.value });

    return arr;
  };

  const creaItems = (arr) => {
    const ris = [];
    if (!arr) {
      return ris;
    }

    arr.forEach(element => {
      ris.push({ id: element.cdDominioTcb, value: element.tlValoreTestuale[locale] });
    });

    return ris;
  };

  const items = lingue ? creaItems(lingue) : [];

  const aggiungiLinguaSelezionata = () => {
    if (controllo()) {
      setFormFields({
        arrayLingue: aggiungi(dataset.altraLingua.id),
        altraLingua: undefined,
        altro: undefined,
      });
    }
  };

  return (
    <>
      <Row fluid>
        {
          dataset.arrayLingue &&
          dataset.arrayLingue.map((ele) => (
            <LinguaSelezionata
              key={ele.cdDominio}
              elemento={ele}
              dataset={dataset}
              setFormField={setFormField}
              idLavoratore={idLavoratore}
            />
            ))
        }
      </Row>
      <Row fluid padding="0 0 0.5em 0">
        <Text
          size="f7"
          weight="bold"
          value="Aggiungi lingua"
        />
      </Row>
      <Row fluid alignitems="baseline">
        <Column lg="4" md="3" xs="9" padding="0">
          <Select
            enableSearch
            items={items}
            selectedValue={dataset.altraLingua}
            clickedSelectedItem={() => {
              setFormFields({
                altraLingua: undefined,
                altro: undefined,
              });
            }}
            clickedItem={(value) => {
              setFormFields({
                altraLingua: value,
                altro: undefined,
              });
            }}
            placeholder="Seleziona la lingua parlata"
          />
        </Column>
        <Column padding="0 0 0 0.8em" lg="4" md="3" xs="3">
          <StyledPlusIcon
            color={controllo() ? 'primary' : 'darkGrey'}
            onClick={() => { aggiungiLinguaSelezionata(); }}
          />
        </Column>
      </Row>
      {dataset.altraLingua && dataset.altraLingua.id === 0 ? (
        <Row>
          <Input
            required
            hoverColor="blue"
            color="blue"
            label="Nome altra lingua"
            inputValue={dataset.altro}
            onChange={(value) => setFormField('altro', value)}
          />
        </Row>

        ) : null}

    </>
  );
};

AltreLingue.displayName = 'AltreLingue';

export default (AltreLingue);
