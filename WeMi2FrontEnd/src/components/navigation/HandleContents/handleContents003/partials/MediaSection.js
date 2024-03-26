/** @format */

import React, { useEffect, useState } from 'react';
import { Row, Column } from 'components/ui/Grid';
import AnchorLink from 'components/ui/AnchorLink';
import Text from 'components/ui/Text';
import InputFile from 'components/ui/InputFile';
import FaIcon from 'components/ui/FaIcon';
import { connect } from 'react-redux';
import { graphqlRequest } from 'redux-modules/actions/authActions';


const MediaSection = ({ json,
    getMedia1,
    getMedia2,
    getMedia3,
    media1,
    media2,
    media3,
    draft, valorilabel, sottotipo,
    }) => {
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
                {json.id_media1 && (!json.ty_sotto_tipo_Contenuto || typeof json.id_media1 === 'number' || sottotipo.id === 2) &&
                    <Column xs="12" md="5" padding="1em 0">
                        <InputFile
                            id={draft && draft.media1 && draft.media1.id_media ?
                                draft.media1.id_media : 'id_media1'}
                            onDone={getMedia1.bind(this)} icon width="auto" textColor="blue" value="Aggiungi file" type="primary" />
                        {(!media1 || (media1 && media1.value && media1.value.tymedia === 'reset' && media1.value.tymedia === 'reset'))  &&
                            draft && draft.media1 && draft.media1.oj_media ?
                            <Row fluid padding="0" margin=".5em 0">
                                <Text value={'Attualmente online: '} size="f8" color="darkGrey"
                                    weight="bold" padding="0.5em 0.5em 0 0" />
                           <Row display="flex" justifycontent="space-between" alignitems="center">
                                    <AnchorLink download={`${draft.media1.oj_media}`} downloadName={draft.media1.nm_nome_media} >
                                        <Text
                                            value={draft.media1.nm_nome_media} size="f8"
                                            color={"blue"}
                                            padding="0" />
                                    </AnchorLink>
                                    <FaIcon
                                        noShadow
                                        icon="\f1f8"
                                        fontSize="f6"
                                        onClick={() => {
                                            getMedia1({
                                                filename: draft.id_media1,
                                                tymedia: '-1'
                                            })
                                        }}
                                        pointer
                                        color="red"
                                        padding="0" />
                                </Row>
                            </Row> : null}
                        {media1 && media1.value && media1.value.tymedia !== 'reset' && media1.value.tymedia !== '-1' ?
                            <Row fluid padding="0" margin="0 0 .5em">
                                <Text value={'File caricato: '}
                                    size="f8" color="darkGrey" weight="bold" padding="0.5em 0.5em 0 0" />
                                <AnchorLink download={`${media1.value.base64}`} downloadName={media1.value.filename} >
                                    <Text value={media1.value.filename} size="f8" color="blue" padding="0.5em 0.5em 0 0" />
                                </AnchorLink>
                                <FaIcon
                                    noShadow
                                    icon="\f1f8"
                                    fontSize="f6"
                                    onClick={() => {
                                        getMedia1({
                                            filename: draft && draft.id_media1 ? draft.id_media1 : '',
                                            tymedia: 'reset'
                                        })
                                        setUpdate1(false)
                                    }}
                                    pointer
                                    color="red"
                                    padding="0" />
                            </Row>

                            : null}
                    </Column>
                }

                {json.id_media2 && (!json.ty_sotto_tipo_Contenuto || sottotipo.id === 3) &&
                    <Column xs="12" md="5" padding="1em 0">
                        <InputFile
                            id={draft && draft.media2 && draft.media2.id_media ?
                                draft.media2.id_media : 'id_media2'}
                            onDone={getMedia2.bind(this)} icon width="auto" textColor="blue" value="Aggiungi file" type="primary" />
                        {((media2 && media2.value && media2.value.tymedia === 'reset') || !media2) &&
                            draft && draft.media2 && draft.media2.oj_media ?
                            <Row fluid padding="0" margin=".5em 0">
                                <Text value={'Attualmente online: '} size="f8" color="darkGrey"
                                    weight="bold" padding="0.5em 0.5em 0 0" />
                           <Row display="flex" justifycontent="space-between" alignitems="center">
                                    <AnchorLink download={`${draft.media2.oj_media}`} downloadName={draft.media2.nm_nome_media} >
                                        <Text
                                            value={draft.media2.nm_nome_media} size="f8"
                                            color={"blue"}
                                            padding="0" />
                                    </AnchorLink>
                                    <FaIcon
                                        noShadow
                                        icon="\f1f8"
                                        fontSize="f6"
                                        onClick={() => {
                                            getMedia2({
                                                filename: draft.id_media2,
                                                tymedia: '-1'
                                            })
                                        }}
                                        pointer
                                        color="red"
                                        padding="0" />
                                </Row>
                            </Row> : null}
                        {media2 && media2.value && media2.value.tymedia !== 'reset' && media2.value.tymedia !== '-1' ?
                            <Row fluid padding="0" margin="0 0 .5em">

                                <Text value={'File caricato: '}
                                    size="f8" color="darkGrey" weight="bold" padding="0.5em 0.5em 0 0" />

                                <AnchorLink download={`${media2.value.base64}`} downloadName={media2.value.filename} >
                                    <Text value={media2.value.filename} size="f8" color="blue" padding="0.5em 0.5em 0 0" />
                                </AnchorLink>
                                <FaIcon
                                        noShadow
                                        icon="\f1f8"
                                        fontSize="f6"
                                        onClick={() => {
                                            getMedia2({
                                                filename: draft && draft.id_media2 ? draft.id_media2: '',
                                                tymedia: 'reset'

                                            })
                                        setUpdate2(false)
                                        }}
                                        pointer
                                        color="red"
                                        padding="0" />
                            </Row>

                            : null}
                    </Column>
                }
            </Row>
        </Column>
    )
};

MediaSection.displayName = 'MediaSection';
const mapDispatchToProps = ({ graphqlRequest })
export default connect(null, mapDispatchToProps)(MediaSection);
