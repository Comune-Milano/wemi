/** @format */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from 'components/ui/Loader';
import {
    Wrapper,
    Sottotipo,
    ValoriTestuali,
    LinkSection,
    MediaSection,
    ContenutoAssociato,
    OrderNm,
    DatiContenutoSection,
    CntButtons
} from './partials';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import Cont004 from '../handleContents004';
import { fileToBase64 } from 'utils/functions/fileToBase64';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { EditorState, convertFromRaw } from 'draft-js';
import { convertBinToObject } from "components/ui2/WeekCalendarTimePicker/utils/converter";
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { getMunicipi as getMunicipiQ } from "./ContenutoMediaPKGraphQL";

const HandleContents003 = ({
    TYcont,
    IDcont,
    loaded,
    Dati,
    contenutoAssociatoByTy,
    EstraiListaCategorieAccreditamento,
    EstraiContenutoCompleto,
    EstraiUnitaPrezzo,
    inizioVal,
    initialValue,
    locale,
    max,
}) => {
    const [municipi] = useGraphQLRequest(
        [],
        getMunicipiQ,
        {

        },
        true,
        response => {
            return response.map(item => ({
                id: item.idMunicipio,
                value: item.nmMunicipio.it,
            }));
        }
    );
    
    const [update, setUpdate] = useState(false);
    const [orderNm, setOrderNm] = useState(0);
    const [valoriTestuali, setValoriTestuali] = useState({});
    const [links, setLinks] = useState([]);
    const [sottotipo, setSottotipo] = useState({ id: 1, value: 'Link Esterno' });
    const [media1, setMedia1] = useState();
    const [media2, setMedia2] = useState();
    const [media3, setMedia3] = useState();
    const [datiContenuto, setDatiContenuto] = useState({});
    const [contAss, setContAss] = useState(undefined);
    const [tags, setTags] = useState('');
    const [prezzoUnit, setPrezzoUnit] = useState({ id: 0, value: '' });
    const [categoriaAccreditamento, setCategoriaAccreditamento] = useState({ id: 0, value: '' })
    const [cont, setCont] = useState(0);
    const [disponibilita, setDisponibilita] = useState(convertBinToObject())
    const [telefono, setTelefono] = useState()
    const [descrizione, setDescrizione] = useState()
    const [categoriaLiv2, setCategoriaLiv2] = useState();
    const [destinatariLiv1, setDestinatariLiv1] = useState();
    const [mansioni, setMansioni] = useState();
    const [textEditorState, setTextEditorState] = useState();
    const [bodyHtml1EditorState, setBodyHtml1EditorState] = useState(EditorState.createEmpty());
    const [bodyHtml2EditorState, setBodyHtml2EditorState] = useState(EditorState.createEmpty());
    const [allegatoPdf, setAllegatoPdf] = useState();
    const [contenutoDataLoaded, setContenutoDataLoaded] = useState(false);
    const [municipalityState, setMunicipality] = useState();
    const [addressState, setAddressState] = useState({});

    useEffect(() => {
        if (initialValue) {
            if (initialValue === 99)
                setSottotipo({ id: 99, value: 'si' })
            else if (initialValue === 1)
                setSottotipo({ id: 1, value: 'Link Esterno' })
            else if (initialValue === 2)
                setSottotipo({ id: 2, value: 'Pagina Informativa' })
            else if (initialValue === 3)
                setSottotipo({ id: 3, value: 'Link a media file' })
        }
        else setSottotipo({ id: 1, value: 'Link Esterno' })
    }, [initialValue, EstraiContenutoCompleto])

    useEffect(() => {
        if(EstraiContenutoCompleto) {
            if (
                EstraiContenutoCompleto.ln_link_1 &&
                EstraiContenutoCompleto.ln_link_2
            ) {
                setLinks([{
                    field: 'ln_link_1',
                    value: EstraiContenutoCompleto.ln_link_1
                },
                {
                    field: 'ln_link_2',
                    value: EstraiContenutoCompleto.ln_link_2

                }]);
            } else {
                if (EstraiContenutoCompleto.ln_link_1) {
                    setLinks([{
                        field: 'ln_link_1',
                        value: EstraiContenutoCompleto.ln_link_1
                    }]);
                } else if (EstraiContenutoCompleto.ln_link_2) {
                    setLinks([{
                        field: 'ln_link_2',
                        value: EstraiContenutoCompleto.ln_link_2
                    }]);
                }

            }
            setDatiContenuto(EstraiContenutoCompleto.js_dati_contenuto);

            const bodyHtml1EditorContent = getObjectValue(EstraiContenutoCompleto, 'js_dati_contenuto.bodyHtml1EditorContent');
            if (bodyHtml1EditorContent) {
                const initialBodyHtml1EditorState = EditorState.createWithContent(convertFromRaw(bodyHtml1EditorContent));
                setBodyHtml1EditorState(initialBodyHtml1EditorState);
            }

            const bodyHtml2EditorContent = getObjectValue(EstraiContenutoCompleto, 'js_dati_contenuto.bodyHtml2EditorContent');
            if (bodyHtml2EditorContent) {
                const initialBodyHtml2EditorState = EditorState.createWithContent(convertFromRaw(bodyHtml2EditorContent));
                setBodyHtml2EditorState(initialBodyHtml2EditorState);
            }

            const municipalitySavedState = getObjectValue(EstraiContenutoCompleto, 'js_dati_contenuto.Municipio');
            
            setMunicipality(municipalitySavedState);

            const specie = getObjectValue(EstraiContenutoCompleto, 'js_dati_contenuto.Specie');
            const denominazione = getObjectValue(EstraiContenutoCompleto, 'js_dati_contenuto.Denominazione');
            const civico = getObjectValue(EstraiContenutoCompleto, 'js_dati_contenuto.Civico');

            const address = {
                "denominazione": denominazione,
                "specie": specie,
                "civico": civico
            }; 

            setAddressState(address);
            setContenutoDataLoaded(true);

        if(EstraiContenutoCompleto && EstraiContenutoCompleto.media3 && EstraiContenutoCompleto.media3.id_media){
            setAllegatoPdf(EstraiContenutoCompleto.media3);
        }
    }}, [EstraiContenutoCompleto]);

    const configJson = {
        // TYcont === 4 possiede anche il sottotipo, per gestire la spunta "uso esclusivo cdMi"
        ty_sotto_tipo_Contenuto: TYcont === 2 || TYcont === 4 || TYcont === 10 || TYcont === 11,
        tl_testo_1: TYcont,
        tl_testo_2: (TYcont === 2 && sottotipo.id === 2)
             || TYcont === 4|| TYcont === 6 || TYcont === 7 || TYcont === 8 || TYcont === 9 ||
            (TYcont === 10 && sottotipo.id === 2) || (TYcont === 11 && sottotipo.id === 2)
            || TYcont === 12,
        tl_testo_3: TYcont === 7 || TYcont === 8 || TYcont === 9 || TYcont === 12 || (TYcont === 2 && sottotipo.id === 2) || (TYcont === 10 && sottotipo.id === 2) || (TYcont === 11 && sottotipo.id === 2),
        tl_testo_4: TYcont === 7,
        tl_testo_5: (TYcont === 2 && sottotipo.id === 2) ||
            (TYcont === 10 && sottotipo.id === 2) || (TYcont === 11 && sottotipo.id === 2) || TYcont === 7
        ,
        ln_link_1: TYcont === 1 || (TYcont === 2 && sottotipo.id === 1) ||
            (TYcont === 10 && sottotipo.id === 1) || (TYcont === 11 && sottotipo.id === 1) ||
            TYcont === 12,
        ln_link_2: false,
        id_media1: (TYcont === 2 && sottotipo.id === 2) || (TYcont === 10 && sottotipo.id === 2) ||
            (TYcont === 11 && sottotipo.id === 2)
            ? 'sottotipo2'
            : TYcont === 4 ? 4 : TYcont === 7 ? 7 : TYcont === 8 ? 8 : TYcont === 12 ? 12 : false,
        id_media2: (TYcont === 2 && sottotipo.id === 3) ||
            (TYcont === 10 && sottotipo.id === 3) || (TYcont === 11 && sottotipo.id === 3) ? 'sottotipo3' : false,
        id_media3: false,
        js_dati_contenuto: TYcont === 7 ? {key: ''} : TYcont === 1 ? {key: 'footer_col_dx'} : false,
        CONTENUTO_ASSOCIATO: {
            ty_Contenuto: TYcont === 2 ? 1
                : TYcont === 16 ? 15
                    : TYcont === 4 ? 3
                        : false,
            nmRelazione: TYcont === 2 ? 'ML1' :
                TYcont === 16 ? 'TL1' :
                    TYcont === 4 ? 'CL1'
                        : false,
        },

        cnt004: TYcont === 6,
    }

    const labeljson = {
        tl_testo_1: TYcont === 1 || TYcont === 2 || TYcont === 3 || TYcont === 4 || TYcont === 5 || TYcont === 6 || TYcont === 10 || TYcont === 11 || TYcont === 12 || TYcont === 13 || TYcont === 15 || TYcont === 16 || TYcont === 17 || TYcont === 18 ? "Titolo" :
            TYcont === 7 ? "Nome Spazio " :
                TYcont === 8 ? "Titolo" :
                    TYcont === 9 ? "Titolo sezione" :
                        null,
        tl_testo_2: TYcont === 2 && sottotipo.id === 2 ? "Titolo Pagina Informativa" :
           TYcont === 4 ? "Descrizione" :
             TYcont === 6 ? "Descrizione" :
                TYcont === 7 ? "Email" :
                    TYcont === 8 ? "Sottotitolo" :
                        TYcont === 9 ? "Sottotitolo Sezione" :
                            TYcont === 10 && sottotipo.id === 2 ? "Titolo Pagina Informativa" :
                                TYcont === 11 && sottotipo.id === 2 ? "Titolo Pagina Informativa" :
                                    TYcont === 12 ? "Sottotitolo" :
                                        null,
        tl_testo_3: TYcont === 7 ? "Indirizzo" :
            TYcont === 2 && sottotipo.id === 2 ? "Sotto titolo pagina informativa" :
                TYcont === 10 && sottotipo.id === 2 ? "Sotto titolo pagina informativa" :
                    TYcont === 11 && sottotipo.id === 2 ? "Sotto titolo pagina informativa" :
                        TYcont === 8 ? "Descrizione" :
                            TYcont === 9 ? "Descrizione Sezione" :
                                TYcont === 12 ? "Nome sul tasto" :
                                    null,
        tl_testo_4: TYcont === 7 ? "Body HTML1" : null,
        tl_testo_5: TYcont === 2 && sottotipo.id === 2 ? "Area di testo Pagina informativa" :
            TYcont === 7 ? "Body HTML2" :
                TYcont === 10 && sottotipo.id === 2 ? "Area di testo Pagina informativa" :
                    TYcont === 11 && sottotipo.id === 2 ? "Area di testo Pagina informativa" :
                        null,
        ln_link_1: TYcont === 1 ? "Link eventuale associato alla voce Menu" :
            TYcont === 2 && sottotipo.id === 1 ? "Link esterno  associato alla voce Menu" :
                TYcont === 10 && sottotipo.id === 1 ? "Link esterno  associato alla voce footer" :
                    TYcont === 11 && sottotipo.id === 1 ? "Link esterno  associato alla voce footer" :
                        TYcont === 12 ? "Link del tasto" :
                            null,
        id_media12: TYcont === 2 && sottotipo.id === 2 ? "Immagine Pagina Informativa" :
            TYcont === 2 && sottotipo.id === 3 ? "Link a file allegato" :
                TYcont === 7 ? "Immagine Pagina Informativa" :
                    TYcont === 8 ? "Immagine Testimonials" :
                        TYcont === 10 && sottotipo.id === 2 ? "Immagine Pagina Informativa" :
                            TYcont === 10 && sottotipo.id === 3 ? "Link a file allegato" :
                                TYcont === 11 && sottotipo.id === 2 ? "Immagine Pagina Informativa" :
                                    TYcont === 11 && sottotipo.id === 3 ? "Link a file allegato" :
                                        TYcont === 12 ? "Immagine" :
                                            null,
        contenuto_associato: TYcont === 2 ? "Voce di Menu di Livello 1 Padre" :
            TYcont === 16 ? "Target di Livello 1 Padre" :
                TYcont === 4 ? "Categoria di Livello 1 Padre" :
                    // manca 6 e calendario settimanale 7
                    null,
        cnt004: {
            tags: TYcont == 6 ? "Tags Ricerca" : null,
            catagg: TYcont == 6 ? "Categoria di accreditamento" : null,
            unitaprezzo: TYcont == 6 ? "Unità di prezzo" : null,
            catLiv2: TYcont === 6 ? "Categoria di Livello 2 correlate" : null,
            mansioni: TYcont === 6 ? "Mansioni correlate" : null,
            targetLiv1: TYcont === 6 ? "Target di livello 1" : null
        }
    }
    const getSottotipo = value => {
        if (value.id === 99 && value.id === sottotipo.id)
            setSottotipo({ id: -1, value: 'No' })
        else setSottotipo(value)
        if (value.id === 1) {
            setMedia1()
            setMedia2()
            setMedia3()
        }
    }

    const getTestoValue = (target) => {
        let obj = { ...valoriTestuali };
        obj[target.id] = { it: target.value }
        setValoriTestuali(obj)
    }

    const getLinksValue = (target) => {
        let arrayLinks = links;
        if (links.length > 0) {
            for (let i = 0; i < arrayLinks.length; i += 1) {
                if (arrayLinks[i].field === target.id) {
                    arrayLinks.splice(i);
                    arrayLinks.push({ field: target.id, value: target.value })
                }
                else arrayLinks.push({ field: target.id, value: target.value })
            }
        }
        else arrayLinks.push({ field: target.id, value: target.value })
        setLinks(arrayLinks)
    }

    const getMedia1 = (files) => {
        if (files && files.tymedia !== '-1' && files.tymedia !== 'reset') {
            let file = {};
            let id = files.target.id;
            const reader = new FileReader();
            files && reader.readAsDataURL(files.target.files[0]);
            let nomeFile = files.target.value;

            reader.onload = function (event) {
                let contents = event.target.result;
                file = {
                    filename: nomeFile.split('fakepath\\')[1],
                    base64: contents,
                    tymedia: contents.split(';base64')[0].replace('data:', ''),
                };
                setMedia1({ id: id, value: file });
                setUpdate(!update);
            }
        }
        // Gestisco la cancellazione
        else if (files && files.tymedia === '-1') {
            // files.filename => corrisponde all'ID del media presente sul db
            setMedia1({
                id: files.filename,
                value: undefined,
            });
        }
        else if (files && files.tymedia === 'reset') {
            setMedia1();
        }
    }

    const getMedia2 = (files) => {
        if (files && files.tymedia !== '-1' && files.tymedia !== 'reset') {
            let file = {};
            let id = files.target.id;
            const reader = new FileReader();
            files && reader.readAsDataURL(files.target.files[0]);
            let nomeFile = files.target.value;
            reader.onload = function (event) {
                let contents = event.target.result;
                file = {
                    filename: nomeFile.split('fakepath\\')[1],
                    base64: contents,
                    tymedia: contents.split(';base64')[0].replace('data:', ''),
                };
                setMedia2({ id: id, value: file })
                setUpdate(!update)
            }
        }
        // Gestisco la cancellazione
        else if (files && files.tymedia === '-1') {
            // files.filename => corrisponde all'ID del media presente sul db
            setMedia2({
                id: files.filename,
                value: undefined,
            });
        }
        else if (files && files.tymedia === 'reset') {
            setMedia2();
        }
    }


    const getMedia3 = (files) => {
        if (files && files.tymedia !== '-1' && files.tymedia !== 'reset') {
            let file = {};
            let id = files.target.id;
            const reader = new FileReader();
            files && reader.readAsDataURL(files.target.files[0]);
            let nomeFile = files.target.value;
            reader.onload = function (event) {
                let contents = event.target.result;
                file = {
                    filename: nomeFile.split('fakepath\\')[1],
                    base64: contents,
                    tymedia: contents.split(';base64')[0].replace('data:', ''),
                };
                setMedia3({ id: id, value: file })
                setUpdate(!update)
            }
        }
        // Gestisco la cancellazione
        else if (files && files.tymedia === '-1')
            setMedia3({
                id: files.filename, value: {
                    // files.filename => corrisponde all'ID del media presente sul db
                    // tymedia corrisponde a '-1' e lo uso come flag per eliminare il valore id_media dalla tabella
                    filename: `${files.filename}`,
                    tymedia: files.tymedia,
                }
            })
        else if (files && files.tymedia === 'reset')
            setMedia3()
    }

    const getMunicipalityState = (value) => {
        setMunicipality(value);
    };

    const Telefono = (val) => {
        setTelefono(val)
    }
    const Descrizione = (val) => {
        setDescrizione(val)
    }
    const getDisponibilita = (val) => {
        setDisponibilita(val)
    }
    const getCategoriaAccreditamento = (val) => {
        setCategoriaAccreditamento(val)
    }
    const getContAss = arr => {
        setContAss(arr)
    }

    const getOrderNm = value => {
        setOrderNm(parseInt(value))
    }

    const getTags = value => {
        setTags(value)
    }

    const getPrezzoUnit = value => {
        setPrezzoUnit(value)
    }
    const getCategoriaLiv2 = value => {
        setCategoriaLiv2(value)
    }
    const getDestinatariLiv1 = value => {

        setDestinatariLiv1(value)
    }
    const getMansioni = value => {

        setMansioni(value)
    }

    const getTextEditorValue = value => {
        setTextEditorState(value);
    };
    const getAllegatoValue = async files => {        
        if (!files) {
            return;
        }
        const [file] = files; 
        const { name, type } = file;
        const fileBase64 = await fileToBase64(file);

        setAllegatoPdf({ oj_media: fileBase64,  ty_mime_type_media: type,
            nm_nome_media: name});
    };

    const getAddressValue = (key, value) => {
        setAddressState({...addressState, [key]: value });
    };
    return (
        <Wrapper fluid justifycontent="space-between" padding="0" >
            {loaded === 1 && <Loader size="2em" margin="0 0" width="auto" />}
            <OrderNm max={max} draft={EstraiContenutoCompleto} getValue={getOrderNm} />
            {configJson.ty_sotto_tipo_Contenuto && window.location.pathname.split('/')[5] !== '12' && loaded === 2 && <Sottotipo initialValue={initialValue} TYCont={TYcont} json={configJson} getValue={getSottotipo} selectedValue={sottotipo} />}
            {loaded === 2 &&
                (configJson.tl_testo_1 ||
                    configJson.tl_testo_2 ||
                    configJson.tl_testo_3 ||
                    configJson.tl_testo_4 ||
                    configJson.tl_testo_5) && <ValoriTestuali 
                    municipi={municipi} cnt4={configJson.cnt004} 
                    json={configJson} datiContenuto={datiContenuto} 
                    municipalityState={municipalityState}
                    getAddressValue={getAddressValue}
                    addressState={addressState}
                    getMunicipalityState={getMunicipalityState}
                    getTextEditorValue={getTextEditorValue} getAllegatoValue={getAllegatoValue} setAllegatoPdf={setAllegatoPdf} allegatoPdf={allegatoPdf} getValue={getTestoValue} setBodyHtml1EditorState={setBodyHtml1EditorState} setBodyHtml2EditorState={setBodyHtml2EditorState} bodyHtml2EditorState={bodyHtml2EditorState} bodyHtml1EditorState={bodyHtml1EditorState} setDisponibilita={getDisponibilita} disponibilita={disponibilita} draft={EstraiContenutoCompleto} locale={locale} contenutoDataLoaded={contenutoDataLoaded} valorilabel={labeljson} Telefono={Telefono} Descrizione={Descrizione} descrizioneValue={descrizione} />}
            {(configJson.ln_link_1 || configJson.ln_link_2) && loaded === 2 && <LinkSection json={configJson} getValue={getLinksValue} draft={EstraiContenutoCompleto} locale={locale} valorilabel={labeljson} />}
            {configJson.js_dati_contenuto && loaded === 2 && TYcont !== 7 &&
                <DatiContenutoSection
                    json={configJson.js_dati_contenuto}
                    getValue={(value) => setDatiContenuto(value)}
                    selectedValue={datiContenuto}
                />}
            {(configJson.id_media1 || configJson.id_media2) &&
                <MediaSection json={configJson}
                    sottotipo={sottotipo}
                    initialSottotipo={initialValue}
                    getMedia1={getMedia1}
                    getMedia2={getMedia2}
                    getMedia3={getMedia3}
                    media1={media1}
                    media2={media2}
                    media3={media3}
                    draft={EstraiContenutoCompleto} valorilabel={labeljson} />}
            {configJson.CONTENUTO_ASSOCIATO.ty_Contenuto &&
                <ContenutoAssociato json={configJson} getValue={getContAss} draft={EstraiContenutoCompleto}
                    contAss={contAss} valorilabel={labeljson} />}
            {configJson.cnt004 && loaded === 2 && Dati && <Cont004 Dati={Dati}
                locale={locale}
                draft={EstraiContenutoCompleto}
                EstraiListaCategorieAccreditamento={EstraiListaCategorieAccreditamento}
                EstraiUnitaPrezzo={EstraiUnitaPrezzo}
                getTags={getTags} getPrezzoUnit={getPrezzoUnit}
                prezzoUnit={prezzoUnit}
                getCategoriaAccreditamento={getCategoriaAccreditamento}
                setCategoriaAccreditamento={setCategoriaAccreditamento}
                categoriaAccreditamento={categoriaAccreditamento}
                getCategoriaLiv2={getCategoriaLiv2}
                setCategoriaLiv2={setCategoriaLiv2}
                categoriaLiv2={categoriaLiv2}
                getDestinatariLiv1={getDestinatariLiv1}
                setDestinatariLiv1={setDestinatariLiv1}
                destinatariLiv1={destinatariLiv1}
                getMansioni={getMansioni}
                setMansioni={setMansioni}
                mansioni={mansioni}
                valorilabel={labeljson} />}

            <CntButtons
                addressState={addressState}
                telefono={telefono && telefono.value}
                textEditorState={textEditorState}
                municipalityState={municipalityState}
                bodyHtml1EditorState={bodyHtml1EditorState}
                bodyHtml2EditorState={bodyHtml2EditorState}
                allegatoPdf={allegatoPdf}
                descrizione={descrizione}
                disponibilita={disponibilita}
                TYcont={TYcont}
                locale={locale}
                IDcont={IDcont}
                json={configJson}
                isSottotipo={configJson.ty_sotto_tipo_Contenuto}
                draft={EstraiContenutoCompleto}
                media1={media1}
                media2={media2}
                media3={media3}
                datiContenuto={datiContenuto}
                contAss={contAss}
                sottotipo={sottotipo}
                valoriTestuali={valoriTestuali}
                categoriaLiv2={categoriaLiv2}
                destinatariLiv1={destinatariLiv1}
                mansioni={mansioni}
                links={links}
                orderNm={orderNm}
                inizioVal={inizioVal}
                tagsRicerca={tags}
                unitaPrezzo={prezzoUnit ? prezzoUnit.id : null}
                categoriaAccreditamento={categoriaAccreditamento ? categoriaAccreditamento.id : null}
            />
        </Wrapper>
    )
};

HandleContents003.displayName = 'HandleContents003';

const mapDispatchToProps = {
    graphqlRequest,
};

function mapStateToProps(state) {
    const { graphql, locale } = state;
    const { loaded } = graphql;
    return {
        locale,
        loaded
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HandleContents003);