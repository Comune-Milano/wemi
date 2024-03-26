/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import TextArea from 'components/ui/TextArea';
import SmartCheckbox from 'components/ui/SmartCheckbox';
import { Row, Column } from 'components/ui/Grid';
import {servizioSelezionato} from '../../../utils';
import { connect } from 'react-redux';
import { TCBDispConfig, TCBMenuNavigazione } from 'redux-modules/actions/tcbActions';
import { isNullOrUndefined } from 'util';


const DisponibilitaVacanzaBambino = ({
    TCBDispConfig,
    TCBMenuNavigazione,
    menuNavigazione,
    configDisponibilita,
}) => {
    return (
       
          <Column xs="12" padding="1em 0">
          {servizioSelezionato()!=='colf' ? 
          <>
        
          <Row flex fluid alignitems="center" justifycontent="space-between" margin=".5em 0">
          <Column  xs="9" padding="0">
          <Text value="Disponibilità ad andare in vacanza con l'assistito/bambino" size="f7" color="darkGrey" tag="p"/>
          </Column>
          <Column  xs="3" padding="0" flex justifycontent="flex-end">
            <SmartCheckbox
                value={configDisponibilita.disponibilitaVacanzaBambino}
                onChange={value =>
                    TCBDispConfig({ ...configDisponibilita, disponibilitaVacanzaBambino: value })
                }
                boxWidth="1.2em"
                boxHeight="1.2em"
                fontSize="f7"
                type="checkbox"
                checkcolor="primary"
                bordercolor="primary"
            />
        </Column>
      </Row>
      
     { 
        configDisponibilita.disponibilitaVacanzaBambino ?
     <Row fluid padding="1em 0">
         <Column xs="12" md="9" padding="0">
        <TextArea 
           material
           width="inherit"
           intlPlaceholder="Note"
           name="Note"
           initialValue={configDisponibilita.notaDisponibilitaVacanzaBambino}
           intlFormatter
           getValue={(value)=>{
                TCBDispConfig({...configDisponibilita,notaDisponibilitaVacanzaBambino:value});
                TCBMenuNavigazione({...menuNavigazione, unsaved:true});
            }}
          />
          </Column>
      </Row> 
      : null }
          </>
          : null}
          
          </Column>
    );
}


DisponibilitaVacanzaBambino.displayName = 'DisponibilitaVacanzaBambino';
const mapDispatchToProps = ({
    TCBDispConfig,
    TCBMenuNavigazione
});

const mapStoreToProps = store => ({
    locale: store.locale,
    menuNavigazione: store.requestTCB.menuNavigazione,
    configDisponibilita: store.requestTCB.configDisponibilita
})

export default connect(mapStoreToProps,mapDispatchToProps)(DisponibilitaVacanzaBambino);
