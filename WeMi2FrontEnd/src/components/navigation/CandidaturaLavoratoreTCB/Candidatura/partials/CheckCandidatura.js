import React from 'react';

import Checkbox from 'components/ui2/Checkbox';

export const CheckCandidatura = ({
  candidatura,
  setCandidatura,
}) => {
  const handleCheckbox = key => value => {
    const newObj = { ...candidatura[key] };
    newObj.checked = value;
    setCandidatura(key, newObj);
  };
  const checkboxCandidatura = Object.keys(candidatura)
    .map(key => (
      <Checkbox 
        key={key}
        checkcolor="primary"
        label={candidatura[key].label}
        value={candidatura[key].checked}
        onChange={handleCheckbox(key)}
      />
    ));
  return checkboxCandidatura;
};

CheckCandidatura.displayName = 'CheckCandidatura';
