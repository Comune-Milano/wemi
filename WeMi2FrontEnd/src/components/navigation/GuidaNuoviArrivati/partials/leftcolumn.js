import React from 'react';
import BenvenutiAMilano from './leftcolumn.partials/benvenutiamilano';
import ScaricaLaGuida from './leftcolumn.partials/scaricalaguida';
import SezioniGuida from './leftcolumn.partials/sezioniguida';

const LeftColumn = () => (
  <>
    <BenvenutiAMilano />
    <ScaricaLaGuida />
    <SezioniGuida />
  </>
);

LeftColumn.displayName = 'LeftColumn';
export default LeftColumn;
