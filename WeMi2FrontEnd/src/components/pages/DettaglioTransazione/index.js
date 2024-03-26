import React from 'react';
import Header from 'components/ui2/Header';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import DettaglioTransazione from 'components/navigation/DettaglioTransazione';
import Wrapper from 'components/navigation/NavigationWrapper';
import { PAGE_HOME_URL, PAGE_AREAPERSONALE_URL, PAGE_GESTIONE_VOUCHER, PAGE_LISTA_TRANSAZIONI } from 'types/url';

// eslint-disable-next-line arrow-body-style
const DettaglioTransazionePage = ({
  match,
}) => {
  const { idTransazione } = match.params;
  const parsedIdTransazione = Number.parseInt(idTransazione, 10);
  const breadcrumbPath = [
    {
      slash: 'Home',
      url: PAGE_HOME_URL,
    },
    {
      slash: 'Area personale',
      url: PAGE_AREAPERSONALE_URL,
    },
    {
      slash: 'Gestione Voucher',
      url: PAGE_GESTIONE_VOUCHER,
    },
    {
      slash: 'Lista Transazioni',
      url: PAGE_LISTA_TRANSAZIONI,
    },
    {
      slash: 'Dettaglio Transazione',
      url: `/admin/dettaglio-transazione/${idTransazione}`,
    },
  ];

  const title = `dettaglio transazione ${idTransazione}`;

  return (
    <Wrapper>
      <>
        <Breadcrumbs value="Breadcrumb.page" pathSlashes={breadcrumbPath} />
        <Header fontSize="f4" title={title} color="blue" />
        <DettaglioTransazione idTransaction={parsedIdTransazione} />
      </>
    </Wrapper>
  );
};

DettaglioTransazionePage.displayName = 'DettaglioTransazionePage';

export default DettaglioTransazionePage;
