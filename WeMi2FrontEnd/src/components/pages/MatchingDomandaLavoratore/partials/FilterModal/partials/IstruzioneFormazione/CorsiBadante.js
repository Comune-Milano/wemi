import React from 'react';
import { mapFilterList } from 'components/pages/MatchingDomandaLavoratore/utils/mapFilterList';
import { attributo } from 'components/pages/MatchingDomandaLavoratore/constants/constants';
import Checkbox from 'components/ui2/Checkbox';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { checkBoxSelection } from 'components/pages/MatchingDomandaLavoratore/utils/checkBoxSelection';
import { labelCorsiBadante } from 'components/pages/MatchingDomandaLavoratore/labels';

const CorsiBadanteList = ({ filterList, selectedFilters, setPopupFilters }) => {
  const keyBadante = attributo.LS_CORSI_BADANTE.ty_dominio_tcb;

  // const keyTata = attributo.LS_CORSI_TATA.ty_dominio_tcb;

  const corsiBadante = mapFilterList(filterList, keyBadante);

  // const corsiTata = mapFilterList(filterList, keyTata);

  // const corsiTataFiltered = corsiTata.filter(corso => {
  //   if (corso.pgVisualizzazione >= 100) {
  //     return true;
  //   }
  //   return false;
  // });

  // const corsiBadante = [...corsi, ...corsiTataFiltered];

  // corsiBadante.sort((a, b) => {
  //   if (a.pgVisualizzazione < b.pgVisualizzazione) {
  //     return -1;
  //   }
  //   return 0;
  // });

  return (
    <>
      <Row fluid margin="0.5em 0 0 0">
        <Text
          value="Corsi di formazione"
          color="primary"
          size="f7"
          weight="bold"
        />
      </Row>
      <Row fluid margin="0.5em 0 0 0">
        {corsiBadante.map(corso => {
          if (corso.id !== 0) {
            return (
              <Column lg="6" md="6" padding="0" key={corso.id}>
                <Checkbox
                  width="fit-content"
                  value={selectedFilters[labelCorsiBadante] && selectedFilters[labelCorsiBadante].includes(corso.id)}
                  onChange={(value) => setPopupFilters(labelCorsiBadante, checkBoxSelection(selectedFilters[labelCorsiBadante], value, corso.id))}
                  label={corso.value}
                  checkcolor="primary"
                />
              </Column>
            );
          }
          // return (
          //   <Row fluid margin="0.5em 0 0 0" key={corso.id}>
          //     <Checkbox
          //       value={selectedFilters[labelCorsiBadante] && selectedFilters[labelCorsiBadante].includes(corso.id)}
          //       onChange={(value) => setPopupFilters(labelCorsiBadante, checkBoxSelection(selectedFilters[labelCorsiBadante], value, corso.id))}
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

CorsiBadanteList.displayName = 'CorsiBadanteList';

export const CorsiBadante = CorsiBadanteList;