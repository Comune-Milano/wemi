import React from 'react';
import Wrapper from './../partials/Wrapper';
import SectionTitle from './../partials/SectionTitle';
import FieldList from './../partials/FieldList';
import FieldSingle from './../partials/FieldSingle';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import FieldText from './../partials/FieldText';
import { functionSort } from "utils/functions/functionSort";

const CuraDegliAnimali = ({
    title,
    moveTo,
    servizioTCB,
    locale,
    loading,
    errored,
    data
}) => {
    let animaliPresenti = []

    if (data) {
        const numeroCani = getObjectValue(data, 'numeroCani.nrVal', false);
        const numeroGatti = getObjectValue(data, 'numeroGatti.nrVal', false);
        if (numeroCani)
            animaliPresenti.push({ value: numeroCani + ' can' + ((parseInt(numeroCani) == 1) ? 'e' : 'i') })
        if (numeroGatti)
            animaliPresenti.push({ value: numeroGatti + ' gatt' + ((parseInt(numeroGatti) == 1) ? 'o' : 'i') })
        if (getObjectValue(data, 'altriAnimaliFlag.flag', false) === '1')
            animaliPresenti.push({ other: true, value: getObjectValue(data, 'altriAnimaliFlag.txNota', null), error: !getObjectValue(data, 'altriAnimaliFlag.txNota', false), label: "Altro", cdDominioTcb: 0 })
    }
    let mansioni = []

    if (data) {
        if (getObjectValue(data, 'mansioni', []).length) {
            getObjectValue(data, 'mansioni', []).forEach(element => {
                if (element.cdDominioTcb === 0) {
                    mansioni.push({ other: true, value: element.txNota, error: !element.txNota, label: "Altro", cdDominioTcb: element.cdDominioTcb })
                } else {
                    mansioni.push({ value: element.txTitoloMansione[locale] })
                }
            });
        }
    }

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
                {getObjectValue(data, 'animaliFlag.flag', null) === '1' ?
                    <>
                        <FieldList
                            title="Animali presenti"
                            array={functionSort(animaliPresenti, "cdDominioTcb")}
                            required={getObjectValue(data, 'animaliFlag.flag', '0') === '1'}
                        />
                        <FieldList
                            title="Mansioni richieste"
                            array={functionSort(mansioni, "cdDominioTcb")}
                        />
                    </> :
                    getObjectValue(data, 'animaliFlag.flag', null) === '0' ?
                        <FieldSingle
                            value="Non richiesta"
                        />
                        :
                        <FieldText
                            title="Cura degli animali"
                            required={true}

                        />
                }
            </Wrapper>
        </>
    )
}
CuraDegliAnimali.displayName = 'CuraDegliAnimali';

export default CuraDegliAnimali;