/** @format */

import React from 'react';
import { connect } from 'react-redux';
import withAuthentication from 'hoc/withAuthentication';
import { openLoginModal as openLoginModalDispatch } from 'redux-modules/actions/authActions';
import styled from 'styled-components';
import Text from 'components/ui/Text';
import pittogrammaCandidatura from 'images2/homeTCB/Pittogramma-candidatura.png';
import { Row, Column } from 'components/ui/Grid';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { colors } from 'theme';
import { useLogger } from 'services/Logger';
import { withRouter } from 'react-router';
import checkCittadino from 'utils/functions/checkCittadino';
import media from 'utils/media-queries';
import { estraiStatoCandidatura as estraiStatoCandidaturaQ } from '../menuTcbGraphql';
import { emailDescription, emailDescription2 } from './costants';

const Image = styled.div`
  background-image: url(${props => props.src});
  background-position: center center;
  width: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  height: 10rem;
  cursor: pointer;
  transition: all .2s ease-in-out;
  &:hover {
    transform: scale(1.1, 1.1);
  }`;

const ColumnText = styled(Column)`
  ${media.xs`
    padding: 2em 0 0 0;
  `};
  ${media.sm`
    padding: 2.5em 0 0 0 ;
  `};
  ${media.md`
    padding: 2.5em 0 0 0 ;
  `};
  ${media.lg`
    padding: 10.5em 0 0 0 ;
  `};
  word-wrap:break-word;
  `;


const StyledColumn = styled(Column)`
${media.md`
  --margin: 0 4em;
`};
${media.xl`
  --margin:0 4em 0 5em;
`};
    p {
      opacity: .9;
      color: ${colors.darkGrey}
  }
  ${props => !props.disabled ? `
    p {
      opacity: .9;
      color: ${colors.darkGrey}
  }` : `
opacity: 0.5;
color: ${colors.darkGrey}
pointer-events: none;
`}
`;

const StyledSpan = styled.span`
  white-space:pre-line;

  ${media.md`
    white-space:normal;
  `}
  ${media.sm`
    white-space:normal;
  `}
`;

const InviaCandidatura = ({
  openLoginModal,
  userProfile,
  setOpenModal,
  history,
}) => {
  const logger = useLogger();
  const { datiLogin } = userProfile;

  const estraiStato = useStatelessGraphQLRequest(
    estraiStatoCandidaturaQ,
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
    }).catch(
      error => {
        logger.log('Error', error);
      }
    );
  };

  const validitaCittadino = checkCittadino(datiLogin);

  const disabled = !!datiLogin && !validitaCittadino;

  return (
    <Row fluid>
      <StyledColumn
        justifycontent="center"
        alignitems="center"
        lg="6"
        disabled={disabled}
      >
        <Image
          src={pittogrammaCandidatura}
          onClick={procediAllaCandidatura}
        />
        <Text
          value="INVIACI LA TUA"
          transform="uppercase"
          letterSpacing="0.05em"
          tag="p"
          align="center"
          size="f7_5"
          onClick={procediAllaCandidatura}
        />
        <Text
          value="CANDIDATURA"
          transform="uppercase"
          letterSpacing="0.05em"
          align="center"
          tag="p"
          size="f7_5"
          onClick={procediAllaCandidatura}
        />
      </StyledColumn>
      <ColumnText lg="6">
        <StyledSpan>
          {emailDescription}
          <a href="mailto:" style={{ color: colors.green, fontStyle: 'italic' }}>
          </a>
          {emailDescription2}
        </StyledSpan>
      </ColumnText>
    </Row>
  );
};

InviaCandidatura.displayName = 'InviaCandidatura';
const mapDispatchToProps = { openLoginModal: openLoginModalDispatch };

export default connect(
  undefined,
  mapDispatchToProps,
)(
  withAuthentication(withRouter(InviaCandidatura))
);
