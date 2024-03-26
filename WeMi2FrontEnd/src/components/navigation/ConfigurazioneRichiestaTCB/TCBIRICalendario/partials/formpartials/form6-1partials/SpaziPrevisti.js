import React,{useEffect} from 'react';
import Text from 'components/ui/Text';
import MultiSelect from 'components/ui/MultiSelect';
import { Row, Column } from 'components/ui/Grid';
import { connect } from 'react-redux';
import { TCBDispConfig,TCBMenuNavigazione } from 'redux-modules/actions/tcbActions';
import {FormRow} from '../../';
import {servizioSelezionato,attributi,cercaArray} from '../../../utils';
import { isNullOrUndefined } from 'util';



const SpaziPrevisti = ({ disponibilita,menuNavigazione,spaziPrevisti, locale, TCBDispConfig, configDisponibilita }) => {
   let risultatiSpazio = cercaArray(disponibilita,attributi.LS_SPAZI_CONVIVENTE.cd_attributo);
   return (
   <>
      {configDisponibilita.tipologiaOrario && (configDisponibilita.tipologiaOrario.id === 2 || configDisponibilita.tipologiaOrario.id === 1) ?
         <FormRow padding="1em 0" flex direction="column" >
            {/* CONVINVENZA RIDOTTA */}
            <Column xs="12" padding="0" flex justifycontent="space-between">
               <Row fluid justifycontent="space-between" alignitems="center">
                  <Column xs="12" sm="6" lg="7" padding="0">
                     <Text value={`Quali sono gli spazi previsti per la ${servizioSelezionato()}?`} size="f7" color="darkGrey" />
                  </Column>
                  <Column xs="12" sm="5" md="5" lg="4" padding="1em 0 0">
                 
                     <MultiSelect
                        material
                        maxLengthChip={12}
                        required={configDisponibilita.tipologiaOrario.id!==1? true : false}
                        name="Spazi assistente"
                        items={spaziPrevisti? spaziPrevisti.map(elemento=>({value: elemento.idSpazioPrevisto, textValue: elemento.txSpazioPrevisto[locale]})): []}
                        intlFormatter
                        intlPlaceholder=""
                        selectedArrDefault={configDisponibilita.spaziPrevisti?
                            configDisponibilita.spaziPrevisti :  
                            risultatiSpazio!==null? 
                            risultatiSpazio : []}
                        getValue={(value)=>{
                           TCBDispConfig({...configDisponibilita,spaziPrevisti: value})
                           TCBMenuNavigazione({...menuNavigazione, unsaved:2});
                        }}                    
                         />
                     {/* CONVINVENZA RIDOTTA */}
                  </Column>
               </Row>

            </Column>

         </FormRow>

         : null}
   </>)};
SpaziPrevisti.displayName = ' SpaziPrevisti';
const mapStoreToProps = store => ({
   spaziPrevisti: store.graphql.infoDisponibilita && store.graphql.infoDisponibilita.EstraiSpaziPrevisti,
   locale: store.locale,
   configDisponibilita: store.requestTCB.configDisponibilita,
   menuNavigazione: store.requestTCB.menuNavigazione
});
const mapDispatchToProps = ({
   TCBDispConfig,
   TCBMenuNavigazione
})
export default connect(mapStoreToProps, mapDispatchToProps)(SpaziPrevisti);