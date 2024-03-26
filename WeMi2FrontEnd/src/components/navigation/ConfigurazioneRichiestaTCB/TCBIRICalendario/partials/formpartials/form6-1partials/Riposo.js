import React,{useEffect} from 'react';
import Text from 'components/ui/Text';
import MultiSelect from 'components/ui/MultiSelect';
import { Row, Column } from 'components/ui/Grid';
import { connect } from 'react-redux';
import { TCBDispConfig,TCBMenuNavigazione } from 'redux-modules/actions/tcbActions';
import {FormRow} from '../../';
import {attributi,cercaArray} from '../../../utils';
import { isNullOrUndefined } from 'util';



const Riposo = ({disponibilita, menuNavigazione,configDisponibilita, locale, giorniSettimana, TCBDispConfig }) => {
  let risultatiRiposo = cercaArray(disponibilita,attributi.LS_MEZZA_GIORNATA_CONVIVENTE.cd_attributo)
  // useEffect(() => {
  //   if(disponibilita)
  //     TCBDispConfig({ ...configDisponibilita, giorniSettimana: risultatiRiposo })
  // }, [disponibilita]);
  return(
  <>
    {configDisponibilita.tipologiaOrario && configDisponibilita.tipologiaOrario.id === 1 ?
      <FormRow padding="1em 0" flex direction="column" >
        {/* CONVIVENTE */}
        <Column xs="12" padding="0" flex justifycontent="space-between">
          <Row fluid justifycontent="space-between" alignitems="center">
            <Column xs="12" sm="6" lg="7" padding="0">
              <Text value="Hai delle preferenze sulla mezza giornata di riposo?" size="f7" color="darkGrey" tag="p" />
            </Column>
            <Column xs="12" sm="5" md="5" lg="4" padding="1em 0 0">
              <MultiSelect
                required
                material
                name="Giorni della settimana"
                items={giorniSettimana ? giorniSettimana.map(elemento => ({
                  value: elemento.idGiorno,
                  textValue: elemento.txGiorno[locale]
                })) :  []
                }
                selectedArrDefault={
                  configDisponibilita.giorniSettimana?
                  configDisponibilita.giorniSettimana :  
                  risultatiRiposo!==null? 
                  risultatiRiposo : []
                }
                intlFormatter
                intlPlaceholder=""
                getValue={(value) => { 
                  TCBDispConfig({ ...configDisponibilita, giorniSettimana: value});
                  TCBMenuNavigazione({...menuNavigazione, unsaved:1});
                }}
              />
              {/* CONVIVENTE */}
            </Column>
          </Row>
        </Column>

      </FormRow>

      : null}

  </>)};
Riposo.displayName = ' Riposo';
const mapStoreToProps = store => ({
  giorniSettimana: store.graphql.infoDisponibilita && store.graphql.infoDisponibilita.EstraiGiorniSettimana,
  locale: store.locale,
  configDisponibilita: store.requestTCB.configDisponibilita,
  menuNavigazione: store.requestTCB.menuNavigazione
});
const mapDispatchToProps = ({
  TCBDispConfig,
  TCBMenuNavigazione
})
export default connect(mapStoreToProps, mapDispatchToProps)(Riposo);