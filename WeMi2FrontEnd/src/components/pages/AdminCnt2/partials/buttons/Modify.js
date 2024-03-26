import React from 'react';
import FaIcon from 'components/ui2/FaIcon/ButtonIcon';
import Tooltip from 'components/ui/Tooltip';
import { generatePath } from 'react-router';
import { PAGE_ADMIN_CNT_03_URL } from 'types/url';
import { NavLink } from 'components/router';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import {
  EstraiContenutoCompleto as EstraiContenutoCompletoQ,
} from '../../../AdminCnt3/adminGraphQL3';
import { connect } from 'react-redux';
import { useUserProfile } from 'hooks/useUserProfile';



const ModifyButton = ({
  content,
  typeContenuto,
  graphqlRequest,
}) => {

  const [userProfile] = useUserProfile();

  const { datiLogin: { idCittadino }} = userProfile;

  return (
    <Tooltip
      top
      horizzontalShift="-1em"
      fontSize="f8"
      textTT={`Modifica`}
      color="white"
      bgcolor="blue">
      <NavLink to={generatePath(PAGE_ADMIN_CNT_03_URL, { idOp: idCittadino, tyCnt: typeContenuto, idCnt: content.id_contenuto })} >
        <FaIcon
          icon="pencil-alt"
          style={{ width: '2em', height: '2em', borderRadius: '50%', backgroundColor: 'rgb(0, 92, 185)' }}
          padding="0.5em"
          color="white"
          onClick={
            () => {
              graphqlRequest(EstraiContenutoCompletoQ(content.id_contenuto));
            }
          }
        />
      </NavLink>
    </Tooltip>
  );
}

const mapDispatchToProps = ({
  graphqlRequest
});

export const Modify = connect(null, mapDispatchToProps)(ModifyButton);