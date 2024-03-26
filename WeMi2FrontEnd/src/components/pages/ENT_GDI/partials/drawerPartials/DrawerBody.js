
/** @format */

import React from 'react';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import NavLink from 'components/router/NavLink';
import Button from 'components/ui/Button';
import Text from 'components/ui/Text';
import { connect } from 'react-redux';
import { addCart } from 'redux-modules/actions/cartActions';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { entePK as entePKQ } from '../../enteGraphQL';

const StyledColumn = styled(Column)`
 p {
  text-align: left;
 } 

`;

const DrawerBody = ({ bodyValue, graphqlRequest,EstraiListaEnte }) => {
    //const [controllo,setControllo]=useState(false)
    
    


    const { riga, handleBlock, handlePublish,Valida } = bodyValue && bodyValue;
     

    // useEffect(()=>{

    //     if(EstraiListaEnte)
    //     EstraiListaEnte.map((el)=>{
            
    //     if(el.id_ente==riga.id_ente && el.accreditato){
            
    //         setControllo(true)
    //     }
    //     })
    // },[])

   
    
    return (
        <Row padding="3em" fluid>

            {riga.cd_stato_ente == 1  ?
                <Row fluid justifycontent="space-between" alignitems="center" display="flex">
          <StyledColumn  xs="5" padding="1em 0 0" >
                        <Text
                            tag="p"
                            align="left!important"
                            size="f7"
                            value="Accredita l'ente"
                        />
                    </StyledColumn>
                    <StyledColumn  xs="6" lg="5" padding="1em 0 0">
                        <Button intlFormatter weight="normal" name={riga.id_ente}
                            onClick={(event) => { handlePublish.bind(this); handlePublish(event) }} value="Accredita" />

                    </StyledColumn>
                </Row> : null}

            {riga.cd_stato_ente > 1 &&riga.cd_stato_ente != 4   ?
                <Row fluid justifycontent="space-between" alignitems="center" display="flex">
                 <StyledColumn  xs="5" padding="1em 0 0" >
                        <Text
                            tag="p"
                            align="left!important"
                            size="f7"
                            value="Scegli se accreditare o disattivare l'ente"
                        />
                    </StyledColumn>
                    <StyledColumn  xs="6" lg="5" padding="1em 0 0">
                        <Button intlFormatter weight="normal" name={riga.id_ente}
                            type={
                                riga.cd_stato_ente == 2 || riga.cd_stato_ente==21 || riga.cd_stato_ente==31||riga.cd_stato_ente==22 ||riga.cd_stato_ente==30? 'cancel' : 'accept'
                            }
                            onClick={riga.cd_stato_ente == 2 || riga.cd_stato_ente==21 || riga.cd_stato_ente==31 ||riga.cd_stato_ente==22 ||riga.cd_stato_ente==30?
                                (event) => { handleBlock.bind(this); handleBlock(event) } : (event) => { handlePublish.bind(this); handlePublish(event) }
                            } value={riga.cd_stato_ente == 2|| riga.cd_stato_ente==21 || riga.cd_stato_ente==31 ||riga.cd_stato_ente==22 ||riga.cd_stato_ente==30? 'Disattiva' : 'Accredita'} />

                    </StyledColumn>
                </Row> : null}
              
                { riga.cd_stato_ente==1?
                <Row fluid justifycontent="space-between" alignitems="center" display="flex">
                <StyledColumn  xs="5" padding="1em 0 0" >
                       <Text
                           tag="p"
                           align="left!important"
                           size="f7"
                           value="Disattivare l'ente"
                       />
                   </StyledColumn>
                   <StyledColumn  xs="6" lg="5" padding="1em 0 0">
                       <Button intlFormatter weight="normal" name={riga.id_ente}
                           type={
                            'cancel' 
                           }
                           onClick={
                               (event) => { handleBlock.bind(this); handleBlock(event) } }
                           value={ 'Disattiva' } />

                   </StyledColumn>
               </Row>
                
                :null

                }

                { riga.cd_stato_ente==22 ?
                 <Row fluid justifycontent="space-between" alignitems="center" display="flex">
                 <StyledColumn  xs="5" padding="1em 0 0" >
                               <Text
                                   tag="p"
                                   align="left!important"
                                   size="f7"
                                   value="Valida l'ente"
                               />
                           </StyledColumn>
                           <StyledColumn  xs="6" lg="5" padding="1em 0 0">
                               <Button intlFormatter 
                                       weight="normal" 
                                       name={riga.id_ente}   
                                       onClick={ Valida } 
                                       value="Valida" />
       
                           </StyledColumn>
                       </Row>
                
                :null

                }

                <Row fluid justifycontent="space-between" alignitems="center" display="flex">
                    <StyledColumn xs="5" padding="1em 0 0" >
                        <Text
                            tag="p"
                            align="left!important"
                            size="f7"
                            value="Modifica dati identificativi ente"
                        />
                    </StyledColumn>
                    <StyledColumn  xs="6" lg="5" padding="1em 0 0">
                        <NavLink margin="0" width="100%" to={`/admin/gestioneEnte/${riga.id_ente}/SchedaServiziEnte/DatiEnte`}>
                            <Button
                                name={riga.id_ente}
                                onClick={() => {
                                    graphqlRequest(entePKQ(riga.id_ente));
                                    sessionStorage.setItem('occorenza', riga.id_ente);
                                }}
                                intlFormatter weight="normal" value='Modifica' />
                        </NavLink>
                    </StyledColumn>
                </Row>
            
{ riga.cd_stato_ente!=1  && riga.cd_stato_ente!=2 &&riga.cd_stato_ente!=30 ?
                <Row fluid justifycontent="space-between" alignitems="center" display="flex">
                <StyledColumn xs="5" padding="1em 0 0" >
                    <Text
                        tag="p"
                        align="left!important"
                        size="f7"
                        value="Accedi alla scheda dell'ente"
                    />
                </StyledColumn>
                <StyledColumn  xs="6" lg="5" padding="1em 0 0">
                    <NavLink width="100%" to={`/admin/gestioneEnte/${riga.id_ente}/SchedaEnte`} name={riga.id_ente}
                    //onClick={() => { handleUpdateRow.bind(this) }}
                    >
                        <Button intlFormatter weight="normal"
                            value="Scheda Ente"
                        />
                    </NavLink>
                </StyledColumn>
            </Row>
            : null
            }
{ (riga.accreditato || riga.cd_stato_ente==31 )&&
            <Row fluid justifycontent="space-between" alignitems="center" display="flex">
                <StyledColumn xs="5" padding="1em 0 0" >
                    <Text
                        tag="p"
                        align="left!important"
                        size="f7"
                        value="Accedi alla lista servizi erogati dall'ente"
                    />
                </StyledColumn>
                <StyledColumn  xs="6" lg="5" padding="1em 0 0">
                    <NavLink width="100%" to={`/admin/GestioneEnte/${riga.id_ente}/SchedaServiziEnte`}>
                        <Button name={riga.id_ente}
                            //onClick={(event) => { handleUpdateRow.bind(this); handleUpdateRow(event) }}
                            intlFormatter weight="normal"
                            value='Scheda Servizi' />
                    </NavLink>
                </StyledColumn>
            </Row>
         }
        </Row>
    )
};

DrawerBody.displayName = 'DrawerBody';

const mapStoreToProps = store => ({
    locale: store.locale,
    EstraiListaEnte:store.graphql.EstraiListaEnte
});

const mapDispatchToProps = {
    addCart,
    graphqlRequest,
};

export default connect(mapStoreToProps, mapDispatchToProps)(DrawerBody);




