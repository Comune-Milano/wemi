/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import styled from 'styled-components';
import Icon from 'components/ui/Icon';

import checkCircle from 'images/checkCircle.svg';



const RightCittadino = () => (
  <>
    <Row margin="0 0 1em" justifycontent="space-between" >
      <Column md="1" padding="0" flex alignitems="center">
        <Icon src={checkCircle} width="31px" height="31px" />
      </Column>
      <Column md="7" padding="0" >
        <Row fluid alignitems="center">
        <Text value="Scegli il servizio" weight="bold" size="f6" tag="p" />
        </Row>
        <Row fluid alignitems="center">
        <Text
          value="Sfoglia il catalogo dei servizi WeMi e scegli quello che fa al caso tuo"
          size="f6"
        />
        </Row>
      </Column>
      <Column md="3" padding="0" />
    </Row>

    <Row margin="0 0 1em" justifycontent="space-between">
      <Column md="1" padding="0" flex alignitems="center">
        <Icon src={checkCircle} width="31px" height="31px" />
      </Column>
      <Column md="7" padding="0" flex alignitems="center">
        <Text
          value="Personalizzalo secondo le tue esigenze
Configura in pochi passaggi secondo le tue esigenze puoi salvare le tue personalizzazioni. Puoi condividere i tuoi acquisti con altre persone ed ottenere prezzi più convenienti."
          size="f6"
        />
      </Column>
      <Column md="3" padding="0" />
    </Row>

    <Row margin="0 0 1em" justifycontent="space-between">
      <Column md="1" padding="0" flex alignitems="center">
        <Icon src={checkCircle} width="31px" height="31px" />
      </Column>
      <Column md="7" padding="0" >
      <Row fluid alignitems="center">
      <Text value="Prenotalo Online." weight="bold" size="f6" tag="p" />
        </Row>
        <Row fluid alignitems="center">
        <Text
          value="Sfoglia il catalogo dei servizi WeMi e scegli quello che fa al caso tuo"
          size="f6"
        />
        </Row>
      </Column>
      <Column md="3" padding="0" />
    </Row>
  </>
);

RightCittadino.displayName = 'RightCittadino';

export default RightCittadino;
