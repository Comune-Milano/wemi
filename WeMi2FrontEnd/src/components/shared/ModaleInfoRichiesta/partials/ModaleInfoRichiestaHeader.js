/** @format */

import React from 'react';
import { StyledHeader } from 'components/ui2/Modal';
import Text from 'components/ui/Text';
import { getObjectValue } from 'utils/extensions/objectExtensions';

const ModaleInfoRichiestaHeader = ({ richiestaEnte }) => {
  const titoloServizio = getObjectValue(richiestaEnte, 'servizioEnte.service.txTitoloServizio.it');
  const nomeEnte = getObjectValue(richiestaEnte, 'servizioEnte.ente.nm_ente');

  return (
    <StyledHeader
      mobileFullScreen="true"
    >
      <Text
        tag="h2"
        value={titoloServizio}
        size="f4"
        weight="bold"
        color="black"
      />
      <div>
        <Text
          tag="span"
          value={nomeEnte}
          size="f7"
          weight="bold"
          transform="uppercase"
          letterSpacing="0.05em"
        />

      </div>
    </StyledHeader>
  );
};

ModaleInfoRichiestaHeader.displayName = 'ModaleInfoRichiestaHeader';
export default ModaleInfoRichiestaHeader;
