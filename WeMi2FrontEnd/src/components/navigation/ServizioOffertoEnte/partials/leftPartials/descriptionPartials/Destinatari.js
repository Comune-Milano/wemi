/** @format */

import React from 'react';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import Text from 'components/ui/Text';

const Destinatari = ({ servizioErogato, locale }) => {

    const listaDestinatariPrimoLivello = getObjectValue(servizioErogato, 'EstraiDettaglioAmministrativoServizioEnte.listaDestinatariPrimoLivello', []),
        listaDestinatariSecondoLivello = getObjectValue(servizioErogato, 'EstraiDettaglioAmministrativoServizioEnte.listaDestinatariSecondoLivello', []);

    const level1 = [];
    // map values
    listaDestinatariPrimoLivello.map((target1, i1) => {
        level1.push({
            value: target1,
            level2: []
        });
        listaDestinatariSecondoLivello.map((target2, i2) => {
            if (target2.idDestinatarioPrimoLivello === target1.idDestinatario) {
                level1[i1].level2.push(target2);
            }
        });
    });

    return (
        <div style={{ width: '100%', margin: '1.2em 0 0 0' }}>
            {level1.length > 0 &&
                <>
                    <Text
                        tag="h4"
                        weight="bold"
                        value="Per chi"
                        color="black"
                        size="f7"
                    />
                    <p style={{ padding: "0.5em 0 0 0" }}>
                        {level1.map((target1, i1) => (
                            <React.Fragment key={"destlvl1-" + i1}>
                                {i1 ? ', ' : null}
                                <Text
                                    tag="span"
                                    value={target1.value.txDestinatario[locale]}
                                    color="black" 
                                    size="f7" 
                                />
                                {level1.length > 0 &&
                                    <>
                                        {target1 && target1.level2.length > 0 &&
                                            <>
                                                (
                                                {
                                                    target1.level2.map((target2, i2) => (
                                                        <React.Fragment key={"destlvl2-" + i2}>
                                                            {i2 ? ', ' : null}
                                                            <Text
                                                                tag="span"
                                                                value={target2.txDestinatario[locale]}
                                                                color="black" 
                                                                size="f7" 
                                                            />
                                                        </React.Fragment>
                                                    ))}
                                        )
                                            </>
                                        }
                                    </>
                                }
                            </React.Fragment>))}
                    </p>
                </>
            }
        </div>
    );
};


Destinatari.displayName = 'Destinatari';

export default Destinatari;
