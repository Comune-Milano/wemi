/** @format */
import React from 'react';
import { Link } from 'react-router-dom';

export const data = {
  Colonne: [
    ' ID',
    ' Nome Chiave',
    ' Area*',
    ' Livello 1*',
    'Livello 2*',
    ' Stato Compilazione',
    'Dato Compilazione',
    'Admin Stato',
  ],
  Righe: [
    {
      id: <Link to="/it/ServiziAccreditati">500003</Link>,
      nomechiave: 'Ancora',
      area: 'Sostegno alla famiglia',
      livello1: 'Valutazione Estetica',
      livello2: 'Parrucchiere Uomo',
      statocompilazione: 'COMPILATA',
      datacompilazione: '00/00/0000',
      adminstato: 'VALIDATA',
    },
    {
      id: <Link to="/it/ServiziAccreditati">500003</Link>,
      nomechiave: 'Ancora',
      area: 'Sostegno alla famiglia',
      livello1: 'Valutazione Estetica',
      livello2: 'Parrucchiere Uomo',
      statocompilazione: 'COMPILATA',
      datacompilazione: '00/00/0000',
      adminstato: 'VALIDATA',
    },
    {
      id: <Link to="/it/ServiziAccreditati">500003</Link>,
      nomechiave: 'Ancora',
      area: 'Sostegno alla famiglia',
      livello1: 'Valutazione Estetica',
      livello2: 'Parrucchiere Uomo',
      statocompilazione: 'COMPILATA',
      datacompilazione: '00/00/0000',
      adminstato: 'VALIDATA',
    },
  ],
};
