import React from 'react';
import Header from 'components/ui2/Header';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import TransazioniVoucherManagement from 'components/navigation/TransazioniVoucherManagement';
import Wrapper from 'components/navigation/NavigationWrapper';
import { PAGE_HOME_URL, PAGE_AREAPERSONALE_URL, PAGE_GESTIONE_VOUCHER } from 'types/url';

// eslint-disable-next-line arrow-body-style
const DettaglioTransazioniVoucher = ({
  match,
}) => {
  const { idVoucher } = match.params;
  const parsedIdVoucher = Number.parseInt(idVoucher, 10);
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
      slash: 'Lista Transazioni Voucher',
      url: `/admin/lista-transazioni-voucher/${match.params}`,
    },
  ];

  return (
    <Wrapper>
      <>
        <Breadcrumbs value="Breadcrumb.page" pathSlashes={breadcrumbPath} />
        <Header fontSize="f4" title="dettaglio transazioni voucher" color="blue" />
        <TransazioniVoucherManagement idVoucher={parsedIdVoucher} />
      </>
    </Wrapper>
  );
};

DettaglioTransazioniVoucher.displayName = 'DettaglioTransazioniVoucherPage';

export default DettaglioTransazioniVoucher;
