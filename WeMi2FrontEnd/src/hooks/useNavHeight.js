import { NAV_HEIGHT_CHANGE_EV } from "components/navigation/Navbar/constants";
import { useState } from "react";
import { useBusSubscribe } from "./eventBus/useBusSubscribe";

function getNavHeight() {
  return document.getElementById('navigation-menu')?.offsetHeight || 0;
}

export function useNavHeight() {
  const [navHeight, setNavHeight] = useState(getNavHeight());

  useBusSubscribe(
    NAV_HEIGHT_CHANGE_EV,
    newNavHeight => {
      setNavHeight(newNavHeight);
    }
  );

  return navHeight;
}
