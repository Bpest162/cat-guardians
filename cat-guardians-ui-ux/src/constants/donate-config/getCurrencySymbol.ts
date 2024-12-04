import { currencySymbols } from "./currencySymbols";

export const getCurrencySymbol = (paramsCurrency) => {
  return currencySymbols[paramsCurrency] || paramsCurrency;
};
