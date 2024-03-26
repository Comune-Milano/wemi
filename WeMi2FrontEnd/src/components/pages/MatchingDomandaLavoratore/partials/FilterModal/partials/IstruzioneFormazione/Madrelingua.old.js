import React, { useState, useEffect } from 'react';
import Checkbox from 'components/ui2/Checkbox';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import InputNumber from 'components/ui2/InputNumber';
import { labelMadrelingua } from 'components/pages/MatchingDomandaLavoratore/labels';
import { attributo } from 'components/pages/MatchingDomandaLavoratore/constants/constants';
import { mapFilterList } from 'components/pages/MatchingDomandaLavoratore/utils/mapFilterList';
import Select from 'components/ui2/Select';
import { checkBoxSelection } from 'components/pages/MatchingDomandaLavoratore/utils/checkBoxSelection';

const MadrelinguaComponent = ({ filterList, selectedFilters, setPopupFilters }) => {
  const keyLingue = attributo.LIV_LINGUE_CONOSCIUTE.ty_dominio_tcb;

  const itemsLingue = mapFilterList(filterList, keyLingue);

  const [madrelinguaIT, setMadrelinguaIT] = useState(false);


  const [madrelingua, setMadrelingua] = useState([]);

  const [lingueConosciute, setLingueConosciute] = useState([]);

  useEffect(() => {
    if (selectedFilters[labelMadrelingua.livelloConoscenzaLingua] && selectedFilters[labelMadrelingua.livelloConoscenzaLingua] === 6) {
      setMadrelinguaIT(true);
    }

    if (selectedFilters[labelMadrelingua.livelliLingua]) {
      const filteredItem = itemsLingue.filter(element => {
        let found = false;
        selectedFilters[labelMadrelingua.livelliLingua].forEach(lingua => {
          if (lingua.id === element.id) {
            found = true;
          }
        });
        return found;
      });
      setLingueConosciute(filteredItem);

      const newMadrelingua = [];
      selectedFilters[labelMadrelingua.livelliLingua].forEach(lingua => {
        if (lingua.value === 6) {
          newMadrelingua.push(lingua.id);
        }
      });
      setMadrelingua(newMadrelingua);
    }
  }, []);


  const handleMadrelinguaChange = (lingua, value) => {
    const filtriLingua = selectedFilters[labelMadrelingua.livelliLingua] || [];

    const found = filtriLingua.find((element) => element.id === lingua.id);

    if (!found) {
      setPopupFilters(labelMadrelingua.livelliLingua, [...filtriLingua, { value: parseInt(value, 10), id: lingua.id }]);
    } else {
      const arrayValues = [];

      filtriLingua.forEach(filtroLingua => {
        if (filtroLingua.id === found.id) {
          arrayValues.push({ id: lingua.id, value });
        } else {
          arrayValues.push(filtroLingua);
        }
      });
      setPopupFilters(labelMadrelingua.livelliLingua, arrayValues);
    }
  };

  return (
    <>
      <Row fluid margin="0.5em 0 0 0">
        <Text
          value="Italiano"
          color="primary"
          size="f7"
          weight="bold"
        />
      </Row>
      <Row fluid margin="0.5em 0 0 0" alignitems="flex-end">
        <Column padding="0" lg="6" md="6" sm="6" xs="6">
          <Checkbox
            width="fit-content"
            onChange={async (value) => {
              if (value) {
                await setPopupFilters(labelMadrelingua.livelloConoscenzaLingua, 6);
                return setMadrelinguaIT(value);
              }

              await setPopupFilters(labelMadrelingua.livelloConoscenzaLingua, 0);

              return setMadrelinguaIT(value);
            }}
            value={madrelinguaIT}
            label="Madrelingua"
            checkcolor="primary"
            spacing="0"
          />

        </Column>
        <Column padding="0" lg="6" md="6" sm="6" xs="6">
          {!madrelinguaIT ? (
            <Row>
              <InputNumber
                onChange={(value) => {
                  setPopupFilters(labelMadrelingua.livelloConoscenzaLingua, parseInt(value, 10));
                  setMadrelinguaIT(false);
                }}
                onInputChange={(value) => {
                  setPopupFilters(labelMadrelingua.livelloConoscenzaLingua, parseInt(value, 10));
                  setMadrelinguaIT(false);
                }}
                value={Number.parseInt(selectedFilters[labelMadrelingua.livelloConoscenzaLingua], 10) || 0}
                minValue={selectedFilters[labelMadrelingua.madrelingua] ? 0 : 1}
                maxValue={selectedFilters[labelMadrelingua.madrelingua] ? 0 : 5}
                size="f7"
                iconColor="primary"
                textColor="black"
              />
              <Text size="f7" value="Livello per italiano" tag="p" />
            </Row>
          )
            : null}

        </Column>
      </Row>
      <Row fluid margin="0.5em 0 0 0">
        <Text
          value="Lingue parlate"
          color="primary"
          size="f7"
          weight="bold"
        />
      </Row>
      <Row fluid margin="0.5em 0 0 0">
        <Column xs="6" margin="0.5em 0 0 0" padding="0">
          <Select
            multi
            enableSearch
            items={itemsLingue.filter(item => { if (item.id !== 0) { return item; } return undefined; })}
            clickedItem={(value) => {
              const nuovoStato = [...lingueConosciute, value];
              setLingueConosciute(nuovoStato);
            }}
            clickedSelectedItem={async (value) => {
              let arrayNuovo = [...lingueConosciute];
              arrayNuovo = arrayNuovo.filter(elemento => elemento.id !== value.id);
              await setLingueConosciute(arrayNuovo);

              await setMadrelingua(checkBoxSelection(madrelingua, 0, value.id));


              const lingua = Array.isArray(selectedFilters[labelMadrelingua.livelliLingua]) ?
                selectedFilters[labelMadrelingua.livelliLingua].find((element) => element.id === value.id)
                : undefined;

              if (lingua) {
                let nuoveLingue = [...selectedFilters[labelMadrelingua.livelliLingua]];
                nuoveLingue = nuoveLingue.filter(lingue => lingue !== lingua);
                return setPopupFilters(labelMadrelingua.livelliLingua, nuoveLingue);
              }

              return undefined;
            }}
            selectedValue={lingueConosciute}
            color="primary"
            size="f7"
            weight="bold"
          />
        </Column>
      </Row>
      {lingueConosciute.map(lingua => (
        <Row key={lingua.id} fluid margin="0.5em 0 0 0" display="flex" alignitems="flex-end">
          <Column padding="0.1em" lg="6" md="6" sm="6" xs="6">
            <Checkbox
              width="fit-content"
              value={madrelingua && madrelingua.includes(lingua.id)}
              onChange={(value) => {
                let nuovoElemento;

                if (value) {
                  nuovoElemento = 6;
                } else {
                  nuovoElemento = 0;
                }

                setMadrelingua(checkBoxSelection(madrelingua, value, lingua.id));

                const filtriLingua = selectedFilters[labelMadrelingua.livelliLingua] || [];

                const found = filtriLingua.find((element) => element.id === lingua.id);

                if (!found) {
                  setPopupFilters(labelMadrelingua.livelliLingua, [...filtriLingua, { value: nuovoElemento, id: lingua.id }]);
                } else {
                  const arrayValues = [];

                  filtriLingua.forEach(filtroLingua => {
                    if (filtroLingua.id === found.id) {
                      arrayValues.push({ id: lingua.id, value: nuovoElemento });
                    } else {
                      arrayValues.push(filtroLingua);
                    }
                  });

                  setPopupFilters(labelMadrelingua.livelliLingua, arrayValues);
                }
              }}
              label={`Madrelingua per ${lingua.value}`}
              checkcolor="primary"
              spacing="0"
            />
          </Column>
          <Column flex padding="0.1em" lg="6" md="6" sm="6" xs="6">
            {!madrelingua.includes(lingua.id) ? (
              <Row>
                <InputNumber
                  onChange={value => handleMadrelinguaChange(lingua, value)}
                  value={Number.parseInt((selectedFilters[labelMadrelingua.livelliLingua] &&
                    selectedFilters[labelMadrelingua.livelliLingua].find((element) => element.id === lingua.id)
                    &&
                    selectedFilters[labelMadrelingua.livelliLingua].find((element) => element.id === lingua.id).value), 10) || 0}
                  minValue={madrelingua && madrelingua.includes(lingua.id) ? 0 : 1}
                  maxValue={madrelingua && madrelingua.includes(lingua.id) ? 0 : 5}
                  size="f7"
                  iconColor="primary"
                  textColor="black"
                  width="fit-content"
                />
                <Text size="f7" value={`Livello per ${lingua.value}`} tag="p" />
              </Row>
            )
              : null}
          </Column>
        </Row>
      ))

      }
    </>
  );
};

MadrelinguaComponent.displayName = 'Madrelingua';

export const Madrelingua = MadrelinguaComponent;
