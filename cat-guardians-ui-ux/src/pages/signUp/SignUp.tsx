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

import { signUpSchema } from "./lib/signUpSchema";
import { useStyles } from "./signUp.styles";
import { fetchSignUp } from "./store/actions";
import { selectSignUpData, selectSignUpState } from "./store/selectors";

const SignUp = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const signUpData = useSelector(selectSignUpData);
  const signUpState = useSelector(selectSignUpState);

  const { t } = useTranslation();
  const yupSingUpSchema = signUpSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(yupSingUpSchema)
  });

  const onSubmit = (data) => {
    dispatch(fetchSignUp.request(data));

    reset();
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.signUpTitleWrapper}>
          <h2 className={classes.signUpTitle}>{t("pages.signUp.title")}</h2>
          <div className={classes.offerTextBox}>
            <p className={classes.accountText}>{t("pages.signUp.haveAccount")}</p>
            <CustomLinkButton
              to={ROUTES.LOGIN}
              className={classes.loginLink}
              title={t("pages.signUp.loginLink")}
            />
          </div>
        </div>
        <form action="" className={classes.signUpForm} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email" className={classes.formLabel}>
            {t("pages.signUp.fields.labels.email")}
            <input
              type="email"
              id="email"
              className={
                errors.email
                  ? [classes.inputError, classes.formInput].join(" ")
                  : ([classes.formInput] as never)
              }
              placeholder={t("pages.signUp.fields.placeholders.email")}
              {...register("email")}
            />
            {errors.email && <p className={classes.errorMsg}>{`${errors.email.message}`}</p>}
          </label>
          <label htmlFor="password" className={classes.formLabel}>
            {t("pages.signUp.fields.labels.password")}
            <input
              type="password"
              id="password"
              className={
                errors.password
                  ? [classes.inputError, classes.formInput].join(" ")
                  : ([classes.formInput] as never)
              }
              placeholder={t("pages.signUp.fields.placeholders.password")}
              {...register("password")}
            />
            {errors.password && <p className={classes.errorMsg}>{`${errors.password.message}`}</p>}
          </label>
          <label htmlFor="ConfPassword" className={classes.formLabel}>
            {t("pages.signUp.fields.labels.conPassword")}
            <input
              type="password"
              id="ConfPassword"
              className={
                errors.confirmPassword
                  ? [classes.inputError, classes.formInput].join(" ")
                  : ([classes.formInput] as never)
              }
              placeholder={t("pages.signUp.fields.placeholders.conPassword")}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className={classes.errorMsg}>{`${errors.confirmPassword.message}`}</p>
            )}
          </label>
          <div className={classes.checkboxWrapper}>
            <FormControlLabel
              control={<Checkbox className={classes.checkbox} {...register("terms")} />}
              label={
                errors.terms ? (
                  <p className={classes.termErrorMsg}>{`${errors.terms.message}`}</p>
                ) : (
                  <p className={classes.checkboxLabelTitle}>
                    {t("pages.signUp.fields.labels.checkbox")}
                  </p>
                )
              }
            />
          </div>
          <CustomButton
            className={classes.buttonSubmit}
            title={t("pages.signUp.signUbButton")}
            type="submit"
          />
        </form>

        {signUpState.loading && <CircularProgress />}
        {signUpData && <Alert severity="success">Signup successful!</Alert>}
        {signUpState.error.message && <Alert severity="error">{signUpState.error.message}</Alert>}

        <div className={classes.socialIconsTextBox}>
          <p className={classes.iconsText}>{t("pages.signUp.addLink")}</p>
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
export default SignUp;
