import React from 'react';
import Text from 'components/ui/Text';
import MultiSelect from 'components/ui/MultiSelect';
import TextArea from 'components/ui/TextArea';
import { Row, Column } from 'components/ui/Grid';
import { connect } from 'react-redux';
import { TCBDispConfig } from 'redux-modules/actions/tcbActions';
import {FormRow} from '../../';

const trovaIndiceAltro = (configDisponibilita) => {
    let trovato = false;
    for (let i = 0; i < configDisponibilita.sistemazioni.length; i += 1)
        if (configDisponibilita.sistemazioni[i].id === 0)
            trovato = true;
    return trovato;
}

const Sistemazione = ({ sistemazioni, locale, TCBDispConfig, configDisponibilita }) => {
    let risultato = configDisponibilita.sistemazioni ? trovaIndiceAltro(configDisponibilita) : false;
    return (
        <>
            {configDisponibilita.tipologiaOrario && configDisponibilita.tipologiaOrario.id === 1 ?
                <FormRow padding="1em 0" flex direction="column" >
                    {/* CONVIVENTE */}
                    <Column xs="12" padding="0" flex justifycontent="space-between">
                        <Row fluid justifycontent="space-between" alignitems="center">
                            <Column xs="12" sm="6" lg="7" padding="0">
                                <Text value="Qual'è la sistemazione offerta?" size="f7" color="darkGrey" tag="p" />
                            </Column>
                            <Column xs="12" sm="5" md="5" lg="4" padding="1em 0 0">
                                <MultiSelect
                                    material
                                    name="Sistemazione"
                                    items={sistemazioni ? sistemazioni.map(elemento => ({
                                        value: elemento.idSistemazione,
                                        textValue: elemento.txSistemazione[locale]
                                    })) : []}
                                    intlFormatter
                                    intlPlaceholder=""
                                    getValue={(value) => { TCBDispConfig({ ...configDisponibilita, sistemazioni: value }) }}

                                />
                                {/* CONVIVENTE */}
                            </Column>
                        </Row>
                        <Row>
                            {risultato ?
                                <Column padding="1em 0">
                                    <TextArea width="70%" material name="Note Aggiuntive"
                                        intlPlaceholder="Scrivi qui" size="f7" />
                                </Column> : null}
                        </Row>
                    </Column>

                </FormRow>

                : null}
        </>)
};
Sistemazione.displayName = ' Sistemazione';
const mapStoreToProps = store => ({
    sistemazioni: store.graphql.infoDisponibilita &&  store.graphql.infoDisponibilita.EstraiSistemazione,
    locale: store.locale,
    configDisponibilita: store.requestTCB.configDisponibilita
});
const mapDispatchToProps = ({
    TCBDispConfig
})
export default connect(mapStoreToProps, mapDispatchToProps)(Sistemazione);


