import { createRef, useEffect } from 'react';
import debounce from 'utils/functions/debounce';
import { ResizeObserver as Polyfill } from '@juggle/resize-observer';

const ResizeObserver = window.ResizeObserver || Polyfill;

export function useElementHeightObserver(domElement, onChange, debounceTime = 100) {
  const observerRef = createRef();

  const heightRef = createRef(domElement?.offsetHeight);

  const handleElementResize = () => {
    const elementOffsetHeight = domElement?.offsetHeight;
    if (elementOffsetHeight !== heightRef.current) {
      heightRef.current = elementOffsetHeight;
      onChange(elementOffsetHeight);
    }
  };

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    } else {
      observerRef.current = new ResizeObserver(debounce(handleElementResize, debounceTime));
    }

    if (domElement) {
      observerRef.current.observe(domElement);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [domElement]);
}