import React from 'react';
import imgMinisteroInterno from 'images2/inclusione/conoscere per integrarsi.svg';
import { WINDOW_SIZE } from 'types/windowSize';
import useWindowSize from 'hooks/useWindowSize';
import { FondoAsiloMigrazioneEIntegrazioneConoscereIntegrarsi } from './ConoscereIntegrarsi.style';
import { textBold, textNazionale, textSpecifico, subImg } from './costants';

const RightColumn = () => {
  const windowSize = useWindowSize();
  const isMedium = WINDOW_SIZE.windowSizesMedium.includes(windowSize);
  const isSmall = WINDOW_SIZE.windowSizesSmall.includes(windowSize);

  const widthBorder = React.useMemo(() => {
    if (isMedium) {
      return '52%';
    }
    if (isSmall) {
      return '99%';
    }
    return '92%';
  }, [isMedium, isSmall]);

  return (
    <FondoAsiloMigrazioneEIntegrazioneConoscereIntegrarsi
      textBold={textBold}
      textNazionale={textNazionale}
      textSpecifico={textSpecifico}
      subImg={subImg}
      src={imgMinisteroInterno}
      widthBorder={widthBorder}
      paddingTopBorder="0 0 0.7em 0"
    />
  );
};

RightColumn.displayName = 'RightColumnNavigation';

export default RightColumn;
