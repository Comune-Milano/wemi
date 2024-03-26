import React from 'react';
import Header from 'components/ui2/Header';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import VouchersManagement from 'components/navigation/VouchersManagement';
import Wrapper from 'components/navigation/NavigationWrapper';
import { BreadcrumbPath } from './constants';

// eslint-disable-next-line arrow-body-style
const GestioneVoucher = () => {
  return (
    <Wrapper>
      <>
        <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
        <Header fontSize="f4" title="Gestione voucher" color="blue" />
        <VouchersManagement />
      </>
    </Wrapper>
  );
};

GestioneVoucher.displayName = 'GestioneVoucherPage';

export default GestioneVoucher;
