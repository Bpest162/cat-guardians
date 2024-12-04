import React from "react";
import image4 from "src/assets/test.png";
import CustomButton from "src/components/buttons/CustomButton";

import { FieldsProps } from "../../lib/fieldsProps";
import { useStyles } from "./reasonsForAdoption.styles";

const ReasonsForAdoption: React.FC<FieldsProps> = ({ onPrev, onNext, register, errors, t }) => {
  const { classes } = useStyles();
  return (
    <div className={classes.step}>
      <div className={classes.formElementsBox}>
        <label htmlFor="text-area" className={classes.textAreaLabel}>
          {t("pages.petView.adoptionForm.formSteps.stepFirst.labels.notes")}
          <textarea
            name="text-area"
            id="text-area"
            className={classes.formTextArea}
            placeholder={t("pages.petView.adoptionForm.formSteps.stepFirst.placeholders.notes")}
            {...register("notes")}
          ></textarea>
          {errors.notes && <p className={classes.errorMsg}>{errors.notes.message}</p>}
        </label>
        <div className={classes.buttonsBox}>
          <CustomButton
            type="button"
            title={t("pages.petView.adoptionForm.formButtons.Previous")}
            className={classes.prevBtn}
            handleClick={onPrev}
          />
          <CustomButton
            type="button"
            title={t("pages.petView.adoptionForm.formButtons.Next")}
            className={classes.nextBtn}
            handleClick={onNext}
          />
        </div>
      </div>
      <div className={classes.imageBox}>
        <img src={image4} alt="image" className={classes.image} />
      </div>
    </div>
  );
};

export default ReasonsForAdoption;
