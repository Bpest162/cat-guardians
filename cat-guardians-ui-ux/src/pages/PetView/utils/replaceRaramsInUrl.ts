export const replaceParamsInUrl = (url: string, params) => {
  return url
    .split("/")
    .map((item) => {
      const key = item.startsWith(":") ? item.slice(1) : item;
      if (key in params) {
        return params[key];
      }
      return item;
    })
    .join("/");
};
