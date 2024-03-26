/** @format */

import React, { useState, useEffect } from 'react';
import { Row, Column } from 'components/ui/Grid'
import LevelsCarousel from './LevelsCarousel'
import { PreventivoLightTCB } from 'redux-modules/actions/authActions';
import { connect } from 'react-redux';
import Text from 'components/ui/Text';
import Input from 'components/ui2/Input'
import {
    tipoOrarioTCB as tipoOrarioTCBQ,
    estraiLivelliContrattuali as estraiLivelliContrattualiQ,
    modalitaAssunzioneTCB as modalitaAssunzioneTCBQ
} from 'components/navigation/InserimentoDomandaTCB/partials/InserimentoLavoratore';
import { getIdServizio } from 'utils/functions/getIdServizio';
import Select from 'components/ui2/Select'
import styled from 'styled-components';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import moment from 'moment';

const Mydiv = styled.div`
width: 18%;
background-color: #eee;
color: #eee;
margin-top:0.5em;
margin-bottom:0.5em;
padding:1em;
`
const Mydiv2 = styled.div`
width: 75%;
background-color: #eee;
color: #eee;
margin-top:0.5em;
margin-bottom:0.5em;
padding:1em;
`


const Angrafica = ({ loaded,
    Risultato,
    setFormField,
    locale,
    setAssunzione,
    setContr,
    PreventivoLightTCB,
    errors,
    dataset,
    handleFieldBlur,
    touched


}) => {




    const items = [{
        id: 1,
        value: 'Tata'
    },
    {
        id: 2,
        value: 'Colf'
    },
    {
        id: 3,
        value: 'Badante'
    }
    ];

    const [orarioValue, setOrarioValue] = useState({
        id: 1,
        value: null
    })
    const [filteredCardByOrario, setFiltered] = useState([])


    const [ItemsOrario, setItems] = useState([orarioValue])
    const [livelliContr, setLivelli] = useState([])
    const [modalitaAssunzione, setModalita] = useState([])

    const orariTCB = useStatelessGraphQLRequest(
        tipoOrarioTCBQ
    );


    const livelliContrattuali = useStatelessGraphQLRequest(
        estraiLivelliContrattualiQ
    )


    const modalitaAssunzioneTCB = useStatelessGraphQLRequest(
        modalitaAssunzioneTCBQ
    );

    const recuperaOrario = async (value) => {
        if (value) {
            const result = (await orariTCB({ idServizio: getIdServizio(parseInt(value.id)) }));
            setItems(result.TipologiaOrarioByServizioTCB.map(el => {
                return {
                    id: el.cd_dominio_tcb,
                    value: el.tl_valore_testuale[locale],
                }
            }))
        }
    };;


    const recuperaContratti = async (value) => {
        if (value) {
            const result = (await livelliContrattuali({ idServizio: getIdServizio(parseInt(value.id))}));
            setLivelli(result.estraiConfigurazioniLivelliContrattuali)
            setContr(result.estraiConfigurazioniLivelliContrattuali)
        }
    };


    const recuperaModalita = async (value) => {
        if (value) {
            const result = (await modalitaAssunzioneTCB({ idServizio: getIdServizio(parseInt(value.id)) }));
            setModalita(result.ModalitaAssunzioneByServizioTCB)
            setAssunzione(result.ModalitaAssunzioneByServizioTCB)
        }
    }
    /**
     * useEffect per recuperare gli orari finchè non ho selezionato un servizio
     */
    useEffect(() => {
        if (dataset.servizioSelezionato !== undefined) {
            recuperaContratti(dataset.servizioSelezionato)
            recuperaOrario(dataset.servizioSelezionato)
            recuperaModalita(dataset.servizioSelezionato)
        }
    }, [dataset.servizioSelezionato]);
    /**
     * useEffect per settare l'orario una volta recuperato il servizio 
     */
    useEffect(() => {
        setOrarioValue(dataset.orarioselezionato);
}, [dataset.orarioselezionato]);
    /**
     * useEffect per filtrare i livelli contrattuali di default
     */
    useEffect(() => {
        if (filteredCardByOrario.length > 0) {
            setFormField('livelloInquadramento',
                {
                id: filteredCardByOrario[0].LivelloContrattuale.cdLivelloContrattuale,
                value: filteredCardByOrario[0].cd_categoria_contrattuale
            });

            if (dataset.livelloInquadramento && !filteredCardByOrario.filter(el => el.LivelloContrattuale.cdLivelloContrattuale === dataset.livelloInquadramento?.id).length > 0) {
                setFormField( 'livelloInquadramento',
                    {
                    id: filteredCardByOrario[0].LivelloContrattuale.cdLivelloContrattuale,
                    value: filteredCardByOrario[0].cd_categoria_contrattuale
                })
            }
        }
    }, [filteredCardByOrario]);
    /**
     * useEffect per verificare i livelli contrattuali in base all'orario scelto
     */
    useEffect(() => {
        if (orarioValue) {
            const livelli = livelliContr.filter(liv => {
                if (liv.cd_tipo_orario_lavoro === orarioValue.id || orarioValue.id === -1) {
                    return liv;
                }
            });
            setFiltered(livelli);
        }
    }, [orarioValue]);


    const getpreventivoLightTCB = args => {
        PreventivoLightTCB(args)
    };

    useEffect(() => {
        if(orarioValue && orarioValue.value !==null){
        getpreventivoLightTCB({
            preventivoLightTCB: {
                orario: orarioValue,
                contract: dataset.livelloInquadramento,
            },
        })
    }
    }, [orarioValue, dataset.livelloInquadramento])

   


  


    const getSelectedCard = value => {
        let livello = { id: value.id, value: value.title.split(' ')[1] }
        setFormField('livelloInquadramento',livello);
        getpreventivoLightTCB({
            preventivoLightTCB: {
                orario: orarioValue,
                contract: livello,
            },
        })

    };

    return (
        <>
            <Row fluid margin = "1.5em 0 1.5em 0">
                    <Text size="f6" color="primary" weight="bold" value="Anagrafica cittadino" />
            </Row>
            <Row fluid>
                <Column xs='3' padding='0 1em 0 0' alignself='flex-end'>
                    <Input
                        onChange={(value) => { setFormField('nome', value) }}
                        inputValue={dataset.nome}
                        error={touched.nome && !Risultato? errors.nome : null}
                        onBlur={() => { handleFieldBlur('nome') }}
                        label={"Nome"}
                        color="primary"
                        required={
                            (dataset.nome === null || dataset.nome.length <= 0) &&
                            !Risultato
                        }
                        readOnly={!!Risultato}
                    />
                </Column>
                <Column xs='3' padding='0 1em 0 0' alignself='flex-end' margin="0 0 0 2em">
                    <Input
                        onChange={(value) => { setFormField('cognome', value) }}
                        inputValue={dataset.cognome}
                        error={touched.cognome && !Risultato ? errors.cognome : null}
                        onBlur={() => { handleFieldBlur('cognome') }}
                        label={"Cognome"}
                        color="primary"
                        required={
                            (dataset.cognome === null || dataset.cognome.length <= 0) &&
                            !Risultato
                        }
                        readOnly={!!Risultato}
                    />
                </Column>
            </Row>
            <Row fluid margin="0.5em 0 0 0">
                <Column xs='3' padding='0 1em 0 0' alignself='flex-end' >
                    <Input
                        name={'codicefiscale'}
                        onChange={(value) => { setFormField('codicefiscale', value) }}
                        inputValue={dataset.codicefiscale}
                        error={touched.codicefiscale && !Risultato ? errors.codicefiscale : null}
                        onBlur={() => { handleFieldBlur('codicefiscale') }}
                        label={"CF"}
                        color="primary"
                        required={
                            (dataset.codicefiscale === null || dataset.codicefiscale.length <= 0) &&
                            !Risultato
                        }
                        readOnly={!!Risultato}
                    />
                </Column>
                <Column xs='3' padding='0 1em 0 0' alignself='flex-end' margin="0 0 0 2em">
                    <Input
                        name={'email'}
                        onChange={(value) => { setFormField('email', value) }}
                        inputValue={dataset.email}
                        error={touched.email && !Risultato ? errors.email : null}
                        onBlur={() => { handleFieldBlur('email') }}
                        label={"EMAIL"}
                        color="primary"
                        readOnly={!!Risultato}
                    />
                </Column>
            </Row>
            <Row fluid margin = "1.5em 0 1.5em 0">
                <Column xs='3' padding='0 1em 0 0' alignself='flex-end' >
                        <Text size="f6" color="primary" weight="bold" value="Servizio" />
                </Column>
                </Row>
            <Row fluid margin="0.5em 0 0 0">
                <Column xs='3' padding='0 1em 0 0' alignself='flex-end' >
                    <Select
                        material
                        color="primary"
                        label="Tipologia servizio"
                        items={items}
                        clickedSelectedItem={() => {
                            setFormField('servizioSelezionato', undefined)
                            setOrarioValue(undefined)
                            setFormField('orarioselezionato',undefined)
                        }}
                        clickedItem={(value) => {
                            setFormField('servizioSelezionato', value)
                            setFormField('orarioselezionato',undefined)
                        }}
                        selectedValue={dataset.servizioSelezionato}
                        intlFormatter
                        required={dataset.servizioSelezionato === undefined}
                        placeholder="Seleziona la tipologia di servizio"
                    />
                </Column>
                <Column xs='3' padding='0 1em 0 0' alignself='flex-end' margin="0 0 0 2em">
                    <Select
                        material
                        color="primary"
                        label="Tipologia orario"
                        items={ItemsOrario}
                        clickedSelectedItem={() => {
                            setFormField('orarioselezionato', undefined)
                            setOrarioValue({id:-1,value:''})
                        }}
                        clickedItem={(value) => {
                            setFormField('orarioselezionato', value)
                        }}
                        selectedValue={dataset.orarioselezionato}
                        intlFormatter
                        required={dataset.orarioselezionato === undefined}
                        placeholder="Seleziona la tipologia di orario"
                    />
                </Column>
            </Row>
            {
            filteredCardByOrario.length>0 &&
            dataset.livelloInquadramento !== undefined &&
                orarioValue!==undefined &&
                <LevelsCarousel selectedCard={dataset.livelloInquadramento} getSelectedCard={getSelectedCard} orarioValue={orarioValue} filteredCardByOrario={filteredCardByOrario} locale={locale} />
            }
        </>
    )
}


const mapStateToProps = (state) => ({
    preventivoLightTCB: state.requestTCB.preventivoLightTCB,
});

const mapDispatchToProps = {
    PreventivoLightTCB
}
export default connect(mapStateToProps,
    mapDispatchToProps)(Angrafica);