import React from 'react';
import Wrapper from './../partials/Wrapper';
import SectionTitle from './../partials/SectionTitle';
import FieldText from './../partials/FieldText';
import FieldCheck from './../partials/FieldCheck';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { functionSort } from "utils/functions/functionSort";
import { CD_TIPOLOGICA_BADANTE } from 'types/tcbConstants';

const Beneficiari = ({
    title,
    moveTo,
    servizioTCB,
    locale,
    loading,
    errored,
    data
}) => {

    const array = [];
    if (!loading && data) {
        data.beneficiari.map((infoBen, i) => {
            let isAltro= false;
            array.push([]);
            array[i].push({
                label: "Nome",
                value: getObjectValue(infoBen, 'nomeBen.txVal', null),
                required: true,
                bold: true
            })
            if (servizioTCB.cd_dominio_tcb === CD_TIPOLOGICA_BADANTE) {
                array[i].push({
                    label: "Cognome",
                    value: getObjectValue(infoBen, 'cognomeBen.txVal', null),
                    required: true,
                    bold: true
                })  
            }
            array[i].push({
                label: "Sesso",
                value: getObjectValue(infoBen, 'sesso.tlValoreTestuale.' + locale, null),
                required: true
            })
            array[i].push({
                label: "Età",
                value: getObjectValue(infoBen, 'eta.nrVal', '0') + ' anni',
                required: true
            })

            isAltro= getObjectValue(infoBen, 'relazione.cdValAttributo', null) === 0;
            array[i].push({
                label: "Parentela",
                array: isAltro || getObjectValue(infoBen, 'relazione.tlValoreTestuale.' + locale, null) ?
                [
                    { 
                        other: isAltro, 
                        value: isAltro ? getObjectValue(infoBen, 'altroRelazione', null) : getObjectValue(infoBen, 'relazione.tlValoreTestuale.' + locale, null), 
                        error: !getObjectValue(infoBen, 'altroRelazione', null), 
                        label: "Altro", 
                        cdDominioTcb:  getObjectValue(infoBen, 'relazione.cdValAttributo', null)
                    }
                ]
                : [],
                required: true
            })
            if (servizioTCB.cd_dominio_tcb === 1) {
                const patologieBambino = getObjectValue(infoBen, 'patologieBambino', []);
                array[i].push({
                    label: "Patologie/disabilità",
                    array: functionSort(patologieBambino.map((pat, i) => {
                        return (
                            (getObjectValue(pat, 'cdValAttributo', null) === 0) ?
                                { other: true, value: getObjectValue(pat, 'txNota', ''), error: !getObjectValue(pat, 'txNota', false), label: "Altro", cdDominioTcb: pat.cdValAttributo } :
                                { value: getObjectValue(pat, 'tlValoreTestuale.' + locale, null) }
                        );
                    }), "cdDominioTcb"),
                    required: false
                })
                array[i].push({
                    label: "Lingue parlate",
                    array: functionSort( getObjectValue(infoBen, 'lingue', []).map((lang, i) => {
                        return (
                            (getObjectValue(lang, 'cdValAttributo', null) === 0) ?
                                { other: true, value: getObjectValue(lang, 'txNota', ''), error: !getObjectValue(lang, 'txNota', false), label: "Altro", cdDominioTcb: lang.cdValAttributo  } :
                                { value: getObjectValue(lang, 'tlValoreTestuale.' + locale, null) }
                        );
                    }),
                    "cdDominioTcb"),
                    required: true
                })
            }
            if (servizioTCB.cd_dominio_tcb === 3) {
                const patologieAnziano = getObjectValue(infoBen, 'patologieAnziano', []);
                array[i].push({
                    label: "Patologie/disabilità",
                    array: functionSort(patologieAnziano.map((pat, i) => {
                        return (
                            (getObjectValue(pat, 'cdValAttributo', null) === 0) ?
                                { other: true, value: getObjectValue(pat, 'txNota', ''), error: !getObjectValue(pat, 'txNota', false), label: "Altro", cdDominioTcb: pat.cdValAttributo } :
                                { value: getObjectValue(pat, 'tlValoreTestuale.' + locale, null) }
                        );
                    }), "cdDominioTcb"),
                    required: false
                })
                array[i].push({
                    label: "Stato di salute",
                    value: getObjectValue(infoBen, 'altreInfoPatologie.txVal', null),
                })

                isAltro= getObjectValue(infoBen, 'deambulazione.cdValAttributo', null) === 0;
                array[i].push({
                    label: "Autonomia",
                    array: isAltro || getObjectValue(infoBen, 'deambulazione.tlValoreTestuale.' + locale, null) ?
                    [
                        { 
                            other: isAltro, 
                            value: isAltro ? getObjectValue(infoBen, 'altroDeambulazione', null) : getObjectValue(infoBen, 'deambulazione.tlValoreTestuale.' + locale, null), 
                            error: !getObjectValue(infoBen, 'altroDeambulazione', false),
                            label: "Altro", 
                            cdDominioTcb: getObjectValue(infoBen, 'deambulazione.cdValAttributo', null) 
                        }
                    ]
                        : [],
                    required: true
                })
                array[i].push({
                    label: "Altezza",
                    value: getObjectValue(infoBen, 'altezza.tlValoreTestuale.' + locale, null),
                    required: true
                })
                array[i].push({
                    label: "Corporatura",
                    value: getObjectValue(infoBen, 'corporatura.tlValoreTestuale.' + locale, null),
                    required: true
                })
            }
            array[i].push({
                label: "Altre Informazioni",
                value: getObjectValue(infoBen, 'altreInfo.txVal', null),
                textarea: true
            })
        });
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
                <>
                    {array.map((ben, i) => (
                        ben.map((attr, j) => (
                            <FieldText
                                key={"ben_" + i + "_attr_" + j}
                                title={attr.label}
                                value={attr.value}
                                array={attr.array}
                                required={attr.required}
                                textarea={attr.textarea}
                                valueBold={attr.bold}
                            />
                        ))
                    ))}
                    {servizioTCB.cd_dominio_tcb === 1 &&
                        <>
                            <FieldCheck
                                title="Altri fratelli non da accudire presenti in casa"
                                checked={getObjectValue(data, 'altriFratelliFlag.flag', 0)}
                            />
                            <FieldCheck
                                title={"Nonni presenti in casa"}
                                checked={getObjectValue(data, 'nonniFlag.flag', 0)}
                            />
                        </>
                    }
                    <FieldCheck
                        title="Altre persone presenti in casa"
                        checked={getObjectValue(data, 'altriFlag.flag', 0)}
                        note={getObjectValue(data, 'altriFlag.txNota', null)}
                    />
                </>
            </Wrapper>
        </>
    )
}
Beneficiari.displayName = 'Beneficiari';

export default Beneficiari;