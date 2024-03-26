import React from 'react';
import Header from 'components/ui2/Header';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import TransazioniManagement from 'components/navigation/TransazioniManagement';
import Wrapper from 'components/navigation/NavigationWrapper';
import { BreadcrumbPath } from './constants';

// eslint-disable-next-line arrow-body-style
const GestioneTransazioni = () => {
  return (
    <Wrapper>
      <>
        <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
        <Header fontSize="f4" title="Lista delle transazioni effettuate con i voucher" color="blue" />
        <TransazioniManagement />
      </>
    </Wrapper>
  );
};

GestioneTransazioni.displayName = 'GestioneTransazioniPage';

export default GestioneTransazioni;
