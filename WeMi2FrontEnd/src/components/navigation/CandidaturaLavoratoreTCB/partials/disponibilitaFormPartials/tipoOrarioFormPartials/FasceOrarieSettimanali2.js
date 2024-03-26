import React from "react";
import { Row } from "components/ui/Grid";
import { useFormContext } from "libs/Form/hooks/useFormContext";
import { GroupFieldTitle } from "components/navigation/ConfigurazioneRichiestaTCB/partials";
import WeekCalendarTimePicker from 'components/ui2/WeekCalendarTimePicker';
import {
  SABATO,
  DOMENICA,
} from 'components/ui2/WeekCalendarTimePicker/utils/constants';
import { countMinutes } from "components/ui2/WeekCalendarTimePicker/utils/functions";

const FasceOrarieSettimanali = ({ nomeTipoOrario }) => {
  const { dataset, setFormField, errors, isFormValid, touched, handleFieldBlur, isFormDirty } = useFormContext();
  const calendarId = `${nomeTipoOrario}Calendario`;
  const calendarValues = dataset[calendarId];
  const dayLimit = nomeTipoOrario === 'weekend' ? [SABATO.value, DOMENICA.value] : null;

  return (
    <Row fluid margin="1em 0 0 0">
      <GroupFieldTitle
        marginTop="0"
        title={nomeTipoOrario!=="weekend"? `Indica i giorni della settimana e le fasce orarie in cui sei disponibile a prestare il servizio`:
        'INDICA LE FASCE ORARIE IN CUI SEI DISPONIBILE A PRESTARE IL SERVIZIO'}
      />
      <Row fluid margin="1em 0 0 0">
        {calendarValues ? (
          <WeekCalendarTimePicker
            calendar={calendarValues}
            sizeLabelDay="f7"
            labelDisabilita="Non disponibile"
            daysToShow={dayLimit}
            onChange={(range) => {
              const newObj = {
                ...dataset[calendarId],
                ...range
              };
              setFormField(
                calendarId,
                newObj
              );
            }}
            bgColor="white"
          />
        ) : null}
      </Row>
    </Row>
  );
};

FasceOrarieSettimanali.displayName = "FasceOrarieSettimanali";
export default FasceOrarieSettimanali;