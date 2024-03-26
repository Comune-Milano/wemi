/** @format */

import React, { useState } from 'react';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import { getTCBServiceName } from '../utils';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import { cdAttributo } from './../CodiciAttributi';
import { isNumber } from 'utils/functions/typeCheckers';

const Left = ({
    servizioTCB,
    locale,
    attributes,
    onPrint,
    datiPrezzo
}) => {

    const labelTipologiaAssunzione = attributes?.tipologiaAssunzione?.label;
    let paga;

    if (datiPrezzo.disponibilita) {
        //cerco la retribuzione inserita dall'utente
        const index = datiPrezzo.disponibilita.findIndex(ele => {
            return [cdAttributo.IM_STIPENDIO_A_CONVIVENZA_RIDOTTA, cdAttributo.IM_STIPENDIO_ASSISTENZA_NOTTURNA, cdAttributo.IM_STIPENDIO_CONVIVENTE, cdAttributo.IM_STIPENDIO_NON_CONVIVENTE, cdAttributo.IM_STIPENDIO_PRESENZA_NOTTURNA, cdAttributo.IM_STIPENDIO_WEEKEND].indexOf(ele.cd_attributo) > -1;
        })

        paga = index > -1 && datiPrezzo.disponibilita[index].dc_val;
    }

    return (
        <>
            <Text
                className="noPrint"
                tag="h2"
                weight="bold"
                size="f4"
                value='Riepilogo'
            />
            <p style={{ margin: '2em 0 0 0' }}>
                <Text
                    tag='span'
                    size="f7"
                    value='Per il servizio '
                />
                <Text
                    weight='bold'
                    size="f7"
                    tag='span'
                    value={`${getTCBServiceName(servizioTCB, locale)}`.toUpperCase() === "TATA" ? "BABY-SITTER" : `${getTCBServiceName(servizioTCB, locale)}`.toUpperCase()}
                    transform="uppercase"
                    letterSpacing="0.05em"
                />
            </p>
            <p>
                <Text
                    size="f7"
                    value='nella modalità '
                />
                <Text
                    weight='bold'
                    size="f7"
                    value={labelTipologiaAssunzione}
                    transform="uppercase"
                    letterSpacing="0.05em"
                />
            </p>
            {isNumber(paga) ?
                <p style={{ margin: '2em 0 0 0' }}>
                    <Text
                        tag="small"
                        value="paga proposta"
                        size="f7"
                        color="darkGrey"
                    />
                    <br />

                    <Text
                        value={moneyFormat(paga, true)}
                        transform="uppercase"
                        letterSpacing="0.05em"
                        tag="span"
                        size="f4"
                        color="black"
                        weight="bold"
                    />
                    <Text
                        value={attributes && ((attributes.orario.id === 3 || attributes.orario.id === 5) ? "/ora" : "/mese")}
                        transform="uppercase"
                        letterSpacing="0.05em"
                        tag="small"
                        size="f7"
                        color="black"
                        weight="bold"
                    />
                </p>
                : null
            }
            <div className="noPrint" style={{ width: "100%", margin: '4em 0 0 0' }}>
                <Button
                    label='Stampa'
                    color="primary"
                    onClick={onPrint}
                />
            </div>
        </>
    );
};

Left.displayName = 'Left';

export default Left;
