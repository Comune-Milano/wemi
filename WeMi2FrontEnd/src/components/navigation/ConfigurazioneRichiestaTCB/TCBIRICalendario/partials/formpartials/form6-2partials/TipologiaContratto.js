/** @format */

import React, { useEffect } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Select from 'components/ui/Select';
import { connect } from 'react-redux';
import { TCBDispConfig, TCBMenuNavigazione } from 'redux-modules/actions/tcbActions';
import { cercaValore, attributi } from '../../../utils';
import { isNullOrUndefined } from 'util';

const TipologiaContratto = ({ disponibilita, menuNavigazione, TCBMenuNavigazione, TCBDispConfig, configDisponibilita, tipologiaContratto, locale }) => {
    let valoreDBTipologiaContratto = cercaValore(disponibilita, attributi.CD_TIPOLOGIA_CONTRATTO.cd_attributo)
    //   useEffect(() => {
    //     if(disponibilita)
    //       TCBDispConfig({ ...configDisponibilita, tipoContratto: valoreDBTipologiaContratto })
    //   }, [disponibilita])
    return (
        <Column xs="12" padding="0" >
            <Row >
                <Text value="Che tipologia di contratto vuole proporre?" size="f7" color="darkGrey" />
            </Row>
            <Row fluid padding="1em 0" alignitems="center" flex>
                <Select
                    required
                    material
                    reset
                    name="Tipologia contratto"
                    labelSelected="tipologia orario"
                    items={tipologiaContratto ? tipologiaContratto.map(elemento => ({ value: elemento.idContratto, textValue: elemento.txContratto[locale] })) : []}
                    intlFormatter
                    intlPlaceholder="Tipologia contratto"
                    getValue={(value) => {
                        TCBDispConfig({ ...configDisponibilita, tipoContratto: value });
                        if (value.id !== -1)
                            TCBMenuNavigazione({ ...menuNavigazione, unsaved: 4 });
                        else
                            TCBMenuNavigazione({ ...menuNavigazione, unsaved: undefined });
                    }
                    }
                    selectedValue={configDisponibilita.tipoContratto ?
                        configDisponibilita.tipoContratto :
                        valoreDBTipologiaContratto !== null ?
                            valoreDBTipologiaContratto : {}

                    }
                />
            </Row>

        </Column>
    );
}


TipologiaContratto.displayName = 'TipologiaContratto';

const mapDispatchToProps = ({
    TCBDispConfig,
    TCBMenuNavigazione
});

const mapStoreToProps = store => ({
    locale: store.locale,
    menuNavigazione: store.requestTCB.menuNavigazione,
    configDisponibilita: store.requestTCB.configDisponibilita,
    tipologiaContratto: store.graphql.infoDisponibilita && !isNullOrUndefined(store.graphql.EstraiDatiDisponibilita.EstraiDatiConfigurazioneRichiestaDisponibilita) && store.graphql.infoDisponibilita.EstraiTipologiaContratto
})
export default connect(mapStoreToProps, mapDispatchToProps)(TipologiaContratto);