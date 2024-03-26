import React, { useEffect, useState } from 'react';
import Input from 'components/ui/Input';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import Radio from 'components/ui/Radio';
import { connect } from "react-redux";
import Checkbox from 'components/ui/Checkbox';
import Switch from 'components/ui/Switch';
import Button from 'components/ui/Button';
import SubTitle from 'components/ui/SubTitle';
import TextArea from 'components/ui/TextArea';
import Select from '../../../../ui/Select';
import { isNullOrUndefined } from 'util';
import withAuthentication from 'hoc/withAuthentication';





const selectedCheckbox = (tipoServizio, elemento) => {
    let risultato = {}
    for (let i = 0; i < tipoServizio.length; i += 1)
        if (tipoServizio[i].id === elemento.id)
            risultato = tipoServizio[i]
    return risultato

}


const checkboxJSON = [{ id: 1, label: "Individuale" }, { id: 2, label: "Condiviso" }];




const UnderSection = ({ userProfile, note, setnote, informazioni, setInformazioni, EstraiDettaglioAmministrativoServizioEnte,
    prezzounit, setprezzounit, valoreswitch, setvaloreswitch, datipr, setdatipr, setvaliditàdal, setvaliditàal
}) => {

    // const strDatiLogin = sessionStorage.getItem('DatiLogin');
    // const DatiLogin = strDatiLogin && JSON.parse(strDatiLogin);
    const DatiLogin = userProfile.datiLogin;

    // const [offerteperunita,setoffertexunità]=useState([])

    // const x=(array)=>{
    //     for(let i=0;i<array.length;i++){
    //         array.map(element=>element.minUnità && element.maxUnità ? setoffertexunità(element):null)
    //     }
    // }

    // useEffect=()=>{
    //   x(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.sconto)
    // },[];

    const [minUnita, setminu] = useState()
    const [maxUnita, setmaxu] = useState()
    const [perc, setperc] = useState()
    const [minpersone, setmin] = useState()
    const [maxpersone, setmax] = useState()
    const [percpers, setpercpers] = useState()
    const [offertexpersone, setofferte] = useState(isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo) ? [] : EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.sconto ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.sconto : [])
    const [offertexunità, setofferteunità] = useState(isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo) ? [] : EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.scontoperunita ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.scontoperunita : [])


    const [offertedefault, setoffertedefault] = useState(
        {
            id: isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo) ? null : EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.sconto?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.sconto[0].perc:null,
            value: "Da " + " " + isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo) ? null : EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.sconto?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.sconto[0].minPersone:null
                + " " + "persone" + " " + "a " + isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo) ? null : EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.sconto?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.sconto[0].maxPersone:null
                    + " " + "persone " + " " + " PercentualeSconto" + " " + isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo) ? null : EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.sconto?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.sconto[0].perc:null
        })


    const [offerteunitàdefault, setofferteunitàdefault] = useState(
        {
            id: isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo) ? null : EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.scontoperunita?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.scontoperunita[0].perc:null,
            value: "Da " + " " + isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo) ? null : EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.scontoperunita?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.scontoperunita[0].minUnita:null
                + " " + "persone" + " " + "a " + isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo) ? null : EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.scontoperunita?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.scontoperunita[0].maxUnita:null
                    + " " + "persone " + " " + " PercentualeSconto" + " " + isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo) ? null : EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.scontoperunita?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.scontoperunita[0].perc:null
        })



    const handlechangePrezzoUnit = (value) => {
        return (
            parseInt(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.prezzoBase) - parseInt(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.prezzoBase) * parseInt(value) / 100)

    }

    const handlechangeswitch = (value) => {
        setvaloreswitch(value)

    }

    const idservizio = window.location.pathname.split('/')[5]

    const [serviziostt,setstt]=useState(EstraiDettaglioAmministrativoServizioEnte && EstraiDettaglioAmministrativoServizioEnte.EstraiServizioErogatoEnte004.filter(e=>{if(e.cd_stato_dati_servizio_ente===31 && e.id_servizio_ente==idservizio) return e}))

    return (
        <>

            <Row>
                <Column lg={4} md={4}>
                    <SubTitle title="Tipo " secondtitle="servizio" />
                    {checkboxJSON.map((elemento) => (
                        <Row>
                            <Column padding=".5em 0">
                                <Radio
                                    groupName="items3"
                                    getValue={() => { }}
                                    selectedValue={informazioni && informazioni.tipoServizio ? informazioni.tipoServizio : null}
                                    fontSize="f7"
                                    value={elemento.id}
                                    label={elemento.label}
                                    spacing="0.5em 1.5em 0.5em 0"
                                    display="flex"
                                    bordercolor="blue"
                                    checkcolor={"blue"} />
                                {/* <Checkbox
                                getValue={DatiLogin && DatiLogin.Ruolo==="Ente"?(value) => {
                                    let array = informazioni.tipoServizio
                                    let found = false;
                                    for (let i = 0; i < array.length; i += 1)
                                        if (array[i].id === value.id)
                                            found = true;
                                    if (!found)
                                        array.push(value)
                                    else
                                        array = array.filter(elemento => {
                                            if (elemento.id !== value.id)
                                                return elemento
                                        })
                                    setInformazioni([...array])
                                }:()=>{}}
                                selectedValue={selectedCheckbox(informazioni.tipoServizio, elemento)}
                                boxWidth="1.2em"
                                boxHeight="1.2em"
                                fontSize="f7"
                                type="checkbox"
                                value={elemento.id}
                                defaultvalue={false}
                                checkcolor="blue"
                                label={elemento.label}
                                bordercolor="blue"
                            /> */}
                            </Column>
                        </Row>
                    ))}

                </Column>

            </Row>



            {informazioni && informazioni.tipoPagamento && informazioni.tipoPagamento.id === 3 ?
                <Column md="6">
                    <Row fluid display="flex">
                        <Text value={informazioni && informazioni.tipoServizio.id === 1 ? "Offerta a pacchetto per unità di prezzo (si/no)" :
                            informazioni && informazioni.tipoServizio.id === 2 ? "Offerta a pacchetto per persone (si/no)" :
                                informazioni && informazioni.tipoServizio.id === 2 && 1 ? "" :
                                    null}
                            size="f6" color="darkGrey" tag="p" />
                        <Switch defaultvalue={valoreswitch} color="darkGrey" coloractive="blue" size="f6" getSwitchValue={handlechangeswitch} />
                    </Row>
                </Column>
                : null}
            {(informazioni && informazioni.tipoPagamento && informazioni.tipoPagamento.id === 1 || 3) && informazioni && informazioni.tipoServizio && informazioni.tipoServizio.id === 1 || 2 ?
                <>
                    {valoreswitch === true && informazioni && informazioni.tipoPagamento && informazioni.tipoPagamento.id === 3 ?
                        <>
                            {(DatiLogin && DatiLogin.Ruolo==="Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length>0) ?
                                <Column lg={3} md={3}>
                                    <Input
                                        material
                                        initialValue={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo?
                                            EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.validita?
                                            EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.validita.dal ?
                                            EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.validita.dal :"":"": ""}
                                        intlLabel="Offerta valida da"
                                        readonly="true"
                                        intlFormatter
                                        color="blue"
                                        getValue={(value) => setvaliditàdal(value)}
                                    />
                                </Column>
                                :
                                DatiLogin && DatiLogin.Ruolo === "Amministratore WeMi" ?
                                    <Column lg={3} md={3}>
                                        <Input
                                            material
                                            initialValue={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo?
                                                EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.validita?
                                                EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.validita.dal ?
                                                EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.validita.dal :"":"": ""}
                                            intlLabel="Offerta valida da"
                                            readonly="true"
                                            intlFormatter
                                            color="blue"
                                            getValue={(value) => setvaliditàdal(value)}
                                        />
                                    </Column>
                                    : null}
                            {(DatiLogin && DatiLogin.Ruolo==="Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length>0) ?
                                <Column lg={3} md={3}>
                                    <Input
                                        material
                                        initialValue={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo?
                                            EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.validita?
                                            EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.validita.al ?
                                            EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.validita.al :"":"": ""}
                                        intlLabel="Offerta valida a"
                                        intlFormatter
                                        readonly="true"
                                        color="blue"
                                        getValue={(value) => setvaliditàal(value)}
                                    />
                                </Column>
                                :
                                DatiLogin && DatiLogin.Ruolo === "Amministratore WeMi" ?
                                    <Column lg={3} md={3}>
                                        <Input
                                            material
                                            initialValue={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo?
                                                EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.validita?
                                                EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.validita.al ?
                                                EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.validita.al :"":"": ""}
                                            intlLabel="Offerta valida a"
                                            intlFormatter
                                            readonly="true"
                                            color="blue"
                                            getValue={(value) => setvaliditàal(value)} />
                                    </Column>
                                    : null}
                            {(DatiLogin && DatiLogin.Ruolo==="Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length>0) ?
                                <Row>
                                    <Column lg={5} md={5}>
                                        <Input
                                            material
                                            color="blue"
                                            readonly="true"
                                            intlFormatter
                                            intlPlaceholder={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo?
                                                EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.minPersone ?
                                                EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.minPersone :"": ""}
                                            intlLabel="Numero Minimo di Unità"
                                        />
                                    </Column>
                                </Row>
                                : DatiLogin && DatiLogin.Ruolo === "Amministratore WeMi" ?
                                    <Row>
                                        <Column lg={5} md={5}>
                                            <Input
                                                material
                                                color="blue"
                                                readonly="true"
                                                intlFormatter
                                                intlPlaceholder={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo?
                                                    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.minPersone ?
                                                    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.minPersone :"": ""}
                                                intlLabel="Numero Minimo di Unità"
                                            />
                                        </Column>
                                    </Row>
                                    : null}
                            {(DatiLogin && DatiLogin.Ruolo==="Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length>0) ?
                                <Row>
                                    <Column lg={3} md={3}>
                                        <Input
                                            material
                                            intlPlaceholder="Da numero unità"
                                            intlLabel="Da numero unità"
                                            intlFormatter
                                            readonly="true"
                                            color="blue"
                                            getValue={() => {
                                            }
                                            }
                                        />
                                    </Column>
                                    <Column lg={3} md={3}>
                                        <Input
                                            material
                                            intlPlaceholder="A numero unità"
                                            intlLabel="A numero unità"
                                            intlFormatter
                                            readonly="true"
                                            color="blue"
                                            getValue={() => {
                                               
                                            }}
                                        />
                                    </Column>
                                    <Column lg={2} md={2}>
                                        <Input material intlPlaceholder="Valore" color="blue" intlLabel="Valore" intlFormatter
                                        readonly="true"
                                            getValue={() => {
                                                
                                            }} />
                                    </Column>
                                    <Column lg={3} md={3}>
                                        <Button type="disabled" disabled value="Aggiungi condizione" 
                                            // onClick={() => { datipr.scontoperunità.push({ minUnita: minUnita, maxUnita: maxUnita, perc: perc }) }}
                                             />
                                    </Column>
                                </Row>
                                : null}
                            {(DatiLogin && DatiLogin.Ruolo==="Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length>0) && informazioni && informazioni.tipoServizio.id === 2 ?
                                <Row>
                                    <Column lg={3} md={3}>
                                        <Input
                                            material
                                            intlPlaceholder="Da numero persone"
                                            intlLabel="Da numero persone"
                                            intlFormatter
                                            color="blue"
                                            readonly="true"
                                            getValue={() => {
                                              
                                            }}
                                        />
                                    </Column>
                                    <Column lg={3} md={3}>
                                        <Input
                                            material
                                            intlPlaceholder="A numero persone"
                                            intlLabel="A numero persone"
                                            intlFormatter
                                            color="blue"
                                            readonly="true"
                                            getValue={() => {
                                              
                                            }}
                                        />
                                    </Column>
                                    <Column lg={2} md={2}>
                                        <Input material intlPlaceholder="Valore" color="blue" intlLabel="Valore" intlFormatter
                                        readonly="true"
                                            getValue={() => {
                                            }} />
                                    </Column>
                                    <Column lg={3} md={3}>
                                        <Button  type="disabled" disabled value="Aggiungi condizione" 
                                            // onClick={() => { datipr.sconto.push({ minPersone: minpersone, maxPersone: maxpersone, perc: percpers }) }} 
                                            />
                                    </Column>
                                </Row>
                                : null}

                            <Row>
                                <Text value="Elenco condizioni" size="f5" color="blue" />
                            </Row>
                            <Row>
                                <Column>
                                    {informazioni && informazioni.tipoServizio.id === 2 ?
                                        <>
                                            <Select
                                                name="Offerte per persone"
                                                material
                                                color="blue"
                                                items={[]}
                                                selectedValue={offertedefault}
                                                intlFormatter
                                                getValue={() => {
                                                }}
                                            />
                                            <Column></Column>
                                            <Select
                                                name="Offerte per unità"
                                                material
                                                color="blue"
                                                items={[]}
                                                selectedValue={offerteunitàdefault}
                                                intlFormatter
                                                getValue={() =>{
                                                }}
                                            />
                                        </>
                                        : informazioni && informazioni.tipoServizio.id === 1 ?

                                            <Select
                                                name="Offerte per unità"
                                                material
                                                color="blue"
                                                items={[]}
                                                selectedValue={offerteunitàdefault}
                                                intlFormatter
                                                getValue={() => {
                                                   
                                                }}
                                            />
                                            : null}
                                </Column>

                            </Row>
                            <Row>
                                <Column lg={12} md={12}>
                                    <TextArea
                                        material
                                        color="blue"
                                        intlPlaceholder="Note aggiuntive prezzo"
                                        name="Note aggiuntive prezzo"
                                        intlFormatter
                                        readOnly="true"
                                    />

                                </Column>

                            </Row>
                        </>
                        : null}

                </>



                : null}
            {DatiLogin && DatiLogin.Ruolo === "Ente" ?
                <Row>
                    <Column lg={12} md={12}>
                        <TextArea
                            material
                            readOnly="true"
                            color="blue"
                            initialValue={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio && 
                                EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.noteprezzo? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.noteprezzo:""}
                            name="Note amministrative"
                            intlFormatter
                            getValue={(value) => { setnote({ notedest: note.notedest, noteserv: note.noteserv, notesede: note.notesede, notepers: note.notepers, noteprezzo: value }) }}
                        />
                    </Column>
                </Row>
                : DatiLogin && DatiLogin.Ruolo === "Amministratore WeMi" ?
                    <Row>
                        <Column lg={12} md={12}>
                            <TextArea
                                material
                                color="blue"
                                readOnly="true"
                                initialValue={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio && 
                                    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.noteprezzo? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.noteprezzo:""}
                                name="Note amministrative"
                                intlFormatter
                                getValue={(value) => { setnote({ notedest: note.notedest, noteserv: note.noteserv, notesede: note.notesede, notepers: note.notepers, noteprezzo: value }) }}
                            />
                        </Column>
                    </Row>
                    : null}
        </>
    )
};
const mapStoreToProps = store => ({
    locale: store.locale,
    EstraiDettaglioAmministrativoServizioEnte: store.graphql.EstraiDettaglioAmministrativoServizioEnte
})
export default connect(mapStoreToProps)(withAuthentication(UnderSection));