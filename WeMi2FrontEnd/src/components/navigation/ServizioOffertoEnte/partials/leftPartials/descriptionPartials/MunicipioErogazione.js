/** @format */

import React from 'react';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import Text from 'components/ui/Text';

const qualifiche = (quali, locale) => {
  const arr = [];
  quali.map((el, i) => {
    if (i === 0) {
      arr.push(el.nmMunicipio[locale]);
    } else {
      arr.push(`, ${el.nmMunicipio[locale]}`);
    }
  });

  return arr;
};


const MunicipioErogazione = ({ servizioErogato, locale }) => {
  const listaMunicipiServiti = getObjectValue(servizioErogato, 'EstraiDettaglioAmministrativoServizioEnte.listaMunicipiServiti', []);


  return (
    <>
      {listaMunicipiServiti.length > 0 ? (
        <div style={{ width: '100%', margin: '0.5em 0' }}>
          <Text
            tag="h4"
            weight="bold"
            value="Il servizio è disponibile nei Municipi"
            color="black"
            size="f7"
          />
          <p style={{ padding: '0.5em 0 0 0' }}>
            {listaMunicipiServiti.length === 9 ? (
              <Text
                tag="span"
                value="TUTTI I MUNICIPI"
                color="black"
                size="f7"
              />
            )
              :
              listaMunicipiServiti.map((el, i) => (
                <React.Fragment key={`municipio-${i}`}>
                  {i ? ', ' : null}
                  <Text
                    tag="span"
                    value={getObjectValue(el, `nmMunicipio.${locale}`, '')}
                    color="black"
                    size="f7"
                  />
                </React.Fragment>
              ))}
          </p>
        </div>
      ) : null}
    </>
  );
};

MunicipioErogazione.displayName = 'MunicipioErogazione';

export default MunicipioErogazione;
