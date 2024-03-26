import React from 'react';
import { mapFilterList } from 'components/pages/MatchingDomandaLavoratore/utils/mapFilterList';
import { attributo } from 'components/pages/MatchingDomandaLavoratore/constants/constants';
import Checkbox from 'components/ui2/Checkbox';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { checkBoxSelection } from 'components/pages/MatchingDomandaLavoratore/utils/checkBoxSelection';
import { labelCarattere } from 'components/pages/MatchingDomandaLavoratore/labels';

const CarattereList = ({ selectedFilters, setPopupFilters, filterList }) => {

  const keyCarattere = attributo.LS_CARATTERE.ty_dominio_tcb;

  const carattere = mapFilterList(filterList, keyCarattere);

  return (
    <>
      <Row fluid margin="0.5em 0 0 0">
        <Text
          value="Carattere lavoratore"
          color="primary"
          size="f7"
          weight="bold"
        />
      </Row>
      <Row fluid margin="0.5em 0 0 0">
        {carattere.map(caratt => {
          if (caratt.id !== 0) {
            return (
              <Column lg="6" md="6" padding="0" key={caratt.id}>
                <Checkbox
                  width="fit-content"
                  value={selectedFilters[labelCarattere] && selectedFilters[labelCarattere].includes(caratt.id)}
                  onChange={(value) => setPopupFilters(labelCarattere, checkBoxSelection(selectedFilters[labelCarattere], value, caratt.id))}
                  label={caratt.value}
                  checkcolor="primary"
                />
              </Column>
            );
          }
          // return (
          //   <Row fluid margin="0.5em 0 0 0" key={caratt.id}>
          //     <Checkbox
          //       value={selectedFilters[labelCarattere] && selectedFilters[labelCarattere].includes(caratt.id)}
          //       onChange={(value) => setPopupFilters(labelCarattere, checkBoxSelection(selectedFilters[labelCarattere], value, caratt.id))}
          //       label={caratt.value}
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

CarattereList.displayName = 'CarattereList';

export const Carattere = CarattereList;