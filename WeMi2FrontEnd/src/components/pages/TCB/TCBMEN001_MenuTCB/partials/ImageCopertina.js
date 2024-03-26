import React from 'react';
import copertina from 'images2/homeTCB/copertina.jpg';
import { HeaderImage } from 'components/ui2/HeaderImage';

const ImageCopertina = () => {
  const title = 'TROVA LA SOLUZIONE GIUSTA PER TE:\r\nTATE, COLF E BADANTI';
  const description = 'WeMi Tate Colf Badanti è il servizio del Comune di Milano che aiuta i cittadini  in cerca di assistenti familiari a trovare la soluzione per la cura dei propri cari e della casa e i cittadini in cerca di lavoro a candidarsi come baby-sitter, colf o badante.';

  return (
    <HeaderImage
      imageSrc={copertina}
      title={title}
      description={description}
      titleBgColor="primary"
      titleTransform="none"
    />
  );
};


ImageCopertina.displayName = 'ImageCopertina';

export default ImageCopertina;
