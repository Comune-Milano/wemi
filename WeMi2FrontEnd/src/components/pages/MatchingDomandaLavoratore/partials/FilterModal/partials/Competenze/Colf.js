import React from 'react';
import { mapFilterList } from 'components/pages/MatchingDomandaLavoratore/utils/mapFilterList';
import { attributo } from 'components/pages/MatchingDomandaLavoratore/constants/constants';
import Checkbox from 'components/ui2/Checkbox';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { checkBoxSelection } from 'components/pages/MatchingDomandaLavoratore/utils/checkBoxSelection';
import { labelCompetenzeColf } from 'components/pages/MatchingDomandaLavoratore/labels';

const ColfList = ({ selectedFilters, setPopupFilters, filterList }) => {
  const keyMansioniColf = attributo.LS_MANSIONI_COLF.ty_dominio_tcb;

  const mansioniColf = mapFilterList(filterList, keyMansioniColf);

  return (
    <>
      <Row fluid margin="0.5em 0 0 0">
        <Text
          value="Competenze Colf"
          color="primary"
          size="f7"
          weight="bold"
        />
      </Row>
      <Row margin="0.5em 0 0 0">
        {mansioniColf.map(mansione => {
          if (mansione.id !== 0) {
            return (
              <Column lg="6" md="6" padding="0" key={mansione.id}>
                <Checkbox
                  width="fit-content"
                  value={selectedFilters[labelCompetenzeColf] && selectedFilters[labelCompetenzeColf].includes(mansione.id)}
                  onChange={(value) => setPopupFilters(labelCompetenzeColf, checkBoxSelection(selectedFilters[labelCompetenzeColf], value, mansione.id))}
                  label={mansione.value}
                  checkcolor="primary"
                />
              </Column>
            );
          }
          // return (
          //   <Row fluid margin="0.5em 0 0 0" key={mansione.id}>
          //     <Checkbox
          //       value={selectedFilters.competenzeColf && selectedFilters.competenzeColf.includes(mansione.id)}
          //       onChange={(value) => setPopupFilters(labelCompetenzeColf, checkBoxSelection(selectedFilters[labelCompetenzeColf], value, mansione.id))}
          //       label={mansione.value}
          //       checkcolor="primary"
          //     />
          //   </Row>
          // );
        })
        }

      </Row>
    </>
  );
};

ColfList.displayName = 'ColfList';

export const Colf = ColfList;
