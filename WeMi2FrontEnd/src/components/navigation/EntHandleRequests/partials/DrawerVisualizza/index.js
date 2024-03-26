/** @format */

import React from 'react';
import Drawer from 'components/ui2/Drawer';
import { DrawerHeader, DrawerBody, DrawerBodyOperatore } from './partials';

const DrawerVisualizza = ({
  currentPage,
  getElementi,
  setCurrentPage,
  open,
  setOpen,
  bodyValue,
  headerValue,
  drawerType,
  isFeedback,
}) => {
  const RenderHeader = () => (
    <DrawerHeader headerValue={headerValue} />
  );
  RenderHeader.displayName = 'RenderHeader';

  const RenderBody = (drawerType) => {
    if (drawerType === 'operatore') {
      return (
        <DrawerBodyOperatore
          bodyValue={bodyValue}
          setCurrentPage={setCurrentPage}
        />
      );
    } if (drawerType === 'ente') {
      return (
        <DrawerBody
          bodyValue={bodyValue}
          getElementi={getElementi}
          setCurrentPage={setCurrentPage}
          isFeedback={isFeedback}
          currentPage={currentPage}
        />
      );
    }

    return null;
  };
  RenderBody.displayName = 'RenderBody';

  return (
    <Drawer
      width="60%"
      open={open}
      setOpenModal={setOpen}
      header={RenderHeader}
    >
      {RenderBody(drawerType)}
    </Drawer>
  );
};

DrawerVisualizza.displayName = 'DrawerVisualizza';
export default DrawerVisualizza;
