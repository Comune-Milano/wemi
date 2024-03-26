import React, { useEffect } from 'react';
import Text from 'components/ui/Text';
import Select from 'components/ui/Select';
import { Row, Column } from 'components/ui/Grid';
import { connect } from 'react-redux';
import { TCBDispConfig,TCBMenuNavigazione } from 'redux-modules/actions/tcbActions';
import { FormRow } from '../../';
import { cercaValoreStipendio } from '../../../utils';
import { isNullOrUndefined } from 'util';






const Stipendio = ({ disponibilita,menuNavigazione,TCBMenuNavigazione, stipendio, locale, TCBDispConfig, configDisponibilita }) => {
  let valoreDatabaseStipendio = cercaValoreStipendio(disponibilita, configDisponibilita.tipologiaOrario)

  return (<>
    {configDisponibilita.tipologiaOrario && configDisponibilita.tipologiaOrario.id !== -1 ?
      <FormRow padding="1em 0" flex direction="column" >
        {/* CONVIVENTE, CONVIVENZA RIDOTTA, NON CONVIVENTE, WEEKEND, ASSISTENZA NOTTURNA  */}
        <Column xs="12" padding="0" flex justifycontent="space-between">
          <Row fluid justifycontent="space-between" alignitems="center">
            <Column xs="12" sm="6" lg="7" padding="0">
              <Text value="Qual'è lo stipendio proposto?" size="f7" color="darkGrey" tag="p" />
            </Column>
            <Column xs="12" sm="5" md="5" lg="4" padding="1em 0 0">
              <Select
                reset
                required
                material
                name="Stipendio"
                labelSelected="stipendio"
                items={stipendio ? stipendio.map(elemento => ({
                  value: elemento.idStipendio,
                  textValue: elemento.valStipendio[locale]
                })) : []}
                intlFormatter
                intlPlaceholder=""
                selectedValue={configDisponibilita.stipendio ? configDisponibilita.stipendio :
                  valoreDatabaseStipendio !== null ? valoreDatabaseStipendio
                    : {}
                }
                getValue={(value) => { 
                  TCBDispConfig({ ...configDisponibilita, stipendio: value })
                  TCBMenuNavigazione({...menuNavigazione, unsaved:3});
                }}

              />
              {/* CONVIVENTE, CONVIVENZA RIDOTTA, NON CONVIVENTE, WEEKEND, ASSISTENZA NOTTURNA  */}
            </Column>
          </Row>
        </Column>
      </FormRow>
      : null}

  </>);
}
Stipendio.displayName = ' Stipendio';
const mapStoreToProps = store => ({
  stipendio: store.graphql.infoDisponibilita && store.graphql.infoDisponibilita.EstraiFasceStipendio,
  locale: store.locale,
  configDisponibilita: store.requestTCB.configDisponibilita,
  menuNavigazione: store.requestTCB.menuNavigazione
});
const mapDispatchToProps = ({
  TCBDispConfig,
  TCBMenuNavigazione
})
export default connect(mapStoreToProps, mapDispatchToProps)(Stipendio);


