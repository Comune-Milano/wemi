import React from 'react';
import { mapFilterList } from 'components/pages/MatchingDomandaLavoratore/utils/mapFilterList';
import { attributo } from 'components/pages/MatchingDomandaLavoratore/constants/constants';
import Checkbox from 'components/ui2/Checkbox';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { checkBoxSelection } from 'components/pages/MatchingDomandaLavoratore/utils/checkBoxSelection';
import { labelCompetenzeBadante, labelAnniEsperienza } from 'components/pages/MatchingDomandaLavoratore/labels';
import { CD_TIPOLOGICA_BADANTE } from 'types/tcbConstants';

const BadanteList = ({ selectedFilters, setPopupFilters, filterList }) => {
  const keyMansioniBadante = attributo.LS_MANSIONI_BADANTE.ty_dominio_tcb;

  const mansioniBadante = mapFilterList(filterList, keyMansioniBadante);

  const { [labelAnniEsperienza.workerType]: workerType } = selectedFilters;

  if (workerType.id !== CD_TIPOLOGICA_BADANTE) {
    return null;
  }

  return (
    <>
      <Row fluid margin="0.5em 0 0 0">
        <Text
          value="Competenze Badante"
          color="primary"
          size="f7"
          weight="bold"
        />
      </Row>
      <Row margin="0.5em 0 0 0">
        {mansioniBadante.map(mansione => {
          if (mansione.id !== 0) {
            return (
              <Column lg="6" md="6" padding="0" key={mansione.id}>
                <Checkbox
                  width="fit-content"
                  value={selectedFilters[labelCompetenzeBadante] && selectedFilters[labelCompetenzeBadante].includes(mansione.id)}
                  onChange={(value) => setPopupFilters(labelCompetenzeBadante, checkBoxSelection(selectedFilters[labelCompetenzeBadante], value, mansione.id))}
                  label={mansione.value}
                  checkcolor="primary"
                />
              </Column>
            );
          }
          // return (
          //   <Row fluid margin="0.5em 0 0 0" key={mansione.id}>
          //     <Checkbox
          //       value={selectedFilters[labelCompetenzeBadante] && selectedFilters[labelCompetenzeBadante].includes(mansione.id)}
          //       onChange={(value) => setPopupFilters(labelCompetenzeBadante, checkBoxSelection(selectedFilters[labelCompetenzeBadante], value, mansione.id))}
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

BadanteList.displayName = 'BadanteList';

export const Badante = BadanteList;
