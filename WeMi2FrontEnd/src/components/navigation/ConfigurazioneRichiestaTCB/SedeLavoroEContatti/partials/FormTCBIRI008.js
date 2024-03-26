/** @format */

import React, { useState, useEffect } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Select from 'components/ui/Select';
import Label from 'components/ui/Label';
import Input from 'components/ui/Input';
import Checkbox from 'components/ui/Checkbox';
import DatePicker from 'components/ui/InputDayPicker';
import Button from 'components/ui/Button';
import styled from 'styled-components';
import { colors } from 'theme';
import { connect } from 'react-redux';
import media from 'utils/media-queries';
import RicercaMunicipio from './RicercaMunicipio';
import { EstraiDatiSede as EstraiDatiSedeQ, EstraiInfoUtente as EstraiInfoUtenteQ } from './graphQLTCBIRI008';
import { TCBSecondStepper, graphqlRequest, TCBConfig008 } from 'redux-modules/actions/authActions';
import { isNullOrUndefined } from 'util';
import withAuthentication from 'hoc/withAuthentication';

const BorderRow = styled(Row)`
      border-bottom: 1px solid ${colors.grey}
      justify-content: flex-start;
`;

const MySelect = styled(Select)`
width: 70%;
`;

const MyColumn = styled(Column)`
padding: 2em 0em 0em;
${media.lg`
padding:0;
    `}
`;
const DivCheckbox = styled.div`
display: flex;
justify-content: flex-end
`;

const FormRow = styled(Row)`
  border-bottom: 1px solid ${colors.grey};
`;

