 /**
   * Check if the provided value should be considered as an external url.
   * @param {*} url
   */
  export const isExternalUrl = url => /^https?:\/\//.test(url);
