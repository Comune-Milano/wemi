import React from 'react';
import Text from 'components/ui/Text';
import Select from 'components/ui/Select';
import { Row, Column } from 'components/ui/Grid';
import { connect } from 'react-redux';
import { TCBDispConfig, TCBMenuNavigazione } from 'redux-modules/actions/tcbActions';
import { FormRow } from '../..';
import { servizioSelezionato, cercaValore, attributi } from '../../../utils';

const TipologiaOrario = ({ disponibilita, tipologiaOrario, locale, TCBDispConfig, menuNavigazione, TCBMenuNavigazione, configDisponibilita }) => (
  <>
    <FormRow padding="1em 0" flex direction="column" >
      {/* SEMPRE VISIBILI */}
      <Column xs="12" padding="0" flex justifycontent="space-between">
        <Row fluid justifycontent="space-between" alignitems="center">
          <Column xs="12" sm="6" lg="7" padding="0">
            <Text value={`Quale orario di lavoro dovrà fare la ${servizioSelezionato()}?`} size="f7" color="darkGrey" tag="p" />
          </Column>
          <Column xs="12" sm="5" md="5" lg="5" padding="1em 0 0">
            <Select
              required
              material
              reset
              maxLength="15"
              name="Tipologia orario"
              labelSelected="tipologia orario"
              items={tipologiaOrario ? tipologiaOrario.map(elemento => ({
                value: elemento.cd_dominio_tcb,
                textValue: elemento.tl_valore_testuale[locale]
              })) : []}
              intlFormatter
              getValue={(value) => {
                TCBDispConfig({ ...configDisponibilita, tipologiaOrario: value })
                TCBMenuNavigazione({ ...menuNavigazione, unsaved: true });
              }
              }
              selectedValue={configDisponibilita.tipologiaOrario ? configDisponibilita.tipologiaOrario :
                cercaValore(disponibilita, attributi.CD_ORARIO_LAVORO.cd_attributo) !== null ?
                  cercaValore(disponibilita, attributi.CD_ORARIO_LAVORO.cd_attributo) : {}

              }
            />
            {/* SEMPRE VISIBILI */}
          </Column>
        </Row>
      </Column>
    </FormRow>
  </>
);
TipologiaOrario.displayName = ' TipologiaOrario';
const mapStoreToProps = store => ({
  tipologiaOrario: store.graphql.infoDisponibilita && store.graphql.infoDisponibilita.tipoOrarioLavoroAll,
  locale: store.locale,
  configDisponibilita: store.requestTCB.configDisponibilita,
  menuNavigazione: store.requestTCB.menuNavigazione
});
const mapDispatchToProps = ({
  TCBDispConfig,
  TCBMenuNavigazione
})
export default connect(mapStoreToProps, mapDispatchToProps)(TipologiaOrario);