import React, { useContext } from 'react';
import { MatchingLavoratoreContext } from 'components/pages/MatchingDomandaLavoratore/utils/MatchingLavoratoreContext';
import WeekCalendarTimePicker from 'components/ui2/WeekCalendarTimePicker';
import { labelCalendario, labelTipologiaOrario } from 'components/pages/MatchingDomandaLavoratore/labels';
import { hourTypology } from 'components/pages/MatchingDomandaLavoratore/utils/hourTypology';
import { SABATO, DOMENICA } from 'components/ui2/WeekCalendarTimePicker/utils/constants';
import { defaultCalendar } from 'components/pages/MatchingDomandaLavoratore/constants/calendario';
import { TipologiaOrario } from '../Disponibilita/';

const CalendarioComponents = ({ filterList, selectedFilters, setPopupFilters }) => {
  const { contextState, setContextState } = useContext(MatchingLavoratoreContext);

  const { [labelTipologiaOrario]: tipologiaOrario } = selectedFilters;

  const nomeTipoOrario = hourTypology(tipologiaOrario);

  const calendarValues = selectedFilters[labelCalendario] || defaultCalendar;

  const dayLimit = nomeTipoOrario === 'weekend' ? [SABATO.value, DOMENICA.value] : null;

  return (
    <>
      <TipologiaOrario
        filterList={filterList}
        selectedFilters={contextState}
        setPopupFilters={setContextState}
      />
      {!tipologiaOrario || !tipologiaOrario.hasOwnProperty('id') 
       || nomeTipoOrario === 'convivenza'
      ? null : (
        <WeekCalendarTimePicker
          daysToShow={dayLimit}
          onChange={async (range) => {
            const newObj = {
              ...defaultCalendar,
              ...selectedFilters[labelCalendario],
              ...range,
            };

            await setContextState({
              ...contextState,
              calendario: true,
              popupFilters: {
                ...selectedFilters,
                [labelCalendario]: newObj,
              },
            });
          }}
          calendar={calendarValues}
        />
      )}

    </>

  );
};

CalendarioComponents.displayName = 'Calendario components';

export const Calendario = CalendarioComponents;
