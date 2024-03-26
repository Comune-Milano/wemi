import React from 'react';
import Header from 'components/ui2/Header';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import ConsultazioneVoucher from 'components/navigation/ConsultazioneVoucher';
import Wrapper from 'components/navigation/NavigationWrapper';
import { BreadcrumbPath } from './constants';

// eslint-disable-next-line arrow-body-style
const ElencoVoucher = () => {
  return (
    <Wrapper>
      <>
        <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
        <Header fontSize="f4" title="Gestione voucher" color="purple" />
        <ConsultazioneVoucher />
      </>
    </Wrapper>
  );
};

ElencoVoucher.displayName = 'ElencoVoucherPage';

export default ElencoVoucher;
