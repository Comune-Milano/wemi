import React from 'react';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';

const TextBox = React.memo(({
  title,
  text = [],
  color = 'red',
  children,
}) => (
  <Row fluid>
    <BackgroundTitle bgColor={color} label={title} size="small" />
    {text.map((el, index) => (
      <Column padding="0" margin="1.5em 0 0 0" key={`testoInclusioneComeFunziona-${index.toString()}`}>
        {
          el.subTitle ?
            (
              <Text
                value={el.subTitle}
                size="f6"
                color={color}
                weight="bold"
                tag="div"
                transform="uppercase"
                lineHeight="175%"
                letterSpacing="0.05em"
              />
            )
            : null
        }
        <Text
          value={el.text}
          lineHeight="175%"
          size="f7"
        />
      </Column>
    ))}
    {
      children ?
        (
          <div>
            {children}
          </div>
        )
        : null
    }
  </Row>
));

TextBox.displayName = 'TextComeFunzionaPage';

export default TextBox;
