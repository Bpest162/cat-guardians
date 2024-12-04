function axiosAuthMiddleware() {
  return () => (next) => (action) => {
    return next(action);
  };
}

const axiosAuth = axiosAuthMiddleware();

export default axiosAuth;
