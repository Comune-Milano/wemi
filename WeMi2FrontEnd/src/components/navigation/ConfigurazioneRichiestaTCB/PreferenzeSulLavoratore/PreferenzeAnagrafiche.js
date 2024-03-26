/** @format */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Text from 'components/ui/Text';
import GroupFieldTitle from '../partials/GroupFieldTitle';
import FieldTitle from '../partials/FieldTitle';
import { getTCBServiceName } from '../utils';
import FadeInWrapper from '../partials/FadeInWrapper';
import { Row, Column } from 'components/ui/Grid';
import Checkbox from 'components/ui2/Checkbox';

const PreferenzeAnagrafiche = ({
  sesso,
  dataset,
  setFormField,
  eta,
  locale,
  estraiDatiInizializzazione
}) => {
  useEffect(() => {
    estraiDatiInizializzazione.forEach(element => {
      if (element.cd_attributo === 17) {
        setFormField('sesso_' + element.cd_val_attributo, true)
      }
      if (element.cd_attributo === 16) {
        setFormField('eta_' + element.cd_val_attributo, true)
      }
    });
  }, [])

  return (
    <>
      <GroupFieldTitle
        title={`Preferenze anagrafiche`}
        marginTop="0"
      />
      <Row fluid>
        <Column xs="6" md="4" padding='0 0 1em 0' sizepadding={{ md: "0" }}>
          {sesso.map((ele, i) => {
            return (
              <div key={'sesso_' + ele.cdDominioTcb}>
                <Checkbox
                  value={dataset['sesso_' + ele.cdDominioTcb]}
                  onChange={(value) => { setFormField('sesso_' + ele.cdDominioTcb, value) }}
                  label={ele.tlValoreTestuale[locale]}
                  checkcolor={'primary'}
                  width="auto"
                />
              </div>

            )
          })}
        </Column>
        <Column xs="6" md="8" padding='0'>
          <Row fluid>
            {
              eta.map((ele) => {
                return (
                  <Column padding='0' xs="12" md="4" key={'eta_' + ele.cdDominioTcb}>
                    <Checkbox
                      value={dataset['eta_' + ele.cdDominioTcb]}
                      onChange={(value) => { setFormField('eta_' + ele.cdDominioTcb, value) }}
                      label={ele.tlValoreTestuale[locale]}
                      checkcolor={'primary'}
                      width="auto"
                    />
                  </Column>)
              })
            }
          </Row>
        </Column>
      </Row>

    </>
  );
};

PreferenzeAnagrafiche.displayName = 'PreferenzeAnagrafiche';

const mapDispatchToProps = ({

});

const mapStoreToProps = store => ({

  locale: store.locale,
});

export default connect(mapStoreToProps, mapDispatchToProps)(PreferenzeAnagrafiche);
