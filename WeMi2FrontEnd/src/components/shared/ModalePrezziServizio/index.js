import React from 'react';
import { getModalData } from './ModalePrezziServizioGraphQL';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import Text from 'components/ui/Text';
import Modal, { StyledHeader } from 'components/ui2/Modal';
import Loader from 'components/ui2/Loader';
import { Cost } from 'components/navigation/ServizioOffertoEnte/partials/rightPartials';

const PriceModal = ({
  open,
  setOpen,
  idServizioRiferimento,
  idEnte,
  externalData,
}) => {
  const [modalData, fetchData] = useGraphQLRequest(
    null,
    getModalData,
  );

  React.useEffect(() => {
    if (idServizioRiferimento && idEnte) {
      fetchData({
        idServizioEnte: idServizioRiferimento,
        idEnte,
      })
    }
  }, [idServizioRiferimento, idEnte]);

  const txTitoloServizio = getObjectValue(modalData.data || externalData, 'EstraiDettaglioAmministrativoServizioEnte.service.txTitoloServizio.it', ''),
    nm_ente = getObjectValue(modalData.data || externalData, 'EstraiDettaglioAmministrativoServizioEnte.ente.nm_ente', '');


  const Header = (props) =>
    (
      <StyledHeader>
        <Text
          tag="h2"
          value="Prezzi del servizio"
          size="f4"
          weight="bold"
          color="black"
        />
        <div>
          <Text
            tag="span"
            value={txTitoloServizio}
            size="f7"
            weight="bold"
            transform="uppercase"
            letterSpacing="0.05em"
          />
          &nbsp;–&nbsp;
          <Text
            tag="span"
            value={nm_ente}
            size="f7"
            weight="bold"
            transform="uppercase"
            letterSpacing="0.05em"
          />
        </div>
      </StyledHeader>
    );
  const isLoading = (modalData.pristine || modalData.isLoading) && !externalData;
  return (
    <Modal
      customModal={true}
      header={Header}
      open={open}
      loading={isLoading}
      setOpenModal={setOpen}
      color="primary"
    >

      {
        isLoading ?
        (
          <Loader margin="6em auto" />  
        )
        :
        (
          <Cost
            servizioErogato={modalData.data || externalData}
            locale="it"
            inModal={true}
          />
        )
      }
    </Modal>
  )
};

PriceModal.displayName = 'Modale riepilogo prezzi';

export default PriceModal;
