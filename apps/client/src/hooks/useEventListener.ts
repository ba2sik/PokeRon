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
    let refValue: Element | null = null;
    if (isNotNullOrUndefined(ref.current)) {
      ref.current.addEventListener(eventName, onEvent);
      refValue = ref.current;

      return () => {
        if (isNotNullOrUndefined(refValue)) {
          refValue.removeEventListener(eventName, onEvent);
        }
      };
    }
  }, [ref.current, eventName, onEvent]);
};
