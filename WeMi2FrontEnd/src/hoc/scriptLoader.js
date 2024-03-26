
import React, { useState, useRef, useEffect } from 'react';
import { getDisplayName as getComponentDisplayName } from 'utils/functions/getComponentName';

/**
 * A utility function to load a global script asynchronously.
 */
const loadScript = source => {
  const scriptElement = document.createElement('script');
  scriptElement.async = true;
  scriptElement.src = source;

  return new Promise((resolve, reject) => {
    scriptElement.addEventListener('load', () => resolve(source));
    scriptElement.addEventListener('error', error => reject(error));

    document.body.appendChild(scriptElement);
  });
};

// A local cache keeping track of already loaded scripts.
const cachedScripts = new Set();

/**
 * An HOC to load a set of scripts when a component is mounted.
 */
const loadScripts = sources =>
  WrappedComponent => {
    const EnhancedComponent = props => {
      // Embeds the loading state of the script.
      const [loadingState, setLoadingState] = useState({
        loaded: false,
        loadedSuccessfully: false,
      });

      // Tells if the component is mounted.
      const isMounted = useRef(true);

      // Starts the scripts loading when the component is mounted.
      useEffect(
        () => {
          isMounted.current = true;

          const sourcesPromises = sources
            // Keep only unloaded scripts.
            .filter(src => !cachedScripts.has(src))
            .map(src => loadScript(src));

          Promise.all(sourcesPromises)
            .then(loadedSources => {
              loadedSources.forEach(loadedSrc => cachedScripts.add(loadedSrc));

              if (!isMounted.current) {
                return;
              }
              setLoadingState({
                loaded: true,
                loadedSuccessfully: true,
              });
            })
            .catch(() => {
              if (!isMounted.current) {
                return;
              }
              setLoadingState({
                loaded: true,
                loadedSuccessfully: false,
              });
            });

          return () => {
            isMounted.current = false;
          };
        },
        []
      );

      const mergedProps = {
        ...props,
        scriptLoaded: loadingState.loaded,
        scriptLoadedSuccessfully: loadingState.scriptLoadedSuccessfully,
      };

      return <WrappedComponent {...mergedProps} />;
    };

    // The display name is derived from the wrapped component name :)
    const wrappedComponentName = getComponentDisplayName(WrappedComponent);
    EnhancedComponent.displayName = `loadScripts (${wrappedComponentName})`;

    return EnhancedComponent;
  };

export default loadScripts;
