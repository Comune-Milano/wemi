import React, { useState } from 'react';
import FaIcon from 'components/ui2/FaIcon/ButtonIcon';
import { Row } from 'components/ui/Grid';
import Drawer from 'components/ui2/Drawer';
import { DrawerBody, DrawerHeader } from '../DrawerLavoratore';


const Action = ({ worker }) => {
  
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <div style={{ textAlign: 'start' }}>
        <Drawer
          open={openDrawer}
          setOpenModal={setOpenDrawer}
          width="60%"
          children={<DrawerBody worker={worker} />}
          header={() => <DrawerHeader worker={worker} />}
          color="green"
        />
      </div>
      <Row
        fluid
        onClick={setOpenDrawer}
        justifycontent="center"
      >
        <FaIcon
          icon="angle-right"
          color="blue"
          fontSize="f7"
        />

      </Row>
    </>

  );
};

Action.displayName = 'Action';

export const ActionIcon = Action;