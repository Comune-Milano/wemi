import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { bgTitleSizes } from 'components/ui2/BackgroundTitle/constants';
import Text from 'components/ui/Text';
import Navlink from 'components/router/NavLink';
import { cosaOffreCittadini } from './costants';
import TextContent from './TextContent';

const CosaOffreCittadini = ({
  color,
}) => (
  <Row fluid>
    <Column padding="0">
      <BackgroundTitle
        bgColor={color}
        label={cosaOffreCittadini.title}
        size={bgTitleSizes.small}
      />
    </Column>
    <Column padding="0">
      {cosaOffreCittadini.content.map((text, index) => (
        <Column padding="0" margin="1.5em 0 0 0" key={`cosaOffreCittadini-content-${index}`}>
          <TextContent
            color={color}
            title={text.title}
            description={text.value}
          />
        </Column>
      ))}
    </Column>
    <Column padding="0" margin="1.5em 0 0 0">
      <Column padding="0">
        <Text
          value={cosaOffreCittadini.textLink.title}
          size="f6"
          weight="bold"
          transform="uppercase"
          lineHeight="175%"
          color={color}
          letterSpacing="0.05em"
        />
      </Column>
      <Column padding="0">
        <Text
          value={cosaOffreCittadini.textLink.valueBeforeLink}
          size="f7"
          lineHeight="175%"
        />
        &nbsp;
        <Navlink
          width="auto"
          display="inline-block"
          to={cosaOffreCittadini.textLink.link}
        >
          <Text
            value={cosaOffreCittadini.textLink.valuelink}
            size="f7"
            lineHeight="175%"
            color="red"
            letterSpacing="0.05em"
          />
        </Navlink>
        <Text
          value={cosaOffreCittadini.textLink.valueAfterLink}
          size="f7"
          lineHeight="175%"
        />
      </Column>
    </Column>
  </Row>
);

CosaOffreCittadini.displayName = 'CosaOffreCittadiniNavigation';

export default CosaOffreCittadini;
