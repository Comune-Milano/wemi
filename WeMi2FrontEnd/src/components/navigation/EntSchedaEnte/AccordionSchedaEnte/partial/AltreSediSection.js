import React, {useState,useEffect}from 'react';
import Accordion from 'components/ui/Accordion';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui/Input';
import Text from 'components/ui/Text'; 
import TextArea from 'components/ui/TextArea';
import Button from 'components/ui/Button';
import media from 'utils/media-queries';
import FormSedeSecondaria from './FormSedeSecondaria';
import SectionChip from 'components/ui/SectionChip'
import style from 'styled-components';
import {AddParameters} from 'redux-modules/actions/goi003Actions';
import {connect} from 'react-redux';
import AccordionBodyWrapper from './AccordionBodyWrapper';
import { contenutoByTyS } from '../../../../pages/DatiEnte/enteGraphQL';
import { isNullOrUndefined } from 'util';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';

const MyButton = style(Button)`
width: auto;
height: 33.59px;
${media.sm`
margin-left: auto;
margin-right: auto;
`}
${media.xs`
margin-left: auto;
margin-right: auto;
`}

`;

const AltreSediSection = ({ 
  userProfile,
  redux_sede,
  AddParameters,
  enteDatiPK,
  EstraiDatiPropriEnte,
  setControllo,
  controllo,
  disabilitaModificaCampi,
  disableNotes,
}) =>{
    //gestire l'inserimento della sede
    //conferma serve per aggiungere localmente la sede
    
    const [visibleChip, setVisibleChip] = useState(true);
    
    const [valore, setValore] = useState();

    // const strDatiLogin = sessionStorage.getItem('DatiLogin');
    // const DatiLogin = strDatiLogin && JSON.parse(strDatiLogin);
    const { datiLogin } = userProfile;
    const DatiLogin = datiLogin;
    const  FlagEnte =  DatiLogin.Profilo=="E"
    const isAmministratore = checkAdmin(DatiLogin);
    var ruolo=DatiLogin && DatiLogin.Ruolo == "Amministratore WeMi"?true:false




    useEffect(()=>{      
      let arr=[]
      if(!redux_sede.controllo&& enteDatiPK&&window.location.pathname.split('/')[3]==enteDatiPK.id_ente_rif  &&enteDatiPK.sede_secondarie&&enteDatiPK.sede_secondarie.sedi &&EstraiDatiPropriEnte ){
        AddParameters ({sedi:undefined})

        enteDatiPK.sede_secondarie.sedi.map(sede =>{
       arr.push({
          id_sede:sede.f2,
          nomeSede: sede.f1.nomeSede,
          indirizzo:{
            indirizzo: sede.f1.indirizzo.txIndirizzo? sede.f1.indirizzo.txIndirizzo : sede.f1.indirizzo.indirizzo,
            cap: sede.f1.indirizzo.txCAP ?sede.f1.indirizzo.txCAP:sede.f1.indirizzo.cap,
            citta:sede.f1.indirizzo.txCitta? sede.f1.indirizzo.txCitta:sede.f1.indirizzo.citta,
            provincia:sede.f1.indirizzo.txProvincia? sede.f1.indirizzo.txProvincia:sede.f1.indirizzo.provincia,
           
            }
          })
       
        })
        
        AddParameters({sedi:arr,
                      note:enteDatiPK.js_note_adminwemi["note6"],
                      stato:EstraiDatiPropriEnte.cd_stato_ente,
                      disabilitaPerSalvare:EstraiDatiPropriEnte.cd_stato_ente!=31 && EstraiDatiPropriEnte.cd_stato_ente!=22 && 
                      EstraiDatiPropriEnte.cd_stato_ente!=4 ?false:true,
                      controllo:true}) 
        
        }
         
        
 

    },[enteDatiPK,EstraiDatiPropriEnte])

    const elimina=async(nomeSede)=>{
      let arr=[];
    
      let sedi=redux_sede.sedi
      
      let sedi2=[]
      if(sedi)
      sedi.map((ele)=>{if(ele.nomeSede!==nomeSede) {sedi2.push(ele)} else {if(ele.id_sede) arr.push(ele.id_sede)}})
      let arrElimina=[]
      if(redux_sede.eliminaSedi)
      {
        arrElimina=redux_sede.eliminaSedi
      }
    
      arr.map((el)=>{arrElimina.push(el)})
      
      AddParameters({...redux_sede,eliminaSedi:arrElimina,sedi:sedi2}) 
    
      await setVisibleChip(false)
      setVisibleChip(true)
    }
    return(
      
        <Accordion
        headerBgColorOpen="blue"
          headerBgColor="grey"
          maxHeight="none"
          headerColorOpen="white"
          headerColor="blue"
          arrowOpenColor="white"
          arrowClosedColor="blue"
          arrowSize="f1"
          headerPadding="0.75rem 1.25rem"
          aperto={false}
          AccordionHeader={() => (
            <>
          <Text weight="bold" value={'Sedi'} intlFormatter size="f4" />


            </>
          )}
          
          children={
            <AccordionBodyWrapper>
            {
              !disabilitaModificaCampi ?
                <Row>
                  <Column xs="12" sm="12" md="9" lg="9">
                    <Input material
                      intlLabel="Altra Sede"
                      color={redux_sede.errore&&redux_sede.errore.length >0?"red":"blue"}
                      inputValue={valore}
                      onChange={(event)=>setValore(event.target.value)}
                      onBlur={(event) => {AddParameters({...redux_sede,inputSede:event.target.value})
                        }}
                    />
                    {redux_sede.errore&&redux_sede.errore.length>0 && <Text value={ redux_sede.errore} size="f9" color="red"></Text>}
                  </Column>

                  <Column  xs="12" sm="12" md="3" lg="3" >

                  <MyButton
                    value="Aggiungi"
                    onClick={()=>{
                      setValore('')
                      if(!redux_sede.inputSede){
                        AddParameters({...redux_sede,errore:"Inserire il nome della sede"})   
                      } else {
                        let presente = false
                        if( redux_sede.sedi){
                        redux_sede.sedi.map((sede)=>{
                            if(sede.nomeSede.toLowerCase()===redux_sede.inputSede.toLowerCase()){
                                presente = true
                            }
                        })}
                        if(!presente){
                          
                            if(redux_sede.sedi){     
                          
                              let sedi=redux_sede.sedi
                            
                            let json1 = {nomeSede:redux_sede.inputSede,indirizzo:{}}
                            sedi.push(json1)
                      AddParameters({...redux_sede,sedi:sedi,inputSede:'',errore:''}) 
                          
                          }else{
                          let json = {};
                          json = {nomeSede:redux_sede.inputSede,indirizzo:{}}
                      
                          let arr=[]
                          arr.push(json)
                          AddParameters({...redux_sede,sedi:arr,inputSede:'',errore:''})
                        }
                        }else{
                        AddParameters({...redux_sede,errore:"Sede già presente",inputSede:''})     
                        }
                      }
                    } } />
              </Column>
            </Row>
            : null
          }
     
            <Row fluid justifycontent={'space-between'}>     
            {redux_sede.sedi?
              redux_sede.sedi.map((sede,i) => {
               
                const FormSecondariaProps= {
                  setControllo:setControllo, 
                    titolo:sede.nomeSede,  controllo:controllo, 
                    FlagEnte:FlagEnte, 
                    Data:sede.indirizzo, 
                    stato:redux_sede.stato, 
                    index: i,
                    ruolo:ruolo,   
                    secondaria:true, 
                    disabilitaPerSalvare:redux_sede.disabilitaPerSalvare,
                     inputDisabled:!FlagEnte,
                }
                if(visibleChip)
                return (
                  <Column lg={6} key={i.toString()}  >
                  <SectionChip
                     Titolo={sede.nomeSede }
                     remove={disabilitaModificaCampi? null : elimina}
                   >
                    <FormSedeSecondaria
                      FormSecondariaProps={FormSecondariaProps}
                      disabilitaModificaCampi={disabilitaModificaCampi}
                    />
                    </SectionChip>
                    </Column>
                )                  
                }) : null
                }
                </Row>
            <Row>
              <Column lg="12">
                {
                  isAmministratore || redux_sede.note ?
                    <TextArea material
                      id='note6'
                      name="Indicazioni della redazione WeMi"
                      preserveLineBreaks
                      backgroundColor="yellow"
                      disabledBackgroundColor="yellow"
                      initialValue={!isNullOrUndefined(redux_sede.note) && redux_sede.note  }
                      readOnly = {disableNotes ? 'true' : 'false'}
                        
                        onBlur={(event)=>{   AddParameters({...redux_sede,note:event.target.value})}
                        } ></TextArea>
                  :null
                }
              </Column>
            </Row>
          </AccordionBodyWrapper>
        }
      />
    )
}

const mapStoreToProps =(store) => ({
  redux_sede: store.goi003,
  enteDatiPK:store.graphql.enteDatiPK,
  EstraiDatiPropriEnte:store.graphql.EstraiDatiPropriEnte
})
const mapDispatchToProps = ({
  AddParameters
})
export default connect(mapStoreToProps,mapDispatchToProps)(withAuthentication(AltreSediSection));