/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import TextArea from 'components/ui/TextArea';
import SmartCheckbox from 'components/ui/SmartCheckbox';
import { Row, Column } from 'components/ui/Grid';
import { connect } from 'react-redux';
import { TCBDispConfig, TCBMenuNavigazione } from 'redux-modules/actions/tcbActions';

const TrasferteBrevi = ({
    TCBMenuNavigazione,
    menuNavigazione,
    TCBDispConfig,
    configDisponibilita,
}) => {
    return (

        <Column xs="12" padding="1em 0">
            <Row flex fluid alignitems="center" justifycontent="space-between" margin=".5em 0">
                <Column xs="9" padding="0">
                    <Text value="Trasferte brevi (specificare)" size="f7" color="darkGrey" tag="p" />
                </Column>
                <Column xs="3" padding="0" flex justifycontent="flex-end">
                <SmartCheckbox
                    value={configDisponibilita.trasferteBrevi}
                    onChange={value =>
                        TCBDispConfig({ ...configDisponibilita, trasferteBrevi: value })
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
                configDisponibilita.trasferteBrevi ?
                <Row fluid padding="1em 0">
                    <Column xs="12" md="9" padding="0">
                        <TextArea
                            material
                            width="inherit"
                            intlPlaceholder="Note"
                            name="Note"
                            initialValue={configDisponibilita.notaTrasferteBrevi}
                            intlFormatter
                            getValue={(value) =>{
                                TCBDispConfig({ ...configDisponibilita, notaTrasferteBrevi: value });
                                TCBMenuNavigazione({ ...menuNavigazione, unsaved:true });
                            }}
                        />
                    </Column>
                </Row> :
                null
            }
        </Column>
    );
}


TrasferteBrevi.displayName = 'TrasferteBrevi';
const mapDispatchToProps = ({
    TCBDispConfig,
    TCBMenuNavigazione,
});

const mapStoreToProps = store => ({
    locale: store.locale,
    menuNavigazione: store.requestTCB.menuNavigazione,
    configDisponibilita: store.requestTCB.configDisponibilita,
})
export default connect(mapStoreToProps, mapDispatchToProps)(TrasferteBrevi);
