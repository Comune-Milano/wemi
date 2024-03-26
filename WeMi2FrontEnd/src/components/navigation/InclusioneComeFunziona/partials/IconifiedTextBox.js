import React from 'react';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import styled from 'styled-components';

const Img = styled.img`
  padding: 0 0 0.5em 0;
`;

const IconifiedTextBox = React.memo(({
  text = [],
}) => (
  <Row fluid>
    {text.map((el, index) => (
      <Column padding="0" margin="1.5em 0 0 0" key={`testoIconInclusioneComeFunziona-${index.toString()}`}>
        <a href={el.link}>
          <Img
            src={el.img}
            alt={el.subTitle}
          />
        &nbsp;
        &nbsp;
          <Text
            value={el.subTitle}
            color={el.color}
            weight="bold"
            size="f6"
            lineHeight="175%"
            letterSpacing="0.05em"
          />
        </a>
        <Text
          value={el.text}
          tag="div"
          lineHeight="175%"
          size="f6"
        />
      </Column>
    ))}
  </Row>
));

IconifiedTextBox.displayName = 'TextComeFunzionaIconPage';

export default IconifiedTextBox;
