import React, { useContext } from 'react';
import contestoAutenticazione from 'services/Authentication/AuthenticationContext';

const withAuthentication = (Componente) =>
    props => {
      const authContext = useContext(contestoAutenticazione);
      return <Componente {...authContext} {...props} />;
    };

export default withAuthentication;
