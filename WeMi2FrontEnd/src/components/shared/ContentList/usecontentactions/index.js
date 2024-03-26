import { useCallback, useState } from 'react';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { generatePath } from 'react-router';

export const useContentActions = ({ publishGraphQL, disableGraphQL, history, modifyUrl = '', idOperatore }) => {
  const [isPending, setIsPending] = useState(false);
  const publishMutation = useStatelessGraphQLRequest(publishGraphQL);

  const disableMutation = useStatelessGraphQLRequest(disableGraphQL);

  const disable = useCallback(async (id) => {
    setIsPending(true);
    await disableMutation({ id });
    setIsPending(false);
  }, [setIsPending, disableMutation]);

  const publish = useCallback(async (id) => {
    setIsPending(true);
    await publishMutation({ id });
    setIsPending(false);
  }, [setIsPending, publishMutation]);

  const modify = useCallback((dataset = {}) => {
    const { id } = dataset;
    const url = generatePath(modifyUrl, { idContent: id });
    history.push(url);
  }, [modifyUrl]);

  return { publish, disable, isPending, modify };
};
