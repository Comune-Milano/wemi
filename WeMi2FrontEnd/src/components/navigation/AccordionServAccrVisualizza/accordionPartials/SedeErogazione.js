/** @format */

import React, { useState, useEffect } from 'react';
import { Row, Column } from "components/ui/Grid";
import Accordion from "components/ui/Accordion";
import Text from "components/ui/Text";
import { connect } from "react-redux";
import { graphqlRequest } from 'redux-modules/actions/authActions';
import Radio from 'components/ui/Radio';
import Select from 'components/ui/Select';
import TextArea from 'components/ui/TextArea';
import Input from 'components/ui/Input';
import { AccordionBodyWrapper } from '../partials';
import withAuthentication from 'hoc/withAuthentication';

const radioJSON = [{ id: 1, label: "a domicilio" }, { id: 2, label: "altra sede" }, { id: 3, label: "sede ente" }]

const SedeErogazione = ({
  note,
  setnote,
  EstraiDettaglioAmministrativoServizioEnte,
  setsede1,
  sede1,
  loaded,
  userProfile
}) => {
//   const strDatiLogin = sessionStorage.getItem('DatiLogin');
// const DatiLogin = strDatiLogin && JSON.parse(strDatiLogin);
const DatiLogin = userProfile.datiLogin;


  const [radioButtonValue] = useState(EstraiDettaglioAmministrativoServizioEnte && 
    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte &&
    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione===null &&
    // EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.id_sede===null &&
    EstraiDettaglioAmministrativoServizioEnte && 
    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte &&
    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.tx_altra_sede===null?{ id: 1, value: 'a domicilio' } : 
    EstraiDettaglioAmministrativoServizioEnte && 
    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte &&
    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione!=null?
    // EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.id_sede!=null? 
    { id: 3, value: 'sede ente' }:
    EstraiDettaglioAmministrativoServizioEnte && 
    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte &&
    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.tx_altra_sede!=null?{id:2,value:'altra sede'}:null
    );

  const [sede, setsede] = useState({
    id: EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.id_sede : null,
    value:EstraiDettaglioAmministrativoServizioEnte? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.nomeSede? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.nomeSede :null :null : null : null + "," +
      EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.indirizzo.txCitta : null : null + "," +
        EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.indirizzo.txIndirizzo : null : null +
          "," + EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.indirizzo.txCAP : null : null + "," + EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.indirizzo.txProvincia : null : null + "," +
            EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.id_sede
  })

  const idservizio = window.location.pathname.split('/')[5]

  const [serviziostt] = useState(EstraiDettaglioAmministrativoServizioEnte && EstraiDettaglioAmministrativoServizioEnte.EstraiServizioErogatoEnte004.filter(e=>{if(e.cd_stato_dati_servizio_ente===31 && e.id_servizio_ente==idservizio) return e}))


  useEffect(() => {
    if(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte){
      setsede({
        id: EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.id_sede : null,
        value:EstraiDettaglioAmministrativoServizioEnte? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.nomeSede? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.nomeSede :null :null : null : null + "," +
          EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.indirizzo.txCitta : null : null + "," +
            EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.indirizzo.txIndirizzo : null : null +
              "," + EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.indirizzo.txCAP : null : null + "," + EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede ? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.indirizzo.txProvincia : null : null + "," +
                EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.id_sede
      })
    }
    setsede1({
      tipo: radioButtonValue.id,
      nomesede: EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.nomeSede? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.nomeSede:"",
      indirizzo:EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.indirizzo && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.indirizzo.txIndirizzo? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.indirizzo.txIndirizzo:"",
      città:EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.indirizzo && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.indirizzo.txCitta? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.indirizzo.txCitta:"",
      cap:EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.indirizzo && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.indirizzo.txCAP? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.indirizzo.txCAP:"",
      provincia:EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.indirizzo && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.indirizzo.txProvincia? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.js_sede.indirizzo.txProvincia:"",
      id_sede: EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione?[EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.sedeErogazione.id_sede]:[],
      altrasede: EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.tx_altra_sede?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.tx_altra_sede:null,
    })
  },
    [radioButtonValue.id,EstraiDettaglioAmministrativoServizioEnte]);




  return (
    <Column sm="12" padding="20px">

      <Accordion
        headerBgColorOpen="blue"
        headerBgColor="grey"
        headerColorOpen="white"
        headerColor="blue"
        arrowOpenColor="white"
        arrowClosedColor="blue"
        arrowSize="f1"
        headerPadding="0.75rem 1.25rem"
        aperto={false}
        AccordionHeader={() => (
          <Text weight="bold" size="f4" value="Sede di erogazione del servizio" intlFormatter />
        )}
        children={
          EstraiDettaglioAmministrativoServizioEnte ?
            <AccordionBodyWrapper>
              <Row>
                <Column lg={12}>
                  {radioJSON.map(radio => (
                    <Radio
                      groupName="items2"
                      getValue={
                      ()=>{}}
                      selectedValue={radioButtonValue}
                      fontSize="f7"
                      value={radio.id}
                      label={radio.label}
                      spacing="0.5em 1.5em 0.5em 0"
                      display="flex"
                      bordercolor="blue"
                      checkcolor={"blue"}
                    />))}
                </Column>
              </Row>
              {radioButtonValue &&radioButtonValue.id === 2 ? (DatiLogin && DatiLogin.Ruolo==="Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length>0)?

                <Row>
                  <Column lg={8}>
                    <Input
                      material
                      color="blue"
                      readonly="true"
                      intlPlaceholder={sede1 && sede1.altrasede?sede1.altrasede:null}
                      intlLabel="Specificare altra sede"
                      intlFormatter
                      getValue={()=>{}}
                    />
                  </Column>
                </Row>
                :  DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && radioButtonValue && radioButtonValue.id===2? 
                <Row>
                <Column lg={8}>
                <Input
                material
                color="blue"
                intlPlaceholder={sede1 && sede1.altrasede?sede1.altrasede:null}
                intlLabel="Specificare altra sede"
                intlFormatter
                readonly="true"/>
                </Column></Row>
                :null:null}

              {radioButtonValue.id === 3 ? (DatiLogin && DatiLogin.Ruolo==="Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length>0)  && loaded === 2?
                <Row padding="0" division={12}>
                  <Column md={10} lg={10}>
                    <Select
                      material
                      selectedValue={sede}
                      
                      name="Specificare la sede"
                      color="blue"
                      items=
                      {
                     []
                      }
                      intlFormatter
                      intlPlaceholder="Specificare la sede"
                      onChange
                      getValue={() => {
                      }}
                    />
                  </Column>

                </Row>
                : 
                <Row padding="0" division={12}>
                <Column md={10} lg={10}>
                  <Select
                    material
                    selectedValue={sede}
                    name="Specificare la sede"
                    color="blue"
                    items=
                    {
                     []
                    }
                    intlFormatter
                    intlPlaceholder="Specificare la sede"
                    onChange
                    getValue={() => {
                    }}
                  />
                </Column>

              </Row>
                : null}
              {DatiLogin && DatiLogin.Ruolo === "Ente" ?
                <Row padding="0" division={12}>
                  <Column lg={12}>
                    <TextArea
                      material
                      color="blue"
                      readOnly="true"
                      initialValue={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio?
                        EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.notesede?
                        EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.notesede :"":''}
                      name="Note amministrative"
                      intlFormatter
                      getValue={(value) => { setnote({ notedest: note.notedest, noteserv: note.noteserv, notesede: value, notepers: note.notepers, noteprezzo: note.noteprezzo }) }}
                    />
                  </Column>
                </Row> :
                DatiLogin && DatiLogin.Ruolo === "Amministratore WeMi" ?
                  <Row padding="0" division={12}>
                    <Column lg={12}>
                      <TextArea
                        material
                        color="blue"
                        readOnly="true"
                        initialValue={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio?
                          EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.notesede?
                          EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.notesede :"":''}
                        name="Note amministrative"
                        intlFormatter
                        getValue={(value) => { setnote({ notedest: note.notedest, noteserv: note.noteserv, notesede: value, notepers: note.notepers, noteprezzo: note.noteprezzo }) }}
                      />
                    </Column>
                  </Row>
                  : null}
            </AccordionBodyWrapper>
            : null

        }
      />
    </Column>


  );
};


const mapStoreToProps = store => ({
  locale: store.locale,
  loaded: store.graphql.loaded,
  EstraiDettaglioAmministrativoServizioEnte: store.graphql.EstraiDettaglioAmministrativoServizioEnte
});

SedeErogazione.displayName = 'SedeErogazione';

export default connect(
  mapStoreToProps
)(withAuthentication(SedeErogazione));
