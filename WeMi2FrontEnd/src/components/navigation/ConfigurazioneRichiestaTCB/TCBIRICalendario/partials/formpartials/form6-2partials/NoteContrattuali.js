
import React from 'react';
import { connect } from 'react-redux';
import { TCBDispConfig,TCBMenuNavigazione } from 'redux-modules/actions/tcbActions';
import TextArea from 'components/ui/TextArea';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import { cercaValore, attributi } from '../../../utils';

const NoteContrattuali = ({
    disponibilita,
    TCBMenuNavigazione,
    menuNavigazione,
    configDisponibilita,
    TCBDispConfig,
}) => (
    <Column padding="0">
    <Row>
        <Text value="Vuole aggiungere altro sul contratto e su orario di lavoro?" size="f7" color="darkGrey" tag="p"/>
    </Row>
    <Row fluid padding="1em 0" alignitems="center" flex>
        <Column xs="10" padding="0">
               <TextArea 
                material
                intlPlaceholder="Note"
                name="Note"
                initialValue={configDisponibilita.notaContrattuale? configDisponibilita.notaContrattuale: 
                    cercaValore(disponibilita,attributi.TX_NOTE_SU_CONTRATTO.cd_attributo)!==null? 
                    cercaValore(disponibilita,attributi.TX_NOTE_SU_CONTRATTO.cd_attributo) : ''
                }
                intlFormatter
                getValue={(value)=>{
                    TCBDispConfig({...configDisponibilita,notaContrattuale: value});
                    TCBMenuNavigazione({...menuNavigazione, unsaved:true});
                    }
                }
               />
               </Column>
    </Row>
    </Column>
    
);

NoteContrattuali.displayName = 'NoteContrattuali';

const mapDispatchToProps = ({
    TCBDispConfig,
    TCBMenuNavigazione
});

const mapStoreToProps = store => ({
    locale: store.locale,
    menuNavigazione: store.requestTCB.menuNavigazione,
    configDisponibilita: store.requestTCB.configDisponibilita
});


export default connect(mapStoreToProps,mapDispatchToProps)(NoteContrattuali);