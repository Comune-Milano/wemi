import { createRef, useEffect } from "react";
import { useExternalRedirectManager } from "./useExternalRedirect";

export const useExtRedirectTaskSchedule = (task, unscheduleOnDestroy = true) => {
  const extRedirectManager = useExternalRedirectManager();
  const unscheduleRef = createRef();

  useEffect(
    () => {
      if (unscheduleRef.current) {
        unscheduleRef.current();
      }
      unscheduleRef.current = extRedirectManager.scheduleTask(task);

      return () => {
        if (unscheduleOnDestroy && unscheduleRef.current) {
          unscheduleRef.current();
        }
      };
    },
    [task]
  );
};
