import React from 'react';

import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui2/Input';
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';

const AggiuntaPersone = ({
  isValid,
  save,
}
) => {
  const [touched, setTouched] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const [from, setFrom] = React.useState();
  const [to, setTo] = React.useState();


  const resetState = () => {
      setErrors({});
      setTouched({});
      setFrom();
      setTo();
  };

  const handleSave = () => {
    const { qtPersoneDa, qtPersoneA, checkCrossPersone } = isValid(from, to);
    if (qtPersoneDa || qtPersoneA || checkCrossPersone) {
      setErrors({
        qtPersoneDa,
        qtPersoneA,
        checkCrossPersone,
      });
    } else {
      save(parseInt(from, 10), parseInt(to, 10));
      resetState();
    }
  };

  const handleFrom = (value) => {
    setFrom(value);
    let errors = {};
    if (touched.start && to) {
      errors = isValid(value, to);
    }
    setTouched(old => ({ ...old, start: true }));
    setErrors(errors);
  };
  
  const handleTo = (value) => {
    setTo(value);
    let errors = {};
    if (touched.end && from) {
      errors = isValid(from, value)
    }
    setTouched(old => ({ ...old, end: true }));
    setErrors(errors);
  };

  return (
    <Row flex alignitems="center">
      <Column xs="2">
        <Input
          type="number"
          hoverColor="blue"
          color="blue"
          label="n° persone da"
          inputValue={from}
          onChange={handleFrom}
          error={errors.qtPersoneDa || errors.checkCrossPersone}
        />
      </Column>
      <Column xs="2">
        <Input
          type="number"
          hoverColor="blue"
          color="blue"
          label="n° persone a"
          inputValue={to}
          onChange={handleTo}
          error={errors.qtPersoneA}
        />
      </Column>
      <Column xs="2">
        <ButtonIcon 
          color="blue"
          icon="plus"
          onClick={handleSave}
        />
      </Column>
    </Row>
  );
};
AggiuntaPersone.displayName = 'Aggiunta persone';

export default AggiuntaPersone;