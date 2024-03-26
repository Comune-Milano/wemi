import React from 'react';
import { mapFilterList } from 'components/pages/MatchingDomandaLavoratore/utils/mapFilterList';
import { attributo } from 'components/pages/MatchingDomandaLavoratore/constants/constants';
import Checkbox from 'components/ui2/Checkbox';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { checkBoxSelection } from 'components/pages/MatchingDomandaLavoratore/utils/checkBoxSelection';
import { labelCorsiTata } from 'components/pages/MatchingDomandaLavoratore/labels';

const CorsiTataList = ({ filterList, selectedFilters, setPopupFilters }) => {

  const keyTata = attributo.LS_CORSI_TATA.ty_dominio_tcb;

  const corsiTata = mapFilterList(filterList, keyTata);

  // const corsiTata = corsi.filter(corso => {
  //   if (corso.pgVisualizzazione < 100) {
  //     return true;
  //   }

  //   return false;
  // });

  return (
    <>
      <Row fluid margin="0.5em 0 0 0">
        <Text
          value="Titoli di studio conseguiti"
          color="primary"
          size="f7"
          weight="bold"
        />
      </Row>
      <Row fluid margin="0.5em 0 0 0">
        {corsiTata.map(corso => {
          if (corso.id !== 0) {
            return (
              <Column lg="6" md="6" padding="0" key={corso.id}>
                <Checkbox
                  width="fit-content"
                  value={selectedFilters[labelCorsiTata] && selectedFilters[labelCorsiTata].includes(corso.id)}
                  onChange={(value) => setPopupFilters(labelCorsiTata, checkBoxSelection(selectedFilters[labelCorsiTata], value, corso.id))}
                  label={corso.value}
                  checkcolor="primary"
                />
              </Column>
            );
          }
          // return (
          //   <Row fluid margin="0.5em 0 0 0" key={corso.id}>
          //     <Checkbox
          //       value={selectedFilters[labelCorsiTata] && selectedFilters[labelCorsiTata].includes(corso.id)}
          //       onChange={(value) => setPopupFilters(labelCorsiTata, checkBoxSelection(selectedFilters[labelCorsiTata], value, corso.id))}
          //       label={corso.value}
          //       checkcolor="primary"
          //     />
          //   </Row>
          // );
        })
        }

      </Row>

    </>
  );
}

CorsiTataList.displayName = 'CorsiTataList';

export const CorsiTata = CorsiTataList;