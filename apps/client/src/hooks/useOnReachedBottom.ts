import { useEventListener } from './useEventListener';
import React, { useCallback } from 'react';

export const useOnReachedBottom = (
  ref: React.MutableRefObject<HTMLElement | null>,
  onReachedBottom: () => void,
) => {
  const handleScroll = useCallback(() => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        onReachedBottom();
      }
    }
  }, [ref, onReachedBottom]);

  useEventListener('scroll', handleScroll, ref);
};
