/** @format */

import React, { useState, useRef, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Loader from 'components/ui2/Loader';
import { openLoginModal } from 'redux-modules/actions/authActions';
import { SearchResultsJson } from 'mocks/SearchServiceJson';
import { connect } from 'react-redux';
import useWindowSize from 'hooks/useWindowSize';
import FiltriDesktop from './FiltriDesktop';
import FiltriMobile from './FiltriMobile';
import EntGridPagination from './ResultsGrid';

import { PriceModal, CheckAddressModal, EntServiceModal, SchedaEnteModal } from './EntGridElement/modals';
import RatingModal from './EntGridElement/modals/RatingModal';

const WrapperColumn = styled(Column)`
  position: relative;
  justify-content: flex-end;
  min-height: 30em;
`;



const Risultati = ({
  enti,
  entiFiltrati,
  entiSelezionati,
  pathname,
  match,
  datiLogin,
  filtri,
  openLoginModal,
  loaded }) => {

  const windowWidth = useWindowSize();
  const param = new URLSearchParams(location.search);
  const codSezione = param.get('codSezione');

  // Modali
  const [openPrice, setOpenPrice] = useState(false);
  const [openRating, setOpenRating] = useState(false);
  const [openSchedaEnte, setOpenSchedaEnte] = useState(false);
  const [openEntService, setOpenEntService] = useState(false);
  const [openCheckAddress, setOpenCheckAddress] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const addressInputRef = useRef();

  const checkValidity = () => {
    if (entiSelezionati && !(entiSelezionati.length === 0)
      &&
      filtri && filtri.municipio) {
      return true
    }
    return false
  };

  const commonProps = {
    checkValidity: checkValidity,
    redirect: redirect,
    setRedirect: setRedirect,
    addressInputRef: addressInputRef,
    openCheckAddress: openCheckAddress,
    setOpenCheckAddress: setOpenCheckAddress,
    SearchResultsJson: SearchResultsJson,
    pathname: pathname
  };

  const upperBreakpoints = ['md', 'lg', 'xl', 'xxl', 'xxxl'];
  
  return (
    <>
      {redirect ?
        <Redirect to={`${match.url}/forward?codSezione=${codSezione}`} />
        : null}
      <WrapperColumn xs="12" md="8" padding="0">
        {upperBreakpoints.indexOf(windowWidth) > -1 ?
          <FiltriDesktop
            entiFiltrati={entiFiltrati}
            enti={enti}
            loaded={loaded}
            props={commonProps}
          /> :
          <FiltriMobile
            enti={enti}
            entiFiltrati={entiFiltrati}
            loaded={loaded}
            props={commonProps}
          />}
        <Row fluid padding="2em 0" justifycontent="center">
          {entiFiltrati && loaded ? entiFiltrati.length > 0 ?
            <EntGridPagination
              openPrice={openPrice} setOpenPrice={setOpenPrice.bind(this)}
              openRating={openPrice} setOpenRating={setOpenRating.bind(this)}
              setOpenSchedaEnte={setOpenSchedaEnte.bind(this)}
              openSchedaEnte={openSchedaEnte}
              setOpenEntService={setOpenEntService.bind(this)}
              openEntService={openEntService}
              props={SearchResultsJson}
              colonne={SearchResultsJson}
              json={entiFiltrati}
              pathname={pathname}
            /> : <Text value='Nessun risultato' intlFormatter size="f6" /> : <Loader size="3em" />}
        </Row>
      </WrapperColumn>
      <RatingModal open={openRating} setOpen={setOpenRating} />
      <PriceModal open={openPrice} setOpen={setOpenPrice} />
      <SchedaEnteModal open={openSchedaEnte} setOpen={setOpenSchedaEnte} />
      <EntServiceModal open={openEntService} setOpen={setOpenEntService} />
      <CheckAddressModal open={openCheckAddress} setOpen={setOpenCheckAddress} pathname={pathname}
        redirect={redirect}
        setRedirect={setRedirect}
        addressInputRef={addressInputRef}
      />

    </>
  )
};


Risultati.displayName = '  Risultati';

function mapStateToProps(state) {
  const { user, datiLogin, graphql } = state;
  const { enti: entiFiltrati, filtri } = user;
  return {
    datiLogin: datiLogin,
    entiSelezionati: entiFiltrati,
    filtri: filtri,
  };
};

const mapDispatchToProps = {
  openLoginModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Risultati));
