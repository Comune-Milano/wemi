/** @format */

import React from 'react';
import { colors } from 'theme';
import styled from 'styled-components';
import Text from 'components/ui/Text';
import pittogrammaBabySitter from 'images2/homeTCB/Pittogramma-baby-sitter.png';
import pittogrammaColf from 'images2/homeTCB/Pittogramma-colf.png';
import pittogrammaBadante from 'images2/homeTCB/Pittogramma-badante.png';
import { Row, Column } from 'components/ui/Grid';
import { withRouter } from 'react-router';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { connect } from 'react-redux';
import withAuthentication from 'hoc/withAuthentication';
import checkCittadino from 'utils/functions/checkCittadino';
import { keyCodes } from 'components/ui2/utils/constants/keyCodes';
import { serviziTCB as serviziTCBQ } from '../menuTcbGraphql';

const Image = styled.div`
  background-image: url(${props => props.src});
  background-position: center center;
  width: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  height: 10rem;
`;

const Div = styled.div`
  ${props => !props.disabled ? `
    cursor: pointer;
    transition: all .2s ease-in-out;
    &:hover {
      transform: scale(1.1, 1.1);
      p {
        opacity: .9;
        color: ${colors.darkGrey}
      }
    }` : `
    opacity: 0.5;
    color: ${colors.darkGrey};
    pointer-events: none;
  `}
`;

const Children = ({ history, userProfile }) => {
  const [servizi] = useGraphQLRequest(
    undefined,
    serviziTCBQ,
    undefined,
    true
  );

  const { datiLogin } = userProfile;
  const validitaCittadino = checkCittadino(datiLogin);
  const disabled = !!datiLogin && !validitaCittadino;

  const handleKeyDown = React.useCallback((event, callback) => {
    if (event.keyCode === keyCodes.ENTER || event.keyCode === keyCodes.SPACE) {
      callback();
    }
  });

  return (
    servizi.data ? (
      <Row fluid margin="0">
        <Column padding="0" justifycontent="center" alignitems="center" lg="4" md="4" sm="4">
          <Div
            tabIndex={disabled ? undefined : "0"}
            aria-label="TROVA UN/UNA BABY-SITTER"
            onKeyDown={(event) => { handleKeyDown(event, () => history.push('/richiestaServizioTcb/1')); }}
            onClick={() => history.push('/richiestaServizioTcb/1')}
            disabled={disabled}
          >
            <Image src={pittogrammaBabySitter} />
          </Div>
          <Text
            value="TROVA UN/UNA"
            transform="uppercase"
            letterSpacing="0.05em"
            color="darkGrey"
            tag="p"
            size="f7_5"
            align="center"
          />
          <Text
            value="BABY-SITTER"
            transform="uppercase"
            letterSpacing="0.05em"
            color="darkGrey"
            tag="p"
            size="f7_5"
            align="center"
          />
        </Column>
        <Column padding="0" justifycontent="center" alignitems="center" lg="4" md="4" sm="4">
          <Div
            tabIndex={disabled ? undefined : "0"}
            aria-label="TROVA UN/UNA COLF"
            onKeyDown={(event) => { handleKeyDown(event, () => history.push('/richiestaServizioTcb/2')); }}
            onClick={() => history.push('/richiestaServizioTcb/2')}
            disabled={disabled}
          >
            <Image src={pittogrammaColf} />
          </Div>
          <Text
            value="TROVA UN/UNA"
            transform="uppercase"
            letterSpacing="0.05em"
            color="darkGrey"
            tag="p"
            size="f7_5"
            align="center"
          />
          <Text
            value="COLF"
            transform="uppercase"
            letterSpacing="0.05em"
            color="darkGrey"
            tag="p"
            size="f7_5"
            align="center"
          />
        </Column>
        <Column padding="0" justifycontent="center" alignitems="center" lg="4" md="4" sm="4">
          <Div
            tabIndex={disabled ? undefined : "0"}
            aria-label="TROVA UN/UNA BADANTE"
            onKeyDown={(event) => { handleKeyDown(event, () => history.push('/richiestaServizioTcb/3')); }}
            onClick={() => history.push('/richiestaServizioTcb/3')}
            disabled={disabled}
          >
            <Image src={pittogrammaBadante} />
          </Div>
          <Text
            value="TROVA UN/UNA"
            transform="uppercase"
            letterSpacing="0.05em"
            color="darkGrey"
            tag="p"
            size="f7_5"
            align="center"
          />
          <Text
            value="BADANTE"
            transform="uppercase"
            letterSpacing="0.05em"
            color="darkGrey"
            tag="p"
            size="f7_5"
            align="center"
          />
        </Column>
      </Row>
    )
      : null
  );
};

const mapStoreToProps = store => ({
  locale: store.locale,
});

Children.displayName = 'Children';

export default connect(mapStoreToProps, null)(
  withRouter(withAuthentication(Children))
);
