/** @format */

import React from 'react';
import { Row } from 'components/ui/Grid';
import TextArea from 'components/ui2/TextArea';
import Checkbox from 'components/ui2/Checkbox';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import GroupFieldTitle from '../../partials/GroupFieldTitle';

const AltreDisponibilita = ({
  setFormField,
  notaDisponibilitaStraordinari,
  disponibilitaTrasferteCheck,
  disponibilitaTrasferte,
  disponibilitaStraordinariCheck,
  handleFieldBlur,
  touched,
  errors,
}) => (
  <>
    <GroupFieldTitle
      title="Sono richieste altre disponibilità?"
    />
    <div>
      <Row fluid>
        <Checkbox
          label="Disponibilità a trasferte"
          value={disponibilitaTrasferteCheck}
          onChange={(value) => setFormField('disponibilitaTrasferteCheck', value)}
          checkcolor="primary"
          fontSize="f7"
          width="auto"
        />
      </Row>
      {disponibilitaTrasferteCheck ? (
        <div style={{ padding: '0 0 1em 0' }}>
          <TextArea
            onChange={(value) => setFormField('disponibilitaTrasferte', value)}
            error={touched.disponibilitaTrasferte && errors.disponibilitaTrasferte}
            maxLength={STRING_MAX_VALIDATION.value}
            onBlur={() => handleFieldBlur('disponibilitaTrasferte')}
            placeholder="Specifica durata, frequenza, luogo delle trasferte ed eventuali infomazioni aggiuntive..."
            inputValue={disponibilitaTrasferte}
            name="disponibilitaTrasferte"
            rows={3}
          />
        </div>
        )
          : null}
      <Row fluid>
        <Checkbox
          label="Disponibilità a fare straordinari"
          value={disponibilitaStraordinariCheck}
          onChange={(value) => setFormField('disponibilitaStraordinariCheck', value)}
          checkcolor="primary"
          fontSize="f7"
          width="auto"
        />
      </Row>
      {disponibilitaStraordinariCheck ? (
        <div style={{ padding: '0 0 1em 0' }}>
          <TextArea
            onChange={(value) => setFormField('notaDisponibilitaStraordinari', value)}
            error={touched.notaDisponibilitaStraordinari && errors.notaDisponibilitaStraordinari}
            onBlur={() => handleFieldBlur('notaDisponibilitaStraordinari')}
            maxLength={STRING_MAX_VALIDATION.value}
            placeholder="Specifica qui le note relative agli starordinari"
            inputValue={notaDisponibilitaStraordinari}
            name="notaDisponibilitaStraordinari"
            rows={3}
          />
        </div>
        )
          : null}
    </div>
  </>
  );

AltreDisponibilita.displayName = 'AltreDisponibilita';

export default AltreDisponibilita;
