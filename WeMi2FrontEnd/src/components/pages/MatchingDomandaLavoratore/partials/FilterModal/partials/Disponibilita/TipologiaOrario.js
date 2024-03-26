import React from 'react';
import Radio from 'components/ui2/RadioGroup';
import { Column, Row } from 'components/ui/Grid';
import { attributo } from 'components/pages/MatchingDomandaLavoratore/constants/constants';
import { mapFilterList } from 'components/pages/MatchingDomandaLavoratore/utils/mapFilterList';
import { labelTipologiaOrario, labelSpaziLavoratore, labelCalendario } from 'components/pages/MatchingDomandaLavoratore/labels';
import { labelStipendioProposto } from 'components/pages/MatchingDomandaLavoratore/labels/StipendioProposto';
import { convertBinToObject } from 'components/ui2/WeekCalendarTimePicker/utils/converter';

const TipologiaOrarioComponent = ({ filterList, selectedFilters, setPopupFilters }) => {
  const { popupFilters, dataDomandaTCB } = selectedFilters;

  const { [labelTipologiaOrario]: tipologiaOrario } = popupFilters;

  const keyTipologiaOrario = attributo.LS_ORARIO_LAVORO.ty_dominio_tcb;

  const orarioValues = mapFilterList(filterList, keyTipologiaOrario);

  const { calendario, idTipologiaOrario } = dataDomandaTCB;

  const hours = orarioValues.map(orario => ({
    id: orario.id,
    label: orario.value,
  }));

  return (
    <Row fluid margin="0.5em 0 0 0">
      <Column xs="12" md="6" lg="6" padding="0">
        <Radio
          width="fit-content"
          radioItems={hours.slice(0, 3)}
          allowWrap
          selectedItem={tipologiaOrario}
          onChange={async (value) => {
            await setPopupFilters({
              ...selectedFilters,
              popupFilters: {
                ...popupFilters,
                [labelTipologiaOrario]: undefined,
                [labelStipendioProposto]: undefined,
                [labelSpaziLavoratore.spazioConvivente]: undefined,
                [labelSpaziLavoratore.spazioConvivenzaRidotta]: undefined,
                [labelSpaziLavoratore.mezzagiornata]: undefined,
                [labelCalendario]: undefined,
              },
            });

            if (idTipologiaOrario === value.id) {
              return setPopupFilters({
                ...selectedFilters,
                popupFilters: {
                  ...popupFilters,
                  [labelTipologiaOrario]: value,
                  [labelStipendioProposto]: undefined,
                  [labelSpaziLavoratore.spazioConvivente]: undefined,
                  [labelSpaziLavoratore.spazioConvivenzaRidotta]: undefined,
                  [labelSpaziLavoratore.mezzagiornata]: undefined,
                  [labelCalendario]: convertBinToObject(calendario),
                },
              });
            }

            return setPopupFilters({
              ...selectedFilters,
              popupFilters: {
                ...popupFilters,
                [labelTipologiaOrario]: value,
                [labelStipendioProposto]: undefined,
                [labelSpaziLavoratore.spazioConvivente]: undefined,
                [labelSpaziLavoratore.spazioConvivenzaRidotta]: undefined,
                [labelSpaziLavoratore.mezzagiornata]: undefined,
                [labelCalendario]: undefined,
              },
            });
          }}
          fontSize="f7"
          checkcolor="primary"
          display="inline-grid"
        />
      </Column>
      <Column xs="12" md="6" lg="6" padding="0">
        <Radio
          width="fit-content"
          radioItems={hours.slice(3, 6)}
          allowWrap
          selectedItem={tipologiaOrario}
          onChange={async (value) => {
            await setPopupFilters({
              ...selectedFilters,
              popupFilters: {
                ...popupFilters,
                [labelTipologiaOrario]: undefined,
                [labelStipendioProposto]: undefined,
                [labelSpaziLavoratore.spazioConvivente]: undefined,
                [labelSpaziLavoratore.spazioConvivenzaRidotta]: undefined,
                [labelSpaziLavoratore.mezzagiornata]: undefined,
                [labelCalendario]: undefined,
              },
            });
            setPopupFilters({
              ...selectedFilters,
              popupFilters: {
                ...popupFilters,
                [labelTipologiaOrario]: value,
                [labelStipendioProposto]: undefined,
                [labelSpaziLavoratore.spazioConvivente]: undefined,
                [labelSpaziLavoratore.spazioConvivenzaRidotta]: undefined,
                [labelSpaziLavoratore.mezzagiornata]: undefined,
                [labelCalendario]: undefined,
              },
            });
          }}
          fontSize="f7"
          checkcolor="primary"
          display="inline-grid"
        />
      </Column>
    </Row>
  );
};

TipologiaOrarioComponent.displayName = 'Tipologia orario';

export const TipologiaOrario = TipologiaOrarioComponent;
