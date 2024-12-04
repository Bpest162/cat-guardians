import { IFormElementsAttribute } from "./interfaces";

export const maritalStatusArr: IFormElementsAttribute[] = [
  {
    id: 1,
    label: "Single",
    value: "single"
  },
  {
    id: 2,
    label: "Living with partner",
    value: "withpartner"
  },
  {
    id: 3,
    label: "Married",
    value: "married"
  },
  {
    id: 4,
    label: "Separated",
    value: "separated"
  },
  {
    id: 5,
    label: "Widowed",
    value: "widowed"
  },
  {
    id: 6,
    label: "Divorced",
    value: "divorsed"
  }
];

export const peopleCountArr: IFormElementsAttribute[] = [
  {
    id: 1,
    label: "1",
    value: "one"
  },
  {
    id: 2,
    label: "2",
    value: "two"
  },
  {
    id: 3,
    label: "3",
    value: "three"
  },
  {
    id: 4,
    label: "4",
    value: "four"
  },
  {
    id: 5,
    label: "5",
    value: "five"
  },
  {
    id: 6,
    label: "More than 5",
    value: "morethenfive"
  }
];

export const otherPetsArr: IFormElementsAttribute[] = [
  {
    id: 1,
    label: "No",
    value: "no"
  },
  {
    id: 2,
    label: "Yes, I own a cat",
    value: "cat"
  },
  {
    id: 3,
    label: "Yes, I own a dog",
    value: "dog"
  },
  {
    id: 4,
    label: "I own several pets (cats and/or dogs)",
    value: "severalpets"
  },
  {
    id: 5,
    label: "Other",
    value: "other"
  }
];

export const kidsCountArr: IFormElementsAttribute[] = [
  {
    id: 1,
    label: "No",
    value: "no"
  },
  {
    id: 2,
    label: "Yes",
    value: "yes"
  }
];
