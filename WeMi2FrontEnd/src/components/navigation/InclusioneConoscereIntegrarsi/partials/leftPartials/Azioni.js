import React from 'react';
import TextSubTitle from './TextSubTitle';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import { azioni } from '../costants';

const Azioni = () => (
  <Row fluid>
    <TextSubTitle
      value={azioni.SubTitle}
    />
    <Column padding="0">
      {/* Top */}
      <Text
        value={azioni.textTop}
        lineHeight="175%"
        size="f7"
      />
    </Column>
    <Column padding="0" margin="1.8em 0 0 0">
      {/* Center */}
      <Text
        value={azioni.textCenter.textCenterTop}
        lineHeight="175%"
        tag="div"
        size="f7"
      />
      <Column padding="0">
        <Text
          value={azioni.textCenter.textCenterAzioniFormative.titleBold}
          lineHeight="175%"
          weight="bold"
          size="f7"
        />
      &nbsp;
      <Text
          value={azioni.textCenter.textCenterAzioniFormative.text}
          lineHeight="175%"
          size="f7"
        />
      </Column>
      <Column padding="0">
        <Text
          value={azioni.textCenter.textCenterServiziComplementari.titleBold}
          lineHeight="175%"
          size="f7"
          weight="bold"
        />
      &nbsp;
      <Text
          value={azioni.textCenter.textCenterServiziComplementari.text}
          lineHeight="175%"
          size="f7"
        />
      </Column>
      <Column padding="0">
        <Text
          value={azioni.textCenter.textCenterServiziStrumentali.titleBold}
          lineHeight="175%"
          weight="bold"
          size="f7"
        />
      &nbsp;
      <Text
          value={azioni.textCenter.textCenterServiziStrumentali.text}
          lineHeight="175%"
          size="f7"
        />
      </Column>
    </Column>
    <Column padding="0" margin="1.8em 0 0 0">
      {/* Bottom */}
      <Text
        value={azioni.textBottom}
        lineHeight="175%"
        size="f7"
      />
    </Column>
  </Row>
);

Azioni.displayName = 'AzioniNavigation';

export default Azioni;