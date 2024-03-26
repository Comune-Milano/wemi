/** @format */

import React, { Fragment } from 'react';
import Link from 'components/router/NavLink';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import AnchorLink from 'components/ui/AnchorLink';
import Hr from 'components/ui/Hr';
import styled from 'styled-components';
import { colors } from 'theme';

const ColumnDescription= styled(Column)`
  height: 4em;
`;

const AreaCittadinoCard = ({
  cardInfo,
  color,
  mdColumnSize,
  lgColumnSize,
  imgWidth = "40%",
  imgHeight = "40%"
}) => {

  const LinkComponentType = cardInfo.path ?
    Link :
    (cardInfo.download && !cardInfo.disabled) ||
      cardInfo.onClick ?
      AnchorLink :
      Fragment;

  const LinkProps = cardInfo.path ?
    {
      width: "100%",
      to: cardInfo['path'],
      tabIndex: "-1"
    } :
    cardInfo.download && !cardInfo.disabled ?
      {
        download: cardInfo.download.file,
        downloadName: cardInfo.download.downloadName,
        target: cardInfo.download._blank ? '_blank' : '_self',
      } : cardInfo.onClick ? {
        onClick: cardInfo.onClick
      } : null;

  const StyledLinkComponentType = styled(LinkComponentType)`
      &:hover {
        opacity: 0.9;
        span {
          color: ${colors[color]}
        }
      }
  `;

  const Img = styled.img`
  cursor: pointer;
  transition: all .2s ease-in-out;
  &:hover {
    transform: scale(1.1, 1.1);
  }
`;

  return (
    <Column
      xs="12"
      md={mdColumnSize}
      lg={lgColumnSize}
      padding="0 0.5em"
      justifycontent="center"
    >
      <StyledLinkComponentType {...LinkProps}>
        <Row fluid justifycontent="center" margin="0 0 2em">
          <Img
            alt={cardInfo.title}
            src={cardInfo.image}
            width={imgWidth}
            height={imgHeight}
          />
          <Row fluid justifycontent="center">
            <Text
              value={cardInfo.title}
              transform="uppercase"
              letterSpacing="0.05em"
              weight="semiBold"
              size="f7_5"
              color="darkGrey"
            />
          </Row>
        </Row>
      </StyledLinkComponentType>
      <Hr
        width="15%"
        margin="auto"
        color="darkGrey"
        height="2px"
      />
      <Row fluid>
        <ColumnDescription xs="12" padding="0" margin="2em">
          <Text
            size="f7"
            tag="p"
            value={cardInfo.description}
            align="center"
          />
        </ColumnDescription>
      </Row>
    </Column>
  )
};

AreaCittadinoCard.displayName = 'AreaCittadinoCard';
export default AreaCittadinoCard;