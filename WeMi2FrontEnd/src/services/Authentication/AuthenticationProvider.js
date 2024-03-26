import React, { useEffect, useState } from 'react';
import { useLogger } from 'services/Logger';
import { useStatelessAuthService } from 'hooks/authRequest/useStatelessAuthService';
import { useGraphQLClient } from 'hooks/graphQLClient/useGraphQLClient';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { SessionTimeout } from './SessionTimeout';
import { sessionExpirationNotify } from './graphql/sessionExpirationNotify';
import context from './AuthenticationContext';

const AuthenticationProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({ datiLogin: null, loading: true, hasError: false, error: null });
  const fetchAuthService = useStatelessAuthService();
  const logger = useLogger();
  const [open, setOpen] = useState(false);
  const graphqlClient = useGraphQLClient();


  useEffect(() => {
    async function fetchData() {
      const datiLogin = await fetchAuthService();
      logger.log('Injecting context with user data');
      setUserProfile({ ...userProfile, datiLogin, loading: false });
    }

    fetchData();
  }, []);

  const { datiLogin } = userProfile;

  useEffect(() => {
    if (datiLogin) {
      const observer = graphqlClient.performSubscription(
        {
          query: sessionExpirationNotify[0],
          variables: {},
        }
      );

      const subscription = observer.subscribe({
        next: (result) => {
          const key = `data.${sessionExpirationNotify[1]}`;
          const responseMapped = getObjectValue(result, key, '');
          logger.log('Parsing subscription response', responseMapped);
          setOpen(responseMapped);
        },
        error: () => { subscription.unsubscribe(); },
        complete: () => { subscription.unsubscribe(); },
      });
    }
  }, [datiLogin]);

  return (
    <context.Provider value={{ userProfile, setUserProfile }}>
      {children}
      {
        open ?
          <SessionTimeout open={open} />
          : null
      }
    </context.Provider>
  );
};

AuthenticationProvider.displayName = 'AuthenticationProvider';

export default AuthenticationProvider;
