import React from 'react';
import Text from 'components/ui/Text';
import moment from 'moment';
import * as tcbConstants from 'types/tcbConstants';

const formattedDate = (date) => {
  return moment(date).format('DD/MM/YYYY');
};

export const CompLavoratoreAssociato = ({nome, cognome, dataInizio, dataFine, cdServizio}) => {
  const formattedDataFine = dataFine ? formattedDate(dataFine) : '';
  const formattedDataInizio = formattedDate(dataInizio);

  let serviceNameMapping = {
    [tcbConstants.CD_TIPOLOGICA_TATA]: 'baby-sitter',
    [tcbConstants.CD_TIPOLOGICA_COLF]: 'colf',
    [tcbConstants.CD_TIPOLOGICA_BADANTE]: 'badante'
  };
  const serviceName = serviceNameMapping[cdServizio] || 'baby-sitter';

  return <>
    <span> <Text tag="span" value={nome} weight="bold" /> </span>
    <span> <Text tag="span" value={cognome} weight="bold" /> sarà il tuo </span>
    {serviceName}
    {formattedDataInizio ?
      (<span> dal  <Text tag="span" value={formattedDataInizio} weight="bold" /> </span>) :
      null
    }
    {formattedDataFine ?
      (<span> al <Text tag="span" value={formattedDataFine} weight="bold" /> </span>) :
      null
    }
  </>;
};

CompLavoratoreAssociato.displayName="CompLavoratoreAssociato";