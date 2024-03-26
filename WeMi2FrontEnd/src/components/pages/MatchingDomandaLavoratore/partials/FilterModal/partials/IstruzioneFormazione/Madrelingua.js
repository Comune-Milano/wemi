import React, { useState, useEffect } from 'react';
import Checkbox from 'components/ui2/Checkbox';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import InputNumber from 'components/ui2/InputNumber';
import { labelMadrelingua } from 'components/pages/MatchingDomandaLavoratore/labels';
import { attributo } from 'components/pages/MatchingDomandaLavoratore/constants/constants';
import { mapFilterList } from 'components/pages/MatchingDomandaLavoratore/utils/mapFilterList';
import Select from 'components/ui2/Select';
import { MAX_LEVEL_LANGUAGE, MIN_LEVEL_LANGUAGE } from 'components/pages/MatchingDomandaLavoratore/constants/maxfilters';

const MadrelinguaComponent = ({ filterList, selectedFilters, setPopupFilters }) => {

  const [itemsLingue, setItemsLingue] = useState([]);

  useEffect(() => {
    const keyLingue = attributo.LIV_LINGUE_CONOSCIUTE.ty_dominio_tcb;
    const resultFilter = mapFilterList(filterList, keyLingue);
    setItemsLingue(resultFilter);
  }, []);

  const lingueConosciute = selectedFilters[labelMadrelingua.livelliLingua] || [];

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
                return setPopupFilters(labelMadrelingua.livelloConoscenzaLingua, MAX_LEVEL_LANGUAGE);
              }

              return setPopupFilters(labelMadrelingua.livelloConoscenzaLingua, MIN_LEVEL_LANGUAGE);
            }}
            value={selectedFilters[labelMadrelingua.livelloConoscenzaLingua] === MAX_LEVEL_LANGUAGE}
            label="Madrelingua"
            checkcolor="primary"
            spacing="0"
          />

        </Column>
        <Column padding="0" lg="6" md="6" sm="6" xs="6">
          {!(selectedFilters[labelMadrelingua.livelloConoscenzaLingua] === MAX_LEVEL_LANGUAGE) ? (
            <Row>
              <InputNumber
                onChange={(value) => {
                  setPopupFilters(labelMadrelingua.livelloConoscenzaLingua, parseInt(value, 10));
                }}
                onInputChange={(value) => {
                  setPopupFilters(labelMadrelingua.livelloConoscenzaLingua, parseInt(value, 10));
                }}
                value={Number.parseInt(selectedFilters[labelMadrelingua.livelloConoscenzaLingua], 10) || 0}
                minValue={MIN_LEVEL_LANGUAGE}
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
            clickedItem={(item) => {
              const mappedValue = {
                id: item.id,
                value: MIN_LEVEL_LANGUAGE,
                label: item.value,
              };
              const array = lingueConosciute.slice();
              const nuoviValori = [...array, mappedValue];
              setPopupFilters(labelMadrelingua.livelliLingua, nuoviValori);
            }}
            clickedSelectedItem={(item) => {
              const filteredList = lingueConosciute.filter(element => element.id !== item.id);
              setPopupFilters(labelMadrelingua.livelliLingua, filteredList);
            }}
            selectedValue={lingueConosciute.map(element => ({ id: element.id, value: element.label }))}
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
              value={lingua.value === MAX_LEVEL_LANGUAGE}
              onChange={(value) => {
                if (value) {
                  const indexElement = lingueConosciute.findIndex(element => element.id === lingua.id);
                  const newArray = lingueConosciute.slice();
                  newArray[indexElement].value = MAX_LEVEL_LANGUAGE;
                  setPopupFilters(labelMadrelingua.livelliLingua, newArray);
                } else {
                  const indexElement = lingueConosciute.findIndex(element => element.id === lingua.id);
                  const newArray = lingueConosciute.slice();
                  newArray[indexElement].value = MIN_LEVEL_LANGUAGE;
                  setPopupFilters(labelMadrelingua.livelliLingua, newArray);
                }
              }}
              label={`Madrelingua per ${lingua.label}`}
              checkcolor="primary"
              spacing="0"
            />
          </Column>
          <Column flex padding="0.1em" lg="6" md="6" sm="6" xs="6">
            {!(lingua.value === MAX_LEVEL_LANGUAGE) ? (
              <Row>
                <InputNumber
                  onChange={(value) => {
                    const indexElement = lingueConosciute.findIndex(element => element.id === lingua.id);
                    const newArray = lingueConosciute.slice();
                    newArray[indexElement].value = value;
                    setPopupFilters(labelMadrelingua.livelliLingua, newArray);
                  }}
                  value={Number.parseInt((lingueConosciute.find((element) => element.id === lingua.id)
                    &&
                    lingueConosciute.find((element) => element.id === lingua.id).value), 10) || 0}
                  minValue={MIN_LEVEL_LANGUAGE}
                  maxValue={5}
                  size="f7"
                  iconColor="primary"
                  textColor="black"
                  width="fit-content"
                />
                <Text size="f7" value={`Livello per ${lingua.label}`} tag="p" />
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
