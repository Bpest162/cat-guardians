import { TFunction } from "i18next";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import { AdoptionFormValues } from "./adoptionFormYupSchema";

export interface FieldsProps {
  onPrev?: () => void;
  onNext?: () => void;
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors<AdoptionFormValues>;
  t?: TFunction<"translation", undefined>;
}
