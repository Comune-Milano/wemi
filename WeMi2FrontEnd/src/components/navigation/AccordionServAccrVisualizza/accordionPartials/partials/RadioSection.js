import React,{useState,useEffect} from 'react';
import SubTitle from 'components/ui/SubTitle';
import Radio from 'components/ui/Radio';
import {Row,Column} from 'components/ui/Grid';
import { connect } from "react-redux";
import { isNullOrUndefined } from 'util';
import withAuthentication from 'hoc/withAuthentication';




const gratuitoJSON = [{id:1, label: "pagato attraverso finanziamento"}, {id:2, label:"con volontari"}]
const radioJSON = [
    {id:1, label:"Gratuito"}, 
    {id:3, label:"Pagamento"}
  ];
  
const RadioSection = ({userProfile,informazioni,setInformazioni,setInformazioni1,EstraiDettaglioAmministrativoServizioEnte,datipr,setdatipr}) =>{

//   const strDatiLogin = sessionStorage.getItem('DatiLogin');
// const DatiLogin = strDatiLogin && JSON.parse(strDatiLogin);
const DatiLogin = userProfile.datiLogin;

const idservizio = window.location.pathname.split('/')[5]

    const [serviziostt,setstt]=useState(EstraiDettaglioAmministrativoServizioEnte && EstraiDettaglioAmministrativoServizioEnte.EstraiServizioErogatoEnte004.filter(e=>{if(e.cd_stato_dati_servizio_ente===31 && e.id_servizio_ente==idservizio) return e}))

 

    return (
    <Column lg={4} md={4}>
                <SubTitle title="Tipo " secondtitle="offerta" />
                {radioJSON.map(radio => ( 
                  <>
                  <Radio
                  groupName="items3"
                  getValue={(DatiLogin && DatiLogin.Ruolo==="Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length>0)?()=>{}:()=>{}}
                  selectedValue={informazioni ? informazioni.tipoPagamento:
                  null}
                  fontSize="f7"
                  value={radio.id}
                  label={radio.label}
                  spacing="0.5em 1.5em 0.5em 0"
                  display="flex"
                  bordercolor="blue"
                  checkcolor={"blue"}
                  />
                  { isNullOrUndefined( informazioni)?null :informazioni && informazioni&& informazioni.tipoPagamento && informazioni.tipoPagamento.id===1 && radio.id===1? 
                   <>
                   {gratuitoJSON.map(elemento => (
                    <Row>
                  
                     <Column padding="0 1em">
                     <Radio
                     groupName="items4"
                     getValue={(DatiLogin && DatiLogin.Ruolo==="Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length>0)? ()=>{}:()=>{}}
                     selectedValue={informazioni? informazioni.modalitaPagamento:null}
                     fontSize="f8"
                     value={elemento.id}
                     label={elemento.label}
                     spacing="0.5em 1.5em 0.5em 0"
                     display="flex"
                     bordercolor="blue"
                     checkcolor={"blue"}
                     />
                     </Column>
                     </Row>

                   ))}
                   
                    
                    </>
                    
                    : null}
                  </>)) }
                </Column>
)}

const mapStoreToProps = store => ({
  locale: store.locale,
  EstraiDettaglioAmministrativoServizioEnte: store.graphql.EstraiDettaglioAmministrativoServizioEnte
})
export default connect(mapStoreToProps)(withAuthentication(RadioSection));