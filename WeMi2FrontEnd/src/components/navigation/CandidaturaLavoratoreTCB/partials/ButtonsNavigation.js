/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import Text from 'components/ui/Text';

const ButtonsNavigation = ({
  moveNextDisabled,
  onMoveBack,
  onMoveNext,
  onSave,
}) =>
(
  <Row fluid margin="3em 0 2em">
    <Column xs="12" flex justifycontent="center" padding="0">
      {onMoveBack &&
        (
          <Button
            iconLeft="arrow-left"
            color="primary"
            label="INDIETRO"
            width="10rem"
            onClick={onMoveBack}
            margin="0 2em 0 0"
          />
        )
      }
      {onMoveNext &&
        (
          <Button
            disabled={moveNextDisabled}
            iconRight="arrow-right"
            color="primary"
            label="AVANTI"
            width="10rem"
            onClick={onMoveNext}
          />
        )
      }
      {onSave &&
        (
          <Button
            color="primary"
            label="Conferma e salva"
            width="14rem"
            onClick={onSave}
          />
        )
      }
    </Column>
    <Column xs="12" padding="2rem 0 0 0" sizepadding={{ md: '2rem 15% 0 15%' }}>
      <p style={{ textAlign: 'center' }}>
        <Text
          tag="span"
          size="f7"
          color="black"
          value="Andando avanti o indietro i dati inseriti vengono "
        />
        <Text
          tag="strong"
          size="f7"
          color="primary"
          value="salvati automaticamente"
        />
        <br />
        <Text
          tag="span"
          size="f7"
          color="black"
          value="Se vuoi completare la richiesta in un secondo momento, potrai riprendere la compilazione da dove hai lasciato."
        />
      </p>
    </Column>
  </Row>
);

ButtonsNavigation.displayName = 'ButtonsNavigation';

export default ButtonsNavigation;
