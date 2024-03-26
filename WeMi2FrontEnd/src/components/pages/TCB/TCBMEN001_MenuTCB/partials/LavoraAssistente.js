/** @format */

import React from 'react';
import { colors, fonts } from 'theme';
import styled from 'styled-components';
import Text from 'components/ui/Text';
import pittogrammaCandidatura from 'images2/homeTCB/Pittogramma-candidatura.png';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import NavLink from 'components/router/NavLink';
import { PAGE_TCBMEN003_URL } from 'types/url';
import SchedaPagineMenu from 'components/ui2/SchedaPagineMenu';
import withAuthentication from 'hoc/withAuthentication';
import checkCittadino from 'utils/functions/checkCittadino';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { openLoginModal as openLoginModalDispatch } from 'redux-modules/actions/authActions';
import { withRouter } from 'react-router-dom';
import { estraiStatoCandidatura as estraiStatoCandidaturaQ } from '../menuTcbGraphql';

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

const LavoraAssistente = ({
  userProfile,
  setOpenModal,
  openLoginModal,
  history,
}) => {
  const { datiLogin } = userProfile;
  const validitaCittadino = checkCittadino(datiLogin);
  const disabled = !!datiLogin && !validitaCittadino;

  const estraiStato = useStatelessGraphQLRequest(
    estraiStatoCandidaturaQ
  );

  const procediAllaCandidatura = () => {
    if (!datiLogin) {
      openLoginModal(true);
      return;
    }
    // estraggo lo stato della candidatura se è uguale a 0 (cioè non inviata) può continuare
    estraiStato({
      idUtenteLav: datiLogin.idCittadino,
    }).then(res => {
      if (res && res.cd_ultimo_stato_offerta >= 1) {
        setOpenModal(true);
      } else {
        history.push('/MenuTCB/candidaturaLavoratoreTCB');
      }
    });
  };

  return (
    <>
      <SchedaPagineMenu
        infoScheda={{
          titoloScheda: {
            text: 'LAVORA COME ASSISTENTE FAMILIARE',
            bgColor: 'green',
          },
        }}
      >
        <Row fluid padding="0 1.5em 0 1.5em">
          <Column padding="0" justifycontent="center" alignitems="center">
            <Div
              onClick={() => procediAllaCandidatura()}
              disabled={disabled}
              aria-label="INVIACI LA TUA CANDIDATURA"
              tabIndex={disabled ? undefined : "0"}
            >
              <Image src={pittogrammaCandidatura} />
            </Div>
            <Column padding="0 8em 0 8em">
              <Text
                value="INVIACI LA TUA"
                transform="uppercase"
                letterSpacing="0.05em"
                color="darkGrey"
                tag="p"
                align="center"
                size="f7_5"
              />
              <Text
                value="CANDIDATURA"
                transform="uppercase"
                letterSpacing="0.05em"
                color="darkGrey"
                tag="p"
                align="center"
                size="f7_5"
              />
            </Column>
          </Column>
        </Row>
        <Row fluid padding="3.5em 3.5em 0" justifycontent="center">
          <NavLink width="100%" to={PAGE_TCBMEN003_URL}>
            <Button
              autowidth
              label="SCOPRI COME FUNZIONA IL SERVIZIO"
              color="green"
              size="f7"
            />
          </NavLink>
        </Row>
      </SchedaPagineMenu>
    </>
  );
};

const mapDispatchToProps = { openLoginModal: openLoginModalDispatch };

LavoraAssistente.displayName = 'LavoraAssistente';
export default connect(
  undefined,
  mapDispatchToProps,
)(
  withRouter(withAuthentication(LavoraAssistente))
);
