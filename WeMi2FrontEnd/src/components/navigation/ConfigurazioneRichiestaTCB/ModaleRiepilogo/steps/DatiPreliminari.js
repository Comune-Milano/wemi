import React, { useState } from 'react';
import Wrapper from './../partials/Wrapper';
import SectionTitle from './../partials/SectionTitle';
import FieldText from './../partials/FieldText';
import { getTCBServiceName } from '../../utils';
import { cdAttributo } from './../../CodiciAttributi';


const DatiPreliminari = ({
    title,
    servizioTCB,
    locale,
    loading,
    errored,
    data,
    livelliContrattuali
}) => {

    const labelOrario = !loading && data.orario && data.orario.label;
    const labelContratto = !loading && livelliContrattuali && livelliContrattuali.find(el => el.LivelloContrattuale.cdLivelloContrattuale === data.contratto.id) ?
        'Livello ' + livelliContrattuali.find(el => el.LivelloContrattuale.cdLivelloContrattuale === data.contratto.id).cd_categoria_contrattuale
        : null;

    return (
        <>
            <SectionTitle
                title={title}
                marginTop="0"
            />
            <Wrapper
                loading={loading}
                errored={errored}
            >
                <FieldText
                    title="Servizio"
                    value={`${getTCBServiceName(servizioTCB, locale)}`.toUpperCase() === "TATA" ? "BABY-SITTER" : `${getTCBServiceName(servizioTCB, locale)}`.toUpperCase()}
                    required
                />
                <FieldText
                    title="Orario di Lavoro"
                    value={labelOrario}
                    required
                />
                <FieldText
                    title="Qualifiche"
                    value={labelContratto}
                    required
                />
            </Wrapper>
        </>
    )
}
DatiPreliminari.displayName = 'DatiPreliminari';

export default DatiPreliminari;