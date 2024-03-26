
/**
 * @param {*} err
 */
export const formatError = (err) => {
  const code = err.extensions?.code;

  // TODO: Add stacktrace in development only.
  return {
    code: code === 'INTERNAL_SERVER_ERROR' ? 0 : code,
    message: err.message,
    data: err.extensions?.exception?.data || {}
  };
};

