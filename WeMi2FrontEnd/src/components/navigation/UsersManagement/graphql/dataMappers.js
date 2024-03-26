import React from 'react';
import moment from 'moment';
import { AMMINISTRATORE } from 'types/userRole';
import ButtonToModify from '../partials/ButtonToModify';

export const dataMapperUserList = (response) => {
  const result = {
    totalRows: 0,
    list: [],
  };

  result.totalRows = response.totalRows;
  // create array to table
  result.list = response.data?.map(el => ({
    cognomeNome: `${`${el.surname ? el.surname : '-'} ` || '-'}${el.name ? el.name : '-' || '-'}`,
    email: el.email,
    username: el.username,
    descrizioneProfilo: el.profile?.description,
    dataInizioValidita: el.startValidDate ? moment(el.startValidDate).format('DD/MM/YYYY') : null,
    dataFineValidita: el.endValidDate ? moment(el.endValidDate).format('DD/MM/YYYY') : null,
    modifica: (
      <ButtonToModify
        redirect={el.profile?.code === AMMINISTRATORE}
        idUser={el.idUtente}
      />
    ),
    colorColumn: el.profile?.code === AMMINISTRATORE ? 'black' : 'darkGrey', // set color single column
    boldColumn: el.profile?.code === AMMINISTRATORE,
  }));

  return result;
};

export const dataMapperProfileCodesItems = (response) => response?.map(el => ({
  id: el.code,
  value: el.description,
}));
