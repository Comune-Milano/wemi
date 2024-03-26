import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import AnchorLink from 'components/ui/AnchorLink';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { title, subTitle, tempi, textPreLink, link } from './costants';
import Progetto from './leftPartials/Progetto';
import Obiettivi from './leftPartials/Obiettivi';

const LeftColumn = ({
  color = 'red',
}) => (
  <Row fluid>
    <Column padding="0">
      <BackgroundTitle label={title} size="small" bgColor={color} />
    </Column>
    <Column padding="0" margin="1em 0 0 0">
      <Text
        value={subTitle}
        size="f4"
        weight="bold"
        lineHeight="175%"
      />
    </Column>
    <Column padding="0" margin="1.5em 0 0 0">
      <Progetto />
    </Column>
    <Column padding="0" margin="3.5em 0 0 0">
      <Obiettivi />
    </Column>
    <Column padding="0" margin="2.5em 0 0 0">
      <Text
        value={tempi}
        tag="div"
        lineHeight="175%"
      />
      <Text
        value={textPreLink}
        lineHeight="175%"
      />
      &nbsp;
      <AnchorLink
        to={`http://${link}`}
        _blank
        align="left"
        display="inline-block"
      >
        <Text
          value={link}
          decoration="underline"
          fontStyle="italic"
          color="blueIcon"
          lineHeight="175%"
        />
      </AnchorLink>
    </Column>
  </Row>
);

LeftColumn.displayName = 'LeftColumnNavigation';

export default LeftColumn;
