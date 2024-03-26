/** @format */

import React, { useState } from 'react';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import Drawer from 'components/ui2/Drawer';
import FaIcon from 'components/ui/FaIcon';
import { DrawerHeader, DrawerBody } from './partials';
import { estraiVoucher } from './partials/VoucherGraphQL';

const DrawerVoucher = ({
  open,
  setOpen,
  idVoucher,
  refreshList,
  setOpenErrorModal,
  setOpenSuccessModal,
}) => {
  const [loading, setLoading] = useState(true);
  const [voucher, eVoucher] = useGraphQLRequest(
    undefined,
    estraiVoucher,
    { idVoucher },
    false,
    rs => {
      return {
        title: `Voucher ${rs.state}`,
        voucher: rs,
      };
    }
  );

  const onCloseDrawer = (doOpen) => {
    refreshList();
    setOpen(doOpen);
    setLoading(!loading);
  };

  async function getVoucher() {
    await eVoucher({ idVoucher });
    setLoading(!loading);
  }

  async function doRefreshList() {
    refreshList();
    await eVoucher({ idVoucher });
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
          await getVoucher();
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
        header={() => <DrawerHeader drawerValue={voucher?.data ? voucher.data : null} />}
        children={ <DrawerBody setOpenErrorModal={setOpenErrorModal} setOpenSuccessModal={setOpenSuccessModal} refreshList={doRefreshList} bodyValue={voucher?.data?.voucher  ? voucher.data.voucher : null} />}
      />
)}
    </>
  );
};

DrawerVoucher.displayName = 'DrawerVoucher';
export default DrawerVoucher;
