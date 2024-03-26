/** @format */

import React from 'react';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import Text from 'components/ui/Text';


const PeriodoErogazione = ({ servizioErogato, locale }) => {

    const listaPeriodiErogazione = getObjectValue(servizioErogato, 'EstraiDettaglioAmministrativoServizioEnte.listaPeriodiErogazione', []);

    return (
        <>
            {listaPeriodiErogazione.length > 0 &&
                <div style={{ width: '100%', margin: '0.5em 0' }}>
                    <Text
                        tag="h4"
                        weight="bold"
                        value="Quando"
                        color="black" size="f7" />
                    <p style={{ padding: "0.5em 0 0 0" }}>
                        {listaPeriodiErogazione.map((el, i) => (
                            <React.Fragment key={"periodo-" + i}>
                                {i ? ', ' : null}
                                <Text
                                    tag="span"
                                    value={getObjectValue(el, 'tl_valore_testuale.' + locale, '')}
                                    color="black" size="f7" />
                            </React.Fragment>
                        ))}
                    </p>
                </div>
            }
        </>
    );
}

PeriodoErogazione.displayName = 'PeriodoErogazione';

export default PeriodoErogazione;
