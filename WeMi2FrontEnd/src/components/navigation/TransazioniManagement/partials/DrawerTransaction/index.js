/** @format */

import React, { useState } from 'react';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import Drawer from 'components/ui2/Drawer';
import FaIcon from 'components/ui/FaIcon';
import { DrawerHeader, DrawerBody } from './partials';
import { getTransazioniDetail } from '../../graphql/graphql';
import { dataMapperDettaglioTransazioneDrawer } from '../../graphql/dataMappers';

const DrawerTransaction = ({
  open,
  setOpen,
  idTransaction,
  refreshList,
  setOpenErrorModal,
  setOpenSuccessModal,
}) => {
  const [loading, setLoading] = useState(true);
  const [transaction, eTransaction] = useGraphQLRequest(
    undefined,
    getTransazioniDetail,
    { idTransaction },
    false,
    dataMapperDettaglioTransazioneDrawer
  );

  const onCloseDrawer = (doOpen) => {
    refreshList();
    setOpen(doOpen);
    setLoading(!loading);
  };

  async function getTransaction() {
    await eTransaction({ idTransaction });
    setLoading(!loading);
  }

  async function doRefreshList() {
    refreshList();
    await eTransaction({ idTransaction });
  }
  return (
    <>
      <FaIcon
        noShadow
        icon="\f105"
        size="2x"
        weight="bold"
        fontSize="f4"
        color="blue"
        onClick={async () => {
          await getTransaction();
          setOpen(!open);
        }}
      />
      {!loading && (
      <Drawer
        width="50%"
        open={open}
        setOpenModal={onCloseDrawer}
        openDrawer={onCloseDrawer}
        color="primary"
        fontSize="f6"
        header={() => <DrawerHeader drawerValue={transaction?.data?.transaction ? transaction.data : null} />}
        children={ <DrawerBody setOpenErrorModal={setOpenErrorModal} setOpenSuccessModal={setOpenSuccessModal} refreshList={doRefreshList} bodyValue={transaction?.data?.transaction  ? transaction.data.transaction : null} />}
      />
)}
    </>
  );
};

DrawerTransaction.displayName = 'DrawerTransaction';
export default DrawerTransaction;
