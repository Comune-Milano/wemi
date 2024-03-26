import React from 'react';
import Wrapper from './../partials/Wrapper';
import SectionTitle from './../partials/SectionTitle';
import FieldText from './../partials/FieldText';
import FieldList from './../partials/FieldList';
import FieldCheck from './../partials/FieldCheck';
import FieldSingle from './../partials/FieldSingle';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { functionSort } from "utils/functions/functionSort";

const CuraDellaCasa = ({
    title,
    moveTo,
    locale,
    loading,
    errored,
    data
}) => {

    const mansioni= getObjectValue(data, 'mansioni', []);

    return (
        <>
            <SectionTitle
                title={title}
                moveTo={moveTo}
            />
            <Wrapper
                loading={loading}
                errored={errored}
            >
                {getObjectValue(data, 'flagCasa.flag', null) === '1' ?
                    <>
                        <FieldText
                            title="Superficie"
                            value={getObjectValue(data, 'superficieCasa.tlValoreTestuale.' + locale, null)}
                            required
                        />
                        <FieldText
                            title="Tipo di abitazione"
                            value={getObjectValue(data, 'abitazione.tlValoreTestuale.' + locale, null)}
                            required
                        />
                        <FieldText
                            title="Numero di stanze"
                            value={getObjectValue(data, 'numeroStanze.tlValoreTestuale.' + locale, null)}
                            required
                        />
                        <FieldText
                            title="Numero di bagni"
                            value={getObjectValue(data, 'numeroBagni.tlValoreTestuale.' + locale, null)}
                        />
                        <FieldText
                            title="Piano"
                            value={getObjectValue(data, 'piano.txVal', null)}
                        />
                        <FieldCheck
                            title="Dispone di un ascensore"
                            checked={getObjectValue(data, 'ascensoreFlag.flag', null) === '1'}
                        />
                        <FieldCheck
                            title="Dispone di una terrazza / un balcone"
                            checked={getObjectValue(data, 'terrazzaFlag.flag', null) === '1'}
                        />
                        <FieldCheck
                            title="Dispone di un giardino"
                            checked={getObjectValue(data, 'giardinoFlag.flag', null) === '1'}
                        />
                        <FieldCheck
                            title="Sono presenti fumatori"
                            checked={getObjectValue(data, 'fumatoriFlag.flag', null) === '1'}
                        />
                        <FieldList
                            title="Mansioni richieste"
                            required
                            array={functionSort(mansioni.map((mans, i) => {
                                return (
                                    (getObjectValue(mans, 'cdDominioTcb', null) === 0) ?
                                        { other: true, value: getObjectValue(data, 'altroValue', ' '), error: !getObjectValue(data, 'altroValue', false),  label: "Altro", cdDominioTcb: mans.cdDominioTcb } :
                                        { value: getObjectValue(mans, 'txTitoloMansione.' + locale, null) }
                                );
                            }), "cdDominioTcb")}
                        />
                    </> :
                    getObjectValue(data, 'flagCasa.flag', null) === '0' ?
                        <FieldSingle
                            value="Non richiesta"
                        />
                        :
                        <FieldText
                            title="Cura della casa"
                            required={true}
                        />
                }
            </Wrapper>
        </>
    )
}
CuraDellaCasa.displayName = 'CuraDellaCasa';

export default CuraDellaCasa;