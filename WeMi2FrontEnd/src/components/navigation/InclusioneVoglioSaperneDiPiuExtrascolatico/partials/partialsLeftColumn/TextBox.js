import React from 'react';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import { Img, WrapperTextClick } from '../VoglioSaperneDiPiuExtrascolatico.styled';
import { withRouter } from 'react-router';

const TextBox = React.memo(({
  text = [],
  color = "purple",
  margin = "0",
  history
}) => (
  <Row fluid margin={margin}>
    {text.map((el, index) => (
      <Column padding="0" margin="1.5em 0 0 0" key={`testoInclusioneComeFunziona-${index.toString()}-${el.subTitle}`}>
        <WrapperTextClick 
          cursor={el.src ? "pointer" : null}
          onClick={()=> {el.src  && history.push(el.src)  } }
          >
        {
          el.faicon ?
            <React.Fragment>
              <Img
                src={el.faicon}
              />
              &nbsp;
             </React.Fragment>
            : null
        }
        <Text
          value={el.subTitle}
          size="f6"
          color={el.color || color}
          weight="bold"
          transform="uppercase"
          lineHeight="175%"
          letterSpacing="0.05em"
        />
        <Text
          value={el.text}
          lineHeight="175%"
          tag="div"
          size="f7"
        />
        </WrapperTextClick>
      </Column>
    ))}
  </Row>
));

TextBox.displayName = 'TextComeFunzionaPage';

export default withRouter(TextBox);