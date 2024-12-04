import { TFunction } from "i18next";
import * as yup from "yup";

export const signUpSchema = (t: TFunction) => {
  return yup.object().shape({
    email: yup
      .string()
      .email(t("pages.signUp.fields.errorsMsg.email.inValid"))
      .required(t("pages.signUp.fields.errorsMsg.email.required")),
    password: yup
      .string()
      .min(10, t("pages.signUp.fields.errorsMsg.password.inValid"))
      .required(t("pages.signUp.fields.errorsMsg.password.required")),
    confirmPassword: yup
      .string()
      .required(t("pages.signUp.fields.errorsMsg.conPassword.required"))
      .oneOf([yup.ref("password"), null], t("pages.signUp.fields.errorsMsg.conPassword.inValid")),
    terms: yup.bool().oneOf([true], t("pages.signUp.fields.errorsMsg.checkbox")).required()
  });
};

export type SignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};
