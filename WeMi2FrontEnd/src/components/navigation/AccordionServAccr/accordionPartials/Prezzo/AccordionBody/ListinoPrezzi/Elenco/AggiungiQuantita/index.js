import React from 'react';

import Input from 'components/ui2/Input';
import { Column } from 'components/ui/Grid';
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';

const AggiungiQuantita = ({
  save,
  isValid,
  isFree,
}) => {
  const [start, setStart] = React.useState();
  const [end, setEnd] = React.useState();
  const [value, setValue] = React.useState(0);
  const [touched, setTouched] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const checkErrors = (start, end, value) => {
    return isValid(start, end, value);
  };

  const handleStart = (start) => {
    start = start || null;
    setStart(start);
    let errors = {};
    if (touched.start && end) {
      errors = checkErrors(start, end, value);
    }
    setTouched(old => ({ ...old, start: true }));
    setErrors(old => ({
      ...old,
      qtUnitaDa: errors.qtUnitaDa,
      checkCrossQuantita: errors.checkCrossQuantita,
    }));
  };


  const handleEnd = (end) => {
    end = end || null;
    setEnd(end);
    let errors = {};
    if (touched.end && start) {
      errors = checkErrors(start, end, value);
    }
    setTouched(old => ({ ...old, end: true }));
    setErrors(old => ({
      ...old,
      qtUnitaA: errors.qtUnitaA,
      checkCrossQuantita: errors.checkCrossQuantita,
    }));
  };
  const handleValue = (value) => {
    setValue(value);
    let errors = {};
    if (touched.value) {
      errors = checkErrors(start, end, value);
    }
    setTouched(old => ({ ...old, value: true }));
    setErrors(old => ({
      ...old,
      valore: errors.valore,
    }));
  };

  const handleSave = () => {
    const errors = checkErrors(start, end, isFree ? 0 : value);
    if (errors.qtUnitaDa || errors.qtUnitaA || errors.checkCrossQuantita || errors.valore) {
      setErrors(errors);
      setTouched({
        end: true,
        value: true,
        start: true,
      });
    } else {
      save({
        qtUnitaDa: parseInt(start, 10),
        qtUnitaA: end ? parseInt(end, 10) : null,
        valore: isFree ? 0 : parseFloat(value),
      });
      resetState();
    }
  };

  const resetState = () => {
    setErrors({});
    setTouched({});
    setStart();
    setEnd();
    setValue();
  };
  return (
    <>
      <Column xs="12" md="3" padding="1em">
        <Input
          type="number"
          hoverColor="blue"
          color="blue"
          label="unità da"
          onChange={handleStart}
          inputValue={start}
          error={touched.start ? errors.qtUnitaDa || errors.checkCrossQuantita : false}
        />
      </Column>
      <Column xs="12" md="3" padding="1em">
        <Input
          type="number"
          hoverColor="blue"
          color="blue"
          label="unità a"
          onChange={handleEnd}
          inputValue={end}
          error={touched.end && !errors.checkCrossQuantita ? errors.qtUnitaA : false}
        />
      </Column>
      {
        !isFree ?
        (
          <Column xs="12" md="3" padding="1em">
            <Input
              type="number"
              hoverColor="blue"
              color="blue"
              label="importo"
              onChange={handleValue}
              inputValue={value}
              error={touched.value ? errors.valore : false}
            />
          </Column>
        )
        : null
      }
      <Column xs="12" md="3" padding="1em">
        <ButtonIcon 
          icon="plus"
          color="blue"
          onClick={handleSave}
        />
      </Column>
    </>
  );
};

AggiungiQuantita.displayName = 'Aggiungi quantità';

export default AggiungiQuantita;
