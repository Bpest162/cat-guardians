import { ISteps } from "./interfaces";

export const steps: ISteps[] = [
  {
    id: 1,
    label: "Personal details",
    fields: ["fullName", "address", "city", "phone_number", "email"]
  },
  {
    id: 2,
    label: "Reasons for adoption",
    fields: ["notes"]
  },
  {
    id: 3,
    label: "Household details",
    fields: ["status", "peopleCount", "otherPets", "kids"]
  },
  {
    id: 4,
    label: "Agreement",
    fields: [
      "agreement_on_obligation_on_the_part_of_the_guardian",
      "security_agreement",
      "agreement_for_spaying_sterilization_of_a_pet",
      "pet_return_agreement",
      "agreement_to_check_the_living_conditions",
      "agreement_on_the_pets_condition_before_adoption"
    ]
  }
];
