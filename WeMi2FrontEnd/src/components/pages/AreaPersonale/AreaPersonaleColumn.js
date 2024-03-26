/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Hr from 'components/ui/Hr';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { colors } from 'theme';
import { useAuthorization } from 'hooks/useAuthorization';

const Div = styled.div`
  span {
    color: ${colors.darkGrey}
  }

  &:hover {
    span {
      opacity: 0.9;
      color: #0099A8
    }
  }
`;

const Img = styled.img`
  cursor:${props => props.isAuthorized ? 'pointer' : 'default'};
  transition: all .2s ease-in-out;
  &:hover {
    ${props => props.isAuthorized ? 'transform: scale(1.1, 1.1);' : ''}
  }
`;

const AreaPersonaleColumn = ({
  element,
  paddingDescription,
  history,
}) => {

  //is disabled if the user does not have authorization and is Admin
  const isAuthorized = useAuthorization(element.authorizationsList);

  if (!isAuthorized) {
    return null;
  }

  return (
    <Column xs="12" md="6" lg="4" padding="2em" justifycontent="center" >
      <Div onClick={() => { isAuthorized && history.push(element.path) }}>
        <Row fluid justifycontent="center" >
          <Img
            alt={element.title}
            src={element.image}
            width="60%"
            height="60%"
            isAuthorized={isAuthorized}
          />
        </Row>
      </Div>
      <Row fluid justifycontent="center" margin="0 0 3em 0" >
        <span>
          <Text
            size="f7"
            value={element.title}
            transform="uppercase"
            letterSpacing="0.05em"
            weight="semiBold"
          />
        </span>
      </Row>
      <Hr
        width="25%"
        margin="auto"
        color="black"
        height="1.5px"
      />
      <Row fluid justifycontent="center" margin="3em 0 0 0" >
        <Text
          size="f7"
          value={element.description}
          align="center"
          padding={paddingDescription}
        />
      </Row>
    </Column>
  )
};

AreaPersonaleColumn.displayName = 'AreaPersonaleColumn';

export default withRouter(AreaPersonaleColumn);