import React from 'react';
import * as tipologiaOrario from 'types/tipologiaOrario';
import MezzaGiornataDiRiposo from './MezzaGiornataDiRiposo';
import StipendioMinimo from './StipendioMinimo';
import TipoSistemazione from './TipoSistemazione';
import OreMassime from './OreMassime';
import DisponibilitaOrariaLavoratoreCalendar from './DisponibilitaOrariaLavoratoreCalendar';
import { Row } from 'components/ui/Grid';
import { getNameKey, getNameKeyStipendio } from '../../disponibilitaLavoratoreUtils';
import { keySpazi } from '../../constants';

export const FormDisponibilitaOrariaLavoratore = ({
  valueDisponibilita,
  formData,
  handleChangeForm,
  items
}) => {

  const isConvivenza = valueDisponibilita === tipologiaOrario.CONVIVENZA;
  const isConvivenzaRidotta = valueDisponibilita === tipologiaOrario.CONVIVENZA_RIDOTTA;
  const isNonConviventi = valueDisponibilita === tipologiaOrario.NON_CONVIVENTI; // Full time, part time, a ore
  const isPresenzaNotturna = valueDisponibilita === tipologiaOrario.PRESENZA_NOTTURNA;
  const isWeekend = valueDisponibilita === tipologiaOrario.WEEKEND;
  const isAssistenzaNotturna = valueDisponibilita === tipologiaOrario.ASSISTENZA_NOTTURNA;

  const keyStipendio = getNameKeyStipendio(valueDisponibilita);
  const keySpaziRes = isConvivenza ? keySpazi.convivenza : keySpazi.convivenzaRidotta;
  const nameKey = getNameKey(valueDisponibilita);
  const data = formData[getNameKey(valueDisponibilita)];

  return (
    <>
      {
        isConvivenza ?
          <Row fluid margin="0 0 2em 0">
            <MezzaGiornataDiRiposo
              items={items.mezzaGiornata}
              mezzaGiornataDiRiposo={data?.mezzaGiornataDiRiposo}
              handleChangeForm={handleChangeForm}
              formData={data}
              nameKey={nameKey}
            />
          </Row>
          : null
      }
      {
        isNonConviventi ?
          <Row fluid margin="0 0 2em 0">
            <OreMassime
              items={items.nrOreSettimanali}
              oreMassime={data?.oreMassime}
              handleChangeForm={handleChangeForm}
              formData={data}
              nameKey={nameKey}
            />
          </Row>
          : null
      }
          <Row fluid margin="0 0 2em 0">
            <StipendioMinimo
              items={items[keyStipendio]}
              stipendioMinimo={data?.stipendioMinimo}
              handleChangeForm={handleChangeForm}
              formData={data}
              nameKey={nameKey}
            />
          </Row>
      {
        isConvivenza || isConvivenzaRidotta ?
          <Row fluid margin="0 0 2em 0">
            <TipoSistemazione
              items={items[keySpaziRes]}
              tipoSistemazione={data?.tipoSistemazione}
              handleChangeForm={handleChangeForm}
              formData={data}
              nameKey={nameKey}
            />
          </Row>
          : null
      }
      {
        !isConvivenza ?
          <DisponibilitaOrariaLavoratoreCalendar
            textTipologiaOrario={nameKey}
            calendarId={nameKey + "Calendar"}
            calendarValue={data.calendarValues}
            formData={data}
            handleChangeForm={handleChangeForm}
            nameKey={nameKey}
          />
          : null
      }
    </>
  )
};

FormDisponibilitaOrariaLavoratore.displayName = 'FormDisponibilitaOrariaLavoratore';
export default FormDisponibilitaOrariaLavoratore;