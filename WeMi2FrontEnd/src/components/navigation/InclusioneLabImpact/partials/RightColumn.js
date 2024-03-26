import React from 'react';
import FondoAsiloMigrazioneEIntegrazione from 'components/shared/FondoAsiloMigrazioneEIntegrazione';
import { textBold, textNazionale, textSpecifico, subImg } from './costants';

const RightColumn = () => (
  <FondoAsiloMigrazioneEIntegrazione
    textBold={textBold}
    textNazionale={textNazionale}
    textSpecifico={textSpecifico}
    subImg={subImg}
    paddingTopBorder="0 0 0.3em 0"
  />
);

RightColumn.displayName = 'RightColumnNavigation';

export default RightColumn;
