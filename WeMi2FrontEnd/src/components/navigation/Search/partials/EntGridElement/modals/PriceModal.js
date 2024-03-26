/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { resetField } from 'redux-modules/actions/authActions';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import Text from 'components/ui/Text';
import Modal, {StyledHeader} from 'components/ui2/Modal';
import Loader from 'components/ui2/Loader';
import { Cost } from 'components/navigation/ServizioOffertoEnte/partials/rightPartials';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme';

const PriceModal = ({ open, setOpen, datiEnte, locale, loaded, resetField }) => {

  const txTitoloServizio = getObjectValue(datiEnte, 'EstraiDettaglioAmministrativoServizioEnte.service.txTitoloServizio.' + locale, ''),
    nm_ente = getObjectValue(datiEnte, 'EstraiDettaglioAmministrativoServizioEnte.ente.nm_ente', '');


  const Header = (props) =>
    (
      <StyledHeader>
        <Text
          tag="h2"
          value="Prezzi del servizio"
          size={"f4"}
          weight="bold"
          color="black"
        />
        <div>
          <Text
            tag="span"
            value={txTitoloServizio}
            size={"f7"}
            weight="bold"
            transform="uppercase"
            letterSpacing="0.05em"
          />
          &nbsp;–&nbsp;
          <Text
            tag="span"
            value={nm_ente}
            size={"f7"}
            weight="bold"
            transform="uppercase"
            letterSpacing="0.05em"
          />
        </div>
      </StyledHeader>
    );

  return (
    <Modal
      customModal={true}
      header={Header}
      open={open}
      loading={loaded !== 2}
      setOpenModal={(e) => {
        setOpen.bind(this);
        setOpen();
        resetField("EstraiDettaglioAmministrativoServizioEnte");
      }}
      color="primary">

      {datiEnte ? <Cost servizioErogato={datiEnte} locale={locale} inModal={true} /> : <Loader margin="6em auto" />}

    </Modal>
  )
};

const mapDispatchToProps = {
  resetField,
};

const mapStoreToProps = store => ({
  datiEnte: store.graphql.EstraiDettaglioAmministrativoServizioEnte,
  locale: store.locale,
  loaded: store.graphql.loaded,
});
export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(PriceModal);
