/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { resetField } from 'redux-modules/actions/authActions';
import { getObjectValue } from 'utils/extensions/objectExtensions';

import Text from 'components/ui/Text';
import Modal, { StyledHeader } from 'components/ui2/Modal';
import Loader from 'components/ui2/Loader';
import SchedaServizioEnte from 'components/navigation/ServizioOffertoEnte';

import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme';

const EntServiceModal = ({ open, setOpen, data, datiEnte, locale, loaded, resetField }) => {


    const txTitoloServizio = data ? data.EstraiDettaglioAmministrativoServizioEnte.service.txTitoloServizio[locale]:getObjectValue(datiEnte, 'EstraiDettaglioAmministrativoServizioEnte.service.txTitoloServizio.' + locale, ''),
        nm_ente = data? data.EstraiDettaglioAmministrativoServizioEnte.ente.nm_ente:getObjectValue(datiEnte, 'EstraiDettaglioAmministrativoServizioEnte.ente.nm_ente', '');

    const Header = (props) =>
        (
            <StyledHeader
                mobileFullScreen="true">
                <Text
                    tag="h2"
                    value={txTitoloServizio}
                    size={"f4"}
                    weight="bold"
                    color="black"
                />
                <div>
                    <Text
                        tag="span"
                        value={nm_ente}
                        size={"f7"}
                        weight="bold"
                        transform="uppercase"
                        letterSpacing="0.05em"
                    />

                </div>
            </StyledHeader>
        );

    return (
        <Modal
            customModal={true}
            header={Header}
            open={open}
            loading={loaded !== 2}
            setOpenModal={(e) => {
                setOpen.bind(this);
                setOpen();
                resetField("EstraiDettaglioAmministrativoServizioEnte");
            }}
            color="primary"
            width="90%"
            mobileFullScreen="true" >

            {data ? <SchedaServizioEnte servizioErogato={data} locale={locale} /> :
                datiEnte ? <SchedaServizioEnte servizioErogato={datiEnte} locale={locale} /> :
                    <Loader margin="6em auto" /> }
        </Modal>
    )
};

const mapDispatchToProps = {
    resetField,
};

const mapStoreToProps = store => ({
    datiEnte: store.graphql.EstraiDettaglioAmministrativoServizioEnte,
    locale: store.locale,
    loaded: store.graphql.loaded,
});
export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(EntServiceModal);
