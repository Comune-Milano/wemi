import React from 'react';
import { mapFilterList } from 'components/pages/MatchingDomandaLavoratore/utils/mapFilterList';
import { attributo } from 'components/pages/MatchingDomandaLavoratore/constants/constants';
import Checkbox from 'components/ui2/Checkbox';
import { Row, Column } from 'components/ui/Grid';
import { checkBoxSelection } from 'components/pages/MatchingDomandaLavoratore/utils/checkBoxSelection';
import { labelAccudimento } from 'components/pages/MatchingDomandaLavoratore/labels';

const AccudimentoList = ({ selectedFilters, setPopupFilters, filterList }) => {

  const keyAccudimento = attributo.LS_PATOLOGIE_DISP_ACCUDIMENTO.ty_dominio_tcb;

  const accudimento = mapFilterList(filterList, keyAccudimento);

  return (
    <>
      {/* <Row fluid margin="0.5em 0 0 0">
        <Text
          value="Accudimento"
          color="primary"
          size="f7"
          weight="bold"
        />
      </Row> */}
      <Row fluid margin="0.5em 0 0 0">
        {accudimento.map(acc => {
          if (acc.id !== 0) {
            return (
              <Column lg="6" md="6" padding="0" key={acc.id}>
                <Checkbox
                  width="fit-content"
                  value={selectedFilters[labelAccudimento] && selectedFilters[labelAccudimento].includes(acc.id)}
                  onChange={(value) => setPopupFilters(labelAccudimento, checkBoxSelection(selectedFilters[labelAccudimento], value, acc.id))}
                  label={acc.value}
                  checkcolor="primary"
                />
              </Column>
            );
          }
          // return (
          //   <Row fluid margin="0.5em 0 0 0" key={acc.id}>
          //     <Checkbox
          //       value={selectedFilters[labelAccudimento] && selectedFilters[labelAccudimento].includes(acc.id)}
          //       onChange={(value) => setPopupFilters(labelAccudimento, checkBoxSelection(selectedFilters[labelAccudimento], value, acc.id))}
          //       label={acc.value}
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

AccudimentoList.displayName = 'AccudimentoList';

export const Accudimento = AccudimentoList;