import React from 'react';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { bgTitleSizes } from 'components/ui2/BackgroundTitle/constants';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import AnchorLink from 'components/ui/AnchorLink';
import { PAGE_QUERY_SERVICES } from 'types/url';
import { ID_SERVIZIO_CORSI_ITALIANO } from 'types/contento-servizio.constants';
import { qualeScuola, LEFT_ANCHORS } from './costants';
import { SEZIONI } from 'types/sezioni';

const QualeScuola = ({
  color = 'blue',
}) => (
  <div id={LEFT_ANCHORS.qualeScuola}>
    <Row fluid>
      <BackgroundTitle
        bgColor={color}
        label={qualeScuola.qualeScuolaTitle}
        size={bgTitleSizes.small}
      />
      <Column padding="0" margin="1em 0 0 0">
        <Text
          value={qualeScuola.qualeScuolaSubTitle}
          color={color}
          transform="uppercase"
          weight="bold"
          lineHeight="175%"
          size="f6"
          letterSpacing="0.05em"
        />
      </Column>
      <Column padding="0">
        <Text
          value={qualeScuola.qualeScuolaText}
          lineHeight="175%"
          size="f7"
        />
      </Column>
      <div style={{ margin: '1em 0 0 0' }}>
        <AnchorLink
          to={`${PAGE_QUERY_SERVICES}?idCategoria=${ID_SERVIZIO_CORSI_ITALIANO}&codSezione=${SEZIONI.DOMICILIARITA}`}
          align="left"
          display="inline-block"
        >
          <Button
            color="blue"
            label={qualeScuola.qualeScuolaButton}
            width="auto"
            weight="bold"
            padding="5px 30px"
          />
        </AnchorLink>
      </div>
    </Row>
  </div>
);

QualeScuola.displayName = 'QualeScuolaNavigation';

export default QualeScuola;
