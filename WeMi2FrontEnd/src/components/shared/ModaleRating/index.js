import React from 'react';

import { getObjectValue } from 'utils/extensions/objectExtensions';
import Text from 'components/ui/Text';
import Modal, { StyledHeader } from 'components/ui2/Modal';
import Loader from 'components/ui2/Loader';
import Rating from 'components/navigation/ModaleRating/index';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { getRecensioni } from './ModaleRatingGraphQL';


const RatingModal = ({
  open,
  setOpen,
  idEnte,
  idServizioRiferimento,
  locale = 'it',
}) => {
  const [modalData, fetchModalData] = useGraphQLRequest(
    null,
    getRecensioni,
  );

  React.useEffect(() => {
    if (idEnte && idServizioRiferimento) {
      fetchModalData({
        idEnte,
        idServizioRiferimento,
      });
    }
  }, [idEnte, idServizioRiferimento]);

  const Header = (props) =>
    (
      <StyledHeader
        mobileFullScreen="true"
      >
        <Text
          tag="h2"
          value="Recensioni"
          size="f4"
          weight="bold"
          color="black"
        />
        {modalData.data && modalData.data.length > 0 && (
          <div>
            <Text
              tag="span"
              value={getObjectValue(modalData.data[0], `tl_testo_1.${locale}`, '')}
              size="f7"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
            />
            &nbsp;–&nbsp;
            <Text
              tag="span"
              value={getObjectValue(modalData.data[0], 'nm_ente', '')}
              size="f7"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
            />
          </div>
        )}
      </StyledHeader>
    );
  Header.displayName = 'Header modal rating';

  const isLoading = (modalData.pristine || modalData.isLoading) || !open;

  return (
    <Modal
      customModal
      header={Header}
      open={open}
      width="90%"
      setOpenModal={() => {
        setOpen(true);
      }}
      color="primary"
      mobileFullScreen="true"
    >

      {!isLoading ? <Rating Recensioni={modalData.data} /> : <Loader margin="6em auto" />}

    </Modal>
  );
};
RatingModal.displayName = 'Modale recensioni';
export default RatingModal;
