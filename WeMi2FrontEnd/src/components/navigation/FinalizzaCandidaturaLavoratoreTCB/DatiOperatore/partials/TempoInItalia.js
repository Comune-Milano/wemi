
import React from 'react';
import Text from 'components/ui/Text';
import DatePicker from 'components/ui2/DatePicker';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { Row } from 'components/ui/Grid';
import moment from 'moment';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';

const TempoInItalia = (
) => {

  const { dataset, setFormField, errors, touched, handleFieldBlur } = useFormContext();

  return (
    <>
      <Row fluid >
      <GroupFieldTitle
          title="IN ITALIA DAL"
        />
      </Row>
      <Row fluid>
        <DatePicker
        label={"dal"}
        onBlur={() => handleFieldBlur('dtItaliaDal')}
        onChange={(day) => setFormField("dtItaliaDal", day)}
        selectedDate={ dataset["dtItaliaDal"] ? moment(dataset["dtItaliaDal"]).format('DD/MM/YYYY') : undefined}
        error={touched.dtItaliaDal && errors.dtItaliaDal}
        />
      </Row>
    </>
  )
}

TempoInItalia.displayName = 'TempoInItalia';

export default TempoInItalia;
