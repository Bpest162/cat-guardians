import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, CircularProgress } from "@mui/material";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OverlayModal from "src/components/OverlayModal/OverlayModal";
import { steps } from "src/constants/adoption-config/steps";
import { StepsEnum } from "src/constants/adoption-config/stepsEnum";
import { StatusCode } from "src/constants/httpStatus/httpStatus";
import { ROUTES } from "src/constants/routing/urls";
import useAuthCheck from "src/hooks/useAuthCheck";

import { useStyles } from "./adoptionForm.styles";
import AdoptionFormNavigation from "./components/navigation/AdoptionFormNavigation";
import Agreement from "./components/step-four/Agreement";
import PersonalDetails from "./components/step-one/PersonalDetails";
import HouseholdDetails from "./components/step-three/HouseholdDetails";
import ReasonsForAdoption from "./components/step-two/ReasonsForAdoption";
import { adoptionFormYupSchema, FormFields } from "./lib/adoptionFormYupSchema";
import { createAdoption, fetchClearAdoption } from "./store/action";
import { selectAdoption, selectAdoptionState } from "./store/selectors";

const AdoptionForm: React.FC = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const yupSchema = adoptionFormYupSchema(t);

  const { id } = useParams();

  const user = useAuthCheck();
  const adoptionState = useSelector(selectAdoptionState);
  const adoptionData = useSelector(selectAdoption);

  const [currentStep, setCurrentStep] = useState(StepsEnum.ONE);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    trigger
  } = useForm({
    resolver: yupResolver(yupSchema)
  });

  const onSubmit = (data) => {
    const formData = { ...data, id_cat: id };
    dispatch(createAdoption.request(formData));

    reset();
  };

  const onNext = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FormFields[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length) {
        await handleSubmit(onSubmit)();
      }
      setCurrentStep((step) => step + 1);
    }
  };

  const onPrev = () => {
    setCurrentStep((step) => step - 1);
  };

  const onHandleClose = () => {
    dispatch(fetchClearAdoption.request(null));
  };

  return (
    <div className={classes.adoptionMainWrapper}>
      <div className={classes.adoptionMainContainer}>
        <AdoptionFormNavigation t={t} />
        <div className={classes.adoptionTitleWrapper}>
          <h2 className={classes.adoptionTitle}>{t("pages.petView.adoptionForm.title")}</h2>
        </div>
        <div className={classes.adoptionFormMainWrapper}>
          <div className={classes.stepperContainer}>
            <Stepper activeStep={currentStep} alternativeLabel className={classes.stepper}>
              {steps.map((step) => (
                <Step key={step.id}>
                  <StepLabel>
                    {t(`pages.petView.adoptionForm.formStepsTitle.${step.label}`)}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
          <div className={classes.adoptionFormContainer}>
            <form action="" className={classes.adoptionForm} onSubmit={handleSubmit(onSubmit)}>
              {/* step one */}
              {currentStep === StepsEnum.ONE && (
                <PersonalDetails onNext={onNext} register={register} errors={errors} t={t} />
              )}
              {/* step two */}
              {currentStep === StepsEnum.TWO && (
                <ReasonsForAdoption
                  onPrev={onPrev}
                  onNext={onNext}
                  register={register}
                  errors={errors}
                  t={t}
                />
              )}
              {/* step three */}
              {currentStep === StepsEnum.THREE && (
                <HouseholdDetails
                  onPrev={onPrev}
                  onNext={onNext}
                  register={register}
                  errors={errors}
                  t={t}
                />
              )}
              {/* step four */}
              {currentStep === StepsEnum.FOUR && (
                <Agreement register={register} errors={errors} onPrev={onPrev} t={t} />
              )}
              {adoptionState.loading && <CircularProgress />}
              {adoptionState.error.message && (
                <Alert severity="error">{adoptionState.error.message}</Alert>
              )}
            </form>
          </div>
        </div>
      </div>
      {adoptionData?.status === StatusCode.CREATED && (
        <OverlayModal
          text={t("pages.petView.adoptionForm.overlayModal.successSubmit.text")}
          title={t("pages.petView.adoptionForm.overlayModal.successSubmit.title")}
          buttonTitle={t("pages.petView.adoptionForm.overlayModal.successSubmit.buttonTitle")}
          to={ROUTES.PETSLIST}
          handleClose={onHandleClose}
        />
      )}
      {!user && (
        <OverlayModal
          text={t("pages.petView.adoptionForm.overlayModal.unauthorized.text")}
          title={t("pages.petView.adoptionForm.overlayModal.unauthorized.title")}
          buttonTitle={t("pages.petView.adoptionForm.overlayModal.unauthorized.buttonTitle")}
          to={ROUTES.LOGIN}
        />
      )}
    </div>
  );
};
export default AdoptionForm;
