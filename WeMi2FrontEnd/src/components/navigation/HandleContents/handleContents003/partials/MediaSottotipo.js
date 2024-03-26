/** @format */

import React, { useEffect, useState } from 'react';
import { Row, Column } from 'components/ui/Grid';
import AnchorLink from 'components/ui/AnchorLink';
import Text from 'components/ui/Text';
import InputFile from 'components/ui/InputFile';
import FaIcon from 'components/ui/FaIcon';
import { DeleteMedia as DeleteMediaQ, EstraiContenutoCompleto } from '../ContenutoMediaPKGraphQL';
import { connect } from 'react-redux';
import { graphqlRequest } from 'redux-modules/actions/authActions';


const MediaSottotipo = ({ json,
    getMedia1,
    getMedia2, 
    getMedia3, 
    media1, 
    media2,
    media3,
    draft, valorilabel, sottotipo,
    initialSottotipo }) => {
    const [update1, setUpdate1] = useState(media1);
    const [update2, setUpdate2] = useState(media2);
    const [update3, setUpdate3] = useState(media3);

    useEffect(() => {
        if (media1 !== update1)
            setUpdate1(media1)
            if (media2 !== update2)
            setUpdate2(media2)
            if (media3 !== update3)
            setUpdate3(media1)
    }, [media1, media2, media3, sottotipo])

    return (
        <Column xs="12" md={json.ln_link_1 ? "12" : "5"} padding="0.5em 0 0">
            <Row fluid>
                <Text value={valorilabel.id_media12} size="f7" color="blue" weight="bold" />
            </Row>
            <Row justifycontent="space-between" fluid flex direction="column">
                    <Column xs="12" md="5" padding="1em 0">
                        <InputFile id={sottotipo.id === 2 ? draft && draft.media1 ? `${draft.media2.id_media}-1` :  'id_media1' :
                        sottotipo.id === 3 ? draft && draft.media2 ? 
                        `${draft.media2.id_media}-2`
                        : 'id_media2' : 'id_media3'}
                        onDone={getValue.bind(this)} icon width="auto" textColor="blue" value="Aggiungi file" type="primary" />
                        {media.length > 0 ?
                            media.map((file,index) => {
                                if( sottotipo.id === 2 && (
                                  (file.id === 'id_media1' && file.value.tymedia !== '-1' ) || 
                                    (draft &&  draft.media1 && draft.media1.id_media &&
                                    parseInt(draft.media1.id_media) === parseInt(file.id) && file.value.tymedia !== '-1' ))
                                    ||
                                    sottotipo.id === 3 &&
                                    (
                                       ( file.id === 'id_media2' && file.value.tymedia !== '-1' ) || 
                                        (draft &&  draft.media2 && draft.media2.id_media &&
                                        parseInt(draft.media2.id_media) === parseInt(file.id) && file.value.tymedia !== '-1' ))                                 
                                    )
                                return(
                            <Row fluid padding="0" key={index.toString()}>
                                <Text value={'Immagine caricata: '} size="f8" color="darkGrey" weight="bold" padding="0.5em 0.5em 0 0" />
                                <AnchorLink download={`${file.value.base64}`} downloadName={file.value.filename} >
                                    <Text value={file.value.filename} size="f8" color="blue" padding="0.5em 0.5em 0 0" />
                                </AnchorLink>
                                <FaIcon
                                    noShadow
                                    icon="\f1f8"
                                    fontSize="f6"
                                    onClick={() => {
                                        getValue.bind(this)
                                        getValue({
                                            filename: file,
                                            tymedia: 'reset'
                                        })
                                    }}
                                    pointer
                                    color="red"
                                    padding="0" />
                            </Row>)
                             })
                            :
                            draft && (
                            (draft.media1 && draft.media1.oj_media && sottotipo.id === 2 ) ||
                            (draft.media2 && draft.media2.oj_media && sottotipo.id === 3)                            
                            ) && !media.length > 0 ? 
                            <Row fluid padding="0">
                                <Text value={'Immagine attuale: '} size="f8" color="darkGrey" weight="bold" padding="0.5em 0.5em 0 0" />
                                <Row display="flex" justifycontent="space-between" alignitems="center">
                                    <AnchorLink download={draft.media1 && sottotipo.id === 2 ?  `${draft.media1.oj_media}` : 
                                    draft.media2 && sottotipo.id === 3 ? `${draft.media2.oj_media}` : null} 
                                    downloadName={draft.media1 && sottotipo.id === 2 ?  `${draft.media1.nm_nome_media}` : 
                                    draft.media2 && sottotipo.id === 3 ? `${draft.media2.nm_nome_media}` : ''}>
                                        <Text
                                            value={draft.media1&& sottotipo.id === 2 ?  `${draft.media1.nm_nome_media}` : 
                                            draft.media2 && sottotipo.id === 3 ? `${draft.media2.nm_nome_media}` : ''} size="f8"
                                            color={"blue"}
                                            padding="0" />
                                    </AnchorLink>
                                    <FaIcon
                                        noShadow
                                        icon="\f1f8"
                                        fontSize="f6"
                                        onClick={() => {
                                        getValue.bind(this)
                                            getValue({
                                                filename: draft.media1 ? draft.id_media2 : draft.media2 ? draft.id_media2 : null,
                                                tymedia: '-1'
                                            })
                                        }}
                                        pointer
                                        color="red"
                                        padding="0" />
                                </Row>
                            </Row>
                                : null}

                    </Column>


            </Row>
        </Column>
    )
};

MediaSottotipo.displayName = 'MediaSottotipo';
const mapDispatchToProps = ({ graphqlRequest })
export default connect(null, mapDispatchToProps)(MediaSottotipo);
