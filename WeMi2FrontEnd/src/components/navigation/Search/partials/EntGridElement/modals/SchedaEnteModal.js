/** @format */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { resetField } from 'redux-modules/actions/authActions';
import { getObjectValue } from 'utils/extensions/objectExtensions';

import Text from 'components/ui/Text';
import Modal, { StyledHeader } from 'components/ui2/Modal';
import SchedaEnte from 'components/navigation/SchedaEnte';
import Loader from 'components/ui2/Loader';
import { Row, Column } from 'components/ui/Grid';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme';
import FaIcon from 'components/ui2/FaIcon';
import { EstraiAllegatiEnte } from './ModaleSchedaGraphql';
import withRouter from 'react-router-dom/withRouter';
import { Link } from 'react-router-dom';
import { NavLink } from 'components/router';
import AnchorLink from 'components/ui/AnchorLink';

const StyledRow = styled(Row)`
  img {
      display: inline-block;
      height: 7em;
      width: auto;
      margin-right: 1.5em;
  }
  h2 {
    display: inline-block;
  }
`;

const ShedaEnteModal = ({ open, setOpen, ente, locale, loaded, resetField, history }) => {

    const id_ente = ente && ente.entePK && ente.entePK.id_ente

    

    const [EstraiAllegati, setEstrai] = useGraphQLRequest(
        undefined,
        EstraiAllegatiEnte,
        { id_ente: id_ente },
        false,
        response => response.EstraiAllegatiEnte
    );


    const oj_media = getObjectValue(ente, 'entePK.datiEnte.media.oj_media', ''),
        nm_ente = getObjectValue(ente, 'entePK.nm_ente', ''),
        txTelefono = getObjectValue(ente, 'entePK.datiEnte.js_referente.txTelefono', ''),
        sedeEnte = getObjectValue(ente, 'entePK.datiEnte.sedeEnte', []),
        txWeb = getObjectValue(ente, 'entePK.datiEnte.js_altre_info.txWeb', ''),
        txFacebook = getObjectValue(ente, 'entePK.datiEnte.js_altre_info.txFacebook', ''),
        txInstagram = getObjectValue(ente, 'entePK.datiEnte.js_altre_info.txInstagram', ''),
        txTwitter = getObjectValue(ente, 'entePK.datiEnte.js_altre_info.txTwitter', ''),



        //viene presa la prima posizione (nell'indirizzo) perchè c'è un ordinamento che mette per primo la sede principale
        indirizzo = sedeEnte.length ?
            getObjectValue(sedeEnte[0], 'js_sede.indirizzo.txIndirizzo', '') + ' – ' + // js_sede.indirizzo.indirizzo
            getObjectValue(sedeEnte[0], 'js_sede.indirizzo.txCitta', '') : ''; // js_sede.indirizzo.citta

    const Header = (props) =>
        (
            <StyledHeader mobileFullScreen="true">
                <StyledRow justifycontent="space-between" alignitems="center">
                    <Column md="7" lg="8" padding="0">
                        <img src={oj_media} alt="Logo Ente" />
                        <Text
                            tag="h2"
                            value={nm_ente}
                            size={"f4"}
                            weight="bold"
                            color="black"
                        />
                    </Column>
                    <Column md="5" lg="4" padding="1em 0 0 0" sizepadding={{ md: "0 0 0 3em" }}>
                        <Text
                            tag="span"
                            value={indirizzo}
                            size={"f6"}
                            weight="bold"
                            color="black"
                        />
                        <br />
                        <Text
                            tag="span"
                            value="TEL."
                            size={"f6"}
                            weight="normal"
                            color="black"
                        />
                        <Text
                            tag="span"
                            value={txTelefono}
                            size={"f6"}
                            weight="bold"
                            color="black"
                        />
                        <br />
                        <Text
                            tag="span"
                            value={txWeb}
                            size={"f6"}
                            weight="bold"
                            color="black"
                        />
                        <br />
                        <Row fluid>
                            {txFacebook && txFacebook.length > 0 ?
                                <AnchorLink to={txFacebook} role="menuitem" _blank align="left">
                                    <FaIcon
                                        fontSize="f4"
                                        icon={"facebook"}
                                        iconStyle="fab"
                                        padding="0.3em 0.5em 0 0"
                                    />
                                </AnchorLink>
                                : null}
                            {txInstagram && txInstagram.length > 0 ?
                                <AnchorLink to={txInstagram} role="menuitem" _blank align="left">
                                    <FaIcon
                                        fontSize="f4"
                                        icon={"instagram"}
                                        iconStyle="fab"
                                        padding="0.3em 0.5em 0 0"
                                    />
                                </AnchorLink>
                                : null}
                            {txTwitter && txTwitter.length > 0 ?
                                <AnchorLink to={txTwitter} role="menuitem" _blank align="left">
                                    <FaIcon
                                        fontSize="f4"
                                        icon={"twitter"}
                                        iconStyle="fab"
                                        padding="0.3em 0.5em 0 0"
                                    />
                                </AnchorLink>
                                : null}
                        </Row>
                    </Column>
                </StyledRow>
            </StyledHeader>
        );


    useEffect(() => {
        if (id_ente) {
            setEstrai()
        }
    }, [id_ente]);

    return (
        <Modal
            customModal={true}
            header={Header}
            open={open}
            loading={loaded !== 2}
            setOpenModal={(e) => {
                setOpen.bind(this);
                setOpen();
                resetField("entePK");
            }}
            color="primary"
            width="90%"
            mobileFullScreen="true" >

            {ente && EstraiAllegati && EstraiAllegati.data ? <SchedaEnte ente={ente.entePK} locale={locale} estraiAllegati={EstraiAllegati.data} /> : <Loader margin="6em auto" />}

        </Modal>
    )
};

const mapDispatchToProps = {
    resetField,
};

const mapStoreToProps = store => ({
    ente: store.graphql.entePK,
    locale: store.locale,
    loaded: store.graphql.loaded,
});
export default withRouter(connect(
    mapStoreToProps,
    mapDispatchToProps
)(ShedaEnteModal));
