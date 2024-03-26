/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { resetField } from 'redux-modules/actions/authActions';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import Text from 'components/ui/Text';
import Modal, {StyledHeader} from 'components/ui2/Modal';
import Loader from 'components/ui2/Loader';
import Rating from 'components/navigation/ModaleRating/index';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme';

const RatingModal = ({ open, setOpen, Recensioni, locale, loaded, resetField }) => {
   
  const Header = (props) =>
    (
      <StyledHeader
        mobileFullScreen="true">
        <Text
          tag="h2"
          value="Recensioni"
          size={"f4"}
          weight="bold"
          color="black"
        />
        {Recensioni && Recensioni.length > 0 &&
          <div>
            <Text
              tag="span"
              value={getObjectValue(Recensioni[0], 'tl_testo_1.' + locale, '')}
              size={"f7"}
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
            />
            &nbsp;–&nbsp;
          <Text
              tag="span"
              value={getObjectValue(Recensioni[0], 'nm_ente', '')}
              size={"f7"}
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
            />
          </div>}
      </StyledHeader>
    );

  return (
    <Modal
      customModal={true}
      header={Header}
      open={open}
      loading={loaded !== 2}
      width={'90%'}
      setOpenModal={(e) => {
        setOpen.bind(this);
        setOpen();
        resetField("EstraiRecensioni");
      }}
      setOpenModal={setOpen.bind(this)}
      color="primary"
      mobileFullScreen="true">
       
      {Recensioni ? <Rating Recensioni={Recensioni}/> : <Loader margin="6em auto" />}

    </Modal>
  )
};

const mapDispatchToProps = {
  resetField,
};

const mapStoreToProps = store => ({
  Recensioni: store.graphql.EstraiRecensioni,
  locale: store.locale,
  loaded: store.graphql.loaded,
});
export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(RatingModal);
