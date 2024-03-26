/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import TextArea from 'components/ui/TextArea';
import SmartCheckbox from 'components/ui/SmartCheckbox';
import { Row, Column } from 'components/ui/Grid';
import { connect } from 'react-redux';
import { TCBDispConfig, TCBMenuNavigazione } from 'redux-modules/actions/tcbActions';

const TrasferteLunghe = ({
    TCBMenuNavigazione,
    menuNavigazione,
    TCBDispConfig,
    configDisponibilita
}) => {
    return (

        <Column xs="12" padding="1em 0">
            <Row flex fluid alignitems="center" justifycontent="space-between" margin=".5em 0">
                <Column xs="9" padding="0">
                    <Text value="Trasferte Lunghe (specificare)" size="f7" color="darkGrey" tag="p" />
                </Column>
                <Column xs="3" padding="0" flex justifycontent="flex-end">

                    <SmartCheckbox
                        value={configDisponibilita.trasferteLunghe}
                        onChange={value =>
                            TCBDispConfig({ ...configDisponibilita, trasferteLunghe: value })
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
                configDisponibilita.trasferteLunghe ?
                <Row fluid padding="1em 0">
                    <Column xs="12" md="9" padding="0">
                        <TextArea
                            material
                            width="inherit"
                            intlPlaceholder="Note"
                            name="Note"
                            initialValue={configDisponibilita.notaTrasferteLunghe}
                            intlFormatter
                            getValue={(value) =>{ 
                                TCBDispConfig({ ...configDisponibilita, notaTrasferteLunghe: value });
                                TCBMenuNavigazione({...menuNavigazione, unsaved:true});
                            }}
                        />
                    </Column>
                </Row> :
                null
            }
        </Column>
    );
}


TrasferteLunghe.displayName = 'TrasferteLunghe';
const mapDispatchToProps = ({
    TCBDispConfig,
    TCBMenuNavigazione
});

const mapStoreToProps = store => ({
    locale: store.locale,
    menuNavigazione: store.requestTCB.menuNavigazione,
    configDisponibilita: store.requestTCB.configDisponibilita
})
export default connect(mapStoreToProps, mapDispatchToProps)(TrasferteLunghe);
