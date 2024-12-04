import { TFunction } from "i18next";
import { phoneRegExp } from "src/constants/adoption-config/phoneRegExp";
import * as yup from "yup";

export const adoptionFormYupSchema = (t: TFunction) => {
  return yup.object().shape({
    fullName: yup
      .string()
      .required(t("pages.petView.adoptionForm.formSteps.stepFirst.errorsMsg.fullName")),
    city: yup.string().required(t("pages.petView.adoptionForm.formSteps.stepFirst.errorsMsg.city")),
    address: yup
      .string()
      .required(t("pages.petView.adoptionForm.formSteps.stepFirst.errorsMsg.address")),
    phone_number: yup
      .string()
      .required(t("pages.petView.adoptionForm.formSteps.stepFirst.errorsMsg.phone_number.required"))
      .matches(
        phoneRegExp,
        t("pages.petView.adoptionForm.formSteps.stepFirst.errorsMsg.phone_number.inValid")
      ),
    email: yup
      .string()
      .required(t("pages.petView.adoptionForm.formSteps.stepFirst.errorsMsg.email.required"))
      .email(t("pages.petView.adoptionForm.formSteps.stepFirst.errorsMsg.email.inValid")),
    notes: yup
      .string()
      .min(20)
      .required(t("pages.petView.adoptionForm.formSteps.stepFirst.errorsMsg.notes")),
    status: yup.string().required(t("pages.petView.adoptionForm.formSteps.stepSecond.errorsMsg")),
    peopleCount: yup
      .string()
      .required(t("pages.petView.adoptionForm.formSteps.stepSecond.errorsMsg")),
    otherPets: yup
      .string()
      .required(t("pages.petView.adoptionForm.formSteps.stepSecond.errorsMsg")),
    kids: yup.string().required(t("pages.petView.adoptionForm.formSteps.stepSecond.errorsMsg")),
    agreement_on_obligation_on_the_part_of_the_guardian: yup
      .boolean()
      .oneOf([true], t("pages.petView.adoptionForm.formSteps.stepThree.errorsMsg"))
      .required(),
    security_agreement: yup
      .bool()
      .oneOf([true], t("pages.petView.adoptionForm.formSteps.stepThree.errorsMsg"))
      .required(),
    agreement_for_spaying_sterilization_of_a_pet: yup
      .boolean()
      .oneOf([true], t("pages.petView.adoptionForm.formSteps.stepThree.errorsMsg"))
      .required(),
    pet_return_agreement: yup
      .bool()
      .oneOf([true], t("pages.petView.adoptionForm.formSteps.stepThree.errorsMsg"))
      .required(),
    agreement_to_check_the_living_conditions: yup
      .boolean()
      .oneOf([true], t("pages.petView.adoptionForm.formSteps.stepThree.errorsMsg"))
      .required(),
    agreement_on_the_pets_condition_before_adoption: yup
      .boolean()
      .oneOf([true], t("pages.petView.adoptionForm.formSteps.stepThree.errorsMsg"))
      .required()
  });
};

export type AdoptionFormValues = {
  email?: string;
  phone_number?: string;
  notes?: string;
  fullName?: string;
  city?: string;
  address?: string;
  status?: string;
  peopleCount?: string;
  otherPets?: string;
  kids?: string;
  agreement_on_obligation_on_the_part_of_the_guardian?: boolean;
  security_agreement?: boolean;
  agreement_for_spaying_sterilization_of_a_pet?: boolean;
  pet_return_agreement?: boolean;
  agreement_to_check_the_living_conditions?: boolean;
  agreement_on_the_pets_condition_before_adoption?: boolean;
};

export type FormFields = keyof AdoptionFormValues;
