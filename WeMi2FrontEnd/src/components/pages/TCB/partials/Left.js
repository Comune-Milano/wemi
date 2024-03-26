import React from 'react';
import { Row } from 'components/ui/Grid';
import { colors } from 'theme';
import styled from 'styled-components';
import Text from 'components/ui/Text';
import AnchorLink from 'components/ui/AnchorLink';
import { ReactComponent as DownloadIcon } from 'images2/Icons/download.svg';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';

const ItalicLink = styled(AnchorLink)`
  font-style: italic;
`;

const StyledDownloadIcon = styled(DownloadIcon)`
  color: ${props => colors[props.color]};
  fill: ${props => colors[props.color]};
  stroke: ${props => colors[props.color]};
  width: ${props => props.width};
`;

const Left = ({
  titolo,
  color,
  texts = [],
}) => (
  <>
    <Row fluid>
      <BackgroundTitle
        bgColor={color}
        transform="none"
        label={titolo}
        size={bgTitleSizes.small}
      />
    </Row>
    {
        texts.map((servizio) => (
          <Row fluid margin=" 2em 0 0 0" key={servizio.title}>
            <Text
              value={servizio.title}
              transform="uppercase"
              letterSpacing="0.05em"
              size="f7"
              color={color}
              weight="bold"
              tag="div"
            />
            <Text
              value={servizio.value}
              size="f7"
              tag="div"
            />
          </Row>
          ))
      }
    <Row fluid margin="1em 0 0">
      <span style={{ padding: '0 0.7em 0 0' }}>
        <StyledDownloadIcon
          color={color}
          height="1em"
          width="1em"
        />
      </span>
      <ItalicLink
        _blank
        color="black"
        downloadName=""
        intlFormatter
        size="f6"
      />
    </Row>
  </>
  );

Left.displayName = 'Menu TCB - LeftColumn';
export default Left;
