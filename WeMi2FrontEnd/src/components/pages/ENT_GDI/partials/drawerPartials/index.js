/** @format */

import React, {useState} from 'react';
import Drawer from 'components/ui2/Drawer';
import FaIcon from 'components/ui/FaIcon';
import DrawerHeader from './DrawerHeader';
import DrawerBody from './DrawerBody';

const DrawerVisualizza = ({scrollDown, bodyValue, headerValue}) => {
  const [open, setOpen] = useState(false)


  return (
<>
<FaIcon
    noShadow
    icon="\f105"
    size="2x"
    weight="bold"
    fontSize="f4"
    color="blue"
    onClick={() => setOpen(!open)}
  />
      <Drawer
        width="50%"
        open={open}
        openDrawer={setOpen}
        setOpenModal={setOpen}
        color="white"
        fontSize="f6"
        header={()=><DrawerHeader headerValue={headerValue}/>}
        children={
          <DrawerBody bodyValue={bodyValue}/>
      }
      />
      </>
  );
};

DrawerVisualizza.displayName = 'DrawerVisualizza';
export default DrawerVisualizza;
