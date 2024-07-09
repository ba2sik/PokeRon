import React, { useEffect } from 'react';
import { isNotNullOrUndefined } from '../utils/arrays';

export const useEventListener = <
  Element extends HTMLElement | Window,
  EventName extends Parameters<Element['addEventListener']>[0],
>(
  eventName: EventName,
  onEvent: Parameters<Element['addEventListener']>[1],
  ref: React.MutableRefObject<Element | null>,
) => {
  useEffect(() => {
    if (isNotNullOrUndefined(ref.current)) {
      ref.current.addEventListener(eventName, onEvent);

      return () => {
        if (isNotNullOrUndefined(ref.current)) {
          ref.current.removeEventListener(eventName, onEvent);
        }
      };
    }
  }, [ref.current, eventName, onEvent]);
};
