import React from 'react';
import Button from 'components/ui2/Button';
import { PAGE_RICONGIUNGIMENTO_PARENTE } from 'types/url';
import { NavLink } from 'react-router-dom';

const ButtonRicongiungermi = () => (
  <NavLink to={PAGE_RICONGIUNGIMENTO_PARENTE}>
    <Button
      label="VOGLIO RICONGIUNGERMI CON UN PARENTE"
      color="red"
      padding="5px 30px"
      width="auto"
      weight="bold"
    />
  </NavLink>
);

ButtonRicongiungermi.displayName = 'ButtonRicongiungermiComeFunzionaPage';

export default ButtonRicongiungermi;
