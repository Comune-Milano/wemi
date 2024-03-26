/** @format */

import React from 'react';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
//import SimulatoreCostoTCBProp from './propTypes';
import SimulatoreCostoTCB from 'components/navigation/SimulatoreCostoTCB';
import { getIdServizio } from 'utils/functions/getIdServizio';


const SimulatoreCostoTCBPage = ({ pathname,match }) => {
  const BreadcrumbPath = [
    {
      slash: pathname,
      url: 'Simulazione Costi/'
    },
  ]

  return(
  <Wrapper>
         <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
         <SimulatoreCostoTCB idServizio={getIdServizio(match.params.idServizio)} />
 
  </Wrapper>
)
}
SimulatoreCostoTCBPage.displayName = 'SimulatoreCostoTCBPage';
// SimulatoreCostoTCBPage.propTypes = SimulatoreCostoTCBProp;


export default SimulatoreCostoTCBPage;
