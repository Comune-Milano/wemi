import React from 'react';
import { useLogger } from "services/Logger";

const withLogger = (Componente) =>
  /* eslint-disable react/display-name */
  props => {
    const logger = useLogger();
    return <Componente {...props} logger={logger} />;
  };

export default withLogger;
