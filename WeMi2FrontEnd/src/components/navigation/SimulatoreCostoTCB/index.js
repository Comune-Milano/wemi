/** @format */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Wrapper, FiltriSimulatoreTCB, SimulazioneCosti } from './partials';
import { Column, Row } from 'components/ui/Grid';
import Button from 'components/ui/Button';
import Loader from 'components/ui/Loader';
import styled from 'styled-components';
import media from 'utils/media-queries';
import colors from 'theme/colors';
import { graphqlRequest, PreventivoLightTCB } from 'redux-modules/actions/authActions';
import { simulatoreCosto as simulatoreCostoQ } from './SimulatoreCostoGraphQL';
import { AddClientError } from 'redux-modules/actions/errorActions';
import { isNullOrUndefined } from 'util';
import moment from 'moment';

const print = (simulazione,key) => {
  let string = `
  <div style="font-weight: bold;font-size: 1.5em;padding: 1em 0;color: ${colors.blue}">
      ${key}
  </div>`

  Object.keys(simulazione).map((elemento,index) => {
    string = string + `
      <div style="display:flex; align-items:center; justify-content: space-between;">
         ${simulazione[elemento].value ?
          simulazione[elemento].name ?`<span style="color: ${colors.primary}; font-weight: bold; text-transform: uppercase">
          ${simulazione[elemento].name.replace('${servizio}', 'colf')} (${index+1})
      </span>
      <span>
      ${typeof simulazione[elemento].value !== 'string' ? simulazione[elemento].value.toFixed(2) : simulazione[elemento].value}           
  </span>

      `: `<span style="color: ${colors.primary}; font-weight: bold; text-transform: uppercase">${elemento} (${index+1})</span>
      
      <span>
      ${typeof simulazione[elemento].value !== 'string' ? simulazione[elemento].value.toFixed(2) : simulazione[elemento].value}           
  </span>
  `
          : ``}
      </div>
      `
         });
         string= string+'<div style="padding: 1em 0">'
         Object.keys(simulazione).map((elemento,index) => {
           if(simulazione[elemento].description){
          string = string + `<span style="font-size:0.6em; padding: 0 1em 0 0">(${index+1}) ${simulazione[elemento].description}</span>`
           }
           else{
             return null;
           } 
        });
         string= string+'</div>'
  return string;
}

const ButtonWrapper = styled.div`
  width: 100%;
  position: sticky;
  z-index: 3;
  margin-left: auto;
  margin-right: 0;
  opacity: 0;
  z-index: -2;
  bottom: -5rem;
  justify-content: center;
  padding: 1em 1.5em;
  transition: all 0.2s ease-in-out;
  background-color: rgba(0,153,171, 0.7);
  ${media.sm`
  width: auto
`} 
  ${media.md`
  width: 60%;
`} ${media.lg`
  width: 40%
`} 
        bottom: 0;
        z-index: 3;
        opacity: 1;
        transition: all 0.2s ease-in-out;

`;


 


const SimulatoreCostoTCB = ({PreventivoLightTCB,simulazione,parametri, graphqlRequest,simulatoreCosto,AddClientError,idServizio }) => {
  // // const componentRef = useRef();
  // // const [pippo,setPippo] = useState(false);
  // if (window.top !== window.self) { window.location.replace('http://localhost:3000/it/tcb_sim');}
  const [state,setState] = useState(false);
  useEffect(()=>{
    graphqlRequest(simulatoreCostoQ({annoRiferimento: moment().year(),idServizio,ore:0,tbo:0}));
  },[graphqlRequest]);
  return (<>
    <Wrapper>
      {simulatoreCosto? 
      <>
      <FiltriSimulatoreTCB simulatoreCosto={simulatoreCosto} />
      <Column md="8" padding="0 2.5rem" margin="1em 0">
        <SimulazioneCosti simulatoreCosto={simulatoreCosto} />
      </Column>
     
      <ButtonWrapper >
        <Row fluid display="flex" justifycontent="space-between" alignitems="center">
          <Column md="6" padding="0 1em" >
        {/* <NavLink to={ `${pathname}/print` } margin="auto" width="100%" > */}
         <Button
            fontSize="f8"
            value="Stampa"
            type="primary"
            onClick={ () => {
              if((parametri.indennita||parametri.pagaProposta||parametri.oreSettimanali)&&!isNullOrUndefined()){
              const frame = document.getElementById('frameSimulatore').contentWindow;
              frame.document.open();
              frame.document.write();
              frame.document.write('<html><style> @page  {size: auto;  margin: 25mm 15mm 25mm 15mm;} div {max-height: none!important; height: auto!important; overflow: visible!important}  hr {color: #058592!important; border-color: #058592!important;}</style><body style="margin: 0; font-size: 1rem; font-weight: normal; font-family: MontSerrat, Arial, Arial, Helvetica, sans-serif; line-height: 1.5; color: #333; background-color: #fff; z-index: 0">');
              //Chiedere.....
              frame.document.write("<img src='"+"' />");
              let json = {};
              if(parametri.indennita){
                 json.indennita = {name: 'Indennita',value: parametri.indennita.value};
              }
              if(parametri.convivenza){
               json.convivenza = {value: parametri.convivenza.value.value, name: 'Convivenza'};
              }
              if(parametri.pagaProposta){
               json.pagaProposta = {name: 'Paga Proposta', value: parametri.pagaProposta};
              }
              if(parametri.oreSettimanali){
                 json.oreSettimanali =  {name: 'Ore Settimanali', value: parametri.oreSettimanali};
              }
              frame.document.write(print(json,'Parametri Selezionati'));
              frame.document.write(print(simulazione.preventivo, 'Ipotesi di preventivo spesa per assistenza familiare'));
              frame.document.write(print(simulazione.prospetto, 'Prospetto di spesa annuale'));
              frame.document.write('</body></html>');
              frame.document.close();
              frame.focus();
              frame.print();
              
          //     setTimeout(function() {
          //       setState(true);
          //  }, .0000000001)
          }
          else{
            AddClientError({message:'Errore nella stampa',modal:true});
          }
          
            }}
          />
          {state?
            <Redirect  to={{
              pathname: "/login"
            }}/>
            :null}
        {/* </NavLink> */}
        </Column>
        <Column md="6" padding="0 1em">
           <Button
            fontSize="f8"
            onClick={() => {
              window.history.go(-1);
              PreventivoLightTCB({preventivoLightTCB: {
                orario: parametri.convivenza? parametri.convivenza.value :{id:-1,value:''},
                contract: parametri.livelli? { id: parametri.livelli.livelliArray.value, value: parametri.livelli.livelliArray.textValue}:{id:-1,value:''},
              }})
            }}
            value="Chiudi"
            type="cancel"
          /> 
          </Column>
    </Row>
      </ButtonWrapper>
      <iframe id="frameSimulatore" style={{border:'none', width: 0, height: 0}}>
    </iframe>
      </>
       :  <Loader  size="2em" margin="0 auto" width="auto"/>}
    </Wrapper>
   
    </>
  )
};

SimulatoreCostoTCB.displayName = 'SimulatoreCostoTCB';

const mapStoreToProps = store =>({
  simulatoreCosto: store.graphql.simulatoreCosto,
  pathname: store.routing.pathname,
  simulazione: store.tcbSim.simulazione,
  parametri: store.tcbSim.parametri,
  preventivoLight: store.requestTCB.preventivoLightTCB
})

const mapDispatchToProps = ({
  graphqlRequest,
  AddClientError,
  PreventivoLightTCB
})

export default connect(mapStoreToProps,mapDispatchToProps)(SimulatoreCostoTCB);
