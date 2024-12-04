import i18n from "i18next";

export const headers = {
  "Content-Type": "text/html; charset=utf-8"
};

export const defaultType = { "Content-Type": "multipart/form-data" };

export const configType = { "Content-Type": "application/json" };

export function getAcceptLanguageHeader() {
  const currentLanguage = i18n.language;
  return { "Accept-Language": currentLanguage };
}
