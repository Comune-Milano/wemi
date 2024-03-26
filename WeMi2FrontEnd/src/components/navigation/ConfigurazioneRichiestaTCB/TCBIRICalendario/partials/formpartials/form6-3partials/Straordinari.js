/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import TextArea from 'components/ui/TextArea';
import SmartCheckbox from 'components/ui/SmartCheckbox';
import { Row, Column } from 'components/ui/Grid';
import { connect } from 'react-redux';
import { TCBDispConfig, TCBMenuNavigazione } from 'redux-modules/actions/tcbActions';

const Straordinari = ({
    TCBMenuNavigazione,
    menuNavigazione,
    TCBDispConfig,
    configDisponibilita
}) => {
    return (

        <Column xs="12" padding="1em 0">
            <Row flex fluid alignitems="center" justifycontent="space-between" margin=".5em 0">
                <Column xs="9" padding="0">
                    <Text value="Disponibilità a fare straordinari" size="f7" color="darkGrey" tag="p" />
                </Column>
                <Column xs="3" padding="0" flex justifycontent="flex-end">

                    <SmartCheckbox
                        value={configDisponibilita.straordinari}
                        onChange={value =>
                            TCBDispConfig({ ...configDisponibilita, straordinari: value })
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
                configDisponibilita.straordinari ?
                <Row fluid padding="1em 0">
                    <Column xs="12" md="9" padding="0">
                        <TextArea
                            material
                            width="inherit"
                            intlPlaceholder="Note"
                            name="Note"
                            initialValue={configDisponibilita.notaStraordinari}
                            intlFormatter
                            getValue={(value) => {
                                TCBDispConfig({ ...configDisponibilita, notaStraordinari: value });
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


Straordinari.displayName = 'Straordinari';
const mapDispatchToProps = ({
    TCBDispConfig,
    TCBMenuNavigazione
});

const mapStoreToProps = store => ({
    locale: store.locale,
    configDisponibilita: store.requestTCB.configDisponibilita,
    menuNavigazione: store.requestTCB.menuNavigazione
})
export default connect(mapStoreToProps, mapDispatchToProps)(Straordinari);