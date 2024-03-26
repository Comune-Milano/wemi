import React, { useContext } from 'react';
import FaIcon from 'components/ui2/FaIcon/ButtonIcon';
import Tooltip from 'components/ui/Tooltip';
import { Column } from 'components/ui/Grid';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { statoContenutoUPD as statoContenutoUPDM } from '../../graphql/updateStatoContenuto';
import { TESTIMONIALS_SCHEDA_INTRODUTTIVA, FOOTER_COLONNA_2, VOCI_MENU_LIVELLO_1, VOCI_MENU_LIVELLO_2, FOOTER_COLONNA_1 } from 'types/contenuti/typeContenuto';
import { contentContext } from '../../ContentContext';
import { connect } from 'react-redux';
import { estraiVociMenu as estraiVociMenuQ } from 'components/navigation/Navbar/menuGraphQL';
import { getFooterLinks as getFooterLinksQ } from 'components/navigation/Footer/partials/FooterGraphQL';
import { graphqlRequest} from 'redux-modules/actions/authActions';

const PublishButton = ({
  userProfile,
  content,
  contents,
  typeContenuto,
  getContenutoTyData,
  graphqlRequest,
}) => {

  const context = useContext(contentContext);

  const { setCurrentPage, filters } = context;

  const { datiLogin } = userProfile;

  const updateStatoContenuto = useStatelessGraphQLRequest(statoContenutoUPDM);

  const handlePublish = async id => {
    /**
     * Constant of the state Published
     */
    const status = 2;
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
  };

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
    <Column xs="2" flex justifycontent="center" padding="1em 0" margin="0"
      id={content.id_contenuto}
      onClick={() => handlePublish(content.id_contenuto)}
    >
      <Tooltip
        top
        horizzontalShift="-1em"
        fontSize="f8"
        textTT="Pubblica"
        color="white"
        bgcolor="green">
        <FaIcon
          icon="upload"
          padding="0.5em"
          color="white"
          style={{ width: '2em', height: '2em', borderRadius: '50%', backgroundColor: 'rgb(119, 188, 31)' }}
          onClick={async () => {
            if (typeContenuto === TESTIMONIALS_SCHEDA_INTRODUTTIVA) {
              contents.map(async (elemento) => {
                if (elemento.id_contenuto !== content.id_contenuto) {
                  return await (handleBlock(elemento.id_contenuto));
                }
                else {
                  return null;
                }
              });
            }

            await handlePublish(content.id_contenuto);

            if (typeContenuto === FOOTER_COLONNA_1 || typeContenuto === FOOTER_COLONNA_2) {
              /**
               * Callback per query footer
               */
              graphqlRequest(getFooterLinksQ());
            }
            if (typeContenuto === VOCI_MENU_LIVELLO_1 || typeContenuto === VOCI_MENU_LIVELLO_2) {
              /**
               * Callback per query navbar
               */
              graphqlRequest(estraiVociMenuQ());
            }
          }} />
      </Tooltip>
    </Column>
  );
}

const mapDispatchToProps = ({
  graphqlRequest
});

export const Publish = connect(null, mapDispatchToProps)(PublishButton);