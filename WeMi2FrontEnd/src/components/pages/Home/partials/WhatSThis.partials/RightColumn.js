import React from 'react';
import TextBackground from './TextBackground';
import { Row } from 'components/ui/Grid';
import { WrapperTextRight, TextUnderline } from './style';

const RightColumn = () => (
  <React.Fragment>
    <WrapperTextRight>
      È la soluzione ai tuoi bisogni di&nbsp;
      <span style={{ display: ' inline-block' }}>
        <TextUnderline
          size="f0"
          value="benessere"
          weight="bold"
        />&nbsp;
      </span>
      e&nbsp;
      <span style={{ display: ' inline-block' }}>
        <TextUnderline
          value="cura personale"
          weight="bold"
        />,
      </span>
      &nbsp;
      <span style={{ display: ' inline-block' }}>
        <TextUnderline
          size="f0"
          value="familiare"
          weight="bold"
        />&nbsp;
      </span>
      e&nbsp;
      <TextUnderline
        size="f0"
        value="domestica"
        weight="bold"
      />
      .
    </WrapperTextRight>
    <Row fluid margin="2rem 0 0 0">
      <TextBackground />
    </Row>
  </React.Fragment>
);

RightColumn.displayName = 'RightColumn';

export default React.memo(RightColumn);