const FormTCBIRI008 = ({
    graphqlRequest,
    EstraiInfo,
    config008,
    getDatiAnagrafici,
    getInfoSede,
    EstraiDatiSede,
    EstraiDati,
    locale,
    formRef,
    userProfile
}) => {

    // const strDatiLogin = sessionStorage.getItem('DatiLogin');
    // const DatiLogin = strDatiLogin && JSON.parse(strDatiLogin);
    const DatiLogin = userProfile.datiLogin;

    const getReferenteDati = (value) => {
        if (config008.datiAnagrafici && !isNullOrUndefined(config008.datiAnagrafici.flag) && config008.datiAnagrafici.flag.id === 1) {
            getDatiAnagrafici("flag", { id: 0, value: 'no' });
            getDatiAnagrafici("nome", "");
            getDatiAnagrafici("cognome", "");
            getDatiAnagrafici("dataDiNascita", -1);
            getDatiAnagrafici("codiceFiscale", "");
            getDatiAnagrafici("sessoUtente", { id: -1 });
            getDatiAnagrafici("statoDiNascita", { id: -1 });
            getDatiAnagrafici("telefono", "");
            getDatiAnagrafici("luogoDiNascita", "");
            getDatiAnagrafici("email", "");
            getDatiAnagrafici("anagraficaResidenza", {});
        }
        else {
            let sessoUtente = {};
            getDatiAnagrafici("flag", value);
            getDatiAnagrafici("nome", EstraiInfo.datiUtente.tx_nome_utente);
            getDatiAnagrafici("cognome", EstraiInfo.datiUtente.tx_cognome_utente);
            getDatiAnagrafici("dataDiNascita", EstraiInfo.datiUtente.dt_nascita);
            getDatiAnagrafici("codiceFiscale", EstraiInfo.datiUtente.ptx_codice_fiscale);
            if (EstraiInfo && EstraiInfo.datiUtente.cd_sesso_utente === "1") {
                sessoUtente = { id: parseInt(EstraiInfo.datiUtente.cd_sesso_utente), value: 'Maschio' };
            }
            else if (EstraiInfo && EstraiInfo.datiUtente.cd_sesso_utente === "0") {
                sessoUtente = { id: parseInt(EstraiInfo.datiUtente.cd_sesso_utente), value: 'Femmina' };
            }
            getDatiAnagrafici("sessoUtente", sessoUtente);
            getDatiAnagrafici("email", EstraiInfo.datiUtente.ptx_email);
        }

    }

    const getReferenteSede = (value) => {
        if (config008.datiSede && !isNullOrUndefined(config008.datiSede.flag) && config008.datiSede.flag.id === 1) {
            getInfoSede("flag", { id: 0, value: 'no' });
            getInfoSede("municipio", { id: -1 });
            getInfoSede("comune", "");
            getInfoSede("indirizzo", "");
        }
        else {
            if (EstraiInfo.datiUtente.js_anagrafica_residenza.Municipio) {
                getInfoSede("municipio", EstraiInfo.datiUtente.js_anagrafica_residenza.Municipio);
            }
            else {
                getInfoSede("municipio", { id: -1 });
            }
            getInfoSede("flag", value);
            getInfoSede("comune", EstraiInfo.datiUtente.js_anagrafica_residenza.Comune);
            getInfoSede("indirizzo", EstraiInfo.datiUtente.js_anagrafica_residenza.Via);
        }
    }

    const checks = [{
        value: 1,
        textValue: 'Si'
    }]

    useEffect(() => {
        graphqlRequest(EstraiDatiSedeQ());
        graphqlRequest(EstraiInfoUtenteQ(DatiLogin && DatiLogin.idCittadino))
    }, [graphqlRequest]);

    useEffect(() => {
        if (EstraiDati && EstraiDati.benFlag && EstraiDati.benFlag.flag === "1") {
            let sessoUtente = {};
            getDatiAnagrafici("flag", { id: 1, value: 'Si' });
            getDatiAnagrafici("nome", EstraiInfo && EstraiInfo.datiUtente.tx_nome_utente);
            getDatiAnagrafici("cognome", EstraiInfo && EstraiInfo.datiUtente.tx_cognome_utente);
            getDatiAnagrafici("dataDiNascita", EstraiInfo && EstraiInfo.datiUtente.dt_nascita);
            getDatiAnagrafici("codiceFiscale", EstraiInfo && EstraiInfo.datiUtente.ptx_codice_fiscale)
            if (EstraiInfo && EstraiInfo.datiUtente.cd_sesso_utente === "1") {
                sessoUtente = { id: parseInt(EstraiInfo.datiUtente.cd_sesso_utente), value: 'Maschio' }
            }
            else if (EstraiInfo && EstraiInfo.datiUtente.cd_sesso_utente === "0") {
                sessoUtente = { id: parseInt(EstraiInfo.datiUtente.cd_sesso_utente), value: 'Femmina' }
            }
            getDatiAnagrafici("sessoUtente", sessoUtente)
            getDatiAnagrafici("email", EstraiInfo && EstraiInfo.datiUtente.ptx_email)
        }
    }, [EstraiInfo]);


    return (
        <Column xs="12" padding="2em 0" >
            <form ref={formRef}>
                <Label
                    value={"Dati anagrafici contatto"}
                    width="auto"
                    weight="bold"
                    display="inline-flex"
                    transform="uppercase"
                    intlFormatter
                    color="primary"
                    bgcolor="grey"
                    margin="0"
                    size="f8"
                />

                <FormRow padding="1em 0" flex direction="column">
                    {EstraiInfo && EstraiInfo.datiUtente ?
                        <Column xs="12" padding="0" flex justifycontent="space-between">
                            <Text value="Possiamo usare I tuoi dati di profilo come referente?" size="f6" />
                            <DivCheckbox>
                                {checks.map((check, index) => (
                                    <Checkbox
                                        key={index.toString()}
                                        getValue={getReferenteDati}
                                        selectedValue={config008.datiAnagrafici && config008.datiAnagrafici.flag}
                                        boxWidth="1.2em"
                                        boxHeight="1.2em"
                                        fontSize="f7"
                                        type="checkbox"
                                        value={check.value}
                                        defaultvalue={false}
                                        checkcolor="primary"
                                        bordercolor="primary"
                                        label={check.textValue}
                                    />
                                ))}
                            </DivCheckbox>
                        </Column>


                        : null}

                </FormRow>

                <Row fluid padding="1em 0" alignitems="center" justifycontent="space-between">
                    <Column xs="6" lg="6" md="6" fluid flex justifycontent="center" >
                        <Input
                            required
                            material intlPlaceholder="Nome"
                            width="90%"
                            intlLabel="Nome"
                            intlFormatter
                            getValue={(value) => getDatiAnagrafici("nome", value)}
                            inputValue={config008 && config008.datiAnagrafici.nome}
                        />
                    </Column>

                    <Column xs="6" lg="6" md="6" fluid flex justifycontent="center" >
                        <Input
                            required
                            material intlPlaceholder="Cognome"
                            width="90%"
                            intlLabel="Cognome"
                            intlFormatter
                            getValue={(value) => getDatiAnagrafici("cognome", value)}
                            inputValue={config008 && config008.datiAnagrafici.cognome}
                        />
                    </Column>
                </Row>


                <Row fluid padding="1em 0" alignitems="center" justifycontent="space-between">

                    <Column xs="4" lg="4" fluid flex justifycontent="center" >
                        <Input
                            required
                            material intlPlaceholder="Luogo di nascita"
                            width="85%"
                            intlLabel="Luogo di nascita"
                            intlFormatter
                            inputValue={config008 && config008.datiAnagrafici ? config008.datiAnagrafici.luogoDiNascita : ''}
                            getValue={(value) => getDatiAnagrafici("luogoDiNascita", value)}
                        />
                    </Column>

                    <Column xs="4" lg="4" fluid flex justifycontent="center" >
                        <Select
                            required
                            reset
                            name="Stato di nascita"
                            material
                            intlPlaceholder="Stato di nascita"
                            width="85%"
                            intlLabel="Stato di nascita"
                            intlFormatter
                            items={EstraiDatiSede ? EstraiDatiSede.dominioTcbByTipoTcb : []}
                            selectedValue={config008 && config008.datiAnagrafici.statoDiNascita ? config008.datiAnagrafici.statoDiNascita : {}}
                            getValue={(value) => getDatiAnagrafici("statoDiNascita", value)}
                            labelSelected="stato di nascita"
                        />
                    </Column>

                    <Column xs="4" lg="4" fluid flex justifycontent="center" >
                        <DatePicker
                            placeholder="Data di nascita"
                            handleDayChange={(value) => {
                                getDatiAnagrafici("dataDiNascita", value)
                            }}
                            disabledDays
                            material
                            required
                            selectedDay={config008.datiAnagrafici && config008.datiAnagrafici.dataDiNascita
                                && config008.datiAnagrafici.dataDiNascita !== -1 ?
                                config008.datiAnagrafici.dataDiNascita : ''}
                        />
                    </Column>

                </Row>

                <Row fluid padding="1em 0" alignitems="center" justifycontent="space-between">
                    <Column xs="6" lg="7" fluid flex justifycontent="center">
                        <Input
                            required
                            material intlPlaceholder="Codice Fiscale"
                            width="90%"
                            intlLabel="Codice Fiscale"
                            intlFormatter
                            getValue={(value) => getDatiAnagrafici("codiceFiscale", value)}
                            inputValue={config008 && config008.datiAnagrafici.codiceFiscale}
                        />
                    </Column>

                    <Column xs="6" lg="5" fluid >
                        <MySelect
                            required
                            reset
                            material
                            name="Sesso"
                            items={EstraiDatiSede ? EstraiDatiSede.EstraiSessoBeneficiario.map((elemento) => (
                                {
                                    value: elemento.cdDominioTcb,
                                    textValue: elemento.tlValoreTestuale[locale]
                                }
                            )) : []}
                            intlFormatter
                            getValue={(value) => getDatiAnagrafici("sessoUtente", value)}
                            selectedValue={config008.datiAnagrafici.sessoUtente}
                        />
                    </Column>
                </Row>

                <Row fluid padding="1em 0" alignitems="center" justifycontent="space-between">
                    <Column xs="6" lg="7" fluid flex justifycontent="center">
                        <Input
                            required
                            material intlPlaceholder="E-mail"
                            width="90%"
                            intlLabel="E-mail"
                            intlFormatter
                            getValue={(value) => getDatiAnagrafici("email", value)}
                            inputValue={config008 && config008.datiAnagrafici.email}
                        />
                    </Column>

                    <Column xs="6" lg="5" fluid flex justifycontent="center">
                        <Input
                            required
                            material intlPlaceholder="Telefono"
                            width="90%"
                            intlLabel="Telefono"
                            inputValue={config008 && config008.datiAnagrafici ? config008.datiAnagrafici.telefono : ''}
                            intlFormatter
                            getValue={(value) => getDatiAnagrafici("telefono", value)} />
                    </Column>
                </Row>

                <Row fluid padding="1em 0" alignitems="center" justifycontent="space-between">
                    <Label
                        value={"Sede"}
                        width="auto"
                        weight="bold"
                        display="inline-flex"
                        transform="uppercase"
                        intlFormatter
                        color="primary"
                        bgcolor="grey"
                        margin="0"
                        size="f8"
                    />
                </Row>

                <BorderRow padding="1em 0 1em" fluid alignitems="center" justifycontent="space-between">
                    {EstraiInfo && EstraiInfo.datiUtente && EstraiInfo.datiUtente.js_anagrafica_residenza ?
                        <Column xs="12" padding="0" fluid flex justifycontent="space-between">
                            <Text value="Possiamo  usare la tua residenza come indirizzo della sede di lavoro?" size="f6" />
                            <DivCheckbox>
                                {checks.map((check, index) => (
                                    <Checkbox
                                        key={index.toString()}
                                        getValue={getReferenteSede}
                                        selectedValue={config008.datiSede && config008.datiSede.flag}
                                        boxWidth="1.2em"
                                        boxHeight="1.2em"
                                        fontSize="f7"
                                        type="checkbox"
                                        value={check.value}
                                        defaultvalue={false}
                                        checkcolor="primary"
                                        bordercolor="primary"
                                        label={check.textValue}
                                    />
                                ))}
                            </DivCheckbox>
                        </Column>



                        : null}

                </BorderRow>

                <Row fluid margin="2em 0" flex alignitems="center">
                    <Column xs="12" sm="10" md="10" lg="10" padding="20px">
                        <Select
                            required
                            material
                            reset
                            name="Municipio sede di lavoro"
                            intlFormatter
                            intlPlaceholder="Municipio sede"
                            items={EstraiDatiSede ? EstraiDatiSede.municipioAll.map(municipio =>
                            ({
                                value: municipio.idMunicipio,
                                textValue: municipio.nmMunicipio[locale]
                            })
                            ) : []}
                            getValue={(value) => getInfoSede("municipio", value)}
                            selectedValue={config008 && config008.datiSede.municipio}
                            labelSelected="municipio sede di lavoro"
                        />
                    </Column>
                    <Column xs="12" sm="2" md="2" lg="2" padding="0 20px">
                        <RicercaMunicipio getInfoSede={getInfoSede} />

                    </Column>


                </Row>
                <Row fluid margin="1em 0" alignitems="center">
                    <Column xs="6" padding="0 20px">
                        <Input
                            required
                            material intlPlaceholder="Comune sede"
                            width="95%"
                            intlLabel="Comune sede di lavoro"
                            intlFormatter
                            getValue={(value) => getInfoSede("comune", value)}
                            inputValue={config008 && config008.datiSede.comune}
                        />

                    </Column>

                    <Column xs="6" padding="0 20px">
                        <Input
                            required
                            material intlPlaceholder="Indirizzo sede"
                            width="95%"
                            intlLabel="Indirizzo sede di lavoro"
                            intlFormatter
                            getValue={(value) => getInfoSede("indirizzo", value)}
                            inputValue={config008 && config008.datiSede.indirizzo}
                        />
                    </Column>

                </Row>
            </form>
        </Column>
    );
}


FormTCBIRI008.displayName = ' FormTCBIRI008';

const mapDispatchToProps = ({
    graphqlRequest,
    TCBConfig008,
    TCBSecondStepper
});

const mapStoreToProps = store => ({
    Stepper: store.stepperTCB,
    EstraiDatiSede: store.graphql.EstraiDatiSede,
    EstraiInfo: store.graphql.EstraiInfoUtente,
    EstraiDati: store.graphql.EstraiDatiConfigurazioneRichiesta001,
    locale: store.locale

})
export default connect(mapStoreToProps, mapDispatchToProps)(withAuthentication(FormTCBIRI008));