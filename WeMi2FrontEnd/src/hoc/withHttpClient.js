import { useHttpClient } from "hooks/httpClient/useHttpClient";
import React from 'react';

export const withHttpClient = Component => {
  return props => {
    const httpClient = useHttpClient();

    return <Component httpClient={httpClient} {...props} />
  };
};