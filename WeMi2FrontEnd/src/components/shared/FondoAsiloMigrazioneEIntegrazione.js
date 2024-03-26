import React from 'react';
import Text from 'components/ui/Text';
import imgMinisteroInterno from 'images2/inclusione/loghi fami.svg';
import { Row, Column } from 'components/ui/Grid';
import styled from 'styled-components';
import { colors } from 'theme';

export const BorderedColumn = styled(Row)`
  padding: ${props => props.paddingTopBorder};
  margin: 0 0 0.8em 0;
  border-bottom: 1px solid ${colors.grey};
  width: ${props => props.widthBorder};
  justify-content: center;
`;

const FondoAsiloMigrazioneEIntegrazione = ({
  widthBorder = '90%',
  textBold,
  textNazionale,
  textSpecifico,
  subImg,
  marginColumns = ['0', '1em 0 0 0', '0', '0'],
  src = imgMinisteroInterno,
  widthImg = '95%',
  heightImg = '95%',
  paddingTopBorder,
  className,
}) => (
  <Row fluid flex justifycontent="center" className={className}>
    <BorderedColumn padding="0" paddingTopBorder={paddingTopBorder} widthBorder={widthBorder}>
      <img
        src={src}
        alt="Logo Ministero dell'interno"
        width={widthImg}
        height={heightImg}
      />
    </BorderedColumn>
    <Column padding="0" margin={marginColumns[0]}>
      {subImg.map((text, index) => (
        <Text
          value={text}
          tag="div"
          lineHeight="175%"
          color="darkGrey"
          size="f7"
          align="center"
          key={`subImg-${index.toString()}`}
        />
      ))}
    </Column>
    <Row fluid margin={marginColumns[1]} justifycontent="center">
      {textSpecifico.map((text, index) => (
        <Text
          value={text}
          tag="div"
          lineHeight="175%"
          key={`textSpecifico-${index.toString()}`}
          align="center"
          size="f7"
        />
      ))}
    </Row>
    <Row fluid margin={marginColumns[2]} justifycontent="center">
      {textNazionale.map((text, index) => (
        <Text
          value={text}
          tag="div"
          lineHeight="175%"
          key={`textNazionale-${index.toString()}`}
          align="center"
          size="f7"
        />
      ))}
    </Row>
    <Row fluid margin={marginColumns[3]} justifycontent="center">
      <Text
        value={textBold}
        tag="div"
        lineHeight="175%"
        weight="bold"
        size="f7"
        align="center"
      />
    </Row>
  </Row>
);

FondoAsiloMigrazioneEIntegrazione.displayName = 'FondoAsiloMigrazioneEIntegrazioneNavigation';

export default FondoAsiloMigrazioneEIntegrazione;
