import React from "react";
import { Row } from "components/ui/Grid";
import WeekCalendarTimePicker from "components/ui2/WeekCalendarTimePicker";
import {SABATO, DOMENICA} from 'components/ui2/WeekCalendarTimePicker/utils/constants';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import { nameKey as nameKeyOraria } from '../../constants';

const DisponibilitaOrariaLavoratoreCalendarTcb = ({
  textTipologiaOrario,
  formData,
  handleChangeForm,
  nameKey,
  calendarValue
}) => {

  const dayLimit = textTipologiaOrario === nameKeyOraria.weekend ? [SABATO.value, DOMENICA.value] : null;

  const handleChangeCalendar = (range) => {
    const newObj = { ...formData.calendarValues, ...range };
    handleChangeForm(nameKey, { ...formData, calendarValues: newObj });
  };

  const title = textTipologiaOrario !== nameKeyOraria.weekend ?
    `Indica i giorni della settimana e le fasce orarie in cui sei disponibile a prestare il servizio`
    : 'INDICA LE FASCE ORARIE IN CUI SEI DISPONIBILE A PRESTARE IL SERVIZIO';

  return (
    <>
      <GroupFieldTitle
        marginTop="0"
        title={title}
      />
      <Row fluid>
        <WeekCalendarTimePicker
          labelDisabilita="Non disponibile"
          calendar={calendarValue}
          onChange={(range) => { handleChangeCalendar(range) }}
          daysToShow={dayLimit}
          bgColor="white"
        />
      </Row>
    </>
  );
};

DisponibilitaOrariaLavoratoreCalendarTcb.displayName = 'DisponibilitaOrariaLavoratoreCalendarTcb';
export default DisponibilitaOrariaLavoratoreCalendarTcb;