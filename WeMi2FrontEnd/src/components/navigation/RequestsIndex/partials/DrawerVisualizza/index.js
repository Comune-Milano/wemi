/** @format */

import React from 'react';
import Drawer from 'components/ui2/Drawer';
import { DrawerHeader, DrawerBody, DrawerTCB } from './partials';
import { connect } from 'react-redux';
import Loader from 'components/ui/Loader';
import { mapData } from './utils';
import { ENTE, TCB } from '../../constants';
import withAuthentication from 'hoc/withAuthentication'


const DrawerVisualizza = ({
  requestState,
  data,
  closeDrawer,
  locale,
  userProfile,
  getModalInfo,
  setOpenModalAnnullamento
}) => {
  const { datiLogin } = userProfile;
  let mappedData = {
    headerData: null,
    bodyData: null,
  }
  if (requestState.data) {
    mappedData = mapData({
      ...data.rowClickedData,
      ...requestState.data,
      richiestaEnte: requestState.data,
    }, locale, data.requestType, datiLogin);
  }
  const { headerData, bodyData } = mappedData;
  const isTCB = data.requestType === TCB;
  //dati per DrawerHeader
  let dataDaVisible;
  let numeroPrestazioniVisible;
  let numeroPersoneVisible;
  if (headerData) {
    dataDaVisible = !(isTCB && headerData.dataDa) && headerData.richiestaDisponibilita;
    numeroPrestazioniVisible = !(isTCB && headerData.numeroPrestazioni === 'N/D');
    numeroPersoneVisible = !(isTCB && headerData.numeroPersone === 'N/D');
  };

  const renderBody = () => {
    if (!bodyData) {
      return null;
    }
    if (isTCB) {
      return (
        <DrawerTCB
          Data={bodyData}
          getModalInfo={getModalInfo}
          setOpenModalAnnullamento={setOpenModalAnnullamento}
          closeDrawer={closeDrawer}
        />
      );
    }
    if (data.requestType === ENTE) {
      return (
        <DrawerBody
          Data={bodyData}
        />
      );
    }
  }

  const renderHeader = () => {
    if (!headerData) {
      return null;
    }
    if (requestState.isLoading) {
      return <Loader />
    }
    return (
      <DrawerHeader
        Data={headerData}
        dataDaVisible={dataDaVisible}
        numeroPrestazioniVisible={numeroPrestazioniVisible}
        numeroPersoneVisible={numeroPersoneVisible}
      />
    )
  }

  return (
    <Drawer
      open={data.openDrawer}
      setOpenModal={closeDrawer}
      width="60%"
      children={renderBody()}
      header={renderHeader}
    />
  );
};

const mapStoreToProps = store => ({
  locale: store.locale,
});

DrawerVisualizza.displayName = 'DrawerVisualizza';
export default connect(mapStoreToProps)(withAuthentication(DrawerVisualizza));
