const PREFIX = 'services: metrics:';

export default {
  // Track an event
  sendEvent(name: string, data?: Record<string, any>): void {
    try {
      // @ts-ignore
      window.gtag('event', name, data || {});
    } catch (err) {
      const wrappedErr = Error(
        `${PREFIX}: sendEvent: failed to send metrics event "${name}": ${err}`
      );

      console.error(err);
    }
  },
};
