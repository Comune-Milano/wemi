import React from 'react';
import { mapFilterList } from 'components/pages/MatchingDomandaLavoratore/utils/mapFilterList';
import { Row, Column } from 'components/ui/Grid';
import { calculateSalaryType } from 'components/pages/MatchingDomandaLavoratore/utils/calculateSalaryType';
import Text from 'components/ui/Text';
import { labelTipologiaOrario } from 'components/pages/MatchingDomandaLavoratore/labels';
import { labelStipendioProposto } from 'components/pages/MatchingDomandaLavoratore/labels/StipendioProposto';
import { checkBoxSelection } from 'components/pages/MatchingDomandaLavoratore/utils/checkBoxSelection';
import Checkbox from 'components/ui2/Checkbox';
import { MatchingLavoratoreContext } from 'components/pages/MatchingDomandaLavoratore/utils/MatchingLavoratoreContext';
import connectContext from 'hoc/connectContext';

const StipendioPropostoList = ({
  filterList,
  selectedFilters,
  handleFilterPopup,
}) => {
  const { popupFilters } = selectedFilters;

  const { [labelTipologiaOrario]: tipologiaOrario } = popupFilters;

  if (!tipologiaOrario || !tipologiaOrario.hasOwnProperty('id')) {
    return null;
  }

  const keyTipologiaStipendio = calculateSalaryType(tipologiaOrario.id);

  const tipologiaStipendioValues = mapFilterList(filterList, keyTipologiaStipendio);

  return (
    <>
      <Row fluid margin="0.5em 0 0 0">
        <Text
          value="Stipendio Richiesto"
          color="primary"
          size="f7"
          weight="bold"
        />
      </Row>
      <Row fluid margin="0.5em 0 0 0">
        {tipologiaStipendioValues.map(stipendio => (
          <Column md="6" xs="12" padding="0" key={stipendio.id}>
            <Checkbox
              width="fit-content"
              value={popupFilters[labelStipendioProposto] &&
                popupFilters[labelStipendioProposto].id === stipendio.id}
              onChange={(value) => {
                if (value) {
                  return handleFilterPopup(labelStipendioProposto,
                    { id: stipendio.id, value: stipendio.nrValoreMaxRif, min: stipendio.nrValoreMinRif });
                }
                return handleFilterPopup(labelStipendioProposto,
                  undefined);
              }
              }
              label={stipendio.value}
              checkcolor="primary"
            />
          </Column>
          ))}
      </Row>
    </>
  );
};


StipendioPropostoList.displayName = 'StipendioPropostoList';

const mapContextToProps = (context) => ({
  handleFilterPopup: context.handleFilterPopup,
});


export const Stipendio = connectContext(MatchingLavoratoreContext, mapContextToProps)(StipendioPropostoList);

