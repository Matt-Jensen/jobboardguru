let searchString = '';

if (typeof window !== 'undefined') {
  searchString = window.location.search;
}

const urlParams = new URLSearchParams(searchString);

export default new Proxy(urlParams, {
  // Return decoded query string param
  get: (target, prop): any  => {
    if (prop === 'toJSON') {
      return getQueryState; // return function
    }

    // Collect all GET parameters
    const entries = Array.from(urlParams.entries());

    return entries
      .filter(([key]) => key === String(prop)) // find all matching prop
      .map(([, value]) => decodeURIComponent(value)) // decode
      .join('|'); // combine into single string
  },

  // Encode and set Query String param
  // and broadcast Custom Event
  set: (target, prop: string, value: string | string[]): boolean => {
    const preUpdateState = urlParams.toString();

    if (!value) {
      // Delete property
      urlParams.delete(prop); // remove from URL
    } else if (Array.isArray(value)) {
      // Set array of values
      urlParams.delete(prop); // remove exsiting addon queries

      // Add any new addon queries
      value.forEach(val => {
        urlParams.append(prop, encodeURIComponent(val));
      });
    } else {
      // Set single value
      const update = encodeURIComponent(value);

      if (urlParams.has(prop)) {
        urlParams.set(prop, update);
      } else {
        urlParams.append(prop, update);
      }
    }

    const postUpdateState = urlParams.toString();

    if (preUpdateState !== postUpdateState) {
      updatedHash();
    }

    return true;
  }
});

/**
 * Get decoded state of all query params
 * @return {Object}
 */
export function getQueryState() {
  const enteries = Array.from(urlParams.entries());
  const data = Object.create(null);

  for (const entry of enteries) {
    data[entry[0]] = decodeURIComponent(entry[1]);
  }

  return data;
}

/**
 * Get encoded state of all query params
 * @return {String}
 */
export function getQueryString() {
  return urlParams.toString();
}

// Append a new state to the history
// for updated query params
function updatedHash() {
  const qs = urlParams.toString();
  const data = getQueryState();
  history.pushState(data, '', decodeURIComponent(`${window.location.pathname}${qs ? '?' : ''}${qs}`));

  if (typeof CustomEvent !== 'undefined' && typeof window !== 'undefined') {
    const event = new CustomEvent('queryparamchange', {detail: data});
    window.dispatchEvent(event);
  }
}