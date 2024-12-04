import { TFunction } from "i18next";
import * as yup from "yup";

export const logInSchema = (t: TFunction) => {
  return yup.object().shape({
    email: yup
      .string()
      .email(t("pages.login.fields.errorsMsg.email.inValid"))
      .required(t("pages.login.fields.errorsMsg.email.required")),
    password: yup.string().required(t("pages.login.fields.errorsMsg.password.required")),
    rememberMe: yup.bool()
  });
};

export type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};
