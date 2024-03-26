/** @format */

import React, { useState } from 'react';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import WeekCalendarTimePicker from 'components/ui2/WeekCalendarTimePicker';
import styled from 'styled-components';
import { countMinutes } from 'components/ui2/WeekCalendarTimePicker/utils/functions';
import TitleModalInfo from 'components/shared/SimulatoreCosto/partials/TitleModalInfo';
import { BodyModalInfo } from 'components/shared/SimulatoreCosto/utils';
import { TIPOLOGIA_ORARIO } from 'components/pages/MatchingDomandaLavoratore/constants/tipologiaorario';
import { INTERVALS } from './constants';
import { countHours } from './utils';

const ContainerRow = styled(Row)`
  background-color: #ECECEC;
`;

const DisponibilitaSettimanale = ({
  setFormField,
  disponibilitaSettimanale,
  oreSettimanali,
  maxHours,
  orario = {},
  orariTCB = [],
  locale = 'it',
  maxOre,
}) => {
  
  const [errors, setErrors] = useState();
  React.useLayoutEffect(() => {
    setErrors();
  }, [disponibilitaSettimanale]);
  const calendarValues = disponibilitaSettimanale;
  const timeScheduleDB = orariTCB.find((schedule) => {
    if ((orario.id === TIPOLOGIA_ORARIO.PRESENZA_NOTTURNA || orario.id === TIPOLOGIA_ORARIO.ASSISTENZA_NOTTURNA)) {
      if (orario.id === schedule.cd_dominio_tcb) { return schedule; }
    }
    return undefined;
  });

  const timeSchedule = timeScheduleDB ? {
    id: timeScheduleDB?.cd_dominio_tcb,
    value: timeScheduleDB?.tl_valore_testuale[locale],
    interval: timeScheduleDB?.cd_dominio_tcb === TIPOLOGIA_ORARIO.ASSISTENZA_NOTTURNA ?
      INTERVALS.ASSISTENZA_NOTTURNA : INTERVALS.PRESENZA_NOTTURNA,
  } : undefined;

  return (
    <ContainerRow margin="3em 0 0 0" padding="0.5rem 1.5rem">
      <Column padding="0">
        <TitleModalInfo
          label="Indica i giorni della settimana e le fasce orarie in cui richiedi il servizio"
          modalTitle="tipologia orario"
          modalBody={BodyModalInfo.oreSettimanali(maxOre)}
          margin="2em 0 1em 0"
          required
          color="primary"
        />
      </Column>
      <Column padding="0">
        <Text
          tag="span"
          value="Hai selezionato"
          size="f7"
        />
                &nbsp;
        <Text
          tag="span"
          value={`${oreSettimanali} ore `}
          color="primary"
          weight="bold"
          size="f7"
        />
                &nbsp;
        <Text
          tag="span"
          value="alla settimana"
          size="f7"
        />
      </Column>
      <Column padding="0">
        <WeekCalendarTimePicker
          hideRadio
          disableTimeSlot={!!(timeSchedule)}
          labelCheckDefaultTimeSlot={timeSchedule?.value}
          defaultInterval={timeSchedule?.interval}
          maxHours={maxHours}
          calendar={calendarValues}
          onChange={(range) => {
            const newObj = {
              ...calendarValues,
              ...range,
            };

            const newState = countHours(newObj, timeSchedule?.interval?.defaultHours);

            if (newState && (newState > maxHours)) {
              const [keyInteracted] = Object.keys(range);
              setErrors({
                end: `Non è possibile inserire un numero di ore superiore al massimo previsto (${maxHours} ore)`,
                lastInteractedWith: keyInteracted,
              });
              return;
            }
            setFormField('disponibilitaSettimanale', newObj);

            if (timeSchedule) {
              setFormField('oreSettimanali', newState);
              return;
            }

            setFormField('oreSettimanali', countMinutes(newObj));
          }}
          bgColor="white"
          error={errors}
        />
      </Column>
    </ContainerRow>
  );
};

DisponibilitaSettimanale.displayName = 'DisponibilitaSettimanale';

export default DisponibilitaSettimanale;
