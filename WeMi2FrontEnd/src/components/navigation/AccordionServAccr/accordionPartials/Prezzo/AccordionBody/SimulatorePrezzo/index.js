import React from 'react';

import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui2/Input';
import Text from 'components/ui/Text';

const  phpRound = (value, precision=2) => {
  const factor = Math.pow(10, precision);
  const tempNumber = value * factor;
  const [ integer, decimals ] = `${Math.abs(tempNumber)}`.split('.');
  if (!!decimals && Number.parseFloat(`0.${decimals}`).toFixed(1) === '0.5') {
    return (Number.parseInt(integer, 10) + (value < 0 ? -1 : 1)) / factor;
  }
  const roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
}

const SimulatorePrezzo = ({
  listinoPrezzi,
  qtMinimaUnita,
}) => {
  const [persone, setPersone] = React.useState(0);
  const [quantita, setQuantita] = React.useState(0);
  const [touched, setTouched] = React.useState({});
  const [calcolo, setCalcolo] = React.useState();


  const isInteger = value => parseInt(value) == value && value > 0;
  const handleCalcolo = (persone, quantita) => {
    const [value, error, qt, importoUnitario, perPersona, perQuantita] = calcolaPrezzo(persone, quantita, parseInt(qtMinimaUnita, 10));
    setCalcolo({
      value,
      error,
      qt,
      importoUnitario,
      perPersona,
      perQuantita,
    });
  };

  const handlePersone = value => {
    setPersone(value);
    setTouched(state => ({
      ...state,
      persone: true,
    }));
    handleCalcolo(value, quantita);
  };
  
  const handleQuantita = value => {
    setQuantita(value);
    setTouched(state => ({
      ...state,
      quantita: true,
    }));
    handleCalcolo(persone, value);
  };

  const calcolaPrezzo = (persone, quantita, qtMinima) => {
    let error = null;
    let value = null;
    let perPersona = null;
    let perQuantita = null;
    let importoUnitario = null;
    if (isInteger(persone) && isInteger(quantita) && (!qtMinima || quantita >= qtMinima)) {
      const offPersone = listinoPrezzi.find(el => 
        el.qtPersoneDa <= persone && el.qtPersoneA >= persone
        );
      if (offPersone) {
        const offQuantita = offPersone.offerta.find(el =>
          el.qtUnitaDa <= quantita && (el.qtUnitaA || Number.POSITIVE_INFINITY) >= quantita
          );
        if (offQuantita) {
          importoUnitario = offQuantita.valore;
          value = phpRound(offQuantita.valore * quantita);
          perPersona = phpRound(value / persone);
          perQuantita = phpRound(offQuantita.valore / persone);
        } else {
          error = "Non è presente un' offerta per quella quantità";
        }
      } else {
        error = "Non è presente un'offerta per quel numero di persone";
      }
    } else {
      error = 'Valori non validi';
    }
    return [value, error, quantita, importoUnitario, perPersona, perQuantita];
  };
  
  return (
    <>
      <Row>
        <Column xs="6" padding="1em">
          <Input
            hoverColor="blue"
            color="blue"
            label="N° persone:"
            type="number"
            onChange={handlePersone}
            inputValue={persone}
          />
        </Column>
        <Column xs="6" padding="1em">
          <Input
            hoverColor="blue"
            color="blue"
            label="N° quantità:"
            type="number"
            onChange={handleQuantita}
            inputValue={quantita}
            />
        </Column>
      </Row>
      {
        calcolo && touched.persone && touched.quantita?
        (
          <>
            <Row fluid flex justifycontent="left" margin="3em 0">
              <Text
                value={calcolo.error || `Prezzo calcolato ${calcolo.qt} x ${calcolo.importoUnitario.toFixed(2)} = ${calcolo.value.toFixed(2)}`}
                size="f5"
                color={calcolo.error ? 'red' : 'darkGrey'}
              />
            </Row>
            {
              !calcolo.error ?
              (
                <>
                  <Row fluid flex justifycontent="left" margin="3em 0">
                    <Text
                      value={`Prezzo per persona = ${calcolo.perPersona.toFixed(2)}`}
                      size="f5"
                      color="darkGrey"
                    />
                  </Row>
                  <Row fluid flex justifycontent="left" margin="3em 0">
                    <Text
                      value={`Prezzo per persona e per quantità = ${calcolo.perQuantita.toFixed(2)}`}
                      size="f5"
                      color="darkGrey"
                    />
                  </Row>
                </>
              )
              : null
            }
          </>
        )
        : null
      }
    </>
  );
};

SimulatorePrezzo.displayName = 'Simulatore prezzo';

export default SimulatorePrezzo;
