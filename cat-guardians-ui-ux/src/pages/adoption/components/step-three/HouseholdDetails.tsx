import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";
import image from "src/assets/test.png";
import CustomButton from "src/components/buttons/CustomButton";
import {
  kidsCountArr,
  maritalStatusArr,
  otherPetsArr,
  peopleCountArr
} from "src/constants/adoption-config/radioBtnsDataList";

import { FieldsProps } from "../../lib/fieldsProps";
import { useStyles } from "./householdDetails.styles";

const HouseholdDetails: React.FC<FieldsProps> = ({ register, onNext, onPrev, errors, t }) => {
  const { classes } = useStyles();
  return (
    <div className={classes.step}>
      <div className={classes.formElementsBox}>
        <div className={classes.radioGroupBox}>
          <div>
            <h3 className={classes.radioButtonsBoxTitle}>
              {t("pages.petView.adoptionForm.formSteps.stepSecond.titles.maritalStatus")}
            </h3>
          </div>
          <RadioGroup className={classes.radioGroup}>
            {errors.status && <p className={classes.errorMsg}>{errors.status.message}</p>}
            {maritalStatusArr.map((elem) => (
              <FormControlLabel
                key={elem.id}
                value={elem.label}
                control={<Radio className={classes.radioButton} />}
                label={
                  <p className={classes.radioButtonLabel}>
                    {t(
                      `pages.petView.adoptionForm.formSteps.stepSecond.labels.groupOne.${elem.label}`
                    )}
                  </p>
                }
                {...register("status")}
              />
            ))}
          </RadioGroup>
        </div>
        <div className={classes.radioGroupBox}>
          <div>
            <h3 className={classes.radioButtonsBoxTitle}>
              {t("pages.petView.adoptionForm.formSteps.stepSecond.titles.peopleCount")}
            </h3>
          </div>
          <RadioGroup className={classes.radioGroup}>
            {errors.peopleCount && <p className={classes.errorMsg}>{errors.peopleCount.message}</p>}
            {peopleCountArr.map((elem) => (
              <FormControlLabel
                key={elem.id}
                value={elem.label}
                control={<Radio className={classes.radioButton} />}
                label={
                  <p className={classes.radioButtonLabel}>
                    {t(
                      `pages.petView.adoptionForm.formSteps.stepSecond.labels.groupTwo.${elem.label}`
                    )}
                  </p>
                }
                {...register("peopleCount")}
              />
            ))}
          </RadioGroup>
        </div>
        <div className={classes.radioGroupBox}>
          <div>
            <h3 className={classes.radioButtonsBoxTitle}>
              {t("pages.petView.adoptionForm.formSteps.stepSecond.titles.otherPets")}
            </h3>
          </div>
          <RadioGroup className={classes.radioGroup}>
            {errors.otherPets && <p className={classes.errorMsg}>{errors.otherPets.message}</p>}
            {otherPetsArr.map((elem) => (
              <FormControlLabel
                key={elem.id}
                value={elem.label}
                control={<Radio className={classes.radioButton} />}
                label={
                  <p className={classes.radioButtonLabel}>
                    {t(
                      `pages.petView.adoptionForm.formSteps.stepSecond.labels.groupThree.${elem.label}`
                    )}
                  </p>
                }
                {...register("otherPets")}
              />
            ))}
          </RadioGroup>
        </div>
        <div className={classes.radioGroupBox}>
          <div>
            <h3 className={classes.radioButtonsBoxTitle}>
              {t("pages.petView.adoptionForm.formSteps.stepSecond.titles.kidsCount")}
            </h3>
          </div>
          <RadioGroup className={classes.radioGroup}>
            {errors.kids && <p className={classes.errorMsg}>{errors.kids.message}</p>}
            {kidsCountArr.map((elem) => (
              <FormControlLabel
                key={elem.id}
                value={elem.label}
                control={<Radio className={classes.radioButton} />}
                label={
                  <p className={classes.radioButtonLabel}>
                    {t(
                      `pages.petView.adoptionForm.formSteps.stepSecond.labels.groupFour.${elem.label}`
                    )}
                  </p>
                }
                {...register("kids")}
              />
            ))}
          </RadioGroup>
        </div>
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
        <img src={image} alt="image" className={classes.image} />
      </div>
    </div>
  );
};

export default HouseholdDetails;
