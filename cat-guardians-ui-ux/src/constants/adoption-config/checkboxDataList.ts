import { IFormElementsAttribute } from "./interfaces";

export const checkboxDataList: IFormElementsAttribute[] = [
  {
    id: 1,
    label:
      "I understand that the adopted cat is a lifelong commitment and agree to provide proper care, including but not limited to regular veterinary check-ups, necessary vaccinations, and a safe environment. I will provide appropriate food, water, shelter, and love.",
    registerName: "agreement_on_obligation_on_the_part_of_the_guardian"
  },
  {
    id: 2,
    label:
      "I agree to keep the adopted cat strictly indoors at all times for its safety and well-being.",
    registerName: "security_agreement"
  },
  {
    id: 3,
    label:
      "If the cat has not been spayed/neutered at the time of adoption, I agree to have this procedure performed within a specified timeframe, as agreed upon with Cat Guardians.",
    registerName: "agreement_for_spaying_sterilization_of_a_pet"
  },
  {
    id: 4,
    label:
      "If, for any reason, I cannot continue to care for the adopted cat, I will contact Cat Guardians immediately. I understand that I cannot transfer ownership or surrender the cat to another individual or shelter without the explicit consent of Cat Guardians.",
    registerName: "pet_return_agreement"
  },
  {
    id: 5,
    label:
      "I agree to allow representatives of Cat Guardians to conduct home checks and follow-up visits to ensure the welfare of the adopted cat.",
    registerName: "agreement_to_check_the_living_conditions"
  },
  {
    id: 6,
    label:
      "I release Cat Guardians from any liabilities, damages, or injuries caused by the adopted cat after the date of adoption.",
    registerName: "agreement_on_the_pets_condition_before_adoption"
  }
];
