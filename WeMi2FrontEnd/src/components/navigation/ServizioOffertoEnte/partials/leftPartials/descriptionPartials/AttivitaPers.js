/** @format */

import React from 'react';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import Text from 'components/ui/Text';
import { DashedUnorderedList } from '../../DashedUnorderedList';

const AttivitaPers = ({ servizioErogato, locale }) => {

    const listaMansioniSvolte = getObjectValue(
        servizioErogato,
        'EstraiDettaglioAmministrativoServizioEnte.listaMansioniSvolte',
        []
    )
        .sort((mansionea, mansioneb) => {
            if(mansionea.order < mansioneb.order){
                return -1;
            }
            return 1;
        });

    return (
        <div style={{ width: '100%', margin: '0.5em 0' }}>
            <Text
                tag="h4"
                weight="bold"
                value="Cosa"
                color="black" 
                size="f7" 
            />
            {listaMansioniSvolte.length > 0 &&
                <DashedUnorderedList style={{ padding: '0.5em 0 0 0' }}>
                    {listaMansioniSvolte.map((mansione, i) => (
                        <li key={"mansione" + i}>
                            <Text
                                tag="span"
                                value={mansione.txTitoloMansione[locale]}
                                color="black" 
                                size="f7" 
                            />
                        </li>
                    ))}
                </DashedUnorderedList>
            }
            <Text
                tag="p"
                padding="0.5em 0 0 0"
                value="Ulteriori attività non presenti in elenco potranno essere valutate contattando l’ente"
                fontStyle="italic"
                color="black" 
                size="f7"
            />
        </div>
    );
};


AttivitaPers.displayName = 'AttivitaPers';

export default AttivitaPers;
