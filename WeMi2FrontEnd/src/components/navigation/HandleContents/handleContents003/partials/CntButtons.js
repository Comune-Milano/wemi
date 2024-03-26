/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { Row, Column } from 'components/ui/Grid';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import {
    contenutoMediaADD as contenutoMediaADDM,
    modificaContenuto as modificaContenutoM,
    estraiVociMenu as estraiVociMenuQ,
    getFooterLinks,
    EstraiContenutoCompleto
} from '../ContenutoMediaPKGraphQL';
import Button from 'components/ui/Button';
import { isNullOrUndefined } from 'util';
import { convertToRaw } from 'draft-js';
import withAuthentication from 'hoc/withAuthentication';
import { withRouter, generatePath } from 'react-router';
import { convertObjectToIntervals } from "components/ui2/WeekCalendarTimePicker/utils/converter";
import { PAGE_ADMIN_CNT_02_URL } from 'types/url';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import {
    CATEGORIE_LIVELLO_2,
    TESTIMONIALS_SCHEDA_SINGOLA,
    HERO_SLIDER
} from 'types/contenuti/typeContenuto';

const CntButtons = ({
    addressState,
    history,
    municipalityState,
    graphqlRequest,
    json,
    locale,
    TYcont,
    IDcont,
    draft,
    media1,
    media2,
    media3,
    allegatoPdf,
    contAss,
    sottotipo,
    isSottotipo,
    orderNm,
    inizioVal,
    valoriTestuali,
    links,
    datiContenuto,
    tagsRicerca,
    unitaPrezzo,
    categoriaLiv2,
    destinatariLiv1,
    mansioni,
    categoriaAccreditamento,
    disponibilita,
    telefono,
    descrizione,
    textEditorState,
    userProfile,
    bodyHtml1EditorState,
    bodyHtml2EditorState,
    match,
}) => {
    const [modificaContenutoState, modificaContenuto] = useGraphQLRequest(
        undefined,
        modificaContenutoM
    );

    const aggiungiContenuto = useStatelessGraphQLRequest(contenutoMediaADDM);


    let associati = [];

    const findAssociati = () => {
        associati = contAss.map(el => {
            if (el.id !== null)
                return ({
                    id: el.id,
                    nmRelazione: json.CONTENUTO_ASSOCIATO.nmRelazione
                })
        })
        return associati
    }

    const getDenominazione = () =>{
        const denominazione = getObjectValue(addressState, "denominazione", "");

        const lastCharacter = denominazione[denominazione.length-1];
        
        if(lastCharacter === ','){
            return denominazione.split(',')[0];
        }

        return denominazione;

    };

    const getCivico = () =>{
        const civico = getObjectValue(addressState, "civico", "");

        const firstCharacter = civico[0];
        
        if(firstCharacter === ','){
            return civico.split(',')[1];
        }

        return civico;
    };

    const JsonDisponibilita = () => {
        if (TYcont === 7) {
            return {
                'calendario': convertObjectToIntervals(disponibilita),
                'Telefono': telefono ? telefono : '',
                'Descrizione': descrizione ? descrizione : '',
                'Municipio': municipalityState? municipalityState : '',
                'Specie': getObjectValue(addressState, "specie", ""),
                'Denominazione': getDenominazione(),
                'Civico': getCivico(),
                ...(bodyHtml1EditorState ? { bodyHtml1EditorContent: convertToRaw(bodyHtml1EditorState.getCurrentContent()) } : {}),
                ...(bodyHtml2EditorState ? { bodyHtml2EditorContent: convertToRaw(bodyHtml2EditorState.getCurrentContent()) } : {}),
            }
        }
        else {
            return {
                ...datiContenuto,
                ...(textEditorState ? { textEditorContent: convertToRaw(textEditorState.getCurrentContent()) } : {})
            }
        }
    }

    return (
        <Row fluid justifycontent="space-between" margin="1em 0">



            {draft ? <>
                <Column xs="5" md="2" padding="0.5em 0 0">
                        <Button type="cancel" onClick={() => {
                                   const { datiLogin: { idCittadino } } = userProfile;

                                   const adminCnt2Path = generatePath(PAGE_ADMIN_CNT_02_URL,
                                       {
                                           idOp: idCittadino,
                                           tyCnt: TYcont,
                                       }
                                   );
                                   history.push(adminCnt2Path);
                               }
                            } value="Annulla" />
                </Column>
                <Column xs="5" md="2" padding="0.5em 0 0">

                        <Button type="primary" value="Aggiorna"
                            onClick={
                                async () => {
                                    const txTesto1 = valoriTestuali.tl_testo_1 || null;
                                    const txTesto2 = valoriTestuali.tl_testo_2 || null;
                                    const txTesto3 = valoriTestuali.tl_testo_3 || null;
                                    const txTesto4 = valoriTestuali.tl_testo_4 || null;
                                    const txTesto5 = valoriTestuali.tl_testo_5 || null;

                                    const subtypeContenuto = isSottotipo ? sottotipo.id : false;
                                    const link1 = isNullOrUndefined(links[0] || (links[0] && !links[0].value)) ? "" : (links[0].value || "");
                                    const link2 = isNullOrUndefined(links[1] || (links[1] && !links[1].value)) ? "" : (links[1].value || "");

                                    const { datiLogin: { idCittadino } } = userProfile;

                                    const assoc = contAss && findAssociati() ? associati : false;
                                    const associatiCatLiv2 = categoriaLiv2 || false;
                                    const associatiDestinatari = destinatariLiv1 || false;
                                    const associatiMansioni = mansioni || false;
                                    const disponibilita = disponibilita || telefono || descrizione || datiContenuto || textEditorState || municipalityState || addressState ? JsonDisponibilita() : false;

                                    const media1Var = json && json.id_media1 && media1 ? {
                                        id_media: media1.id ? Number.parseInt(media1.id, 10) : '',
                                        ty_mime_type_media: media1.value ? media1.value.tymedia : '',
                                        nm_nome_media: media1.value ? media1.value.filename : '',
                                        oj_media: media1.value ? media1.value.base64 : '',
                                    } : false;
                                    const media2Var = json && json.id_media2 && media2 ? {
                                        id_media: media2.id ? Number.parseInt(media2.id, 10) : -1,
                                        ty_mime_type_media: media2.value ? media2.value.tymedia : '',
                                        nm_nome_media: media2.value ? media2.value.filename : '',
                                        oj_media: media2.value ? media2.value.base64 : '',
                                    } : false;
                                    const media3Var = json && json.id_media3 && media3 ? {
                                        id_media: typeof media3.id === 'Int' ? media3.id : -1,
                                        ty_mime_type_media: media3.value ? media3.value.tymedia : '',
                                        nm_nome_media: media3.value ? media3.value.filename : '',
                                        oj_media: media3.value ? media3.value.base64 : '',
                                    } : false;
                                    const allegatoVar = allegatoPdf ? {
                                        ty_mime_type_media: allegatoPdf.ty_mime_type_media,
                                        nm_nome_media: allegatoPdf.nm_nome_media,
                                        oj_media: allegatoPdf.oj_media,
                                        id_media: allegatoPdf.id_media
                                    } : null;

                                    const media3ComputedVar = media3Var || allegatoVar;
                                    
                                    const civico = getObjectValue(addressState, "civico", "");
                                    const denominazione = getObjectValue(addressState, "denominazione", "");
                                    const specie = getObjectValue(addressState, "specie", "");

                                    const stringTx3 = 
                                    civico && denominazione && specie?
                                     { [locale]: `${specie} ${denominazione}, ${civico}`} : { [locale]: "" };

                                    const tlTesto3 = TYcont === 7? stringTx3 : txTesto3;

                                    const modificaContenutoVariables = {
                                        idContenuto: IDcont,
                                        idUtente: idCittadino,
                                        ordineVisualizzazione: parseInt(orderNm, 10),
                                        validitaAl: '9999-12-31',
                                        statoContenuto: 2,
                                        ...(subtypeContenuto ? { subtypeContenuto } : {}),
                                        ...(link1 ? { link1 } : {}),
                                        ...(link2 ? { link2 } : {}),
                                        ...(txTesto1 ? { txTesto1 } : {}),
                                        ...(txTesto2 ? { txTesto2 } : {}),
                                        ...(tlTesto3 ? { txTesto3: tlTesto3 } : {}),
                                        ...(txTesto4 ? { txTesto4 } : {}),
                                        ...(txTesto5 ? { txTesto5 } : {}),
                                        ...(media1 ? { media1: media1Var } : {}),
                                        ...(media2 ? { media2: media2Var } : {}),
                                        ...(media3ComputedVar ? { media3: { ...media3ComputedVar } } : null),
                                        ...(disponibilita ? { js_dati_contenuto: disponibilita } : {}),
                                        ...(tagsRicerca ? { txTagsRicerca: tagsRicerca } : {}),
                                        ...(assoc ? { associati: assoc } : {}),
                                        ...(unitaPrezzo ? { unitaPrezzo } : {}),
                                        ...(categoriaAccreditamento ? { categoriaAccreditamento } : {}),
                                        ...(associatiCatLiv2 ? { associatiCatLiv2: categoriaLiv2.map(el => el.id) } : {}),
                                        ...(associatiDestinatari ? { associatiDestinatari: associatiDestinatari.map(el => el.id) } : {}),
                                        ...(associatiMansioni ? { associatiMansioni: mansioni.map(el => el.id) } : {}),
                                    };
                                    await modificaContenuto({ input: modificaContenutoVariables });
                                    graphqlRequest(EstraiContenutoCompleto(parseInt(match.params.idCnt, 10)))

                                    if (TYcont === 1 || TYcont === 2)
                                        graphqlRequest(estraiVociMenuQ())
                                    if (TYcont === 10 || TYcont === 11)
                                        graphqlRequest(getFooterLinks())

                                    const adminCnt2Path = generatePath(PAGE_ADMIN_CNT_02_URL, 
                                        { 
                                            idOp: idCittadino,
                                            tyCnt: TYcont,
                                        }
                                    );
                                    history.push(adminCnt2Path);
                                }
                            } />
                </Column>
            </>
                : <>
                    <Column xs="5" md="2" padding="0.5em 0 0">
                            <Button type="cancel" onClick={() => {
                                   const { datiLogin: { idCittadino } } = userProfile;

                                   const adminCnt2Path = generatePath(PAGE_ADMIN_CNT_02_URL,
                                       {
                                           idOp: idCittadino,
                                           tyCnt: TYcont,
                                       }
                                   );
                                   history.push(adminCnt2Path);
                               }
                            } value="Annulla" />
                    </Column>
                    <Column xs="5" md="2" padding="0.5em 0 0">
                        {(TYcont && TYcont === 7 && orderNm && valoriTestuali && valoriTestuali.tl_testo_1 && valoriTestuali.tl_testo_1.it !== '' && municipalityState 
                        && addressState["denominazione"] && addressState["civico"] && addressState["specie"]
                        )  ||
                        (TYcont && (TYcont !== 6 && TYcont !== 7) && orderNm && valoriTestuali && valoriTestuali.tl_testo_1 && valoriTestuali.tl_testo_1.it !== '') ||
                            (isSottotipo && TYcont && orderNm && TYcont !== 6 && valoriTestuali && valoriTestuali.tl_testo_1 && valoriTestuali.tl_testo_1.it !== '') ||
                            (TYcont && TYcont === 6 && orderNm && valoriTestuali.tl_testo_1 && valoriTestuali.tl_testo_1.it !== '' && categoriaAccreditamento !== 0 && unitaPrezzo !== 0)
                            ?

                                <Button type="primary" value="Aggiungi"
                                    onClick={
                                        async () => {
                                            const tlTesto1Var = valoriTestuali.tl_testo_1 || null;
                                            const tlTesto2Var = valoriTestuali.tl_testo_2 || null;
                                            const tlTesto3Var = valoriTestuali.tl_testo_3 || null;
                                            const tlTesto4Var = valoriTestuali.tl_testo_4 || null;
                                            const tlTesto5Var = valoriTestuali.tl_testo_5 || null;

                                            const disponibilitaVar = disponibilita || telefono || descrizione || datiContenuto || textEditorState || municipalityState ? JsonDisponibilita() : null;
                                            const associatiCatLiv2Var = categoriaLiv2 ? (categoriaLiv2 || []).map(el => el.id) : null;
                                            const associatiDestinatariVar = destinatariLiv1 ? (destinatariLiv1 || []).map(el => el.id) : null;
                                            const associatiMansioniVar = mansioni ? (mansioni || []).map(el => el.id) : null;
                                            const associatiVar = contAss && findAssociati() ? associati : null;

                                            const media1Var = media1 && media1.id == 'id_media1' ? {
                                                ty_mime_type_media: media1.value.tymedia,
                                                nm_nome_media: media1.value.filename,
                                                oj_media: media1.value.base64,
                                            } : null;
                                            const media2Var = media2 && media2.id == 'id_media2' ? {
                                                ty_mime_type_media: media2.value.tymedia,
                                                nm_nome_media: media2.value.filename,
                                                oj_media: media2.value.base64
                                            } : null;
                                            const media3Var = media3 && media3.id == 'id_media3' ? {
                                                ty_mime_type_media: media3.value.tymedia,
                                                nm_nome_media: media3.value.filename,
                                                oj_media: media3.value.base64
                                            } : null;

                                            const allegatoVar = allegatoPdf ? {
                                                ty_mime_type_media: allegatoPdf.ty_mime_type_media,
                                                nm_nome_media: allegatoPdf.nm_nome_media,
                                                oj_media: allegatoPdf.oj_media,
                                                id_media: allegatoPdf.id_media
                                            } : null;

                                            const media3ComputedVar = media3Var || allegatoVar;


                                            const civico = getObjectValue(addressState, "civico", "");
                                            const denominazione = getObjectValue(addressState, "denominazione", "");
                                            const specie = getObjectValue(addressState, "specie", "");

                                            const stringTx3 =
                                                civico && denominazione && specie ?
                                                    { [locale]: `${specie} ${denominazione}, ${civico}` } : { [locale]: "" };

                                            const tlTesto3 = TYcont === 7 ? stringTx3 : tlTesto3Var;

                                            const addContenutoVariables = {
                                                ty_contenuto: TYcont,
                                                ty_sottotipo_contenuto: isSottotipo ? sottotipo.id : null,
                                                nr_ordine_visualizzazione: parseInt(orderNm, 10),
                                                dt_fine_val: '9999-12-31',
                                                cd_stato_contenuto: 2,
                                                ln_link_1: links[0] ? links[0].value : '',
                                                ln_link_2: links[1] ? links[1].value : '',
                                                ...(tlTesto1Var ? { tl_testo_1: tlTesto1Var } : {}),
                                                ...(tlTesto2Var ? { tl_testo_2: tlTesto2Var } : {}),
                                                ...(tlTesto3Var ? { tl_testo_3: tlTesto3 } : {}),
                                                ...(tlTesto4Var ? { tl_testo_4: tlTesto4Var } : {}),
                                                ...(tlTesto5Var ? { tl_testo_5: tlTesto5Var } : {}),
                                                ...(tagsRicerca ? { txTagsRicerca: tagsRicerca } : {}),
                                                ...(unitaPrezzo ? { unitaPrezzo } : {}),
                                                ...(categoriaAccreditamento ? { categoriaAccreditamento } : {}),
                                                ...(disponibilitaVar ? { js_dati_contenuto: disponibilitaVar } : {}),
                                                ...(associatiCatLiv2Var ? { associatiCatLiv2: associatiCatLiv2Var } : {}),
                                                ...(associatiDestinatariVar ? { associatiDestinatari: associatiDestinatariVar } : {}),
                                                ...(associatiMansioniVar ? { associatiMansioni: associatiMansioniVar } : {}),
                                                ...(associatiVar ? { associati: associatiVar } : {}),
                                                ...(media1Var ? {
                                                    ty_mime_type_media1: media1Var.ty_mime_type_media,
                                                    oj_media1: media1Var.oj_media,
                                                    nm_nome_media1: media1Var.nm_nome_media,
                                                } : null),
                                                ...(media2Var ? {
                                                    ty_mime_type_media2: media2Var.ty_mime_type_media,
                                                    oj_media2: media2Var.oj_media,
                                                    nm_nome_media2: media2Var.nm_nome_media,
                                                } : null),
                                                ...(media3ComputedVar ? {
                                                    ty_mime_type_media3: media3ComputedVar.ty_mime_type_media,
                                                    oj_media3: media3ComputedVar.oj_media,
                                                    nm_nome_media3: media3ComputedVar.nm_nome_media,
                                                } : null),
                                            };
                                            await aggiungiContenuto({ input: addContenutoVariables });

                                            const { datiLogin: { idCittadino } } = userProfile;

                                            const adminCnt2Path = generatePath(PAGE_ADMIN_CNT_02_URL,
                                                {
                                                    idOp: idCittadino,
                                                    tyCnt: TYcont,
                                                }
                                            );
                                            history.push(adminCnt2Path);
                                        }
                                    }
                                />
                            :
                            <Button disabled type="disabled" value="Aggiungi" width="100%" />

                        }

                    </Column>
                </>}
        </Row>
    )
};

CntButtons.displayName = 'CntButtons';
const mapDispatchToProps = {
    graphqlRequest,
};


export default connect(null, mapDispatchToProps)(
    withAuthentication(
        withRouter(CntButtons)
    )
);