import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import CustomButton from "src/components/buttons/CustomButton";
import { checkboxDataList } from "src/constants/adoption-config/checkboxDataList";

import { FieldsProps } from "../../lib/fieldsProps";
import { useStyles } from "./agreement.styles";

const Agreement: React.FC<FieldsProps> = ({ onPrev, register, errors, t }) => {
  const { classes } = useStyles();
  return (
    <div className={classes.checkBoxesBlock}>
      <div className={classes.checkboxGroup}>
        {checkboxDataList.map((elem) => (
          <FormControlLabel
            key={elem.id}
            control={
              <Checkbox className={classes.checkboxMui} {...register(`${elem.registerName}`)} />
            }
            label={
              <p className={classes.checkboxLabel}>
                {errors[elem.registerName] ? (
                  <span className={classes.errorMsg}>{errors[elem.registerName].message}</span>
                ) : (
                  t(`pages.petView.adoptionForm.formSteps.stepThree.labels.${elem.label}`)
                )}
              </p>
            }
          />
        ))}
      </div>
      <div className={classes.buttonsBox}>
        <CustomButton
          type="button"
          title={t("pages.petView.adoptionForm.formButtons.Previous")}
          className={classes.prevBtn}
          handleClick={onPrev}
        />
        <CustomButton
          type="submit"
          title={t("pages.petView.adoptionForm.formButtons.Submit")}
          className={classes.nextBtn}
        />
      </div>
    </div>
  );
};

export default Agreement;
