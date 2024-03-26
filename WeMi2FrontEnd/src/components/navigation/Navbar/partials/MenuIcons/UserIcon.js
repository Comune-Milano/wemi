/** @format */

import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from "styled-components";
import { openLoginModal } from 'redux-modules/actions/authActions';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import MenuItem from '../MenuItem';
import FaIcon from 'components/ui2/FaIcon';
import AnchorLink from 'components/ui/AnchorLink';
import { isNull } from 'util';
import withAuthentication from "hoc/withAuthentication";

const TextUser = styled(Text)`
  text-decoration: underline;
  text-align: left;
`;

const DivUserIcon = styled.div`
  background-color: transparent;
  padding: 0.3em;
  ${props => props.handleOver && css`
     &:hover {
    background-color: white;
    i {
      color: #3366CC;
    }
  }
   `}
   ${props => props.disabled && css`
      pointer-events: none;
      i {
        color: ${props.theme.colors.darkGrey};

      }
   `}
   `;

const UserIcon = ({ DatiLogin, openLoginModal, userProfile, isPreview }) => {

  const { datiLogin } = userProfile;

  return (
    <MenuItem icon>
      {!isNull(datiLogin) && window.innerWidth > 768 ?
        <div id="infoUtenteDiv">
          <Row fluid justifycontent="flex-end">
            <Text tag="span" value={`WeMi per`} padding="0 .5em 0 0" size="f6" color="white" />
            <Text tag="strong" weight="bold" value={datiLogin.Nome || '—'} size="f6" color="white" transform="uppercase" letterSpacing="0.05em" />
          </Row>
          <Row fluid>
            {datiLogin.Profilo !== "C" &&
              <TextUser value={datiLogin.Ruolo} size="f7" color="white" />
            }
          </Row>
        </div> : null}
        <DivUserIcon disabled={isPreview} handleOver={datiLogin? true : false} 
                     onClick={() => openLoginModal(!DatiLogin.modal)}
                     >
          <AnchorLink
            to={null}
            tabIndex={0}
            role="menuitem"
            aria-label={userProfile ? "Area utente" : "Login"}
          >
            <FaIcon
              icon={"user"}
              fontSize="f3"
              color={datiLogin ? "blueIcon" : "white"}
              label="Icona utente" />
          </AnchorLink>
        </DivUserIcon>
    </MenuItem>


  );
};

UserIcon.displayName = 'UserIcon';
const mapStoreToProps = store => ({
  DatiLogin: store.datiLogin
})
const mapDispatchToProps = ({
  openLoginModal
})
export default connect(mapStoreToProps, mapDispatchToProps)(withAuthentication(UserIcon));