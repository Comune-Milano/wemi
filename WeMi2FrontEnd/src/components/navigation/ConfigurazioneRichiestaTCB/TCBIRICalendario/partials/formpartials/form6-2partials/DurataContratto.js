 /** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import DatePicker from 'components/ui/InputDayPicker';
import { connect } from 'react-redux';
import { TCBDispConfig, TCBMenuNavigazione } from 'redux-modules/actions/tcbActions';
import { cercaValore, attributi } from '../../../utils';

const DurataContratto = ({disponibilita,TCBMenuNavigazione,menuNavigazione,TCBDispConfig,configDisponibilita }) => {
    
    return (
             
            <Row fluid padding="1em 0" alignitems="center" justifycontent="space-between" flex>
                <Column xs="6" fluid padding="0em 1em 0em 0em">
                    <DatePicker
                        placeholder="Dal giorno"
                        material
                        selectedDay={configDisponibilita.from? configDisponibilita.from : 
                            cercaValore(disponibilita,attributi.DT_DATA_CONTRATTO_DA.cd_attributo)!==null? 
                            cercaValore(disponibilita,attributi.DT_DATA_CONTRATTO_DA.cd_attributo) : ''
                        
                        
                        }
                        handleDayChange={(day)=>{
                            TCBDispConfig({...configDisponibilita,from:day});
                            // TCBMenuNavigazione({...menuNavigazione, unsaved:true});
                        }}
                    />
                </Column>

                <Column xs="6" fluid padding="0em 0em 0em 1em">
                    <DatePicker
                        placeholder="Al giorno"
                        material
                        selectedDay={configDisponibilita.to? configDisponibilita.to : 
                            cercaValore(disponibilita,attributi.DT_DATA_CONTRATTO_A.cd_attributo)!==null? 
                            cercaValore(disponibilita,attributi.DT_DATA_CONTRATTO_A.cd_attributo) : ''
                        
                        }
                        handleDayChange={(day)=>{
                                TCBDispConfig({...configDisponibilita,to:day});
                                TCBMenuNavigazione({...menuNavigazione, unsaved:true});
                        }}
                    />
                </Column>
            </Row>
            
    );
}


DurataContratto.displayName = 'DurataContratto';

const mapDispatchToProps = ({
    TCBDispConfig,
    TCBMenuNavigazione
});

const mapStoreToProps = store => ({
    locale: store.locale,
    menuNavigazione: store.requestTCB.menuNavigazione,
    configDisponibilita: store.requestTCB.configDisponibilita
})
export default connect(mapStoreToProps, mapDispatchToProps)(DurataContratto);