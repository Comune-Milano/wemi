import React from 'react';
import Text from 'components/ui/Text';

export const CompPagataRecensione = ({nome, cognome}) => {
  return <>
    <div>Il servizio è stato erogato.</div>
    Lascia una recensione su
    <span> <Text tag="span" value={nome} weight="bold" /> </span>
    <span> <Text tag="span" value={`${cognome}.`} weight="bold" /> </span>
  </>
};
CompPagataRecensione.displayName="CompPagataRecensione";
