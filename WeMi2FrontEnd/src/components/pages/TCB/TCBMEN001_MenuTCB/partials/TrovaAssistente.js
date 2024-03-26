/** @format */

import React from 'react';
import { colors } from 'theme';
import styled from 'styled-components';
import Text from 'components/ui/Text';
import pittogrammaBabySitter from 'images2/homeTCB/Pittogramma-baby-sitter.png';
import pittogrammaColf from 'images2/homeTCB/Pittogramma-colf.png';
import pittogrammaBadante from 'images2/homeTCB/Pittogramma-badante.png';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import NavLink from 'components/router/NavLink';
import { PAGE_TCBMEN002_URL } from 'types/url';
import { Redirect } from 'react-router';
import SchedaPagineMenu from 'components/ui2/SchedaPagineMenu';
import withAuthentication from 'hoc/withAuthentication';
import checkCittadino from 'utils/functions/checkCittadino';
import { withRouter } from 'react-router-dom';

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
    }` :
    `
      opacity: 0.5;
      color: ${colors.darkGrey};
      pointer-events: none;
    `
  }
`;


const TrovaAssistente = ({
  userProfile,
  history,
}) => {
  const { datiLogin } = userProfile;
  const validitaCittadino = checkCittadino(datiLogin);
  const disabled = !!datiLogin && !validitaCittadino;

  return (
    <>
      <SchedaPagineMenu
        infoScheda={{
          titoloScheda: {
            text: 'TROVA UN ASSISTENTE FAMILIARE',
          },
        }}
      >
        <Row fluid padding="0 1.5em 0 1.5em">
          <Column padding="0" justifycontent="center" alignitems="center" lg="4" md="4" sm="4">
            <Div
              onClick={() => history.push('/richiestaServizioTcb/1')}
              disabled={disabled}
              aria-label="TROVA UN/UNA BABY-SITTER"
              tabIndex={disabled ? undefined : "0"}
            >
              <Image src={pittogrammaBabySitter} />
            </Div>
            <Column sizepadding={{ xs: '0 2em 0 2em', md: '0 1em 0 1em', lg: '0 2em 0 2em' }}>
              <Text
                size="f7_5"
                value="TROVA UN/UNA BABY-SITTER"
                transform="uppercase"
                letterSpacing="0.05em"
                color="darkGrey"
                align="center"
                tag="p"
              />
            </Column>
          </Column>
          <Column padding="0" justifycontent="center" alignitems="center" lg="4" md="4" sm="4">
            <Div
              onClick={() => history.push('/richiestaServizioTcb/2')}
              disabled={disabled}
              tabIndex={disabled ? undefined : "0"}
              aria-label="TROVA UN/UNA COLF"
            >
              <Image src={pittogrammaColf} />
            </Div>
            <Column sizepadding={{ xs: '0 2em 0 2em', md: '0 1em 0 1em', lg: '0 2em 0 2em' }}>
              <Text
                size="f7_5"
                value="TROVA UN/UNA COLF"
                transform="uppercase"
                letterSpacing="0.05em"
                color="darkGrey"
                align="center"
                tag="p"
              />
            </Column>
          </Column>
          <Column padding="0" justifycontent="center" alignitems="center" lg="4" md="4" sm="4">
            <Div
              onClick={() => history.push('/richiestaServizioTcb/3')}
              disabled={disabled}
              tabIndex={disabled ? undefined : "0"}
              aria-label="TROVA UN/UNA BADANTE"
            >
              <Image src={pittogrammaBadante} />
            </Div>
            <Column sizepadding={{ xs: '0 2em 0 2em', md: '0 1em 0 1em', lg: '0 2em 0 2em' }}>
              <Text
                size="f7_5"
                value="TROVA UN/UNA BADANTE"
                transform="uppercase"
                letterSpacing="0.05em"
                color="darkGrey"
                align="center"
                tag="p"
              />
            </Column>
          </Column>
        </Row>
        <Row fluid padding="3.5em 3.5em 0" justifycontent="center">
          <NavLink width="100%" to={PAGE_TCBMEN002_URL}>
            <Button
              autowidth
              label="SCOPRI COME FUNZIONA IL SERVIZIO"
              color="primary"
              size="f7"
            />
          </NavLink>
        </Row>
      </SchedaPagineMenu>
    </>
  );
};

TrovaAssistente.displayName = 'TrovaAssistente';
export default withRouter(withAuthentication(TrovaAssistente));
