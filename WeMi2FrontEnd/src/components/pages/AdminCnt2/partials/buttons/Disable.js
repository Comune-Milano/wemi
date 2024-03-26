import React, { useContext } from 'react';
import FaIcon from 'components/ui2/FaIcon/ButtonIcon';
import Tooltip from 'components/ui/Tooltip';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { statoContenutoUPD as statoContenutoUPDM } from '../../graphql/updateStatoContenuto';
import { contentContext } from '../../ContentContext';
import { connect } from 'react-redux';
import { estraiVociMenu as estraiVociMenuQ } from 'components/navigation/Navbar/menuGraphQL';
import { getFooterLinks as getFooterLinksQ } from 'components/navigation/Footer/partials/FooterGraphQL';
import { FOOTER_COLONNA_1, FOOTER_COLONNA_2, VOCI_MENU_LIVELLO_1, VOCI_MENU_LIVELLO_2 } from 'types/contenuti/typeContenuto';
import { graphqlRequest } from 'redux-modules/actions/authActions';

const DisableButton = ({
  userProfile,
  graphqlRequest,
  content,
  typeContenuto,
  getContenutoTyData,
}) => {

  const context = useContext(contentContext);

  const { setCurrentPage, filters } = context;
  
  const { datiLogin } = userProfile; 

  const updateStatoContenuto = useStatelessGraphQLRequest(statoContenutoUPDM);

  const handleBlock = async id => {
    /**
     * Constant of the state Deactivated
     */
    const status = 3;
    const idUtente = datiLogin.idCittadino;
    await updateStatoContenuto({ idContenuto: id, statoContenuto: status, idUtente });

    const statoContenuto = filters.statoCnt.id !== 0? filters.statoCnt.id : undefined;

    const ricerca = filters.ricerca !== ''? filters.ricerca : undefined;

    await getContenutoTyData({
      offset: 0,
      statoContenuto,
      typeContenuto,
      ricerca
    });

    setCurrentPage(1);
  }

  return (
    <Tooltip
      top
      horizzontalShift="-1em"
      fontSize="f8"
      textTT="Disattiva"
      color="white"
      bgcolor="red">
      <FaIcon
        icon="minus"
        padding="0.5em"
        color="white"
        style={{ width: '2em', height: '2em', borderRadius: '50%', backgroundColor: 'rgb(221, 0, 49)' }}
        padding="0.5em"
        bgcolor="red"
        onClick={async () => {
          await handleBlock(content.id_contenuto);
          if (typeContenuto === FOOTER_COLONNA_1 || typeContenuto === FOOTER_COLONNA_2) {
            graphqlRequest(getFooterLinksQ());
          }
          if (typeContenuto === VOCI_MENU_LIVELLO_1 || typeContenuto === VOCI_MENU_LIVELLO_2) {
            graphqlRequest(estraiVociMenuQ());
          }
        }} />
    </Tooltip>
  );
}


const mapDispatchToProps = ({
  graphqlRequest
});

export const Disable = connect(null, mapDispatchToProps)(DisableButton);