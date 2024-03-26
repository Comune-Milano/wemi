import React from 'react';
import { NavLink } from 'components/router';

export const contacts = [
  {
    label: 'Scrivici',
    value: <a href=" " target="_blank">Invia la tua richiesta online</a>,
  },
  {
    label: 'Chiamaci',
    value: (
      <>
        <a href="tel:020202">020202</a>
        {' '}
        - tasto 4.1.3
      </>
    ),
  },
  {
    label: 'Incontraci',
    value: (
      <NavLink
        role="menuitem"
        to="/spazi-wemi"
      >
        Scopri gli Spazi WeMi
      </NavLink>
    ),
  },
];
