import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { bgTitleSizes } from 'components/ui2/BackgroundTitle/constants';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import { PAGE_CONSULENZA_HO_BISOGNO_DI_CONSULENZA } from 'types/url';
import { withRouter } from 'react-router-dom';
import { conChi } from './costants';
import { StyledList, StyledListItem } from '../VoglioSaperneDiPiuSulServizio.styled';

const ConChi = ({
  color,
  history,
}) => (
  <Row fluid>
    <Column padding="0">
      <BackgroundTitle
        bgColor={color}
        label={conChi.title}
        size={bgTitleSizes.small}
      />
    </Column>
    <Column padding="0" margin="1.5em 0 0 0">
      <StyledList>
        {conChi.content.map((item, index) => (
          <StyledListItem key={`conChi-content-${index}`}>
            <Text
              value={item}
              size="f7"
              lineHeight="175%"
            />
          </StyledListItem>
        ))}
      </StyledList>
    </Column>
    <div style={{ margin: '2.5em 0 0 0' }}>
      <Button
        color={color}
        padding="5px 30px"
        weight="bold"
        width="auto"
        label={conChi.labelButton}
        onClick={() => { history.push(PAGE_CONSULENZA_HO_BISOGNO_DI_CONSULENZA); }}
      />
    </div>
  </Row>
);

ConChi.displayName = 'ConChiNavigation';

export default withRouter(ConChi);
