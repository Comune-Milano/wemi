/** @format */

import React,{useEffect,useState} from 'react';
import { Row, Column } from "components/ui/Grid";
import Accordion from "components/ui/Accordion";
import Text from "components/ui/Text";
import { connect } from "react-redux";
import { isNullOrUndefined } from 'util';
import {AccordionBodyWrapper} from '../partials';
import Input from "components/ui/Input";
import TextArea from "components/ui/TextArea";
import MultiSelect from 'components/ui/MultiSelect';
import withAuthentication from 'hoc/withAuthentication';




const PersonaleEsterno = ({userProfile, note,setnote,EstraiDettaglioAmministrativoServizioEnte,datis,setdatis,locale }) => {
 
  // const strDatiLogin = sessionStorage.getItem('DatiLogin');
  // const DatiLogin = strDatiLogin && JSON.parse(strDatiLogin);
  const DatiLogin = userProfile.datiLogin;

  useEffect(() => {
    setdatis({
      qualifica:isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale)?[]:isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qlPersonaleEsterno)?[]:EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qlPersonaleEsterno[locale],
      anni:isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale)?"":isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qtEsperienzaPersonaleEsterno)?"":EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qtEsperienzaPersonaleEsterno,
      nomefornitore:isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale)?"":isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.nmFornitori)?"":EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.nmFornitori
    })},
      []);

      const [nomefornitore,setnome]=useState(isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale)?"":isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.nmFornitori)?"":EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.nmFornitori)
      const [qualifica,setqualifica]=useState(isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale)?"":isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qlPersonaleEsterno)?"":EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qlPersonaleEsterno.it)
      const [qualificadefault,setqualificadefault]=useState(qualifica?qualifica.map(qualifica=>({id:qualifica,value:qualifica})):[])
      const [annidefault,setanni]=useState(isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale)?"":isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qtEsperienzaPersonaleEsterno)?"":EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qtEsperienzaPersonaleEsterno)
     

      const handlechangeqanni = event =>{
        setanni(event.target.value)
        setdatis({qualifica:datis.qualifica,anni:annidefault,nomefornitore:datis.nomefornitore})
      }

      const idservizio = window.location.pathname.split('/')[5]

      const [serviziostt,setstt]=useState(EstraiDettaglioAmministrativoServizioEnte && EstraiDettaglioAmministrativoServizioEnte.EstraiServizioErogatoEnte004.filter(e=>{if(e.cd_stato_dati_servizio_ente===31 && e.id_servizio_ente==idservizio) return e}))

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
            <Text weight="bold" size="f4" value="Personale esterno impiegato" intlFormatter />
        )}
       children = {    
            EstraiDettaglioAmministrativoServizioEnte? 
              <AccordionBodyWrapper>
                {(DatiLogin && DatiLogin.Ruolo==="Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length>0)?
              <Row>
              <Column lg={12}>
                <Input
                  material
                  color="blue"
                  readonly="true"
                  intlPlaceholder={isNullOrUndefined( EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale)?
                    "" :isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.nmFornitori)?"":EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.nmFornitori}
                  intlLabel="Nomi fornitori"
                  intlFormatter
                  getValue={(value)=>{setdatis({qualifica:datis.qualifica,anni:datis.anni,nomefornitore:value})}}
                />
              </Column>
            </Row>
:
DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi"?

<Row>
              <Column lg={12}>
                <Input
                  material
                  color="blue"
                  intlPlaceholder={isNullOrUndefined( EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale)?
                    "" :isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.nmFornitori)?"":EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.nmFornitori}
                  intlLabel="Nomi fornitori"
                  intlFormatter
                  readonly="true"
                  getValue={(value)=>{setdatis({qualifica:datis.qualifica,anni:datis.anni,nomefornitore:value})}}
                />
              </Column>
            </Row>
:null}
{(DatiLogin && DatiLogin.Ruolo==="Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length>0)?
            <Row>
              <Column lg={12}>
                 <MultiSelect
                  material
                  color="blue"
                  name="Qualifiche del personale"
                  items={[]}
                  disabilitaEliminazione
                  selectedArrDefault={qualificadefault}
                  intlFormatter
                  intlPlaceholder="Qualifiche del personale"
                  onChange
                  getValue={()=>{}}
                /> 
              </Column>
            </Row>
            :DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi"?
            <Row>
              <Column lg={12}>
                 <MultiSelect
                  material
                  color="blue"
                  disabilitaEliminazione
                  name="Qualifiche del personale"
                  items={[]}
                  selectedArrDefault={qualificadefault}
                  intlFormatter
                  intlPlaceholder="Qualifiche del personale"
                  onChange
                  getValue={()=>{}}
                /> 
              </Column>
            </Row>
            :null}
            {(DatiLogin && DatiLogin.Ruolo==="Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length>0)?
            <Row>
              <Column lg={6} md={6}>
                <Input
                  material
                  color="blue"
                  type="number"
                  readonly="true"
                 
                  initialValue={isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale)?
                    "":isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qtEsperienzaPersonaleEsterno)?"":EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qtEsperienzaPersonaleEsterno}
                  intlPlaceholder=""
                  intlLabel="Numero anni di esperienza"
                  intlFormatter
                  onChange={handlechangeqanni}
                />
              </Column>
            </Row>
:DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi"?
<Row>
              <Column lg={6} md={6}>
                <Input
                  material
                  color="blue"
                  type="number"
                  
                  initialValue={isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale)?
                    "":isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qtEsperienzaPersonaleEsterno)?"":EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qtEsperienzaPersonaleEsterno}
                  intlPlaceholder=""
                  readonly="true"
                  intlLabel="Numero anni di esperienza"
                  intlFormatter
                  onChange={handlechangeqanni}
                />
              </Column>
            </Row>
:null}


{DatiLogin && DatiLogin.Ruolo==="Ente"?
            <Row>
              <Column lg={12}>
              <TextArea
                  material
                  color="blue"
                  readOnly="true"
                  initialValue={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio && 
                    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.notepers? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.notepers:""}
                  name="Note amministrative"
                  intlFormatter
                  getValue={(value)=>{setnote({notedest:note.notedest,noteserv:note.noteserv,notesede:note.notesede,notepers:value,noteprezzo:note.noteprezzo})}}
                />
              </Column>
            </Row>
:DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi"?
<Row>
<Column lg={12}>
<TextArea
    material
    color="blue"
    readOnly="true"
    initialValue={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio && 
      EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.notepers? EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.notepers:""}
    name="Note amministrative"
    intlFormatter
    getValue={(value)=>{setnote({notedest:note.notedest,noteserv:note.noteserv,notesede:note.notesede,notepers:value,noteprezzo:note.noteprezzo})}}
  />
</Column>
</Row>
:null}
              </AccordionBodyWrapper>
              :  null
           
        }
      />
      </Column>
  

  );
};


const mapStoreToProps = store => ({
  locale: store.locale,
  EstraiDettaglioAmministrativoServizioEnte: store.graphql.EstraiDettaglioAmministrativoServizioEnte
})


PersonaleEsterno.displayName = 'PersonaleEsterno';

export default connect(
  mapStoreToProps
)(withAuthentication(PersonaleEsterno));
