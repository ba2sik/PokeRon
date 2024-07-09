import { useEffect } from 'react';

export const useEventListener = <EventNameType extends keyof WindowEventMap>(
  eventName: EventNameType,
  onEvent: Parameters<typeof window.addEventListener<EventNameType>>[1],
) => {
  useEffect(() => {
    window.addEventListener(eventName, onEvent);
    console.log('useEffect');
    return () => {
      window.removeEventListener(eventName, onEvent);
    };
  }, [eventName, onEvent]);
};
