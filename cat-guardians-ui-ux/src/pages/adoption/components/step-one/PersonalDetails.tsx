import React from "react";
import image4 from "src/assets/test.png";
import CustomButton from "src/components/buttons/CustomButton";

import { FieldsProps } from "../../lib/fieldsProps";
import { useStyles } from "./personalDetails.styles";

const PersonalDetails: React.FC<FieldsProps> = ({ onNext, register, errors, t }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.step}>
      <div className={classes.formElementsBox}>
        <label htmlFor="fullName" className={classes.formLabel}>
          {t("pages.petView.adoptionForm.formSteps.stepFirst.labels.fullName")}
          <input
            className={
              errors.address
                ? [classes.inputError, classes.formInput].join(" ")
                : ([classes.formInput] as never)
            }
            id="fullName"
            type="text"
            placeholder={t("pages.petView.adoptionForm.formSteps.stepFirst.placeholders.fullName")}
            {...register("fullName")}
          />
          {errors.fullName && <p className={classes.errorMsg}>{errors.fullName.message}</p>}
        </label>
        <label htmlFor="address" className={classes.formLabel}>
          {t("pages.petView.adoptionForm.formSteps.stepFirst.labels.address")}
          <input
            className={
              errors.address
                ? [classes.inputError, classes.formInput].join(" ")
                : ([classes.formInput] as never)
            }
            id="address"
            type="text"
            placeholder={t("pages.petView.adoptionForm.formSteps.stepFirst.placeholders.address")}
            {...register("address")}
          />
          {errors.address && <p className={classes.errorMsg}>{errors.address.message}</p>}
        </label>
        <label htmlFor="city" className={classes.formLabel}>
          {t("pages.petView.adoptionForm.formSteps.stepFirst.labels.city")}
          <input
            className={
              errors.city
                ? [classes.inputError, classes.formInput].join(" ")
                : ([classes.formInput] as never)
            }
            id="city"
            type="text"
            placeholder={t("pages.petView.adoptionForm.formSteps.stepFirst.placeholders.city")}
            {...register("city")}
          />
          {errors.city && <p className={classes.errorMsg}>{errors.city.message}</p>}
        </label>
        <label htmlFor="phone_number" className={classes.formLabel}>
          {t("pages.petView.adoptionForm.formSteps.stepFirst.labels.phone")}
          <input
            className={
              errors.phone_number
                ? [classes.inputError, classes.formInput].join(" ")
                : ([classes.formInput] as never)
            }
            id="phone_number"
            type="tel"
            placeholder={t("pages.petView.adoptionForm.formSteps.stepFirst.placeholders.phone")}
            {...register("phone_number")}
          />
          {errors.phone_number && <p className={classes.errorMsg}>{errors.phone_number.message}</p>}
        </label>
        <label htmlFor="email" className={classes.formLabel}>
          {t("pages.petView.adoptionForm.formSteps.stepFirst.labels.email")}
          <input
            className={
              errors.email
                ? [classes.inputError, classes.formInput].join(" ")
                : ([classes.formInput] as never)
            }
            id="email"
            type="email"
            placeholder={t("pages.petView.adoptionForm.formSteps.stepFirst.placeholders.email")}
            {...register("email")}
          />
          {errors.email && <p className={classes.errorMsg}>{errors.email.message}</p>}
        </label>
        <CustomButton
          className={classes.nextBtn}
          title={t("pages.petView.adoptionForm.formButtons.Next")}
          type="button"
          handleClick={onNext}
        />
      </div>
      <div className={classes.imageBox}>
        <img src={image4} alt="image" className={classes.image} />
      </div>
    </div>
  );
};

export default PersonalDetails;
