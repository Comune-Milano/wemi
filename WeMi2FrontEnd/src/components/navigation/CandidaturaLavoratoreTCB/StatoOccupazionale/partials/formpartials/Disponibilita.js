
import React from 'react';
import DatePicker from 'components/ui2/DatePicker';
import { Row } from 'components/ui/Grid';
import moment from 'moment';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import useWindowSize from 'hooks/useWindowSize';

const Disponibilita = (
  {
    dataset,
    setFormField,
    handleFieldBlur,
    touched,
    errors,
  }
) => {
  const windowSize = useWindowSize();
  const isMobileDevice = ['xs'].indexOf(windowSize) > -1;


  return (
    <>
      <Row fluid>
        <GroupFieldTitle
          title="DA QUANDO SEI DISPONIBILE A LAVORARE?"
          marginTop="0"
        />
      </Row>
      <Row fluid>
        <DatePicker
          required={!(dataset.stato && dataset.stato.id === 3)}
          label="Disponibile dal"
          onBlur={() => handleFieldBlur('disponibile')}
          onChange={(day) => setFormField('disponibile', day)}
          selectedDate={dataset.disponibile ? moment(dataset.disponibile).format('DD/MM/YYYY') : undefined}
          error={touched.disponibile && errors.disponibile ? errors.disponibile : null}
          positionTooltip="right"
          emTooltipWidth={isMobileDevice ? '13' : '18'}
        />
      </Row>
    </>
  );
};

Disponibilita.displayName = 'Disponibilita';

export default Disponibilita;
