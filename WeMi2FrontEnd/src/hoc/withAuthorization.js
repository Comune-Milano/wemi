import { useAuthorization } from 'hooks/useAuthorization';
import React from 'react';
import withRouter from 'react-router/withRouter';
import { PAGE_HOME_URL } from 'types/url';

/**
 * The hoc to check the authorizations
 * @param {*} Componente the component to render if success
 * @param {number[]} list the list of authorizations
 * @param {boolean} hasToRedirect has to redirect
 * @returns {*} the component or null
 */
const withAuthorization = (Componente = () => <></>, list = [], hasToRedirect = false) => {
  const ComponentWithAuthorization = props => {
    const isAuthorized = useAuthorization(list);
    const { history } = props;
    React.useEffect(() => {
      if (isAuthorized) {
        return;
      }
      if (hasToRedirect) {
        history.push(PAGE_HOME_URL);
      }
    }, [isAuthorized]);
    if (isAuthorized) {
      return <Componente {...props} />;
    }
    return null;
  };
  ComponentWithAuthorization.displayName = 'Component with injected router props';
  const ComponentWithAuthorizationRouter = withRouter(ComponentWithAuthorization);
  return ComponentWithAuthorizationRouter;
};

export default withAuthorization;
