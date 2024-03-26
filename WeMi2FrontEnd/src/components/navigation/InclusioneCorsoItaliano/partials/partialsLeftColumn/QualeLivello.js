import React from 'react';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { bgTitleSizes } from 'components/ui2/BackgroundTitle/constants';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import TextBottomTable from './TextBottomTable';
import { qualeLivello, LEFT_ANCHORS } from './costants';

const QualeLivello = ({
  color = 'blue',
  openModalCefr,
  setOpenModalCefr,
}) => (
  <div id={LEFT_ANCHORS.qualeLivello}>
    <Row fluid>
      <BackgroundTitle
        bgColor={color}
        label={qualeLivello.qualeLivelloTitle}
        size={bgTitleSizes.small}
      />
      <Column padding="0" margin="1em 0 0 0">
        <Text
          value={qualeLivello.qualeLivelloSubTitle}
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
          value="Il"
          lineHeight="175%"
          size="f7"
        />
      &nbsp;
        <Text
          value="CEFR"
          weight="bold"
          lineHeight="175%"
          size="f7"
        />
      &nbsp;
        <Text
          value="(Common European Framework of Reference for Languages, Volume Complementare) divide in sei livelli ("
          lineHeight="175%"
          size="f7"
        />
        <Text
          value="A1"
          weight="bold"
          lineHeight="175%"
          size="f7"
        />
        <Text
          value=","
          lineHeight="175%"
          size="f7"
        />
      &nbsp;
        <Text
          value="A2"
          weight="bold"
          lineHeight="175%"
          size="f7"
        />
        <Text
          value=","
          lineHeight="175%"
          size="f7"
        />
      &nbsp;
        <Text
          value="B1"
          weight="bold"
          lineHeight="175%"
          size="f7"
        />
        <Text
          value=","
          lineHeight="175%"
          size="f7"
        />
      &nbsp;
        <Text
          value="B2"
          weight="bold"
          lineHeight="175%"
          size="f7"
        />
        <Text
          value=","
          lineHeight="175%"
          size="f7"
        />
      &nbsp;
        <Text
          value="C1"
          weight="bold"
          lineHeight="175%"
          size="f7"
        />
        <Text
          value=","
          lineHeight="175%"
          size="f7"
        />
      &nbsp;
        <Text
          value="C2"
          weight="bold"
          lineHeight="175%"
          size="f7"
        />
        <Text
          value=")"
          lineHeight="175%"
          size="f7"
        />
      &nbsp;
        <Text
          value="il grado di conoscenza di una lingua straniera. Questi livelli descrivono separatamente il grado di conocenza della comprensione scritta, della comprensione orale, della produzione scritta e della produzione orale."
          lineHeight="175%"
          size="f7"
        />
      </Column>
      <div style={{ margin: '1em 0 0 0' }}>
        <Button
          color="blue"
          label={qualeLivello.qualeLivelloButton}
          padding="5px 30px"
          weight="bold"
          width="auto"
          onClick={() => { setOpenModalCefr(!openModalCefr); }}
        />
      </div>
      <Column padding="0" margin="1em 0 0 0">
        <TextBottomTable
          keyText="QualeLivello"
        />
      </Column>
    </Row>
  </div>
);

QualeLivello.displayName = 'QualeLivelloNavigation';

export default QualeLivello;
