import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Checkbox, CircularProgress, FormControlLabel } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomButton from "src/components/buttons/CustomButton";
import CustomLinkButton from "src/components/buttons/CustomLinkButton";
import FaceBookIcon from "src/components/icons/FaceBIcon";
import GoogleIcon from "src/components/icons/GoogleIcon";
import InstIcon from "src/components/icons/InstIcon";
import { ROUTES } from "src/constants/routing/urls";

import { logInSchema } from "./lib/loginSchema";
import { useStyles } from "./login.styles";
import { fetchLogin } from "./store/actions";
import { selectLogInData, selectLoginState } from "./store/selectors";

const Login = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const loginData = useSelector(selectLogInData);
  const loginState = useSelector(selectLoginState);

  const { t } = useTranslation();
  const yupLoginSchema = logInSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(yupLoginSchema)
  });

  const onSubmit = (data) => {
    dispatch(fetchLogin.request(data));

    reset();
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.loginTitleWrapper}>
          <h2 className={classes.loginTitle}>{t("pages.login.title")}</h2>
          <div className={classes.offerTextBox}>
            <p className={classes.accountText}>{t("pages.login.noAccount")}</p>
            <CustomLinkButton
              to={ROUTES.SIGNUP}
              className={classes.signUpLink}
              title={t("pages.login.signUpLink")}
            />
          </div>
        </div>
        <form action="" className={classes.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email" className={classes.formLabel}>
            {t("pages.login.fields.labels.email")}
            <input
              type="email"
              id="email"
              className={classes.formInput}
              placeholder={t("pages.login.fields.placeholders.email")}
              {...register("email")}
            />
            {errors.email && <p className={classes.errorMsg}>{`${errors.email.message}`}</p>}
          </label>
          <label htmlFor="password" className={classes.formLabel}>
            {t("pages.login.fields.labels.password")}
            <input
              type="password"
              id="password"
              className={classes.formInput}
              placeholder={t("pages.login.fields.placeholders.password")}
              {...register("password")}
            />
            {errors.password && <p className={classes.errorMsg}>{`${errors.password.message}`}</p>}
          </label>
          <div className={classes.checkboxWrapper}>
            <FormControlLabel
              control={<Checkbox className={classes.checkbox} {...register("rememberMe")} />}
              label={
                <p className={classes.checkboxLabelTitle}>
                  {t("pages.login.fields.labels.checkbox")}
                </p>
              }
            />
            <CustomLinkButton
              className={classes.forgotText}
              title={t("pages.login.forgotPassword")}
              to="#"
            />
          </div>
          <CustomButton
            className={classes.buttonSubmit}
            title={t("pages.login.submitButton")}
            type="submit"
          />
        </form>
        {loginState.loading && <CircularProgress />}
        {loginData && <Alert severity="success">{loginData.data.message}</Alert>}
        {loginState.error.message && <Alert severity="error">{loginState.error.message}</Alert>}
        <div className={classes.socialIconsTextBox}>
          <p className={classes.iconsText}>{t("pages.login.addLink")}</p>
          <div className={classes.iconsBox}>
            <Link to="">
              <FaceBookIcon width="46" height="46" />
            </Link>
            <Link to="">
              <InstIcon width="40" height="40" />
            </Link>
            <Link to="">
              <GoogleIcon width="40" height="40" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
