/** @format */

import React from 'react';
import { connect } from 'react-redux';
import FadeInWrapper from '../partials/FadeInWrapper';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';

const Titolo = ({
  servizioTCB,
  locale
     
}) => {


    return (
        <FadeInWrapper fluid>
            <Row fluid>
            <Text
              tag="h1"
              size="f3"
              weight="bold"
              value={`Contatti e sede di lavoro`}
            />
          </Row>
          <Row fluid margin='2em 0 0 0' >
            <Text
              tag="p"
              size="f6"
              value={`In questa sezione ti chiediamo di indicare le mansioni richieste al/la ${servizioTCB.tl_valore_testuale[locale].toLowerCase()} 
              per le persone da assistere.`}
            />
          </Row>
        </FadeInWrapper>
    );
};

Titolo.displayName = 'Titolo';

const mapDispatchToProps = ({

});

const mapStoreToProps = store => ({

});

export default connect(mapStoreToProps, mapDispatchToProps)(Titolo);
