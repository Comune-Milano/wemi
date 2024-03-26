
import { useRef, useEffect } from 'react';
import { useGraphQLClient } from 'hooks/graphQLClient/useGraphQLClient';

/**
 * An hook to make a graphql subscription and perform a side
 * effect when a new value is emitted.
 * @param {*} request
 * @param {*} requestVariables
 * @param {*} sideEffect
 */
export const useGraphQLSubscription = (
  request,
  requestVariables = {},
  sideEffect,
) => {
  const sideEffectRef = useRef(sideEffect);
  sideEffectRef.current = sideEffect;

    // The GraphQL client.
  const graphQLClient = useGraphQLClient();

  useEffect(
    () => {
      const observable = graphQLClient.performSubscription({
        query: request,
        variables: requestVariables,
      });

      const subscription = observable.subscribe({
        next: result => {
          sideEffectRef.current(result);
        },
        error: () => {
          subscription.unsubscribe();
        },
        complete: () => {
          subscription.unsubscribe();
        },
      });

      return () => {
        subscription.unsubscribe();
      };
    },
    []
  );
};
